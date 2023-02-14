'use strict';

export interface DevLaunchTemplateData {
    environment: string
}

export interface LaunchRequestBody {
    userFirstName: string,
    userAddress: string,
    productQuantity: number,
    productName: string,
    authToken: string
}

export interface LaunchUIContext {
    userFirstName: string,
    userAddress: string,
    productQuantity: number,
    productName: string
}
