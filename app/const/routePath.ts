'use strict';

export enum RoutePath {
    HEALTH = '/health',
    LAUNCH = '/launch',
    LAUNCH_MAIL = '/launchMail',
    DEV_LAUNCH = '/devLaunch',
    ORDERS= '/orders',
    CUSTOMER_UI = '/customer'
    USERS = '/users',
    RETAILER_UI= '/retailer'
}

export enum PathParam {
    USER_ID = '/:userId'
}
