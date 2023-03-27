'use strict';

import { model } from 'mongoose';
import { ORDER_NOT_FOUND_ERROR_MESSAGE } from '../../const/errorMessage';
import ErrorType from '../../const/errorType';
import { HTTPUserError } from '../../const/httpCode';
import LogType from '../../const/logType';
import { Logger } from '../../log/logger';
import ServiceError from '../../type/error/ServiceError';
import { CreateOrderFunc, PatchOrderDetailsByUserIdFunc, RetrieveOrderByUserIdFunc } from '../../type/orderServiceType';
import { IOrder, IOrderDTO } from '../../type/orderType';
import { buildErrorMessage } from '../../util/logMessageBuilder';
import { prepareUserDetailsToSend } from '../../util/orderDetailBuilder';
import OrderSchema from '../schema/OrderSchema';

const Logging = Logger(__filename);

const MODEL_NAME = 'Order';
export const OrderModel = model<IOrder>(MODEL_NAME, OrderSchema);

/**
 * Save order object wrapper
 * @param {IOrder} order New order data 
 * @returns {IOrder} Returns IOrder object
 */
export const saveOrder: CreateOrderFunc = async (order) => {
    try {
        const orderModel = new OrderModel(order);
        const result: IOrderDTO = await orderModel.save();
        return result;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Save Order Details'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get order object by user id
 * @param {string} userId User Id
 * @returns {IOrderDTO} Returns IOrderDTO object
 */
export const retrieveOrderByUserId: RetrieveOrderByUserIdFunc = async (userId) => {
    try {
        const orderDetails = await OrderModel.findOne({ 'uid': userId }).exec();
        if (orderDetails) {
            return prepareUserDetailsToSend(orderDetails);
        }
        throw new ServiceError(
            ErrorType.ORDER_RETRIEVAL_ERROR, ORDER_NOT_FOUND_ERROR_MESSAGE, '', HTTPUserError.NOT_FOUND_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, `Retrieve Order Details by User Id ${userId}`), LogType.ERROR);
        throw error;
    }
};

/**
 * Get order object by user id and update it.
 * @param {string} userId User Id
 * @returns {IOrderDTO} Returns IOrderDTO object
 */
export const findOneAndUpdateIfExist: PatchOrderDetailsByUserIdFunc = async (userId, patchData) => {
    try {
        const currentOrderData = await OrderModel.findOne({ 'uid': userId }).exec();
        if (currentOrderData) {
            currentOrderData.history?.push( new Date());
            const filteredData = prepareUserDetailsToSend(currentOrderData);
            const updatedOrder = { ...filteredData, ...patchData };
            const filter = {
                _id: currentOrderData._id
            };
            await OrderModel.updateOne(filter, updatedOrder);
            return updatedOrder;
        }
        throw new ServiceError(
            ErrorType.ORDER_UPDATE_ERROR, ORDER_NOT_FOUND_ERROR_MESSAGE, '', HTTPUserError
                .UNPROCESSABLE_ENTITY_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, `Retrieve Order Details by User Id ${userId}`), LogType.ERROR);
        throw error;
    }
};
