'use strict';

export enum PaymentMethod {
    POPUP = 'POPUP',
    CLIENT_HOUSE = 'CLIENT_HOUSE'
}

export interface IExternalSystem {
    extSysName: string,
    extSysUsername: string,
    extSysPassword: string,
    extSysEmail: string,
    paymentMethod: PaymentMethod
}

export interface IExternalSystemDTO {
    extSysName: string,
    extSysEmail: string
}

export interface IExternalSystemLogin {
    extSysUsername: string,
    extSysPassword: string
}
