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
import { checkout, CheckoutResponse } from '../service/sumupService';
import { calculateServiceFee, retrieveOrderDetailsByUserId } from '../service/orderService';

const Logging = Logger(__filename);

/**
 * Generate sumUp checkout info using user ID
 * @param uuid: string User ID
 * @returns Promise<CheckoutResponse> SumUp checkout response
 */
export const buildSnapCheckoutPath = async (uuid: string): Promise<CheckoutResponse> => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Generate sumup checkout info', `User Id: ${uuid}`), LogType.INFO);
        const order = await retrieveOrderDetailsByUserId(uuid);
        if (!order) {
            throw new ServiceError(
                ErrorType.ORDER_SERVICE_ERROR, 'Order not found', new Error().stack!, HTTPUserError.NOT_FOUND_CODE
            );
        }
        Logging.log(buildInfoMessageUserProcessCompleted(
            'Generate sumUp checkout info', `Order Id: ${order._id!.toString()!}`), LogType.INFO);
        return checkout({
            // eslint-disable-next-line camelcase
            checkout_reference: order._id!.toString()!,
            amount: calculateServiceFee(order),
            currency: 'EUR',
            // eslint-disable-next-line camelcase
            merchant_code: config.SUMUP.MERCHANT_CODE
        });
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Generate sumUp checkout info'), LogType.ERROR);
        throw error;
    }
};
