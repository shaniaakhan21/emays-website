'use strict';

import { ObjectId } from 'mongoose';

export interface IOrder {
    _id?: ObjectId,
    payed?: boolean,
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
    address: {
        // Street
        addOne: string,
        // Portal number
        addTwo: string,
        // Apartment, suit
        addThree: string,
        // City
        addFour: string,
        // Country
        addFive: string,
        // Post code
        addSix: string
    },
    deliveryInfo: string,
    orderItems: Array<Order>,
    createdAt?: Date,
    isDelivered?: boolean,
    isDriverPicked?: boolean
    history?: Array<Date>,
    paymentRef?: string
}
export interface IOrderDTO {
    _id?: ObjectId,
    email?: string,
    payed?: boolean,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    retailerEmail: string,
    date?: Date,
    uid?:string,
    startTime?: string,
    endTime?: string,
    timeZone?: string,
    experience?: string,
    address?: {
        // Street
        addOne: string,
        // Portal number
        addTwo: string,
        // Apartment, suit
        addThree: string,
        // City
        addFour: string,
        // Country
        addFive: string,
        // Post code
        addSix: string
    },
    deliveryInfo: string,
    orderItems: Array<Order>,
    createdAt?: Date,
    history?: Array<Date>,
    isDelivered?: boolean,
    isDriverPicked?: boolean
    paymentRef?: string
}

export interface Order {
    productName: string,
    productColor: string,
    productSize: string,
    productQuantity: number,
    productCost: string,
    productImage: string,
    productDeliveryInformation: string
}

export interface IPatchOrder {
    payed?: boolean,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    date?: Date,
    startTime?: string,
    endTime?: string,
    timeZone?: string,
    experience?: string,
    address?: {
        // Street
        addOne: string,
        // Portal number
        addTwo: string,
        // Apartment, suit
        addThree: string,
        // City
        addFour: string,
        // Country
        addFive: string,
        // Post code
        addSix: string
    },
    createdAt?: Date,
    history?: Array<Date>,
    paymentRef?: string
}
