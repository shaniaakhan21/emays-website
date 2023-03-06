'use strict';

import OrderServiceError from './error/ServiceError';

export interface ErrorResponseBuilderResponse {
    error: string
}
export type ErrorResponseBuilderFunc = 
    (arg0: OrderServiceError) => ErrorResponseBuilderResponse;

export type SuccessResponseBuilderFunc<T> =
    (arg0: T | Array<T>) => {data: T | Array<T>}

