'use strict';

export enum RoutePath {
    HEALTH = '/health',
    LAUNCH = '/launch',
    LAUNCH_MAIL = '/launchMail',
    DEV_LAUNCH = '/devLaunch',
    ORDERS= '/orders',
    USERS = '/users',
}

export enum PathParam {
    USER_ID = '/:userId'
}
