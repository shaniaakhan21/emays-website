'use strict';

import { ErrorInfo } from '../const/error';
import AppError from './AppError';

export class URLBuilderError extends AppError {
    constructor (message: string, stack: string) {
        super(ErrorInfo.URL_BUILDER_ERROR, message);
        this.name = ErrorInfo.URL_BUILDER_ERROR;
        this.message = message;
        this.stack = stack;
    }
}
