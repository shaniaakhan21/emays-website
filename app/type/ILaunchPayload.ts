'use strict';

export interface ILaunchPayload {

    token: string | null,
    productList: string | null,
    launchType: LaunchType,
    userData: string | null

}

export enum LaunchType {
    CUSTOMER_UI = 'customerUI',
    RETAILER_UI = 'uiRetailer',
    EMAIL_BOOKED = 'emailBooked',
    PRODUCT_LAUNCH = 'productLaunch'
}