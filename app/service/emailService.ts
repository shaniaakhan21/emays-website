'use strict';

import { buildAppLaunchPath } from '../api/launchAPI';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { SendEmailFunc } from '../type/emailServiceType';
import EmailClient from '../util/awsSESBuilder';
import { buildErrorMessage } from '../util/logMessageBuilder';
import { serviceErrorBuilder } from '../util/serviceErrorBuilder';

const Logging = Logger(__filename);

export const sendEmail: SendEmailFunc = async (emailInfo) => {
    try {
        const emailClientInstance = new EmailClient().getInstance();
        const applicationPath: string = await buildAppLaunchPath('/template/temp.html');
        // eslint-disable-next-line max-len
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-call
        const data = await require('ejs').renderFile(applicationPath, { 'firstName': emailInfo.firstName }) as string;
        console.log('DATA: -------', data);
        const params = {
            Source: 'thathsararaviraj@gmail.com',
            Destination: {
                ToAddresses: [
                    emailInfo.email
                ]
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: data
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
