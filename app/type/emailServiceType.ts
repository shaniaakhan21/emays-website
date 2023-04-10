'use strict';

import { ISendEmailInfo, ISendEmailReminderToCustomerOnTheDeliveryDay
    , ISendEmailReminderToRetailerBeforeDriverPick } from './IEmailContext';

export type SendEmailFunc = (data: ISendEmailInfo, template: string) => Promise<void>;

export type SendEmailReminderToCustomerOnDeliveryDayFunc = (data: ISendEmailReminderToCustomerOnTheDeliveryDay, template: string) => Promise<void>;

export type SendEmailReminderToRetailerBeforeDriverPickFunc = (data: ISendEmailReminderToRetailerBeforeDriverPick, template: string) => Promise<void>;
