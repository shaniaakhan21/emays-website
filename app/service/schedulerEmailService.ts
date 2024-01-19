'use strict';

import { config } from '../config/config';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { DailyReminder } from '../type/lambdaServiceType';
import { IOrderDTO } from '../type/orderType';
import { buildErrorMessage, buildInfoMessageMethodCall,
    buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import { serviceErrorBuilder } from '../util/serviceErrorBuilder';
import { sendEmailReminderToCustomerOnDeliveryDay, sendEmailReminderToRetailerBeforeDriverPick } from './emailService';
import { getFinalCost, retrieveOrderDetailsByDeliveryStatus } from './orderService';
import * as moment from 'moment';
import * as schedule from 'node-schedule';

const Logging = Logger(__filename);

export const emailScheduler = () => {
    Logging.log(buildInfoMessageMethodCall(
        'Email scheduler for the reminding emails has been stared...', 'Scheduler'), LogType.INFO);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    schedule.scheduleJob(config.EMAIL_REMINDERS_SCHEDULING, () => {
        dailyReminder().catch((error) => {
            const err = error as Error;
            serviceErrorBuilder(err.message);
            Logging.log(buildErrorMessage(err, 'Send reminder to customer and retailer'), LogType.ERROR);
        });
    });
};

/**
 * This service method will be used by scheduler
 */
export const dailyReminder: DailyReminder = async () => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Send reminder to customer and retailer', 'Scheduler'), LogType.INFO);
        const allOrders = await retrieveOrderDetailsByDeliveryStatus(false);
        const currentDate = moment().format('YYYY-MM-DD');
        if (allOrders) {
            const ordersOnToday = allOrders.filter( order => {
                const orderDate = moment(order.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
                return orderDate === currentDate;
            });
            // Send emails to customer that delivery date is today
            if (ordersOnToday && ordersOnToday.length > 0) {
                Logging.log(`Email scheduler found new orders with delivery date today no of orders:
                    ${ordersOnToday.length}`, LogType.INFO);
                ordersOnToday.forEach((order) => {
                    const orderExtracted: IOrderDTO = {
                        email: order.email,
                        retailerEmail: order.retailerEmail,
                        firstName: order.firstName,
                        lastName: order.lastName,
                        phoneNumber: order.phoneNumber, 
                        uid: order.uid,
                        date: order.date,
                        startTime: order.startTime,
                        endTime: order.endTime,
                        timeZone: order.timeZone,
                        experience: order.experience,
                        address: order.address,
                        orderItems: order.orderItems,
                        deliveryInfo: order.deliveryInfo,
                        serviceFee: order.serviceFee,
                        currencyType: order.currencyType,
                        serviceArea: order.serviceArea
                    };
                    // Send to customer
                    (async () => {
                        await sendEmailReminderToCustomerOnDeliveryDay(
                            { email: orderExtracted.email as string,
                                urlLogo: config.EMAIL_TEMPLATE.URLS.URL_LOGO,
                                statusImage: config.EMAIL_TEMPLATE.URLS.ORDER_STATUS_ONTHEWAY,
                                exclamationImage: config.EMAIL_TEMPLATE.URLS.EXCLAMATION,
                                facebookImage: config.EMAIL_TEMPLATE.URLS.FACEBOOK_IMAGE,
                                facebookLink: config.EMAIL_TEMPLATE.URLS.FACEBOOK_LINK,
                                instagramImage: config.EMAIL_TEMPLATE.URLS.INSTAGRAM_IMAGE,
                                instagramLink: config.EMAIL_TEMPLATE.URLS.INSTAGRAM_LINK,
                                twitterImage: config.EMAIL_TEMPLATE.URLS.TWITTER_IMAGE,
                                twitterLink: config.EMAIL_TEMPLATE.URLS.TWITTER_LINK,
                                emaysContactUsLink: config.EMAIL_TEMPLATE.URLS.EMAYS_CONTACT_US,
                                firstName: orderExtracted.firstName as string,
                                date: orderExtracted.date as Date,
                                startTime: orderExtracted.startTime as string, 
                                endTime: orderExtracted.endTime as string,
                                orderItems: orderExtracted.orderItems }, config
                                .EMAIL_TEMPLATE.CUSTOMER_EMAIL_REMINDER_ON_DEL_DAY_BEFORE_DRIVER_PICK);
                    })().catch((error) => {
                        throw error;
                    });
                });
            } else {
                Logging.log('Email scheduler didn\'t find new orders with delivery date today', LogType.INFO);
            }

            const ordersNotPickedByDriver = allOrders.filter( order => {
                const orderDate = moment(order.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
                return order.isDriverPicked === false && orderDate === currentDate;
            });

            // Send email to retailer for orders that driver haven't picked up yet and delivery date is today
            if (ordersNotPickedByDriver && ordersNotPickedByDriver.length > 0) {
                Logging.log(`Email scheduler found ${ordersNotPickedByDriver.length} 
                    new orders with delivery date today but driver has not picked up yet`, LogType.INFO);
                ordersNotPickedByDriver.forEach((order) => {
                    const orderExtracted: IOrderDTO = {
                        email: order.email,
                        retailerEmail: order.retailerEmail,
                        firstName: order.firstName,
                        lastName: order.lastName,
                        phoneNumber: order.phoneNumber, 
                        uid: order.uid,
                        date: order.date,
                        startTime: order.startTime,
                        endTime: order.endTime,
                        timeZone: order.timeZone,
                        experience: order.experience,
                        address: order.address,
                        orderItems: order.orderItems,
                        deliveryInfo: order.deliveryInfo,
                        serviceFee: order.serviceFee,
                        currencyType: order.currencyType,
                        serviceArea: order.serviceArea
                    };
                    // Send to retailer
                    const finalCost = getFinalCost(config.SERVICE_CHARGE, orderExtracted.orderItems);
                    (async () => {
                        await sendEmailReminderToRetailerBeforeDriverPick(
                            { retailerEmail: orderExtracted.retailerEmail,
                                urlLogo: config.EMAIL_TEMPLATE.URLS.URL_LOGO,
                                uid: orderExtracted.uid as string,
                                date: orderExtracted.date as Date,
                                finalCost: finalCost,
                                startTime: orderExtracted.startTime as string, 
                                endTime: orderExtracted.endTime as string,
                                orderItems: orderExtracted.orderItems,
                                facebookImage: config.EMAIL_TEMPLATE.URLS.FACEBOOK_IMAGE,
                                facebookLink: config.EMAIL_TEMPLATE.URLS.FACEBOOK_LINK,
                                instagramImage: config.EMAIL_TEMPLATE.URLS.INSTAGRAM_IMAGE,
                                instagramLink: config.EMAIL_TEMPLATE.URLS.INSTAGRAM_LINK,
                                twitterImage: config.EMAIL_TEMPLATE.URLS.TWITTER_IMAGE,
                                twitterLink: config.EMAIL_TEMPLATE.URLS.TWITTER_LINK,
                                emaysContactUsLink: config.EMAIL_TEMPLATE.URLS.EMAYS_CONTACT_US }, config
                                .EMAIL_TEMPLATE.RETAILER_REMINDER_EMAIL_ON_DEL_DAY_BEFORE_DRIVER_PICK);
                    })().catch((error) => {
                        throw error;
                    });
                });
            }
        }
        Logging.log(
            buildInfoMessageUserProcessCompleted('Sent reminder to customer and retailer', 'customers' ), LogType.INFO);
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Send reminder to customer and retailer'), LogType.ERROR);
        throw error;
    }
};
