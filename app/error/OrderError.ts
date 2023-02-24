'use strict';

import ErrorType from './type/errorType';
import IOrderError from './type/IOrderError';

class OrderError extends Error implements IOrderError {
    code: number;

    name: string;

    message: string;

    stack: string;

    constructor (name: ErrorType, message: string, error: Error, code: number) {
        super();
        this.name = name;
        this.message = message;
        this.stack = error.stack as string;
        this.code = code;
    }
}

export default OrderError;
