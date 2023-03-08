'use strict';

import { CreateOrderFunc, RetrieveOrderByUserIdFunc } from '../type/orderServiceType';
import { IOrder } from '../type/orderType';
import { } from '../const/errorMessage';
import { Logger } from '../log/logger';
import { buildErrorMessage, buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import LogType from '../const/logType';
import { serviceErrorBuilder } from '../util/serviceErrorBuilder';
import { saveOrder, retrieveOrderByUserId } from '../data/model/OrderModel';
import { sendEmail } from './emailService';

const Logging = Logger(__filename);

/**
 * Create new order
 * @param {IOrderDTO} order Order object
 * @returns {Promise<IOrder>} Promise with order data
 */
export const createOrder: CreateOrderFunc = async (order) => {
    try {
        const orderExtracted: IOrder = {
            email: order.email,
            retailerEmail: order.retailerEmail,
            firstName: order.firstName,
            lastName: order.lastName,
            phoneNumber: order.phoneNumber, 
            uid: order.uid,
            date: order.date,
            startTime: order.startTime,
            endTime: order.endTime,
            experience: order.experience,
            address: order.address,
            orderItems: order.orderItems
        };
        const data = await saveOrder(orderExtracted);
        Logging.log(buildInfoMessageUserProcessCompleted('Order insertion', `Order Data:
            ${JSON.stringify(data)}` ), LogType.INFO);
        await sendEmail(
            { email: orderExtracted.email,
                firstName: orderExtracted.firstName,
                lastName: orderExtracted.lastName,
                phoneNumber: orderExtracted.phoneNumber,
                uid: orderExtracted.uid, date: orderExtracted.date,
                startTime: orderExtracted.startTime, endTime: orderExtracted.endTime,
                experience: orderExtracted.experience, address: orderExtracted.address,
                orderItems: orderExtracted.orderItems });
        return data;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Create Order'), LogType.ERROR);
        throw error;
    }
};

/**
 * Retrieve order
 * @param {string} userId User id
 * @returns {Promise<IOrder>} Promise with order data
 */
export const retrieveOrderDetailsByUserId: RetrieveOrderByUserIdFunc = async (userId) => {
    try {
        const data = await retrieveOrderByUserId(userId);
        Logging.log(buildInfoMessageUserProcessCompleted('Order retrieval', `Order Data:
            ${JSON.stringify(data)}` ), LogType.INFO);
        return data;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Retrieve Order'), LogType.ERROR);
        throw error;
    }
};
