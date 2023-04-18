'use strict';

export interface ISuperUser {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string
}

export interface ISuperUserDTO {
    firstName: string,
    lastName: string
    email: string
}

export interface ISuperUserLogin {
    username: string,
    password: string
}
