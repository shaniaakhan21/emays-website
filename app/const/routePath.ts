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
    RETAILER_UI = '/retailer',
    EXTERNAL_SYSTEMS = '/externalSystems',
    EXTERNAL_SYSTEM_TOKEN = '/systemToken',
    SUMUP = '/sumUp',
    GEO = '/geo',
    APP_INFO = '/appInfo',
    EMAIL_REMINDERS = '/emailReminders'
 }

export enum PathParam {
    USER_ID = '/:userId',
    AREA_NAME = '/:area',
    AREA_LATITUDE = '/:lat',
    AREA_LONGITUDE = '/:long'
}
