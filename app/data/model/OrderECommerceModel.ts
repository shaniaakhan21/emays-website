/* eslint-disable max-lines */
'use strict';

import { model } from 'mongoose';
import { ORDER_NOT_FOUND_ERROR_MESSAGE } from '../../const/errorMessage';
import ErrorType from '../../const/errorType';
import { HTTPUserError } from '../../const/httpCode';
import LogType from '../../const/logType';
import { Logger } from '../../log/logger';
import ServiceError from '../../type/error/ServiceError';
import { CreateOrderFunc, DeleteOrderByOrderIdFunc,
    GetCompletedOrderCountByDurationAndStoreIdFunc, GetAllOrderCountByDurationAndStoreIdFunc,
    GetOrderDetailDocumentsArrayByStartAndEndIndex,
    GetOrderDocumentSize, PatchOrderDetailsByUserIdFunc, RetrieveOrderByOrderIdFunc, RetrieveOrderByUserIdFunc
    , RetrieveOrdersByDeliveryStatusFunc,
    GetActiveOrdersCountByDurationAndStoreIdFunc, 
    GetRevenueByDurationAndStoreIdFunc, 
    PatchOrderDetailsByOrderIdFunc, 
    GetCompletedOrdersByStartAndEndIndexAndDriverId, 
    GetCompletedOrderDocumentSizeByDriverId } from '../../type/orderServiceType';
import { IOrder, IOrderDTO } from '../../type/orderType';
import { buildErrorMessage } from '../../util/logMessageBuilder';
import { prepareUserDetailsToSend } from '../../util/orderDetailBuilder';
import OrderSchema from '../schema/OrderECommerceSchema';
import { array } from 'joi';
import DurationUtil from '../../util/durationUtil';
import { TimePeriod } from '../../const/timePeriods';
import { integer } from 'aws-sdk/clients/cloudfront';

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
 * Delete order by order id
 * @param {string} order order id
 * @returns {IOrder} Returns IOrder object
 */
export const deleteOrderById: DeleteOrderByOrderIdFunc = async (orderId) => {
    try {
        const result = await OrderECommerceModel.findByIdAndDelete({ _id: orderId }) as IOrder;
        return result;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, `Delete Order by Id: ${orderId}`), LogType.ERROR);
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
 * Get order object by order id and update it.
 * @param {string} userId User Id
 * @returns {IOrderDTO} Returns IOrderDTO object
 */
export const findOneAndUpdateIfExistByOrderId: PatchOrderDetailsByOrderIdFunc = async (orderId, patchData) => {
    try {
        const currentOrderData = await OrderECommerceModel.findOne({ '_id': orderId }).exec();
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
        Logging.log(buildErrorMessage(err, `Retrieve Order Details by User Id ${orderId}`), LogType.ERROR);
        throw error;
    }
};

/**
 * Get order document size
 * @param {string} storeBranchId branch id
 * @param {boolean} isCompleted is completed status
 * @returns {integer} Returns integer size
 */
export const getOrderDocumentSize: GetOrderDocumentSize = (storeBranchId, isCompleted) => {
    try {
        // This assumed that Superuser can view orders without a storeId. We may have to split this method
        if (storeBranchId && isCompleted === true) {
            return OrderECommerceModel.countDocuments({ $and: [
                { branchId: storeBranchId },
                { isDelivered: isCompleted }] }).exec();
        } else if (storeBranchId && isCompleted === false) {
            return OrderECommerceModel.countDocuments({ $and: [
                { branchId: storeBranchId },
                { isDelivered: false }] }).exec();
        } else if (storeBranchId) {
            return OrderECommerceModel.countDocuments({ $and: [
                { branchId: storeBranchId }] }).exec();
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
            orderArray = await OrderECommerceModel.find({ $and: [
                { branchId: branchId },
                { isDelivered: true }] }).skip(startIndex).limit(limit).exec();
            const preparedOrderArray: Array<IOrderDTO> = 
                (orderArray as []).map(data => prepareUserDetailsToSend(data)); 
            return preparedOrderArray;
        } else if (branchId && isCompleted === false) {
            orderArray = await OrderECommerceModel.find({ $and: [
                { branchId: branchId },
                { isDelivered: false }] }).skip(startIndex).limit(limit).exec();
            const preparedOrderArray: Array<IOrderDTO> = 
                    (orderArray as []).map(data => prepareUserDetailsToSend(data)); 
            return preparedOrderArray;
        
        } else if (branchId) {
            orderArray = await OrderECommerceModel.find({ branchId: branchId }).skip(startIndex).limit(limit).exec();
            const preparedOrderArray: Array<IOrderDTO> = 
                (orderArray as []).map(data => prepareUserDetailsToSend(data)); 
            return preparedOrderArray;
        } 
        // History page need this isCompleted flag
        else if (isCompleted === true) {
            orderArray = await OrderECommerceModel.find({ isDelivered: true }).skip(startIndex).limit(limit).exec();
            const preparedOrderArray: Array<IOrderDTO> = 
                (orderArray as []).map(data => prepareUserDetailsToSend(data)); 
            return preparedOrderArray;
        }
        else if (isCompleted === false) {
            orderArray = await OrderECommerceModel.find({ isDelivered: false }).skip(startIndex).limit(limit).exec();
            const preparedOrderArray: Array<IOrderDTO> = 
                (orderArray as []).map(data => prepareUserDetailsToSend(data)); 
            return preparedOrderArray;
        }
        orderArray = await OrderECommerceModel.find().skip(startIndex).limit(limit).exec();
        const preparedOrderArray: Array<IOrderDTO> = (orderArray as []).map(data => prepareUserDetailsToSend(data)); 
        return preparedOrderArray;
        
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Retrieve Orders array based on indexes'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get completed order document size by driver id
 * @param {string} driverId driver id
 * @returns {integer} Returns integer size
 */
export const getCompletedOrderDocumentSizeByDriverId: GetCompletedOrderDocumentSizeByDriverId = (driverId) => {
    try {
        return OrderECommerceModel.countDocuments({ $and: [
            { driverId: driverId, isDelivered: true }] }).exec();
    
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Retrieve Order document size'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get completed order documents by driver id and start and end index
 * @param {integer} startIndex start index
 * @param {integer} endIndex end index
 * @param {integer} driverId driver id
 * @returns {Array<IOrderDTO>} Returns order details array
 */
export const getCompletedOrdersByStartAndEndIndexAndDriverId: GetCompletedOrdersByStartAndEndIndexAndDriverId = async (
    startIndex, limit, driverId
) => {
    try {
        const orderArray = await OrderECommerceModel.find({ $and: [
            { driverId: driverId },
            { isDelivered: true }] }).skip(startIndex).limit(limit).exec();
        const preparedOrderArray: Array<IOrderDTO> = 
            (orderArray as []).map(data => prepareUserDetailsToSend(data)); 
        return preparedOrderArray;
        
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Retrieve Order history based on indexes and driver id'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get completed orders by delivered date and given duration
 * @param {integer} durationType type of duration
 * @param {string} storeId end index
 * @return {integer} count
 */
export const getCompletedOrdersCountByDurationAndStoreId: GetCompletedOrderCountByDurationAndStoreIdFunc = async (durationType, storeId) => {
    try {
        const duration = DurationUtil.getDuration(durationType);
        const aggregatePipeline: any[] = [
            {
                $match: {
                    deliveredDate: {
                        $lte: duration
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ];
    
        if (storeId) {
            // Add the branchId condition to the $match object if storeId is available
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            aggregatePipeline[0].$match.branchId = storeId;
        }
    
        const result = await OrderECommerceModel.aggregate(aggregatePipeline).exec();
        let count = 0;
        if (result?.length > 0) {
            count = (result[0] as { count: number }).count;
        }
        return count;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Retrieve Order size'), LogType.ERROR);
        throw error;
    }
    
};

/**
 * Get all kind of orders by order date duration and store id
 * @param {integer} durationType type of duration
 * @param {string} storeId end index
 * @return {integer} count
 */
export const getAllOrderCountByDurationAndStoreId: GetAllOrderCountByDurationAndStoreIdFunc = async (durationType, storeId) => {
    try {
        const duration = DurationUtil.getDuration(durationType);
        const aggregatePipeline: any[] = [
            {
                $match: {
                    date: {
                        $lte: duration
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ];
    
        if (storeId) {
            // Add the branchId condition to the $match object if storeId is available
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            aggregatePipeline[0].$match.branchId = storeId;
        }
    
        const result = await OrderECommerceModel.aggregate(aggregatePipeline).exec();
        let count = 0;
        if (result?.length > 0) {
            count = (result[0] as { count: number }).count;
        }
        return count;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Retrieve Order size'), LogType.ERROR);
        throw error;
    }
    
};

/**
 * Get active orders by store id and given duration
 * @param {integer} durationType type of duration
 * @param {string} storeId end index
 * @return {integer} count
 */
export const getActiveOrdersCountByDurationAndStoreId: GetActiveOrdersCountByDurationAndStoreIdFunc = async (durationType, storeId) => {
    try {
        const duration = DurationUtil.getDuration(durationType);
        const aggregatePipeline: any[] = [
            {
                $match: {
                    deliveredDate: null,
                    isDelivered: false,
                    date: {
                        $lte: duration
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ];
    
        if (storeId) {
            // Add the branchId condition to the $match object if storeId is available
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            aggregatePipeline[0].$match.branchId = storeId;
        }
    
        const result = await OrderECommerceModel.aggregate(aggregatePipeline).exec();
        let count = 0;
        if (result?.length > 0) {
            count = (result[0] as { count: number }).count;
        }
        return count;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Retrieve Order size'), LogType.ERROR);
        throw error;
    }
    
};

/**
 * Get revenue / sum if service fee of completed orders
 * @param {integer} durationType type of duration
 * @param {string} storeId end index
 * @return {integer} serviceFee Sum
 */
export const getRevenueByDurationAndStoreId: GetRevenueByDurationAndStoreIdFunc = async (durationType, storeId) => {
    try {
        const duration = DurationUtil.getDuration(durationType);
        const aggregatePipeline: any[] = [
            {
                $match: {
                    isDelivered: true, 
                    deliveredDate: { $gte: duration }
                }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    totalRevenue: { $sum: '$serviceFee' }
                }
            }
        ];
    
        if (storeId) {
            // Add the branchId condition to the $match object if storeId is available
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            aggregatePipeline[0].$match.branchId = storeId;
        }
    
        const result = await OrderECommerceModel.aggregate(aggregatePipeline).exec();
        let count = 0;
        let totalRevenue = 0;
        if (result?.length > 0) {
            count = (result[0] as { count: number }).count;
            totalRevenue = (result[0] as { totalRevenue: number }).totalRevenue;
        }
    
        return totalRevenue;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Retrieve revenue'), LogType.ERROR);
        throw error;
    }
};
