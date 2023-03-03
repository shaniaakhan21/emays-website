'use strict';

export enum ErrorInfo {

    // Error types
    APP_ERROR = 'Application error',
    URL_BUILDER_ERROR = 'Can not build the requested URL error',
    // Param validation errors
    USER_EMAIL_REQUIRED = 'Please provide a valid email',
    ORDER_DATE_REQUIRED = 'Please provide a valid date',
    ORDER_TIME_START_REQUIRED = 'Please provide a valid start time',
    ORDER_TIME_END_REQUIRED = 'Please provide a valid end time',
    EXPERIENCE_REQUIRED = 'Please provide an experience',
    ADDRESS_REQUIRED = 'Please provide a valid address',
    CONTENT_TYPE_REQUIRED = 'Please provide a valid content-type',
    // Common Error
    USER_ACCESS_TOKEN_INVALID_MESSAGE = 'Access token validation failed'
}
