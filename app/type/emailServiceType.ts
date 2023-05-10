'use strict';

import { ISendEmailForAppointmentCancellation, ISendEmailInfo, ISendEmailReminderToCustomerOnTheDeliveryDay
    , ISendEmailReminderToRetailerBeforeDriverPick } from './IEmailContext';
import { IOrder } from './orderType';

export type SendEmailFunc = (data: ISendEmailInfo, template: string) => Promise<void>;

export type SendEmailReminderToCustomerOnDeliveryDayFunc = (data: ISendEmailReminderToCustomerOnTheDeliveryDay, template: string) => Promise<void>;

export type SendEmailReminderToRetailerBeforeDriverPickFunc = (data: ISendEmailReminderToRetailerBeforeDriverPick, template: string) => Promise<void>;

export type SendCancellationEmailToClientFunc = (data: ISendEmailForAppointmentCancellation, template: string) => Promise<void>;

export type LetsTalkEmailData = {
    name: string;
    email: string;
    phone: string;
    message: string;
    reCaptcha: string;
};
