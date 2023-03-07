'use strict';

export enum RoutePath {
    HEALTH = '/health',
    LAUNCH = '/launch',
    LAUNCH_MAIL = '/launchMail',
    DEV_LAUNCH = '/devLaunch',
    ORDERS= '/orders',
    USERS = '/users',
    RETAILER_UI= '/retailer'
}

export enum PathParam {
    USER_ID = '/:userId'
}
