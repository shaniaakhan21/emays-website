'use strict';

import { ErrorInfo } from '../const/error';

/**
 * This is the generic error type
 */
class AppError extends Error {
    /**
     * AppError Constructor
     * @param {object} options: { cause: err }
     */

    constructor ( message: string, stack: string) {
        super(ErrorInfo.APP_ERROR);
        this.name = ErrorInfo.APP_ERROR;
        this.message = message;
        this.stack = stack;
    }
}

export default AppError;
