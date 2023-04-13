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

const Logging = Logger(__filename);

/**
 * This service method will be used by AWS lambda to send daily reminder to customer and retailer
 */
export const dailyReminder: DailyReminder = async () => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Send reminder to customer and retailer', 'AWS Lambda'), LogType.INFO);
        const allOrders = await retrieveOrderDetailsByDeliveryStatus(false);
        const currentDate = moment().format('YYYY-MM-DD');
        if (allOrders) {
            const ordersOnToday = allOrders.filter( order => {
                const orderDate = moment(order.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
                return orderDate === currentDate;
            });
            // Send emails to customer that delivery date is today
            if (ordersOnToday && ordersOnToday.length > 0) {

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
                        deliveryInfo: order.deliveryInfo
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
            }

            const ordersNotPickedByDriver = allOrders.filter( order => {
                const orderDate = moment(order.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
                return order.isDriverPicked === false && orderDate === currentDate;
            });

            // Send email to retailer for orders that driver haven't picked up yet and delivery date is today
            if (ordersNotPickedByDriver && ordersNotPickedByDriver.length > 0) {

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
                        deliveryInfo: order.deliveryInfo
                    };
                    // Send to retailer
                    const finalCost = getFinalCost(config.SERVICE_CHARGE as number, orderExtracted.orderItems);
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
            buildInfoMessageUserProcessCompleted('Send reminder to customer and retailer', 'customers' ), LogType.INFO);
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Send reminder to customer and retailer'), LogType.ERROR);
        throw error;
    }
};
