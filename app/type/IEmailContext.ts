
'use strict';

import { Order } from './orderType';

export interface ISendEmailInfo {
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    urlLogo: string,
    statusImage: string,
    exclamationImage: string,
    facebookLink: string,
    instagramLink: string,
    twitterLink: string,
    facebookImage: string,
    instagramImage: string,
    twitterImage: string,
    emaysContactUsLink: string,
    redirectionURL: string,
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
