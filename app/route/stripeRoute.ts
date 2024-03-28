/* eslint-disable max-lines */
'use strict';

import * as express from 'express';
const router = express.Router();

import { PathParam, RoutePath } from '../const/routePath';
import { buildErrorMessage } from '../util/logMessageBuilder';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import * as core from 'express-serve-static-core';
import {
    buildAccountLinkPath,
    buildCheckoutPath,
    buildCompleteCheckoutPath,
    createStripeLocation, createStripeReader,
    handleStripeWebhookEvent, listStripeLocations, listStripeReaders,
    discoverReader,
    checkPaymentIntentStatus,
    terminalPaymentComplete,
    createTerminalPaymentIntent
} from '../api/stripeAPI';
import Stripe from 'stripe';
import {
    createReader,
    getStripeAccountInfo,
    initiateOrderTerminalPayment,
    processTerminalOrder,
    showTerminalOrderInfo, simulateTerminalOrderPaymentFailure, simulateTerminalOrderPaymentSuccess
} from '../util/stripe';
import { allowedForDriverAndClientRoleOnly, allowedForDriverRoleOnly,
    validateCheckoutCompleteParams, validateCheckoutParams,
    validateCreatePaymentParams,
    validateHeader } from '../middleware/paramValidationMiddleware';
import { ICreateOrderRequestBody } from '../type/paymentRequestTypes';
import { CurrencyType } from '../const/currencyType';

const Logging = Logger(__filename);

router.get(`${RoutePath.STRIPE}/accounts${PathParam.STRIPE_ID}`, (
    req: express.Request, res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const stripeId = req.params.stripeId;
        const data = await getStripeAccountInfo(stripeId);
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe Checkout'), LogType.ERROR);
        next(error);
    });
});

router.get(`${RoutePath.STRIPE}/linkAccount`, (
    req: express.Request<core.ParamsDictionary, any, any, { uuid: string }>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        // Todo: Validate JWT

        const data = await buildAccountLinkPath();

        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe Checkout'), LogType.ERROR);
        next(error);
    });
});

/**
 * Discover Stripe readers
 */
const validationDiscover = [validateHeader, allowedForDriverRoleOnly];
router.get(`${RoutePath.STRIPE}/discoverReader`, [...validationDiscover], (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const data = await discoverReader();
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe Checkout'), LogType.ERROR);
        next(error);
    });
});

/**
 * Stripe payment initialization
 */
const validationsCheckout = [validateHeader, allowedForDriverAndClientRoleOnly, validateCheckoutParams];
router.get(`${RoutePath.STRIPE}/checkout`, [...validationsCheckout], (
    req: express.Request<core.ParamsDictionary, any, any, { uuid: string, serviceFee: number }>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const data = await buildCheckoutPath(req.query.uuid, req.query.serviceFee);
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe Checkout'), LogType.ERROR);
        next(error);
    });
});

/**
 * Stripe payment complete
 */
const validateCheckoutComplete = [validateHeader, allowedForDriverAndClientRoleOnly, validateCheckoutCompleteParams];
router.get(`${RoutePath.STRIPE}/checkout/complete`, [...validateCheckoutComplete], (
    req: express.Request<core.ParamsDictionary, any, any, {
        // eslint-disable-next-line camelcase
        payment_intent_client_secret: string,
        userId: string,
        // eslint-disable-next-line camelcase
        payment_intent: string,
        // eslint-disable-next-line camelcase
        redirect_status: string,
        serviceFee: number
    }>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        await buildCompleteCheckoutPath(req.query.payment_intent, req.query.userId, req.query.serviceFee);
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
        const stripeReader = await createStripeReader(req.body);
        res.json({ stripeReader });
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

/**
 * Create the POS machine payment
 */
const validateCreateOrderPayment = [validateHeader, allowedForDriverRoleOnly, validateCreatePaymentParams];
router.post(`${RoutePath.STRIPE}/terminal/createOrderPayment`, [...validateCreateOrderPayment], (
    req: express.Request<core.ParamsDictionary, any, { orderId: string, storeId: string,
        orderAmount: number, currencyType: CurrencyType }, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const requestBody = req.body as ICreateOrderRequestBody;
        const data = await createTerminalPaymentIntent(requestBody);
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe terminal reader create'), LogType.ERROR);
        next(error);
    });
});

router.post(`${RoutePath.STRIPE}/terminal/showOrderPayment`, (
    req: express.Request<core.ParamsDictionary, any, { orderId: string, terminalId: string, storeId: string}, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const data = await showTerminalOrderInfo(req.body.terminalId, req.body.orderId, req.body.storeId);
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe terminal reader create'), LogType.ERROR);
        next(error);
    });
});

router.post(`${RoutePath.STRIPE}/terminal/processOrderPayment`, (
    req: express.Request<core.ParamsDictionary, any, { orderId: string, terminalId: string, storeId: string }, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const data = await processTerminalOrder(req.body.terminalId, req.body.orderId, req.body.storeId);
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe terminal reader create'), LogType.ERROR);
        next(error);
    });
});

router.post(`${RoutePath.STRIPE}/terminal/test/success`, (
    req: express.Request<core.ParamsDictionary, any, { terminalId: string }, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const data = await simulateTerminalOrderPaymentSuccess(req.body.terminalId);
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe terminal reader create'), LogType.ERROR);
        next(error);
    });
});

router.post(`${RoutePath.STRIPE}/terminal/test/error`, (
    req: express.Request<core.ParamsDictionary, any, { terminalId: string }, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const data = await simulateTerminalOrderPaymentFailure(req.body.terminalId);
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe terminal reader create'), LogType.ERROR);
        next(error);
    });
});

router.post(`${RoutePath.STRIPE}/check_paymentIntent_status`, (
    req: express.Request<core.ParamsDictionary, any, { paymentIntentId: string }, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const data = await checkPaymentIntentStatus(req.body.paymentIntentId);
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'stripe terminal reader create'), LogType.ERROR);
        next(error);
    });
});

router.post(`${RoutePath.STRIPE}/terminalPaymentComplete`, (
    // eslint-disable-next-line max-len
    req: express.Request<core.ParamsDictionary, any, { orderId: string, storeId: string, finalSelection: any [] }, any>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        const data = await terminalPaymentComplete(req.body.orderId, req.body.storeId, req.body.finalSelection);
        res.json({ data });
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'set terminal payment complete'), LogType.ERROR);
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
