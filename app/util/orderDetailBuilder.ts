'use strict';

import { IOrderDTO } from '../type/orderType';
import { PrepareDetailsToSendArrayFunc, PrepareDetailsToSendFunc } from '../type/orderDetailBuilder';

/**
 * Filter data to send
 * @param {IOrder} order Order details
 * @returns {IOrderDTO}  Data to send
 */
export const prepareUserDetailsToSend: PrepareDetailsToSendFunc = (order) => {
    const filteredData = {
        _id: order._id,
        payed: order.payed,
        uid: order?.uid,
        email: order?.email,
        firstName: order?.firstName,
        lastName: order?.lastName,
        phoneNumber: order?.phoneNumber,
        retailerEmail: order?.retailerEmail,
        date: order?.date,
        startTime: order?.startTime,
        endTime: order?.endTime,
        timeZone: order?.timeZone,
        experience: order?.experience,
        address: order?.address,
        orderItems: order?.orderItems
    };
    return filteredData;
};

/**
 * Filter data to send
 * @param {Array<IOrder>} users Order details array
 * @returns {Array<IOrderDTO>}  Data array to send
 */
export const prepareUserArrayToSend: PrepareDetailsToSendArrayFunc = (orders) => {
    const orderDataPrepared: Array<IOrderDTO> = [];
    orders.forEach(order => {
        const filteredData = prepareUserDetailsToSend(order);
        orderDataPrepared.push(filteredData);
    });
    return orderDataPrepared;
};
