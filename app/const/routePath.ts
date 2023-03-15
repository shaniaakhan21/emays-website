'use strict';

export enum RoutePath {
    HEALTH = '/health',
    CALENDER_ACCESS = '/googleCalender',
    CALENDER_REDIRECTION = '/redirectGoogleAccess', 
    LAUNCH = '/launch',
    LAUNCH_MAIL = '/launchMail',
    DEV_LAUNCH = '/devLaunch',
    ORDERS= '/orders',
    CUSTOMER_UI = '/',
    USERS = '/users',
    RETAILER_UI= '/retailer'
}

export enum PathParam {
    USER_ID = '/:userId'
}
