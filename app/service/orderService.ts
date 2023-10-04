/* eslint-disable max-lines */
/* eslint-disable max-len */
'use strict';

import { CreateOrderFunc, GetOrderDetailsWithPages, PatchOrderDetailsByUserIdFunc, RetrieveOrderByUserIdFunc, RetrieveOrdersByDeliveryStatusFunc } from '../type/orderServiceType';
import { IOrder, IOrderDTO, IOrderPaginationDTO } from '../type/orderType';
import { Logger } from '../log/logger';
import { buildErrorMessage, buildInfoMessageMethodCall,
    buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import LogType from '../const/logType';
import { serviceErrorBuilder } from '../util/serviceErrorBuilder';
import { saveOrder, retrieveOrderByUserId, findOneAndUpdateIfExist, retrieveOrderByDeliveryStatus, getOrderDocumentSize, getOrderDetailDocumentsArrayByStartAndEndIndex } from '../data/model/OrderECommerceModel';
import { sendEmailForOrderCancellation, sendEmailForOrderingItems } from './emailService';
import { config } from '../config/config';
import { Order } from '../type/orderType';
import { generateJWT } from '../util/jwtUtil';
import { Roles } from '../const/roles';
import { IJWTBuildData, JWT_TYPE } from '../type/IJWTClaims';
import { EMAIL_BOOKED, EMAIL_EDIT } from '../../public/js/const/SessionStorageConst';

const Logging = Logger(__filename);

/**
 * Create new order
 * @param {IOrderDTO} order Order object
 * @returns {Promise<IOrder>} Promise with order data
 */
export const createOrder: CreateOrderFunc = async (order) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Create order', `uid: ${order.uid}`), LogType.INFO);
        const orderExtracted: IOrder = {
            email: order.email,
            retailerEmail: order.retailerEmail,
            firstName: order.firstName,
            lastName: order.lastName,
            phoneNumber: order.phoneNumber,
            branchId: order.branchId,
            uid: order.uid,
            date: order.date,
            startTime: order.startTime,
            endTime: order.endTime,
            timeZone: order.timeZone,
            experience: order.experience,
            address: order.address,
            orderItems: order.orderItems,
            deliveryInfo: order.deliveryInfo,
            serviceFee: order.serviceFee
        };
        const data = await saveOrder(orderExtracted);
        Logging.log(buildInfoMessageUserProcessCompleted('Order insertion', `Order Data:
            ${JSON.stringify(data)}` ), LogType.INFO);
        const redirectionURL = buildRedirectionURL(orderExtracted.uid);
        const bookCalendarURL = buildBookCalendar(orderExtracted.uid);
        const emailOrderEditURL = buildEditOrderURL(orderExtracted.uid);

        // Send customer email
        await sendEmailForOrderingItems(
            { email: orderExtracted.email,
                urlLogo: config.EMAIL_TEMPLATE.URLS.URL_LOGO,
                statusImage: config.EMAIL_TEMPLATE.URLS.ORDER_STATUS_PLACED,
                exclamationImage: config.EMAIL_TEMPLATE.URLS.EXCLAMATION,
                trustpilotImage: config.EMAIL_TEMPLATE.URLS.TRUSTPILOT_REVIEW,
                facebookImage: config.EMAIL_TEMPLATE.URLS.FACEBOOK_IMAGE,
                facebookLink: config.EMAIL_TEMPLATE.URLS.FACEBOOK_LINK,
                instagramImage: config.EMAIL_TEMPLATE.URLS.INSTAGRAM_IMAGE,
                instagramLink: config.EMAIL_TEMPLATE.URLS.INSTAGRAM_LINK,
                twitterImage: config.EMAIL_TEMPLATE.URLS.TWITTER_IMAGE,
                twitterLink: config.EMAIL_TEMPLATE.URLS.TWITTER_LINK,
                emaysContactUsLink: config.EMAIL_TEMPLATE.URLS.EMAYS_CONTACT_US,
                redirectionURL: redirectionURL,
                bookCalenderURL: bookCalendarURL,
                firstName: orderExtracted.firstName,
                lastName: orderExtracted.lastName,
                phoneNumber: orderExtracted.phoneNumber,
                uid: orderExtracted.uid, date: orderExtracted.date,
                startTime: orderExtracted.startTime, endTime: orderExtracted.endTime,
                experience: orderExtracted.experience, address: orderExtracted.address,
                orderItems: orderExtracted.orderItems,
                editOrderURL: emailOrderEditURL }, config.EMAIL_TEMPLATE.CUSTOMER_EMAIL_TEMPLATE);

        // Send retailer email
        const finalCost = getFinalCost(config.SERVICE_CHARGE as number, orderExtracted.orderItems);
        await sendEmailForOrderingItems(
            { email: orderExtracted.retailerEmail,
                urlLogo: config.EMAIL_TEMPLATE.URLS.URL_LOGO,
                statusImage: config.EMAIL_TEMPLATE.URLS.ORDER_STATUS_PLACED,
                trustpilotImage: config.EMAIL_TEMPLATE.URLS.TRUSTPILOT_REVIEW,
                exclamationImage: config.EMAIL_TEMPLATE.URLS.EXCLAMATION,
                facebookImage: config.EMAIL_TEMPLATE.URLS.FACEBOOK_IMAGE,
                facebookLink: config.EMAIL_TEMPLATE.URLS.FACEBOOK_LINK,
                instagramImage: config.EMAIL_TEMPLATE.URLS.INSTAGRAM_IMAGE,
                instagramLink: config.EMAIL_TEMPLATE.URLS.INSTAGRAM_LINK,
                twitterImage: config.EMAIL_TEMPLATE.URLS.TWITTER_IMAGE,
                twitterLink: config.EMAIL_TEMPLATE.URLS.TWITTER_LINK,
                emaysContactUsLink: config.EMAIL_TEMPLATE.URLS.EMAYS_CONTACT_US,
                redirectionURL: redirectionURL,
                bookCalenderURL: bookCalendarURL,
                firstName: orderExtracted.firstName,
                lastName: orderExtracted.lastName,
                phoneNumber: orderExtracted.phoneNumber,
                finalCost: finalCost,
                uid: orderExtracted.uid, date: orderExtracted.date,
                startTime: orderExtracted.startTime, endTime: orderExtracted.endTime,
                experience: orderExtracted.experience, address: orderExtracted.address,
                orderItems: orderExtracted.orderItems,
                editOrderURL: emailOrderEditURL }, config.EMAIL_TEMPLATE.RETAILER_EMAIL_TEMPLATE);
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
 * @param {object} order Order object
 * @returns {Promise<number>} Promise with order total
 */
export const calculateServiceFee = (order: IOrderDTO) => {
    try {
        // Todo: calculate service fee properly
        return 1499;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Order Service Fee calculate'), LogType.ERROR);
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

/**
 * Retrieve order
 * @param {boolean} isDelivered delivery status
 * @returns {Promise<Array<IOrder>>} Promise with orders data
 */
export const retrieveOrderDetailsByDeliveryStatus: RetrieveOrdersByDeliveryStatusFunc = async (isDelivered) => {
    try {
        const data = await retrieveOrderByDeliveryStatus(isDelivered);
        const deliveryStatus = isDelivered ? 'Delivered' : 'Not Delivered';
        if (data && data.length > 0) {
            const UIds = data.map(itm => itm.uid).join(',');
            Logging.log(buildInfoMessageUserProcessCompleted(`${deliveryStatus} Orders fetching`, `UIds ${UIds}` ), LogType.INFO);
            return data;
        }
        return null;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Retrieve Order'), LogType.ERROR);
        throw error;
    }
};

/**
 * Patch order
 * @param {string} userId User id
 * @returns {Promise<IOrderDTO>} Promise with order data
 */
export const patchOrderDetailsByUserId: PatchOrderDetailsByUserIdFunc = async (userId, patchOrder) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Patch order basic data', `uid: ${userId}`), LogType.INFO);
        const result = await findOneAndUpdateIfExist(userId, patchOrder);
        if (patchOrder.isCanceled) {
            // Send cancellation email
            await sendOrderCancellationMail(result as IOrder);
        }
        Logging.log(buildInfoMessageUserProcessCompleted('Patch order basic data', `Order Data:
            ${JSON.stringify(result)}` ), LogType.INFO);
        return result;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Patch Order'), LogType.ERROR);
        throw error;
    }
};

/**
 * Pagination order
 * @param {string} page page
 * @param {string} pageLimit page limit
 * @returns {Promise<Array<IOrderDTO>>} Promise with array of order data
 */
export const getOrderDetailsWithPagination: GetOrderDetailsWithPages = async (page,
    pageSize, role, branchId) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get order pagination', role), LogType.INFO);
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;

        const results: IOrderPaginationDTO = {};
        const documentSize = await getOrderDocumentSize(branchId);
        results.allPagesAvailable = Math.ceil(documentSize / pageSize);
        if (endIndex < documentSize) {
            results.next = {
                page: page + 1,
                limit: pageSize
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: pageSize
            };
        }
        const orderData = await getOrderDetailDocumentsArrayByStartAndEndIndex(startIndex, pageSize, branchId);
        results.pages = orderData;
        return results;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Get order pagination'), LogType.ERROR);
        throw error;
    }
};

const sendOrderCancellationMail = async (order: IOrder) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Send appointment cancellation email', `uid: ${order.uid}`), LogType.INFO);
        const orderExtracted: IOrder = {
            email: order.email,
            retailerEmail: order.retailerEmail,
            firstName: order.firstName,
            lastName: order.lastName,
            phoneNumber: order.phoneNumber,
            branchId: order.branchId,
            uid: order.uid,
            date: order.date,
            startTime: order.startTime,
            endTime: order.endTime,
            timeZone: order.timeZone,
            experience: order.experience,
            address: order.address,
            orderItems: order.orderItems,
            deliveryInfo: order.deliveryInfo,
            serviceFee: order.serviceFee
        };
        const finalCost = getFinalCost(config.SERVICE_CHARGE as number, orderExtracted.orderItems);
        await sendEmailForOrderCancellation(
            { email: orderExtracted.retailerEmail,
                trustpilotImage: config.EMAIL_TEMPLATE.URLS.TRUSTPILOT_REVIEW,
                facebookImage: config.EMAIL_TEMPLATE.URLS.FACEBOOK_IMAGE,
                facebookLink: config.EMAIL_TEMPLATE.URLS.FACEBOOK_LINK,
                instagramImage: config.EMAIL_TEMPLATE.URLS.INSTAGRAM_IMAGE,
                instagramLink: config.EMAIL_TEMPLATE.URLS.INSTAGRAM_LINK,
                twitterImage: config.EMAIL_TEMPLATE.URLS.TWITTER_IMAGE,
                twitterLink: config.EMAIL_TEMPLATE.URLS.TWITTER_LINK,
                emaysContactUsLink: config.EMAIL_TEMPLATE.URLS.EMAYS_CONTACT_US,
                firstName: orderExtracted.firstName,
                lastName: orderExtracted.lastName,
                finalCost: finalCost,
                experience: orderExtracted.experience, address: orderExtracted.address,
                orderItems: orderExtracted.orderItems
            }, config.EMAIL_TEMPLATE.CUSTOMER_CANCEL_EMAIL);
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Get order pagination'), LogType.ERROR);
        throw error;
    }
};

export const getFinalCost = (serviceCharge = 0.00, itemList: Array<Order>): number => {
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

export const buildRedirectionURL = (uuid: string): string => {
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
    `${config.EMAIL_TEMPLATE.URLS.EMAIL_REDIRECTION_PATH}?launchType=${EMAIL_BOOKED}&uuid=${uuid}&authToken=${token}`;
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

const buildBookCalendar = (uuid: string): string => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Build book calendar URL', `UUID: ${uuid}`), LogType.INFO);
        const role: Roles = Roles.CLIENT;
        const tokenBuildData: IJWTBuildData = {
            id: uuid,
            roles: role
        };
        const token: string = generateJWT(tokenBuildData, JWT_TYPE.LONG_LIVE);
        const URL =
        // eslint-disable-next-line max-len
        `${config.GOOGLE.CALENDER.BOOK_CALENDER_REDIRECTION_PATH}?uuid=${uuid}&authToken=${token}`;
        Logging.log(buildInfoMessageUserProcessCompleted('Build book calendar URL created', `UUID:
                ${uuid} and URL: ${URL}` ), LogType.INFO);
        return URL;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, `Build book calendar URL for uuid ${uuid}`), LogType.ERROR);
        throw error;
    }
};

export const buildEditOrderURL = (uuid: string): string => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Build email edit-order URL', `UUID: ${uuid}`), LogType.INFO);
        const role: Roles = Roles.CLIENT;
        const tokenBuildData: IJWTBuildData = {
            id: uuid,
            roles: role
        };
        const token: string = generateJWT(tokenBuildData, JWT_TYPE.LONG_LIVE);
        const URL =
    `${config.EMAIL_TEMPLATE.URLS.EMAIL_REDIRECTION_PATH}?launchType=${EMAIL_EDIT}&uuid=${uuid}&authToken=${token}`;
        Logging.log(buildInfoMessageUserProcessCompleted('Build email edit-order URL created', `UUID:
                ${uuid} and URL: ${URL}` ), LogType.INFO);
        return URL;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, `Build email edit-order URL for uuid ${uuid}`), LogType.ERROR);
        throw error;
    }
};
