'use strict';

import { DATA_CONFLICT_MESSAGE } from '../const/errorMessage';
import ErrorType from '../const/errorType';
import { HTTPServerError, HTTPUserError } from '../const/httpCode';
import ServiceError from '../type/error/ServiceError';
import { ServiceErrorBuilderFunc, ValidatorErrorBuilderFunc } from '../type/orderServiceType';

/**
 * Build and throws custom errors based on the passed error
 * @param {string} error Error message
 * @throws {OrderDataErr} Built error
 */
export const serviceErrorBuilder: ServiceErrorBuilderFunc = (claimData) => {
    if (claimData) {
        if (claimData.includes('E11000')) {
            throw new ServiceError(
                ErrorType.DATA_CONFLICT, DATA_CONFLICT_MESSAGE, '', HTTPUserError.CONFLICT_ERROR_CODE);
        }
    }
};

/**
 * Build and return validator error
 * @param {Error} error Error object
 * @param {string} errorMessage Error message suppose to pass
 * @returns {OrderServiceError} Built error
 */
export const validatorErrorBuilder: ValidatorErrorBuilderFunc = (error, message) => {
    if (error && message) {
        return new ServiceError(ErrorType.
            INVALID_REQUEST, message, error.message, HTTPUserError.
            BAD_REQUEST_CODE);
    }
    return new ServiceError(ErrorType.ORDER_SERVICE_ERROR, message, '', HTTPServerError.
        INTERNAL_SERVER_ERROR_CODE);
};

