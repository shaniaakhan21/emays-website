
'use strict';

import { Order } from './orderType';

export interface ISendEmailInfo {
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    urlLogo: string,
    statusImage: string,
    trustpilotImage: string,
    exclamationImage: string,
    facebookLink: string,
    instagramLink: string,
    twitterLink: string,
    facebookImage: string,
    instagramImage: string,
    twitterImage: string,
    emaysContactUsLink: string,
    redirectionURL: string,
    bookCalenderURL: string,
    editOrderURL: string,
    date: Date,
    uid: string,
    startTime: string,
    endTime: string,
    experience: string,
    finalCost?: number,
    address: {
        addOne: string,
        addTwo: string,
        addThree: string,
        addFour: string
    },
    orderItems: Array<Order>
}

export interface ISendEmailReminderToCustomerOnTheDeliveryDay {
    firstName: string,
    email: string,
    date: Date,
    urlLogo: string,
    startTime: string,
    endTime: string,
    statusImage: string,
    orderItems: Array<Order>,
    exclamationImage: string,
    facebookLink: string,
    instagramLink: string,
    twitterLink: string,
    facebookImage: string,
    instagramImage: string,
    twitterImage: string,
    emaysContactUsLink: string
}

export interface ISendEmailReminderToRetailerBeforeDriverPick {
    retailerEmail: string,
    date: Date,
    urlLogo: string,
    startTime: string,
    endTime: string,
    orderItems: Array<Order>,
    finalCost: number,
    uid: string,
    facebookLink: string,
    instagramLink: string,
    twitterLink: string,
    facebookImage: string,
    instagramImage: string,
    twitterImage: string,
    emaysContactUsLink: string
}

export interface ISendEmailForAppointmentCancellation {
    email: string,
    firstName: string,
    lastName: string,
    experience: string,
    address: {
        addOne: string,
        addTwo: string,
        addThree: string,
        addFour: string
    },
    orderItems: Array<Order>,
    finalCost: number,
    facebookLink: string,
    instagramLink: string,
    twitterLink: string,
    facebookImage: string,
    instagramImage: string,
    twitterImage: string,
    emaysContactUsLink: string,
    trustpilotImage: string
}
