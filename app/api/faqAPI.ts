'use strict';

import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { buildErrorMessage, buildInfoMessageMethodCall
    , buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import { FAQ, IFAQDTO } from '../type/faqType';
import { FAQModel } from '../data/model/FAQModel';
import { ERROR_DOCUMENT_NOT_FOUND } from '../const/errorMessage';
const Logging = Logger(__filename);

/**
 * Create new faq
 * @returns {IFAQDTO} Created FAQ
 * @param {FAQ} faq
 */
export const createFAQ = async (faq: FAQ): Promise<IFAQDTO> => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Create new FAQ', ''), LogType.INFO);
        const createdFAQ = await new FAQModel(faq).save();
        Logging.log(buildInfoMessageUserProcessCompleted(
            'Created new FAQ', `ID: ${createdFAQ._id.toString()}`), LogType.INFO);
        return createdFAQ;
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Create FAQ'), LogType.ERROR);
        throw error;
    }
};

/**
 * Update single faq
 * @returns {IFAQDTO} Created FAQ
 * @param faq {IFAQDTO}
 */
export const updateFAQ = async (faq: IFAQDTO): Promise<IFAQDTO> => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Update FAQ', `ID: ${faq._id!.toString()}`), LogType.INFO);
        const faqDocument = await FAQModel.findById(faq._id);
        if (!faqDocument) {
            throw new Error(ERROR_DOCUMENT_NOT_FOUND);
        }
        faqDocument.question = faq.question;
        faqDocument.answer = faq.answer;
        const updatedFAQ = await faqDocument.save() as unknown as IFAQDTO;
        Logging.log(buildInfoMessageUserProcessCompleted(
            'Updated FAQ', `ID: ${updatedFAQ._id!.toString()}`), LogType.INFO);
        return updatedFAQ;
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Update FAQ'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get all faqs
 * @returns {IFAQDTO[]} FAQ List
 */
export const getAllFAQ = async (faq: IFAQDTO): Promise<IFAQDTO[]> => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Update FAQ', ''), LogType.INFO);
        const faqs = await FAQModel.find();
        Logging.log(buildInfoMessageUserProcessCompleted(
            'Updated FAQ', ''), LogType.INFO);
        return faqs;
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Get all FAQs'), LogType.ERROR);
        throw error;
    }
};

