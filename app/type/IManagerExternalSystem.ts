'use strict';

export interface IManagerExternalSystem {
    managerFirstName: string,
    managerLastName: string,
    managerPhone: string,
    managerUsername: string,
    managerPassword: string,
    managerEmail: string,
    externalSystemId: string
}

export interface IManagerExternalSystemDTO {
    managerFirstName: string,
    managerLastName: string,
    managerEmail: string,
    managerPhone: string,
    externalSystemId: string
}

export interface IManagerExternalSystemLogin {
    managerUsername: string,
    managerPassword: string
}

