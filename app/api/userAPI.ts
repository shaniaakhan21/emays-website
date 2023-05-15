'use strict';

import * as moment from 'moment';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { IOrderDTO } from '../type/orderType';
import { buildErrorMessage, buildInfoMessageMethodCall
    , buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import { IUser, UserAddress } from '../type/IUserType';
import { ExternalSystemModel } from '../data/model/ExternalSystemModel';
import { OrderModel } from '../data/model/OrderModel';
const Logging = Logger(__filename);

/**
 * Extract user payload for the launch
 * @param order: IOrderDTO
 * @returns IUser
 */
export const prepareUserPayload = (order: IOrderDTO): IUser => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Build user payload', `UID: ${order.uid as string}`), LogType.INFO);
        const launchTemplateDataUser: IUser = {
            email: order.email as string,
            firstName: order.firstName as string,
            lastName: order.lastName as string,
            phoneNumber: order.phoneNumber as string,
            retailerEmail: order.email as string,
            date: order.date as Date,
            uid: order.uid as string,
            startTime: order.startTime as string,
            endTime: order.endTime as string,
            timeZone: order.timeZone as string,
            experience: order.experience as string,
            address: order.address as UserAddress,
            deliveryInfo: order.deliveryInfo,
            serviceFee: order.serviceFee
        };
        Logging.log(buildInfoMessageUserProcessCompleted(
            'Build launch path', `UID: ${order.uid as string}`), LogType.INFO);
        return launchTemplateDataUser;
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'prepare userPayload'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get dashboard summary
 * @param {string} id retailer id
 * @returns {void}
 */

export const prepareRetailerDashboardSummary = async (id: string): Promise<{ revenueThisYear: number, revenueThisMonth: number, averageTicket: number, totalOrders: number }> => {
    const retailerInfo = await ExternalSystemModel.findById(id);
    const thisYearStart = moment().startOf('year').toDate();

    const revenueThisYear = await OrderModel.aggregate<{ total: number }>([
        {
            $match: {
                retailerEmail: retailerInfo?.extSysEmail,
                date: { $gte: thisYearStart }
            }
        },
        {
            $unwind: '$orderItems'
        },
        {
            $project: {
                total: { $multiply: [{ $toInt: '$orderItems.productCost' }, '$orderItems.productQuantity'] }
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: '$total' }
            }
        }
    ]);

    const thisMonthStart = moment().startOf('month').toDate();

    const statsThisMonth = await OrderModel.aggregate<{ total: number, count: number, average: number }>([
        {
            $match: {
                retailerEmail: retailerInfo?.extSysEmail,
                date: { $gte: thisMonthStart }
            }
        },
        {
            $unwind: '$orderItems'
        },
        {
            $project: {
                total: { $multiply: [{ $toInt: '$orderItems.productCost' }, '$orderItems.productQuantity'] }
            }
        },
        {
            $group: {
                _id: '$_id',
                total: { $sum: '$total' }
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: '$total' },
                count: { $sum: 1 },
                average: { $avg: '$total' }
            }
        }
    ]);

    return {
        revenueThisYear: revenueThisYear[0]?.total || 0,
        revenueThisMonth: statsThisMonth[0]?.total || 0,
        averageTicket: statsThisMonth[0]?.average || 0,
        totalOrders: statsThisMonth[0]?.count || 0
    };
};
