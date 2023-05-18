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
import axios from 'axios';
import { config } from '../config/config';
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

const Logging = Logger(__filename);

/**
 * Create new order
 * @param {IOrderDTO} order Order object
 * @returns {Promise<IOrder>} Promise with order data
 */
export const validateRecaptcha = async (responseKey: string) => {
    try {
        // Const res = await createAssessment({ token: responseKey });
        const res = await axios.get<{ success: boolean }>(`https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(config.RECAPTCHA_SECRET)}&response=${encodeURIComponent(responseKey)}`);
        if (res.data.success) {
            return true;
        }
        return false;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Recaptcha validation failed'), LogType.ERROR);
        throw error;
    }
};

/**
 * Create an assessment to analyze the risk of an UI action. Note that
 * this example does set error boundaries and returns `null` for
 * exceptions.
 *
 * projectID: GCloud Project ID
 * recaptchaSiteKey: Site key obtained by registering a domain/app to use recaptcha services.
 * token: The token obtained from the client on passing the recaptchaSiteKey.
 * recaptchaAction: Action name corresponding to the token.
 */
const createAssessment = async ({
    projectID = config.RECAPTCHA_PROJECT_ID,
    recaptchaSiteKey = config.RECAPTCHA_SITE_KEY,
    token = '',
    recaptchaAction = 'letsTalk'
}) => {
    /*
     * Create the reCAPTCHA client & set the project path. There are multiple
     * ways to authenticate your client. For more information see:
     * https://cloud.google.com/docs/authentication
     * TODO: To avoid memory issues, move this client generation outside
     * of this example, and cache it (recommended) or call client.close()
     * before exiting this method.
     */
    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = client.projectPath(projectID);

    // Build the assessment request.
    const request = ({
        assessment: {
            event: {
                token: token,
                siteKey: recaptchaSiteKey
            }
        },
        parent: projectPath
    });

    // Client.createAssessment() can return a Promise or take a Callback
    const [response] = await client.createAssessment(request);

    // Check if the token is valid.
    if (!response?.tokenProperties?.valid) {
        return null;
    }

    /*
     * Check if the expected action was executed.
     * The `action` property is set by user client in the
     * grecaptcha.enterprise.execute() method.
     */
    if (response.tokenProperties.action === recaptchaAction) {

        /*
         * Get the risk score and the reason(s).
         * For more information on interpreting the assessment,
         * see: https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
         */
        response?.riskAnalysis?.reasons?.map?.(console.log);
        return response?.riskAnalysis?.score;
    }
    return null;

};
