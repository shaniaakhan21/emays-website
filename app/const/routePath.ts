'use strict';

export enum RoutePath {
    HEALTH = '/health',
    CALENDER_ACCESS = '/googleCalender',
    CALENDER_REDIRECTION = '/redirectGoogleAccess',
    LAUNCH = '/launch',
    LAUNCH_ADD = '/launchAdd',
    LAUNCH_UPDATE = '/launchUpdate',
    LAUNCH_MAIL = '/launchMail',
    DEV_LAUNCH = '/devLaunch',
    ORDERS= '/orders',
    ORDER_BY_USER_ID = '/byUserId',
    ORDER_BY_ORDER_ID = '/byOrderId',
    ORDER_BY_PAGINATION = '/pagination',
    CUSTOMER_UI = '/',
    USERS = '/users',
    RETAILER_UI = '/retailer',
    EXTERNAL_SYSTEMS = '/externalSystems',
    EXTERNAL_SYSTEM_TOKEN = '/systemToken',
    EXTERNAL_SYSTEM_INFO = '/systemInfo',
    SUPER_USERS = '/superUsers',
    ADMIN_EXTERNAL_SYSTEM_USERS = '/adminExternalSystem',
    LOGIN = '/login',
    SUPER_USER_TOKEN = '/superUserToken',
    ADMIN_EXTERNAL_SYSTEM_USER_TOKEN = '/adminExternalSystemToken',
    SUMUP = '/sumUp',
    STRIPE = '/stripe',
    GEO = '/geo',
    APP_INFO = '/appInfo',
    EMAIL_REMINDERS = '/emailReminders',
    LETS_TALK = '/letsTalk',
    FAQ = '/faq'
 }

export enum PathParam {
    USER_ID = '/:userId',
    ORDER_ID = '/:orderId',
    STORE_ID = '/:storeId', 
    AREA_NAME = '/:area',
    AREA_LATITUDE = '/:lat',
    AREA_LONGITUDE = '/:long',
    EXTERNAL_SYSTEM_ID = '/:externalSystemId'
}
