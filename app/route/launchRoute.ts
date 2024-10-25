'use strict';
/* eslint max-lines: 0 */

import * as express from 'express';
import { RoutePath } from '../const/routePath';
import { Logger } from '../log/logger';
import { DataToRender, DevLaunchTemplateData, LaunchRequest, LaunchRequestBody,
    LaunchRequestConverted, LaunchUIContext } from '../type/ILaunchContext';
import { authorizeLaunchRoute, buildAppLaunchPath, getJWTForSession } from '../api/launchAPI';
import { config } from '../config/config';
import * as core from 'express-serve-static-core';
import {
    buildErrorMessage,
    buildInfoMessageRouteHit,
    buildInfoMessageUserProcessCompleted
} from '../util/logMessageBuilder';
import LogType from '../const/logType';
import { validateJWTToken } from '../middleware/jwtTokenValidationMiddleware';
import { retrieveOrderDetailsByUserId } from '../service/orderService';
import { IPatchOrder, Order } from '../type/orderType';
import { IUser } from '../type/IUserType';
import { v4 as uuidv4 } from 'uuid';
import LaunchParamBuilder from '../util/LaunchParamBuilder';
import { LaunchType } from '../type/ILaunchPayload';
import { ErrorTemplateMessage } from '../const/errorTemplateMessage';
import { allowedForExternalSystemRoleOnly } from '../middleware/paramValidationMiddleware';
import ServiceError from '../type/error/ServiceError';
import ErrorType from '../const/errorType';
import { CAN_NOT_FIND_SELECTED_AREA, ORDER_NOT_ACTIVE } from '../const/errorMessage';
import { HTTPUserError } from '../const/httpCode';
import * as OrderService from '../service/orderService';
import { prepareUserPayload } from '../api/userAPI';
import { AppRequest, AppRequestStoreCurrency, AppRequestStoreCurrencyAndEmail } from '../type/appRequestType';
import { IJWTClaims } from '../type/IJWTClaims';

const router = express.Router();

const Logging = Logger(__filename);

/**
 * To accept the launch request from email and render the UI
 */
router.get(RoutePath.LAUNCH_MAIL, allowedForExternalSystemRoleOnly, (
    req: express.Request<core.ParamsDictionary, any, any, { uuid: string, launchType: string, authToken: string }>,
    res: express.Response, next: express.NextFunction): void => {
    (async () => {
        validateJWTToken(req.query.authToken);
        // Get token for the session
        const uuid = req.query.uuid;
        const launchType = req.query.launchType as LaunchType;
        const sessionToken: string = getJWTForSession(uuid);
        Logging.log(buildInfoMessageRouteHit(req.path, `launching email for user ${uuid}`), LogType.INFO);

        // Get all order data
        const order = await retrieveOrderDetailsByUserId(uuid);

        // If order is cancelled user should not be able to access the order
        if (order.isCanceled) {
            throw new ServiceError(
                ErrorType.ORDER_RETRIEVAL_ERROR, ORDER_NOT_ACTIVE, '', HTTPUserError
                    .UNPROCESSABLE_ENTITY_CODE);
        }

        // Prepare order service cost
        const serviceCostData = {
            currencyType: order?.currencyType,
            serviceFee: order?.serviceFee 
        };
        const stringifyServiceCostData = JSON.stringify(serviceCostData);
        const cleanedServiceCost = stringifyServiceCostData.replace(/\\/g, '');

        // Prepare product data
        const launchTemplateDataOrder: Array<Order> = order.orderItems;
        const stringifyOrder = JSON.stringify(launchTemplateDataOrder);
        const cleanedOrder = stringifyOrder.replace(/\\/g, '');

        // Prepare user data
        const launchTemplateDataUser: IUser = prepareUserPayload(order);
        const stringifyUser = JSON.stringify(launchTemplateDataUser);
        const cleanedUser = stringifyUser.replace(/\\/g, '');

        let applicationPath: string;
        const paramBuilder = new LaunchParamBuilder(launchType);
        if (launchType === LaunchType.EMAIL_EDIT) {
            applicationPath = await buildAppLaunchPath(config.UI_APP_ENTRY_POINT);
        } else {
            applicationPath = await buildAppLaunchPath(config.UI_APP_ENTRY_POINT);
        }
        const retailerData = {
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
            retailerEmail: order?.retailerEmail,
            currency: order?.currencyType
        };
        const stringifyRetailerData = JSON.stringify(retailerData);
        const cleanedRetailerData = stringifyRetailerData.replace(/\\/g, '');

        const launchDataPrepared = paramBuilder
            .makeAuthentic(sessionToken)
            .makeRetailerPayload(cleanedRetailerData)
            .makeProductPayload(cleanedOrder)
            .makeUserPayload(cleanedUser)
            .makeServiceCostPayload(cleanedServiceCost)
            .build();
        return res.render(
            applicationPath, launchDataPrepared
        );

    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'launch email'), LogType.ERROR);
        buildAppLaunchPath(config.ERROR_TEMPLATE).then((path) => {

            if (errorObject.message === ORDER_NOT_ACTIVE) {
                return res.render(path, { errorTitle: ErrorTemplateMessage.LAUNCH_ERROR_EMAIL_HEADER,
                    errorDescription: ErrorTemplateMessage.LAUNCH_ERROR_EMAIL_MESSAGE_ORDER_CANCELED });
            }

            return res.render(path, { errorTitle: ErrorTemplateMessage.LAUNCH_ERROR_EMAIL_HEADER,
                errorDescription: ErrorTemplateMessage.LAUNCH_ERROR_EMAIL_MESSAGE });
        }).catch(err => next(error));
    });
});

/**
 * To access the dev world, this route will provide you a HTML form
 */
router.get(RoutePath.DEV_LAUNCH, (req: express.Request, res: express.Response): void => {
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, 'launching dev app'), LogType.INFO);
        const applicationPath: string = await buildAppLaunchPath(config?.DEV_ENTRY_POINT);

        const launchTemplateData: DevLaunchTemplateData = {
            environment: process.env.NODE_ENV as string
        };
        Logging.log(buildInfoMessageUserProcessCompleted('Launch dev app', 'dev testing' ), LogType.INFO);
        return res.render(applicationPath, launchTemplateData);
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'launch dev app'), LogType.ERROR);
    });
});

/**
 * To accept the launch request and render the UI
 */
router.post(RoutePath.LAUNCH, allowedForExternalSystemRoleOnly, (req: express.Request,
    res: express.Response, next: express.NextFunction): void => {
    (async () => {
        await authorizeLaunchRoute(req, res, next);
        Logging.log(buildInfoMessageRouteHit(req.path, 'launch ui'), LogType.INFO);
        const requestBody = req.body as LaunchRequestBody;
        const selectedArea = requestBody.selectedArea;
        if (!selectedArea) {
            throw new ServiceError(
                ErrorType.LAUNCH_ERROR, CAN_NOT_FIND_SELECTED_AREA, '', HTTPUserError.NOT_FOUND_CODE);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const converted = JSON.parse(requestBody.products.replace(/\\/g, '')) as LaunchRequestConverted;
        // Get token for the session
        const uuid: string = uuidv4();
        const sessionToken: string = getJWTForSession(uuid);

        // Build user UID
        const onlyUidWithUserData = {
            uid: uuid
        };
        const stringifyUserData = JSON.stringify(onlyUidWithUserData);
        const cleanedUserData = stringifyUserData.replace(/\\/g, '');
        const stringify = JSON.stringify(converted.products);
        const cleanedProduct = stringify.replace(/\\/g, '');
        const claims = (req as AppRequest).claims as unknown as IJWTClaims;
        const retailerData = {
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
            retailerEmail: (req as AppRequestStoreCurrencyAndEmail)?.extSysEmail,
            // We enter user first selected area as retailer area for this order.
            retailerArea: selectedArea,
            branchId: claims.id,
            currency: (req as AppRequestStoreCurrencyAndEmail)?.currencyType
        };
        const stringifyRetailerData = JSON.stringify(retailerData);
        const cleanedRetailerData = stringifyRetailerData.replace(/\\/g, '');

        const paramBuilder = new LaunchParamBuilder(LaunchType.PRODUCT_LAUNCH);
        const productData: DataToRender = { 'productList': cleanedProduct, token: sessionToken };
        Logging.log(buildInfoMessageUserProcessCompleted('Launch UI app', `order: 
            ${JSON.stringify(productData)}` ), LogType.INFO);

        const applicationPath: string = await buildAppLaunchPath(config.UI_APP_ENTRY_POINT);
        return res.render(applicationPath, paramBuilder
            .makeAuthentic(sessionToken).makeProductPayload(cleanedProduct)
            .makeSelectedLaunchArea(selectedArea)
            .makeUserPayload(cleanedUserData).makeRetailerPayload(cleanedRetailerData).build());

    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'launch ui app'), LogType.ERROR);
        buildAppLaunchPath(config.ERROR_TEMPLATE).then((path) => {
            return res.render(path, { errorTitle: ErrorTemplateMessage.LAUNCH_ERROR_HEADER,
                errorDescription: ErrorTemplateMessage.LAUNCH_ERROR_MESSAGE });
        }).catch(err => next(error));
    });
});

/**
 * Add items to user order
 */
router.post(RoutePath.LAUNCH_ADD, (req: express.Request,
    res: express.Response, next: express.NextFunction): void => {
    (async () => {
        await authorizeLaunchRoute(req, res, next);
        Logging.log(buildInfoMessageRouteHit(req.path, 'launch add ui'), LogType.INFO);
        const { uid, ...requestBody } = req.body as { uid: string } & LaunchRequestBody;

        const sessionToken: string = getJWTForSession(uid);

        let order = await OrderService.retrieveOrderDetailsByUserId(uid);

        // If order is cancelled user should not be able to access the order
        if (order.isCanceled) {
            throw new ServiceError(
                ErrorType.ORDER_RETRIEVAL_ERROR, ORDER_NOT_ACTIVE, '', HTTPUserError
                    .UNPROCESSABLE_ENTITY_CODE);
        }

        order = await OrderService.patchOrderDetailsByUserId(uid, {
            orderItems: [...order.orderItems, requestBody]
        } as IPatchOrder);

        // Prepare product data
        const launchTemplateDataOrder: Array<Order> = order.orderItems;
        const stringifyOrder = JSON.stringify(launchTemplateDataOrder);
        const cleanedOrder = stringifyOrder.replace(/\\/g, '');

        // Prepare user data
        const launchTemplateDataUser: IUser = prepareUserPayload(order);
        const stringifyUser = JSON.stringify(launchTemplateDataUser);
        const cleanedUser = stringifyUser.replace(/\\/g, '');

        const paramBuilder = new LaunchParamBuilder(LaunchType.PRODUCT_LAUNCH);
        const applicationPath = await buildAppLaunchPath(config.UI_APP_ENTRY_POINT);
        const retailerData = {
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
            retailerEmail: order?.retailerEmail
        };
        const stringifyRetailerData = JSON.stringify(retailerData);
        const cleanedRetailerData = stringifyRetailerData.replace(/\\/g, '');

        return res.render(
            applicationPath, paramBuilder
                .makeAuthentic(sessionToken)
                .makeRetailerPayload(cleanedRetailerData)
                .makeProductPayload(cleanedOrder)
                .makeUserPayload(cleanedUser)
                .build()
        );

    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'launch add ui app'), LogType.ERROR);
        buildAppLaunchPath(config.ERROR_TEMPLATE).then((path) => {
            return res.render(path, { errorTitle: ErrorTemplateMessage.LAUNCH_ERROR_HEADER,
                errorDescription: ErrorTemplateMessage.LAUNCH_ERROR_MESSAGE });
        }).catch(err => next(error));
    });
});

/**
 * Update user order as a whole by going back to the shopping site and coming back 
 */
router.post(RoutePath.LAUNCH_UPDATE, (req: express.Request,
    res: express.Response, next: express.NextFunction): void => {
    (async () => {
        await authorizeLaunchRoute(req, res, next);
        Logging.log(buildInfoMessageRouteHit(req.path, 'launch update ui'), LogType.INFO);
        const { uid, ...requestBody } = req.body as { uid: string } & LaunchRequestBody;

        const sessionToken: string = getJWTForSession(uid);

        let order = await OrderService.retrieveOrderDetailsByUserId(uid);

        // If order is cancelled user should not be able to access the order
        if (order.isCanceled) {
            throw new ServiceError(
                ErrorType.ORDER_RETRIEVAL_ERROR, ORDER_NOT_ACTIVE, '', HTTPUserError
                    .UNPROCESSABLE_ENTITY_CODE);
        }

        order = await OrderService.patchOrderDetailsByUserId(uid, {
            orderItems: requestBody
        } as IPatchOrder);

        // Prepare product data
        const launchTemplateDataOrder: Array<Order> = order.orderItems;

        const stringifyOrder = JSON.stringify(launchTemplateDataOrder);
        const cleanedOrder = stringifyOrder.replace(/\\/g, '');

        // Prepare user data
        const launchTemplateDataUser: IUser = prepareUserPayload(order);
        const stringifyUser = JSON.stringify(launchTemplateDataUser);
        const cleanedUser = stringifyUser.replace(/\\/g, '');

        const paramBuilder = new LaunchParamBuilder(LaunchType.PRODUCT_LAUNCH);
        const applicationPath = await buildAppLaunchPath(config.UI_APP_ENTRY_POINT);
        const retailerData = {
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
            retailerEmail: order?.retailerEmail
        };
        const stringifyRetailerData = JSON.stringify(retailerData);
        const cleanedRetailerData = stringifyRetailerData.replace(/\\/g, '');

        return res.render(
            applicationPath, paramBuilder
                .makeAuthentic(sessionToken)
                .makeRetailerPayload(cleanedRetailerData)
                .makeProductPayload(cleanedOrder)
                .makeUserPayload(cleanedUser)
                .build()
        );

    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'launch update ui app'), LogType.ERROR);
        buildAppLaunchPath(config.ERROR_TEMPLATE).then((path) => {
            return res.render(path, { errorTitle: ErrorTemplateMessage.LAUNCH_ERROR_HEADER,
                errorDescription: ErrorTemplateMessage.LAUNCH_ERROR_MESSAGE });
        }).catch(err => next(error));
    });
});

export default router;
