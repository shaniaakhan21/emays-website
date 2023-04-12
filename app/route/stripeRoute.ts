'use strict';
/* eslint camelcase: 0 */

import * as express from 'express';
const router = express.Router();

import { RoutePath } from '../const/routePath';
import { buildErrorMessage } from '../util/logMessageBuilder';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import * as core from 'express-serve-static-core';
import { buildCheckoutPath, buildCompleteCheckoutPath } from '../api/stripeAPI';

const Logging = Logger(__filename);

router.get(`${RoutePath.STRIPE}/checkout`, (
    req: express.Request<core.ParamsDictionary, any, any, { uuid: string }>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        // Todo: Validate JWT

        const data = await buildCheckoutPath(req.query.uuid);

        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe Checkout'), LogType.ERROR);
        next(error);
    });
});

router.get(`${RoutePath.STRIPE}/checkout/complete`, (
    req: express.Request<core.ParamsDictionary, any, any, {
        payment_intent_client_secret: string,
        userId: string,
        payment_intent: string,
        redirect_status: string
    }>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        // Todo: Validate JWT
        console.log('req.query', req.query);
        const data = await buildCompleteCheckoutPath(req.query.payment_intent, req.query.userId);

        res.json('ORDER COMPLETED');
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe Checkout'), LogType.ERROR);
        next(error);
    });
});

export default router;
