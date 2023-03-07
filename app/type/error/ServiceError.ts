'use strict';

import ErrorType from '../../const/errorType';
import IServiceError from './IServiceError';

class ServiceError extends Error implements IServiceError {
    code: number;

    name: string;

    message: string;

    stack: string;

    constructor (name: ErrorType, message: string, stack: string, code: number) {
        super();
        this.name = name;
        this.message = message;
        this.stack = stack;
        this.code = code;
    }
}

export default ServiceError;
