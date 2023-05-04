'use strict';

import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { IOrderDTO } from '../type/orderType';
import { buildErrorMessage, buildInfoMessageMethodCall
    , buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import { IUser, UserAddress } from '../type/IUserType';
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

