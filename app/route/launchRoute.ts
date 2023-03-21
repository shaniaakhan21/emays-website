'use strict';

import * as express from 'express';

const router = express.Router();
import { RoutePath } from '../const/routePath';
import { Logger } from '../log/logger';
import { DataToRender, DevLaunchTemplateData, LaunchRequestBody, LaunchUIContext } from '../type/ILaunchContext';
import { authorizeLaunchRoute, buildAppLaunchPath, getJWTForSession } from '../api/launchAPI';
import { config } from '../config/config';
import * as core from 'express-serve-static-core';
import { buildErrorMessage,
    buildInfoMessageRouteHit, buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import LogType from '../const/logType';
import { validateJWTToken } from '../middleware/jwtTokenValidationMiddleware';
import { retrieveOrderDetailsByUserId } from '../service/orderService';
import { Order } from '../type/orderType';
import { IUser } from '../type/IUserType';
import { v4 as uuidv4 } from 'uuid';
import LaunchParamBuilder from '../util/LaunchParamBuilder';
import { LaunchType } from '../type/ILaunchPayload';

const Logging = Logger(__filename);

/**
 * To accept the launch request from email and render the UI
 */
router.get(RoutePath.LAUNCH_MAIL, (
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

        // Prepare product data
        const launchTemplateDataOrder: Array<Order> = order.orderItems;
        const stringifyOrder = JSON.stringify(launchTemplateDataOrder);
        const cleanedOrder = stringifyOrder.replace(/\\/g, '');

        // Prepare user data
        const launchTemplateDataUser: IUser = {
            email: order.email as string,
            firstName: order.firstName as string,
            lastName: order.lastName as string,
            phoneNumber: order.phoneNumber as string, 
            retailerEmail: order.email as string,
            date: order.date as Date,
            uid: order.uid as string,
            startTime: order.startTime as string,
            endTime: order.endTime as string,
            timeZone: order.timeZone as string,
            experience: order.experience as string,
            address: order.address as {
                addOne: string,
                addTwo: string,
                addThree: string,
                addFour: string
            }
        };
        const stringifyUser = JSON.stringify(launchTemplateDataUser);
        const cleanedUser = stringifyUser.replace(/\\/g, '');

        const applicationPath: string = await buildAppLaunchPath(config.UI_APP_ENTRY_POINT);
        const paramBuilder = new LaunchParamBuilder(launchType);
        return res.render(applicationPath, paramBuilder.makeAuthentic(sessionToken)
            .makeProductPayload(cleanedOrder).makeUserPayload(cleanedUser).build());

    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'launch email'), LogType.ERROR);
        next(error);
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
        /*
         * Need to display error template in the app.ts since
         * there is no UI to cater the error message at this stage (due to form submit)
         */
    });
});

/**
 * To accept the launch request and render the UI
 */
router.post(RoutePath.LAUNCH, authorizeLaunchRoute, (req: express.Request,
    res: express.Response, next: express.NextFunction): void => {
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, 'launch ui'), LogType.INFO);
        const requestBody: LaunchRequestBody = req.body as LaunchRequestBody;

        // Get token for the session
        const uuid: string = uuidv4();
        const sessionToken: string = getJWTForSession(uuid);

        // Build user UID
        const onlyUidWithUserData = {
            uid: uuid
        };
        const stringifyUserData = JSON.stringify(onlyUidWithUserData);
        const cleanedUserData = stringifyUserData.replace(/\\/g, '');

        // TODO: remove this and take product payload from the request directly using req.body.productList
        const launchTemplateData: Array<LaunchUIContext> = [{
            productName: requestBody.productName,
            productColor: requestBody.productColor,
            productSize: requestBody.productSize,
            productQuantity: requestBody.productQuantity,
            productCost: requestBody.productCost,
            productImage: requestBody.productImage,
            productDeliveryInformation: requestBody.productDeliveryInformation
        }];
        const stringify = JSON.stringify(launchTemplateData);
        const cleanedProduct = stringify.replace(/\\/g, '');

        // TODO: remove this and take retailer payload from the request directly using req.body.retailer
        const retailerData = {
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
            retailerEmail: req.body?.retailerEmail
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
            .makeUserPayload(cleanedUserData).makeRetailerPayload(cleanedRetailerData).build());

    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'launch ui app'), LogType.ERROR);
        next(error);
        /*
         * Need to display error template in the app.ts since
         * there is no UI to cater the error message at this stage (due to form submit)
         */
    });
});

export default router;
