'use strict';

import * as express from 'express';
import { HTTPServerError } from '../const/httpCode';
import OrderError from '../error/OrderError';
import ErrorType from '../error/type/errorType';
import Logger from '../logger';

/**
 * Build the error response in a meaningful way and send it to the UI based on different Error Types
 * @param err Error 
 * @param res express.Response
 * @returns res express.Response
 */
export const buildErrorResponseAndSend = (error: Error, res: express.Response) => {
    const errorTransformed = error as OrderError;
    const errorData = {
        error: error.message
    };
    switch (error.name) {
        case ErrorType.ORDER_INVALID_REQUEST:
            return res.status(errorTransformed.code).json(errorData);
            // TODO; send the error with res.send
        default:
            Logger.error(`Application error observed. Error Stack: ${errorTransformed.stack}`);
            return res.status(HTTPServerError.INTERNAL_SERVER_ERROR_CODE).
                json(HTTPServerError.INTERNAL_SERVER_ERROR_MESSAGE);
    }
};
