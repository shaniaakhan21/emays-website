'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { buildErrorMessage, buildInfoMessageRouteHit, buildInfoMessageUserProcessCompleted }
    from '../util/logMessageBuilder';
import { PathParam, RoutePath } from '../const/routePath';
import { HTTPSuccess } from '../const/httpCode';
import { IOrder, IOrderDTO } from '../type/orderType';
import { successResponseBuilder } from '../util/responseBuilder';
import { validateCreateOrder, validateHeader, validateParamUserId } from '../middleware/paramValidationMiddleware';
import { createOrder, retrieveOrderDetailsByUserId } from '../service/orderService';

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
router.post(OrderRoutePath, validateHeader, validateCreateOrder, (
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
router.get(`${OrderRoutePath}${RoutePath.USERS}${PathParam.USER_ID}`, validateHeader, validateParamUserId, (
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

export default router;
