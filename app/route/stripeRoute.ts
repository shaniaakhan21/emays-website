'use strict';
/* eslint camelcase: 0 */

import * as express from 'express';
const router = express.Router();

import { RoutePath } from '../const/routePath';
import { buildErrorMessage } from '../util/logMessageBuilder';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import * as core from 'express-serve-static-core';
import {
    buildCheckoutPath,
    buildCompleteCheckoutPath,
    createStripeLocation, createStripeReader,
    handleStripeWebhookEvent, listStripeLocations, listStripeReaders
} from '../api/stripeAPI';
import Stripe from 'stripe';
import {
    createReader,
    initiateOrderTerminalPayment,
    processTerminalOrder,
    showTerminalOrderInfo, simulateTerminalOrderPaymentFailure, simulateTerminalOrderPaymentSuccess
} from '../util/stripe';

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

router.post(`${RoutePath.STRIPE}/terminal/location`, (
    req: express.Request<core.ParamsDictionary, any, Stripe.Terminal.LocationCreateParams, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        await createStripeLocation(req.body);
        res.json('OK');
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe terminal location create'), LogType.ERROR);
        next(error);
    });
});

router.get(`${RoutePath.STRIPE}/terminal/location`, (
    req: express.Request<core.ParamsDictionary, any, any, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const data = await listStripeLocations();
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe terminal location create'), LogType.ERROR);
        next(error);
    });
});

router.post(`${RoutePath.STRIPE}/terminal/reader`, (
    req: express.Request<core.ParamsDictionary, any, Stripe.Terminal.ReaderCreateParams, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        await createStripeReader(req.body);
        res.json('OK');
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe terminal reader create'), LogType.ERROR);
        next(error);
    });
});

router.get(`${RoutePath.STRIPE}/terminal/reader`, (
    req: express.Request<core.ParamsDictionary, any, any, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const data = await listStripeReaders();
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe terminal reader create'), LogType.ERROR);
        next(error);
    });
});

router.post(`${RoutePath.STRIPE}/terminal/createOrderPayment`, (
    req: express.Request<core.ParamsDictionary, any, { uid: string }, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const data = await initiateOrderTerminalPayment(req.body.uid);
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe terminal reader create'), LogType.ERROR);
        next(error);
    });
});

router.post(`${RoutePath.STRIPE}/terminal/showOrderPayment`, (
    req: express.Request<core.ParamsDictionary, any, { uid: string, terminalId: string }, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const data = await showTerminalOrderInfo(req.body.terminalId, req.body.uid);
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe terminal reader create'), LogType.ERROR);
        next(error);
    });
});

router.post(`${RoutePath.STRIPE}/terminal/processOrderPayment`, (
    req: express.Request<core.ParamsDictionary, any, { uid: string, terminalId: string }, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const data = await processTerminalOrder(req.body.terminalId, req.body.uid);
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe terminal reader create'), LogType.ERROR);
        next(error);
    });
});

router.post(`${RoutePath.STRIPE}/terminal/test/success`, (
    req: express.Request<core.ParamsDictionary, any, { paymentId: string }, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const data = await simulateTerminalOrderPaymentSuccess(req.body.paymentId);
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe terminal reader create'), LogType.ERROR);
        next(error);
    });
});

router.post(`${RoutePath.STRIPE}/terminal/test/error`, (
    req: express.Request<core.ParamsDictionary, any, { paymentId: string }, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const data = await simulateTerminalOrderPaymentFailure(req.body.paymentId);
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe terminal reader create'), LogType.ERROR);
        next(error);
    });
});

router.post(`${RoutePath.STRIPE}/webhook`, (
    req: express.Request<core.ParamsDictionary, any, Stripe.Event, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        await handleStripeWebhookEvent(req.body);
        res.json('OK');
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe webhook'), LogType.ERROR);
        next(error);
    });
});

export default router;