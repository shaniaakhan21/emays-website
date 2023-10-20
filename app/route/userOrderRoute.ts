'use strict';

import * as express from 'express';
import * as core from 'express-serve-static-core';
import { Router, Request, Response, NextFunction } from 'express';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { buildErrorMessage, buildInfoMessageRouteHit, buildInfoMessageUserProcessCompleted }
    from '../util/logMessageBuilder';
import { PathParam, RoutePath } from '../const/routePath';
import { HTTPSuccess, HTTPUserError } from '../const/httpCode';
import { IOrder, IOrderDTO, IPatchOrder } from '../type/orderType';
import { successResponseBuilder } from '../util/responseBuilder';
import {
    allowedForClientRoleAndSuperAdminAndAdminOnly,
    allowedForClientRoleOnly,
    allowedForExternalSystemRoleOnly,
    allowedForSuperRoleOnly,
    validateCreateOrder,
    validateHeader
    ,
    validateOrderDetailsPagination,
    validateOrderPatchRequestBody,
    validateParamUserId
} from '../middleware/paramValidationMiddleware';
import { createOrder, deleteOrderByIdGiven, getOrderDetailsWithPagination, patchOrderDetailsByUserId,
    retrieveOrderDetailsByOrderId,
    retrieveOrderDetailsByUserId } from '../service/orderService';
import { AppRequest } from '../type/appRequestType';
import { prepareRetailerDashboardSummary } from '../api/userAPI';

const router = Router();
const Logging = Logger(__filename);

const OrderRoutePath: string = RoutePath.ORDERS;

type CustomRequest = Request & { claims: { id: string, roles: string[] } }

/**
 * Get dashboard summary
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
router.get(
    `${OrderRoutePath}${PathParam.EXTERNAL_SYSTEM_ID}/summary`, allowedForExternalSystemRoleOnly, validateHeader, (
        req: Request, res: Response, next: NextFunction): void => {
        (async () => {
            const pathParam = req.params as { [key: string]: string };
            const claims = (req as CustomRequest).claims;
            Logging.log(buildInfoMessageRouteHit(req.path, `Loading summaries : user id: ${claims?.id}`), LogType.INFO);
            if (pathParam.externalSystemId !== claims?.id) {
                res.sendStatus(HTTPUserError.UNAUTHORIZED_CODE);
                return;
            }
            const info = await prepareRetailerDashboardSummary(claims?.id);
            Logging.log(
                buildInfoMessageUserProcessCompleted(
                    'Summaries successfully loaded', `user id: ${claims?.id}`
                ), LogType.INFO
            );
            res.send({ data: info });
        })().catch(error => {
            const err = error as Error;
            Logging.log(buildErrorMessage(err, OrderRoutePath), LogType.ERROR);
            next(error);
        });
    });

/**
 * Add new order
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
router.post(OrderRoutePath, allowedForClientRoleOnly, validateHeader, validateCreateOrder, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        const order = req.body as IOrder;
        Logging.log(buildInfoMessageRouteHit(req.path, `User ID: ${order?.uid}`), LogType.INFO);
        await createOrder(order);
        Logging.log(buildInfoMessageUserProcessCompleted('Order insertion', `user id: ${order?.uid}` ), LogType.INFO);
        res.sendStatus(HTTPSuccess.CREATED_CODE);
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, OrderRoutePath), LogType.ERROR);
        next(error);
    });
});

/**
 * Get order by user id
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
// eslint-disable-next-line max-len
router.get(`${OrderRoutePath}${RoutePath.ORDER_BY_USER_ID}`, allowedForClientRoleOnly, validateHeader, validateParamUserId, (
    req: express.Request<core.ParamsDictionary, any, any, { userId: string }>,
    res: Response, next: NextFunction
): void => {
    (async () => {
        const userId = req.query.userId;
        const orderDetail: IOrderDTO = await retrieveOrderDetailsByUserId(userId);
        res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(orderDetail));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, OrderRoutePath), LogType.ERROR);
        next(error);
    });
});

/**
 * Get order by order id
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
// eslint-disable-next-line max-len
router.get(`${OrderRoutePath}${RoutePath.ORDER_BY_ORDER_ID}${PathParam.ORDER_ID}`, allowedForClientRoleAndSuperAdminAndAdminOnly, validateHeader, (
    req: express.Request<core.ParamsDictionary, any, any, { branchId: string }>,
    res: Response, next: NextFunction
): void => {
    (async () => {
        // Point:BranchId = StoreId
        const storeId = req.query.branchId;
        const orderId = req.params.orderId;
        const orderDetail: IOrderDTO = await retrieveOrderDetailsByOrderId(storeId, orderId);
        res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(orderDetail));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, OrderRoutePath), LogType.ERROR);
        next(error);
    });
});

/**
 * Order patch route
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
const validationsPatch = [allowedForClientRoleOnly, validateHeader
    , validateParamUserId, validateOrderPatchRequestBody];
router.patch(RoutePath.ORDERS + PathParam.USER_ID, validationsPatch, (
    req: Request, res: Response, next: NextFunction): void => {
    const pathParamUserId = req.params.userId;
    const patchOrder = req.body as IPatchOrder;
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, `uid: ${pathParamUserId}`), LogType.INFO);
        await patchOrderDetailsByUserId(pathParamUserId, patchOrder);
        Logging.log(buildInfoMessageUserProcessCompleted('Patch order', pathParamUserId), LogType.INFO);
        return res.sendStatus(HTTPSuccess.NO_CONTENT_CODE);
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, `Patch order for uid: ${pathParamUserId}`), LogType.ERROR);
        next(error);
    });
});

/**
 * Order pagination route
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
router.get(`${RoutePath.ORDERS}${RoutePath.ORDER_BY_PAGINATION}`, validateHeader, validateOrderDetailsPagination, (
    req: express.Request<core.ParamsDictionary, any, any,
     { page: string, pageLimit: string, storeId: string, isCompleted: string }>
    , res: Response, next: NextFunction): void => {
    const roles = (req as AppRequest).claims?.roles.join(',');
    (async () => {
        const page = parseInt(req.query.page);
        const pageLimit = parseInt(req.query.pageLimit);
        const storeId = req.query.storeId;
        // eslint-disable-next-line no-nested-ternary
        const status = req.query.isCompleted === 'true' ? true : 
            req.query.isCompleted === 'false' ? false : undefined;
        const data = await getOrderDetailsWithPagination(page, pageLimit, roles as string, storeId, status);
        res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(data));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, `Get orders uid: ${roles as string}`), LogType.ERROR);
        next(error);
    });

});

/**
 * Delete order route
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
router.delete(`${RoutePath.ORDERS}${PathParam.ORDER_ID}`, validateHeader, allowedForSuperRoleOnly, (
    req: express.Request<core.ParamsDictionary, any, any,
     { page: string, pageLimit: string, storeId: string, isCompleted: string }>
    , res: Response, next: NextFunction): void => {
    const roles = (req as AppRequest).claims?.roles.join(',');
    (async () => {
        const pathParam = req.params as { [key: string]: string };
        const orderId = pathParam?.orderId;
        await deleteOrderByIdGiven(orderId);
        res.sendStatus(HTTPSuccess.NO_CONTENT_CODE);
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, `Get orders uid: ${roles as string}`), LogType.ERROR);
        next(error);
    });

});

export default router;
