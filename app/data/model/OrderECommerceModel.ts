'use strict';

import { model } from 'mongoose';
import { ORDER_NOT_FOUND_ERROR_MESSAGE } from '../../const/errorMessage';
import ErrorType from '../../const/errorType';
import { HTTPUserError } from '../../const/httpCode';
import LogType from '../../const/logType';
import { Logger } from '../../log/logger';
import ServiceError from '../../type/error/ServiceError';
import { CreateOrderFunc, GetOrderDetailDocumentsArrayByStartAndEndIndex,
    GetOrderDocumentSize, PatchOrderDetailsByUserIdFunc, RetrieveOrderByOrderIdFunc, RetrieveOrderByUserIdFunc
    , RetrieveOrdersByDeliveryStatusFunc } from '../../type/orderServiceType';
import { IOrder, IOrderDTO } from '../../type/orderType';
import { buildErrorMessage } from '../../util/logMessageBuilder';
import { prepareUserDetailsToSend } from '../../util/orderDetailBuilder';
import OrderSchema from '../schema/OrderECommerceSchema';
import { array } from 'joi';

const Logging = Logger(__filename);

const MODEL_NAME = 'OrderECommerce';
export const OrderECommerceModel = model<IOrder>(MODEL_NAME, OrderSchema);

/**
 * Save order object wrapper
 * @param {IOrder} order New order data 
 * @returns {IOrder} Returns IOrder object
 */
export const saveOrder: CreateOrderFunc = async (order) => {
    try {
        const orderModel = new OrderECommerceModel(order);
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
        const orderDetails = await OrderECommerceModel.findOne({ 'uid': userId }).exec();
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
 * Get order object by order id
 * @param {string} orderId Order Id
 * @returns {IOrderDTO} Returns IOrderDTO object
 */
export const retrieveOrderByOrderId: RetrieveOrderByOrderIdFunc = async (storeId, orderId) => {
    try {
        if (storeId && orderId) {
            const orderDetails = await OrderECommerceModel.findOne({ $and: [
                { '_id': orderId },
                { 'branchId': storeId }
            ] }).exec();
            if (orderDetails) {
                return prepareUserDetailsToSend(orderDetails);
            }
            throw new ServiceError(
                ErrorType.ORDER_RETRIEVAL_ERROR, ORDER_NOT_FOUND_ERROR_MESSAGE, '', HTTPUserError.NOT_FOUND_CODE);
        }
        if (orderId) {
            const orderDetails = await OrderECommerceModel.findOne({ '_id': orderId }).exec();
            if (orderDetails) {
                return prepareUserDetailsToSend(orderDetails);
            }
            throw new ServiceError(
                ErrorType.ORDER_RETRIEVAL_ERROR, ORDER_NOT_FOUND_ERROR_MESSAGE, '', HTTPUserError.NOT_FOUND_CODE);
        }
        throw new ServiceError(
            ErrorType.ORDER_RETRIEVAL_ERROR, ORDER_NOT_FOUND_ERROR_MESSAGE, '', HTTPUserError.NOT_FOUND_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, `Retrieve Order Details by User Id ${orderId}`), LogType.ERROR);
        throw error;
    }
};

/**
 * Get orders by delivery status
 * @param {boolean} status
 * @returns {Array<IOrderDTO>} arrays of orders
 */
export const retrieveOrderByDeliveryStatus: RetrieveOrdersByDeliveryStatusFunc = async (status) => {
    try {
        const orderDetails: Array<IOrderDTO> = await OrderECommerceModel.find({ 'isDelivered': status }).exec();
        return orderDetails;
    } catch (error) {
        const err = error as Error;
        const deliveryStatus: string = status ? 'Done' : 'Pending';
        Logging.log(
            buildErrorMessage(
                err, `Retrieve Order Details by Order delivery status:  ${deliveryStatus}`), LogType.ERROR);
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
        const currentOrderData = await OrderECommerceModel.findOne({ 'uid': userId }).exec();
        if (currentOrderData) {
            currentOrderData.history?.push( new Date());
            const filteredData = prepareUserDetailsToSend(currentOrderData);
            const updatedOrder = { ...filteredData, ...patchData };
            const filter = {
                _id: currentOrderData._id
            };
            await OrderECommerceModel.updateOne(filter, updatedOrder);
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

/**
 * Get order document size
 * @returns {integer} Returns integer size
 */
export const getOrderDocumentSize: GetOrderDocumentSize = (storeBranchId, isCompleted) => {
    try {
        // This assumed that Superuser can view orders without a storeId. We may have to split this method
        if (storeBranchId && isCompleted === true) {
            return OrderECommerceModel.countDocuments({ $and: [
                { branchId: storeBranchId },
                { isDelivered: isCompleted }] }).exec();
        } else if (storeBranchId) {
            return OrderECommerceModel.countDocuments({ $and: [
                { branchId: storeBranchId },
                { isDelivered: false }] }).exec();
        } 
        // History page need this when Super User looks into
        else if (isCompleted === true) {
            return OrderECommerceModel.countDocuments({ isDelivered: true }).exec();
        } 
        // Delivery Order page need this when Super User looks into
        else if (isCompleted === false) {
            return OrderECommerceModel.countDocuments({ isDelivered: false }).exec();
        }
        return OrderECommerceModel.countDocuments().exec();
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Retrieve Order document size'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get order document by index range
 * @param {integer} startIndex start index
 * @param {integer} endIndex end index
 * @returns {Array<IOrderDTO>} Returns order details array
 */
export const getOrderDetailDocumentsArrayByStartAndEndIndex: GetOrderDetailDocumentsArrayByStartAndEndIndex = async (
    startIndex, limit, branchId, isCompleted
) => {
    try {

        let orderArray;
        // This assumed that Superuser can view orders without a storeId. We may have to split this method
        if (branchId && isCompleted === true) {
            return await OrderECommerceModel.find({ $and: [
                { branchId: branchId },
                { isDelivered: true }] }).skip(startIndex).limit(limit).exec();
        } else if (branchId) {
            orderArray = await OrderECommerceModel.find({ branchId: branchId }).skip(startIndex).limit(limit).exec();
        } 
        // History page need this isCompleted flag
        else if (isCompleted === true) {
            orderArray = await OrderECommerceModel.find({ isDelivered: true }).exec();
        }
        else if (isCompleted === false) {
            orderArray = await OrderECommerceModel.find({ isDelivered: false }).exec();
        }

        // If items are not available yet, get all result
        if (!((orderArray as [])?.length > 0)) {
            orderArray = await OrderECommerceModel.find().skip(startIndex).limit(limit).exec();
        }
       
        const preparedOrderArray: Array<IOrderDTO> = (orderArray as []).map(data => prepareUserDetailsToSend(data)); 
        return preparedOrderArray;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Retrieve Orders array based on indexes'), LogType.ERROR);
        throw error;
    }
};

