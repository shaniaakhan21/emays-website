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
import {
    checkout,
    CheckoutResponse,
    processCheckout,
    ProcessCheckoutRequest,
    ProcessCheckoutResponse200, ProcessCheckoutResponse202
} from '../service/sumupService';
import { calculateServiceFee, retrieveOrderDetailsByUserId } from '../service/orderService';

const Logging = Logger(__filename);

/**
 * Generate sumUp checkout info using user ID
 * @param uuid: string User ID
 * @returns Promise<CheckoutResponse> SumUp checkout response
 */
export const buildCheckoutPath = async (uuid: string): Promise<CheckoutResponse> => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Generate sumup checkout info', `User Id: ${uuid}`), LogType.INFO);
        const order = await retrieveOrderDetailsByUserId(uuid);

        if (!order) {
            throw new ServiceError(
                ErrorType.ORDER_SERVICE_ERROR, 'Order not found', new Error().stack!, HTTPUserError.NOT_FOUND_CODE
            );
        }

        // Todo: Check if the order status is still valid

        Logging.log(buildInfoMessageUserProcessCompleted(
            'Generate sumUp checkout info', `Order Id: ${order._id!.toString()!}`), LogType.INFO);
        return checkout({
            // eslint-disable-next-line camelcase
            checkout_reference: order._id!.toString()!,
            amount: calculateServiceFee(order),
            currency: 'EUR',
            // eslint-disable-next-line camelcase
            merchant_code: config.SUMUP.MERCHANT_CODE,
            // eslint-disable-next-line camelcase
            pay_to_email: order?.email ?? ''
        });
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Generate sumUp checkout info'), LogType.ERROR);
        throw error;
    }
};

/**
 * Complete sumUp checkout
 * @param checkoutId: string Checkout ID
 * @returns Promise<CheckoutResponse> SumUp checkout response
 */
export const buildCompleteCheckoutPath = async (checkoutId: string, data: Pick<ProcessCheckoutRequest, 'card'>): Promise<ProcessCheckoutResponse200 | ProcessCheckoutResponse202> => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Complete sumup checkout', `checkoutId: ${checkoutId}`), LogType.INFO);

        /*
         * Todo: Retrieve checkout info from SumUp and check if the checkout is still valid
         * Todo: Using checkout_reference to retrieve order details from DB and check if the order status is still valid
         */

        return await processCheckout(checkoutId, {
            // eslint-disable-next-line camelcase
            payment_type: 'card',
            card: data.card
        });

        // Todo: Update order status to 'PAID'
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Generate sumUp checkout info'), LogType.ERROR);
        throw error;
    }
};
