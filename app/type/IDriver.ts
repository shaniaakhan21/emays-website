'use strict';

export interface IDriver {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address: {
        city: string,
        country: string,
        zipCode: string
    },
    license: {
        licenseNumber: string,
        carModel: string,
        carPlate: string,
        licenseDoc: object
    }
    billing: {
        address: string,
        email:string,
        bankName: string,
        accountNumber: string,
        swiftNumber: string,
        paymentCurrency: string,
        country: string
    },
    driverUsername: string,
    driverPassword: string,
    driverEmail: string,
    dutyAreas?: Array<string>
}

export interface IDriverDTO {
    id?: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address: {
        city: string,
        country: string,
        zipCode: string
    },
    license: {
        licenseNumber: string,
        carModel: string
    }
    billing: {
        address: string,
        email:string,
        bankName: string,
        accountNumber: string,
        swiftNumber: string,
        country: string
    },
    driverUsername?: string,
    driverPassword?: string,
    driverEmail?: string,
    dutyAreas?: Array<string>
}
