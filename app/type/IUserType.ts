'use strict';

import { ObjectId } from 'mongoose';

export interface IUser {
    _id?: ObjectId,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string, 
    retailerEmail: string,
    date: Date,
    uid: string,
    startTime: string,
    endTime: string,
    timeZone: string,
    experience: string,
    address: UserAddress,
    deliveryInfo: string,
    serviceFee: number
}

export interface UserAddress {
    addOne: string,
    addTwo: string,
    addThree: string,
    addFour: string,
    addFive: string,
    addSix: string
}
