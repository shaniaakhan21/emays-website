'use strict';

import { LaunchUIContext } from './ILaunchContext';

export interface IOrderContext {
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
    orderItems: Array<LaunchUIContext>
}
