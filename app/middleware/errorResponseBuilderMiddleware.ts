'use strict';

import ErrorType from '../const/errorType';
import { HTTPServerError } from '../const/httpCode';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { SendErrorResponseFunc } from '../type/errorBuilderMiddlewareType';
import { ErrorResponseBuilderResponse } from '../type/responseBuilderType';
import { buildErrorMessage } from '../util/logMessageBuilder';
import { errorResponseBuilder } from '../util/responseBuilder';

const Logging = Logger(__filename);

/**
 * Build error response and send
 * @param {OrderServiceError} error OrderService error object
 * @param {Response} res Response object
 * @returns {void}
 */
const sendErrorResponse: SendErrorResponseFunc = (error, res) => {
    const finalErrorObject: ErrorResponseBuilderResponse = 
        errorResponseBuilder(error);
    switch (error.name) {
        case ErrorType.DATABASE_ERROR:
        case ErrorType.ORDER_SERVICE_ERROR:
        case ErrorType.ORDER_INSERTION_ERROR:
        case ErrorType.ORDER_UPDATE_ERROR:
        case ErrorType.ORDER_RETRIEVAL_ERROR:
        case ErrorType.DATA_CONFLICT:
        case ErrorType.INVALID_REQUEST:
        case ErrorType.UNAUTHORIZED:
        case ErrorType.FOUND_AT_THIS_URL:
            return res.status(error.code).json(finalErrorObject);
        default:
            Logging.log(buildErrorMessage(error, ''), LogType.ERROR);
            return res.status(HTTPServerError.INTERNAL_SERVER_ERROR_CODE).
                json(HTTPServerError.INTERNAL_SERVER_ERROR_MESSAGE);
    }
};

export default sendErrorResponse;
