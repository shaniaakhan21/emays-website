'use strict';

enum ErrorType {
    APP_ERROR = 'APP ERROR',
    DATABASE_ERROR = 'DATABASE ERROR',
    ORDER_SERVICE_ERROR = 'ORDER SERVICE ERROR',
    ORDER_INSERTION_ERROR = 'ORDER INSERTION ERROR',
    ORDER_UPDATE_ERROR = 'ORDER UPDATE ERROR',
    ORDER_RETRIEVAL_ERROR = 'ORDER RETRIEVAL ERROR',
    DATA_CONFLICT = 'DATA CONFLICT',
    INVALID_REQUEST = 'INVALID REQUEST',
    UNAUTHORIZED = 'UNAUTHORIZE',
    FOUND_AT_THIS_URL = 'FOUND AT THIS URL',
    SYSTEM_RETRIEVAL_ERROR = 'SYSTEM RETRIEVAL ERROR'
}

export default ErrorType;
