'use strict';

export interface IExternalSystem {
    extSysName: string,
    extSysUsername: string,
    extSysPassword: string,
    extSysEmail: string
}

export interface IExternalSystemDTO {
    extSysName: string,
    extSysEmail: string
}

export interface IExternalSystemLogin {
    extSysUsername: string,
    extSysPassword: string
}
