/* eslint-disable max-lines */
/* eslint-disable max-len */
'use strict';

import { IOrder, IOrderDTO } from '../type/orderType';
import { Logger } from '../log/logger';
import { buildErrorMessage } from '../util/logMessageBuilder';
import LogType from '../const/logType';
import { serviceErrorBuilder } from '../util/serviceErrorBuilder';
import { sendEmailForLetsTalk } from './emailService';
import { LetsTalkEmailData } from '../type/emailServiceType';

const Logging = Logger(__filename);

/**
 * Create new order
 * @param {IOrderDTO} order Order object
 * @returns {Promise<IOrder>} Promise with order data
 */
export const sendLetsTalkEmail = async (data: LetsTalkEmailData) => {
    try {
        await sendEmailForLetsTalk(data);
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Send Email for Let\'s Talk'), LogType.ERROR);
        throw error;
    }
};
