'use strict';

import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { SendEmailFunc } from '../type/emailServiceType';
import EmailClient from '../util/awsSESBuilder';
import { buildErrorMessage } from '../util/logMessageBuilder';
import { serviceErrorBuilder } from '../util/serviceErrorBuilder';

const Logging = Logger(__filename);

export const sendEmail: SendEmailFunc = async (emails) => {
    try {
        const emailClientInstance = new EmailClient().getInstance();

        const params = {
            Source: 'thathsararaviraj@gmail.com',
            Destination: {
                ToAddresses: [
                    ...emails
                ]
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: 'This is the body of my email!'
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: 'Hello, Thathsara!'
                }
            }
        };
        await emailClientInstance.sendEmail(params).promise();
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Send Email'), LogType.ERROR);
        throw error;
    }
};
