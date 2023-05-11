'use strict';

import { model } from 'mongoose';
import LogType from '../../const/logType';
import { Logger } from '../../log/logger';
import { buildErrorMessage } from '../../util/logMessageBuilder';
import { IFAQ, IFAQDTO } from '../../type/faqType';
import FAQSchema from '../schema/FAQSchema';

const Logging = Logger(__filename);

const MODEL_NAME = 'FAQ';
export const FAQModel = model<IFAQ>(MODEL_NAME, FAQSchema);

/**
 * Save order object wrapper
 * @param {IFAQ} faq New faq data
 * @returns {IFAQDTO} Returns FAQ db object
 */
export const saveFAQ = async (faq: IFAQ) => {
    try {
        const faqModel = new FAQModel(faq);
        const result: IFAQDTO = await faqModel.save();
        return result;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Save Order Details'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get all faqs
 * @returns {Array<IFAQDTO>} Returns faq details array
 */
export const getAllFAQs = async () => {
    try {
        const faqArray = await FAQModel.find().exec();
        return faqArray;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Retrieve Orders array based on indexes'), LogType.ERROR);
        throw error;
    }
};

