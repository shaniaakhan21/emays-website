'use strict';

export interface DevLaunchTemplateData {
    environment: string
}

export interface LaunchRequestBody {
    productName: string,
    productColor: string,
    productSize: number,
    productQuantity: number,
    productCost: string,
    productImage: string,
    productDeliveryInformation: string
}

export interface LaunchUIContext {
    productName: string,
    productColor: string,
    productSize: number,
    productQuantity: number,
    productCost: string,
    productImage: string,
    productDeliveryInformation: string
}

export interface DataToRender {
    'productList': string,
    token: string
}
