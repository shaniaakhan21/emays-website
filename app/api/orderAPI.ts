'use strict';

import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { IOrderContext } from '../type/IOrderContext';
import { buildErrorMessage, buildInfoMessageMethodCall
    , buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';

const Logging = Logger(__filename);

/**
 * Handler save order business logic
 * @param orderDetails: IOrderContext
 * @returns Promise
 */
export const saveOrder = async (
    orderDetails: IOrderContext
): Promise<string> => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Save Order', `User: ${orderDetails.uid} ${orderDetails.email}`), LogType.INFO);
        const result = await saveOrder(orderDetails);
        Logging.log(buildInfoMessageUserProcessCompleted(
            'Save Order', `User: ${orderDetails.uid} ${orderDetails.email}`), LogType.INFO);
        return result;
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Save Order'), LogType.ERROR);
        throw error;
    }
};
