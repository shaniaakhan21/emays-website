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
    paymentMethod: PaymentMethod,
    extLogo?: Buffer,
    extLogoContentType?: string,
    extSysAddress: {
        // Street
        addOne: string,
        // Portal number
        addTwo: string,
        // City
        addThree: string,
        // Country
        addFour: string,
        // Zip Code
        addFive: string
    },
    fiscalInfo: {
        companyName: string,
        fiscalNumber: string,
        companyPhone: string,
        street: string,
        zip: string,
        city: string,
        country: string
    }
}

export interface IExternalSystemDTO {
    _id?: string,
    extSysName: string,
    extSysEmail: string,
    id: string,
    extLogo?: Buffer,
    extLogoContentType?: string,
    extSysAddress: {
        // Street
        addOne: string,
        // Portal number
        addTwo: string,
        // City
        addThree: string,
        // Country
        addFour: string,
        // Zip Code
        addFive: string
    },
    fiscalInfo: {
        companyName: string,
        fiscalNumber: string,
        companyPhone: string,
        street: string,
        zip: string,
        city: string,
        country: string
    }
}

export interface IExternalSystemLogin {
    extSysUsername: string,
    extSysPassword: string
}
