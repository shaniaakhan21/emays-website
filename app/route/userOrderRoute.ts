'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { buildErrorMessage, buildInfoMessageRouteHit, buildInfoMessageUserProcessCompleted }
    from '../util/logMessageBuilder';
import { PathParam, RoutePath } from '../const/routePath';
import { HTTPSuccess } from '../const/httpCode';
import { IOrder, IOrderDTO, IPatchOrder } from '../type/orderType';
import { successResponseBuilder } from '../util/responseBuilder';
import { allowedForClientRoleOnly, validateCreateOrder, validateHeader
    , validateOrderPatchRequestBody, validateParamUserId } from '../middleware/paramValidationMiddleware';
import { createOrder, patchOrderDetailsByUserId, retrieveOrderDetailsByUserId } from '../service/orderService';

const router = Router();
const Logging = Logger(__filename);

const OrderRoutePath: string = RoutePath.ORDERS;

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
router.get(`${OrderRoutePath}${PathParam.USER_ID}`, allowedForClientRoleOnly, validateHeader, validateParamUserId, (
    req: Request, res: Response, next: NextFunction
): void => {
    (async () => {
        const userId = req.params.userId;
        const orderDetail: IOrderDTO = await retrieveOrderDetailsByUserId(userId);
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
// eslint-disable-next-line max-len
router.patch(RoutePath.ORDERS + PathParam.USER_ID, allowedForClientRoleOnly, validateHeader, validateParamUserId, validateOrderPatchRequestBody, (
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

export default router;
