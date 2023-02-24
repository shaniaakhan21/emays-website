'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import { HTTPSuccess } from '../const/httpCode';
import { RoutePath } from '../const/routePath';
import { validateCreateOrder, validateHeader } from '../middleware/paramValidationMiddleware';
import { validateSession } from '../middleware/sessionValidationMiddleware';
import Logger from '../logger';
import { IOrderContext } from '../type/IOrderContext';
import { saveOrder } from '../api/orderAPI';

const router = Router();

const OrderRouterPath: string = RoutePath.ORDERS;

/**
 * Add new Order
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
router.post(OrderRouterPath, validateHeader, validateCreateOrder, validateSession, (
    req: Request, res: Response, next: NextFunction): void => {
    const requestBody: IOrderContext = req.body as IOrderContext;
    const userEmail: string = requestBody?.userEmail;
    (async () => {
        await saveOrder(userEmail);
        Logger.info(`Order information is being saved for user ${userEmail}.`);
        return res.sendStatus(HTTPSuccess.CREATED_CODE);
    })().catch(error => {
        const errorObject: Error = error as Error;
        Logger.error(`Failed to save the order information.
        Error stack: ${errorObject.stack as string}.`);
        next(error);
    });
});

export default router;
