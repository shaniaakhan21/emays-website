'use strict';

import * as path from 'path';
import * as express from 'express';
import { config } from '../config/config';
import LogType from '../const/logType';
import { v4 as uuidv4 } from 'uuid';
import { Roles } from '../const/roles';
import { IJWTBuildData, IJWTClaims, JWT_TYPE } from '../type/IJWTClaims';
import { generateJWT } from '../util/jwtUtil';
import { Logger } from '../log/logger';
import { buildErrorMessage,
    buildInfoMessageMethodCall, buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import { validateJWTToken } from '../middleware/jwtTokenValidationMiddleware';
import { getExternalSystemById } from '../service/externalSystemService';
import ServiceError from '../type/error/ServiceError';
import ErrorType from '../const/errorType';
import { HTTPUserError } from '../const/httpCode';
import { NOT_AUTHORIZED_TO_ACCESS_EMAYS_ERROR_MESSAGE } from '../const/errorMessage';
import { patchOrderDetailsByUserId, retrieveOrderDetailsByUserId } from '../service/orderService';
import { confirmOrderServiceFeePayment, initiateOrderServiceFeePayment } from '../util/stripe';
import Stripe from 'stripe';
import { PatchOrderDetailsByUserIdFunc } from '../type/orderServiceType';
import { IOrderDTO } from '../type/orderType';

const Logging = Logger(__filename);

/**
 * Generate Stripe checkout info using user ID
 * @param uuid: string User ID
 * @returns Promise<CheckoutResponse> Stripe checkout response
 */
export const buildCheckoutPath = async (uuid: string): Promise<Stripe.Response<Stripe.PaymentIntent>> => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Generate stripe checkout info', `User Id: ${uuid}`), LogType.INFO);
        return initiateOrderServiceFeePayment(uuid);
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Generate stripe checkout info'), LogType.ERROR);
        throw error;
    }
};

/**
 * Complete Stripe checkout
 * @param checkoutId: string Checkout ID
 * @returns Promise<CheckoutResponse> Stripe checkout response
 */
export const buildCompleteCheckoutPath = async (checkoutId: string, uid: string): Promise<IOrderDTO> => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Complete Stripe checkout', `checkoutId: ${checkoutId}`), LogType.INFO);

        /*
         * Todo: Retrieve checkout info from Stripe and check if the checkout is still valid
         * Todo: Using checkout_reference to retrieve order details from DB and check if the order status is still valid
         */

        const paymentIntent = await confirmOrderServiceFeePayment(uid);

        if (!paymentIntent) {
            throw new Error('Invalid checkout ID');
        }

        console.log('session', paymentIntent);
        console.log('uid', uid);

        const order = await retrieveOrderDetailsByUserId(uid);

        if (!order) {
            throw new Error('Invalid user ID');
        }

        order.payed = true;

        await patchOrderDetailsByUserId(uid, order);

        return order;

        // Todo: Update order status to 'PAID'
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Generate Stripe checkout info'), LogType.ERROR);
        throw error;
    }
};
