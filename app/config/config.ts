'use strict';

const {
    NODE_ENV,
    NODE_DOCKER_PORT,
    NODE_LOCAL_PORT,
    ROUTE_PATH,
    JSON_WEB_TOKEN_EXP_HOURS,
    JSON_WEB_TOKEN_SECRET,
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_HOST,
    MONGODB_DOCKER_PORT,
    MONGODB_DATABASE,
    AWS_SES_ACCESS_KEY,
    AWS_SES_SECRET_KEY,
    AWS_REGION,
    AWS_SOURCE_EMAIL,
    CUSTOMER_EMAIL_TEMPLATE
} = process.env;

export const config = {
    APP: 'APP-UI',
    NODE_ENV: NODE_ENV || 'development',
    DEV_ENTRY_POINT: 'testharness.html',
    ROUTE_PATH: ROUTE_PATH || '/api',
    STATIC_FILES_LOCATION: '/app-dist/dist',
    UI_APP_ENTRY_POINT: 'index.html',
    PORT: {
        NODE_DOCKER_PORT: NODE_DOCKER_PORT ?? 8080,
        NODE_LOCAL_PORT: NODE_LOCAL_PORT ?? 8080
    },
    UI_VERSIONS_LOCATION: '/dist',
    JSON_WEB_TOKEN_EXP_HOURS: JSON_WEB_TOKEN_EXP_HOURS || 10,
    JSON_WEB_TOKEN_SECRET: JSON_WEB_TOKEN_SECRET || 'secret123',
    DB: {
        MONGODB_USER: MONGODB_USER || 'root',
        MONGODB_PASSWORD: MONGODB_PASSWORD || '123456',
        MONGODB_HOST: MONGODB_HOST || '172.17.0.2',
        MONGODB_DOCKER_PORT: MONGODB_DOCKER_PORT || 27017,
        MONGODB_DATABASE: MONGODB_DATABASE || 'emays_service_db'
    },
    AWS_SES: {
        AWS_SES_ACCESS_KEY: AWS_SES_ACCESS_KEY || '',
        AWS_SES_SECRET_KEY: AWS_SES_SECRET_KEY || '',
        AWS_REGION: AWS_REGION || '',
        AWS_SOURCE_EMAIL: AWS_SOURCE_EMAIL || ''
    },
    EMAIL_TEMPLATE: {
        CUSTOMER_EMAIL_TEMPLATE: CUSTOMER_EMAIL_TEMPLATE || '/template/temp-customer-email.html'
    }
};
