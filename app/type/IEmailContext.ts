
'use strict';

import { Order } from './orderType';

export interface ISendEmailInfo {
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
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
