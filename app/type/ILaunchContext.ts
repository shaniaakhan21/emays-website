'use strict';

export interface DevLaunchTemplateData {
    environment: string
}

export interface LaunchRequest {
    productName: string,
    productColor: string,
    productSize: number,
    productQuantity: number,
    productCost: string,
    productImage: string,
    productDeliveryInformation: string,
    area: string 
}

export interface LaunchRequestBody {
    products: string
}

export interface LaunchRequestConverted {
    products: Array<LaunchRequest>
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
