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
    PATCH_ORDER = '/patch/orders',
    ORDER_BY_USER_ID = '/byUserId',
    ORDER_BY_ORDER_ID = '/byOrderId',
    ORDER_BY_PAGINATION = '/pagination',
    CUSTOMER_UI = '/',
    USERS = '/users',
    RETAILER_UI = '/retailer',
    EXTERNAL_SYSTEMS = '/externalSystems',
    EXTERNAL_SYSTEMS_STORES = '/stores',
    EXTERNAL_SYSTEMS_HISTORY_STATS = '/externalSystemsStatsHistory',
    EXTERNAL_SYSTEMS_DELIVERY_ORDER_STATS = '/externalSystemsStatsDeliveryOrder',
    EXTERNAL_SYSTEMS_OVERVIEW_STATS = '/externalSystemsStatsOverview',
    EXTERNAL_SYSTEMS_OVERVIEW = '/externalSystemsStatsOverview',
    EXTERNAL_SYSTEM_TOKEN = '/systemToken',
    EXTERNAL_SYSTEM_INFO = '/systemInfo',
    DRIVERS = '/drivers',
    USERNAME_VALIDITY= '/usernameValidity',
    SUPER_USERS = '/superUsers',
    ADMIN_EXTERNAL_SYSTEM_USERS = '/adminExternalSystem',
    MANAGER_EXTERNAL_SYSTEM_USERS = '/managerExternalSystem',
    LOGIN = '/login',
    SUPER_USER_TOKEN = '/superUserToken',
    ADMIN_EXTERNAL_SYSTEM_USER_TOKEN = '/adminExternalSystemToken',
    MANAGER_EXTERNAL_SYSTEM_USER_TOKEN = '/managerExternalSystemToken',
    SUMUP = '/sumUp',
    STRIPE = '/stripe',
    GEO = '/geo',
    APP_INFO = '/appInfo',
    EMAIL_REMINDERS = '/emailReminders',
    LETS_TALK = '/letsTalk',
    FAQ = '/faq',
    ZIP_CODE_VALIDATION = '/serviceAreas'
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
