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
    branchId: string,
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
    isPrepared?: boolean,
    preparedDate?: Date,
    deliveredDate?: Date,
    canceledDate?: Date,
    deliveryInfo: string,
    orderItems: Array<Order>,
    createdAt?: Date,
    isDelivered?: boolean,
    isDriverPicked?: boolean,
    driverPickDate?: Date,
    isCanceled?: boolean,
    history?: Array<Date>,
    paymentRef?: string,
    serviceFee: number,
    payedDate?: Date
}
export interface IOrderDTO {
    _id?: ObjectId,
    email?: string,
    payed?: boolean,
    terminalPayment?: boolean,
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
    isDriverPicked?: boolean,
    isCanceled?: boolean,
    paymentRef?: string
    terminalPaymentRef?: string,
    serviceFee: number
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
    isPrepared?: boolean,
    preparedDate?: Date,
    deliveredDate?: Date,
    canceledDate?: Date,
    deliveryInfo?: string,
    createdAt?: Date,
    isDelivered?: boolean,
    isDriverPicked?: boolean,
    driverPickDate?: Date,
    isCanceled?: boolean,
    history?: Array<Date>,
    paymentRef?: string,
    serviceFee?: number,
    payedDate?: Date
}

export interface IOrderPaginationDTO {
    pages?: Array<IOrderDTO>,
    next?: NextPageInfo,
    previous?: PreviousPageInfo,
    allPagesAvailable?: number
}

export interface NextPageInfo {
    page: number, limit: number
}

export interface PreviousPageInfo {
    page: number, limit: number
}
