'use strict';

import { CreateOrderFunc, RetrieveOrderByUserIdFunc } from '../type/orderServiceType';
import { IOrder } from '../type/orderType';
import { } from '../const/errorMessage';
import { Logger } from '../log/logger';
import { buildErrorMessage, buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import LogType from '../const/logType';
import { serviceErrorBuilder } from '../util/serviceErrorBuilder';
import { saveOrder, retrieveOrderByUserId } from '../data/model/OrderModel';
import { sendEmailForOrderingItems } from './emailService';
import { config } from '../config/config';
import { Order } from '../type/orderType';

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
        // Send customer email
        await sendEmailForOrderingItems(
            { email: orderExtracted.email,
                firstName: orderExtracted.firstName,
                lastName: orderExtracted.lastName,
                phoneNumber: orderExtracted.phoneNumber,
                uid: orderExtracted.uid, date: orderExtracted.date,
                startTime: orderExtracted.startTime, endTime: orderExtracted.endTime,
                experience: orderExtracted.experience, address: orderExtracted.address,
                orderItems: orderExtracted.orderItems }, config.EMAIL_TEMPLATE.CUSTOMER_EMAIL_TEMPLATE);
        // Send retailer email
        const priceList = getPriceList(orderExtracted.orderItems);
        const finalCost = getFinalCost(config.SERVICE_CHARGE as number, priceList);
        await sendEmailForOrderingItems(
            { email: orderExtracted.retailerEmail,
                firstName: orderExtracted.firstName,
                lastName: orderExtracted.lastName,
                phoneNumber: orderExtracted.phoneNumber,
                finalCost: finalCost,
                uid: orderExtracted.uid, date: orderExtracted.date,
                startTime: orderExtracted.startTime, endTime: orderExtracted.endTime,
                experience: orderExtracted.experience, address: orderExtracted.address,
                orderItems: orderExtracted.orderItems }, config.EMAIL_TEMPLATE.RETAILER_EMAIL_TEMPLATE);
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

const getPriceList = (productList: Array<Order>) => {
    return productList?.map((item) => (item.productCost));
};

const getFinalCost = (serviceCharge = 0.00, itemsPrices: Array<string> = []): number => {
    const itemsTotal = itemsPrices?.reduce((acc, next) => { return +acc + +next; }, 0.00);
    return +serviceCharge + +itemsTotal;
};
