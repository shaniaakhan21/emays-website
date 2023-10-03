'use strict';

export interface IAdminExternalSystem {
    adminFirstName: string,
    adminLastName: string,
    adminUsername: string,
    adminPassword: string,
    adminEmail: string,
    externalSystemId: string
}

export interface IAdminExternalSystemDTO {
    adminFirstName: string,
    adminLastName: string,
    adminEmail: string,
    externalSystemId: string
}

export interface IAdminExternalSystemLogin {
    adminUsername: string,
    adminPassword: string
}

