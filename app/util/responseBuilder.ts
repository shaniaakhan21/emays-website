'use strict';

import { IOrderDTO } from '../type/orderType';
import { ErrorResponseBuilderFunc, SuccessResponseBuilderFunc } from '../type/responseBuilderType';

/**
 * Generate error response
 * @param {OrderServiceError} error Error object
 * @returns {ErrorResponseBuilderResponse} Error response
 */
export const errorResponseBuilder: ErrorResponseBuilderFunc = (error) => {
    return { error: error.message };
};

/**
 * Generate success response data
 * @param {object} data Built response
 * @returns {SuccessResponseBuilderResponse} Success response
 */
export const successResponseBuilder: SuccessResponseBuilderFunc<IOrderDTO | 
    {token: string} > = (data) => {
        return { data: data };
    };
