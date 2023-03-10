'use strict';

import { CreateOrderFunc, RetrieveOrderByUserIdFunc } from '../type/orderServiceType';
import { IOrder } from '../type/orderType';
import { } from '../const/errorMessage';
import { Logger } from '../log/logger';
import { buildErrorMessage, buildInfoMessageMethodCall,
    buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import LogType from '../const/logType';
import { serviceErrorBuilder } from '../util/serviceErrorBuilder';
import { saveOrder, retrieveOrderByUserId } from '../data/model/OrderModel';
import { sendEmailForOrderingItems } from './emailService';
import { config } from '../config/config';
import { Order } from '../type/orderType';
import { generateJWT } from '../util/jwtUtil';
import { Roles } from '../const/roles';
import { IJWTBuildData, JWT_TYPE } from '../type/IJWTClaims';

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
        const redirectionURL = buildRedirectionURL(orderExtracted.uid);

        // Send customer email
        await sendEmailForOrderingItems(
            { email: orderExtracted.email,
                urlLogo: config.EMAIL_TEMPLATE.URLS.URL_LOGO,
                statusImage: config.EMAIL_TEMPLATE.URLS.ORDER_STATUS_PLACED,
                exclamationImage: config.EMAIL_TEMPLATE.URLS.EXCLAMATION,
                facebookImage: config.EMAIL_TEMPLATE.URLS.FACEBOOK_IMAGE,
                facebookLink: config.EMAIL_TEMPLATE.URLS.FACEBOOK_LINK,
                instagramImage: config.EMAIL_TEMPLATE.URLS.INSTAGRAM_IMAGE,
                instagramLink: config.EMAIL_TEMPLATE.URLS.INSTAGRAM_LINK,
                twitterImage: config.EMAIL_TEMPLATE.URLS.TWITTER_IMAGE,
                twitterLink: config.EMAIL_TEMPLATE.URLS.TWITTER_LINK,
                emaysContactUsLink: config.EMAIL_TEMPLATE.URLS.EMAYS_CONTACT_US,
                redirectionURL: redirectionURL,
                firstName: orderExtracted.firstName,
                lastName: orderExtracted.lastName,
                phoneNumber: orderExtracted.phoneNumber,
                uid: orderExtracted.uid, date: orderExtracted.date,
                startTime: orderExtracted.startTime, endTime: orderExtracted.endTime,
                experience: orderExtracted.experience, address: orderExtracted.address,
                orderItems: orderExtracted.orderItems }, config.EMAIL_TEMPLATE.CUSTOMER_EMAIL_TEMPLATE);
        // Send retailer email
        const finalCost = getFinalCost(config.SERVICE_CHARGE as number, orderExtracted.orderItems);
        await sendEmailForOrderingItems(
            { email: orderExtracted.retailerEmail,
                urlLogo: config.EMAIL_TEMPLATE.URLS.URL_LOGO,
                statusImage: config.EMAIL_TEMPLATE.URLS.ORDER_STATUS_PLACED,
                exclamationImage: config.EMAIL_TEMPLATE.URLS.EXCLAMATION,
                facebookImage: config.EMAIL_TEMPLATE.URLS.FACEBOOK_IMAGE,
                facebookLink: config.EMAIL_TEMPLATE.URLS.FACEBOOK_LINK,
                instagramImage: config.EMAIL_TEMPLATE.URLS.INSTAGRAM_IMAGE,
                instagramLink: config.EMAIL_TEMPLATE.URLS.INSTAGRAM_LINK,
                twitterImage: config.EMAIL_TEMPLATE.URLS.TWITTER_IMAGE,
                twitterLink: config.EMAIL_TEMPLATE.URLS.TWITTER_LINK,
                emaysContactUsLink: config.EMAIL_TEMPLATE.URLS.EMAYS_CONTACT_US,
                redirectionURL: redirectionURL,
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

const getFinalCost = (serviceCharge = 0.00, itemList: Array<Order>): number => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get final cost of product list', ''), LogType.INFO);
        let finalTotal = 0.00;
        for (const item of itemList) {
            const itemCount: number = +item.productQuantity;
            const itemPrice: number = +item.productCost;
            const itemsTotal = itemCount * itemPrice;
            finalTotal += itemsTotal;
        }
        return +serviceCharge + +finalTotal;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Get product list final bill'), LogType.ERROR);
        throw error;
    }
};

const buildRedirectionURL = (uuid: string): string => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Build email redirection URL', `UUID: ${uuid}`), LogType.INFO);
        const role: Roles = Roles.CLIENT;
        const tokenBuildData: IJWTBuildData = {
            id: uuid,
            roles: role
        };
        const token: string = generateJWT(tokenBuildData, JWT_TYPE.LONG_LIVE);
        const URL = 
        `${config.EMAIL_TEMPLATE.URLS.EMAIL_REDIRECTION_PATH}?launchType=emailBooked&uuid=${uuid}&authToken=${token}`;
        Logging.log(buildInfoMessageUserProcessCompleted('Email redirection URL created', `UUID:
                ${uuid} and URL: ${URL}` ), LogType.INFO);
        return URL;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, `Build email redirect URL for uuid ${uuid}`), LogType.ERROR);
        throw error;
    } 
};
