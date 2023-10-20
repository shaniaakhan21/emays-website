'use strict';

const date = new Date();

export enum TimePeriod {
    LAST_MONTH = new Date().setMonth(date.getMonth() - 1),
    LAST_THREE_MONTH = new Date().setMonth(date.getMonth() - 3),
    LAST_YEAR = new Date().setMonth(date.getMonth() - 12)
}

