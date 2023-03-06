'use strict';

import { ObjectId } from 'mongoose';

export interface IOrder {
    _id?: ObjectId,
    email: string,
    retailerEmail: string,
    date: Date,
    uid: string,
    startTime: string,
    endTime: string,
    experience: string,
    address: {
        addOne: string,
        addTwo: string,
        addThree: string,
        addFour: string
    },
    orderItems: Array<Order> 
}
export interface IOrderDTO {
    _id?: ObjectId,
    email?: string,
    retailerEmail: string,
    date?: Date,
    uid?:string,
    startTime?: string,
    endTime?: string,
    experience?: string,
    address?: {
        addOne: string,
        addTwo: string,
        addThree: string,
        addFour: string
    },
    orderItems: Array<Order> 
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
