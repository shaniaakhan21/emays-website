'use strict';

import { buildAppLaunchPath } from '../api/launchAPI';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { SendEmailFunc } from '../type/emailServiceType';
import EmailClient from '../util/awsSESBuilder';
import { buildErrorMessage } from '../util/logMessageBuilder';
import { serviceErrorBuilder } from '../util/serviceErrorBuilder';
import * as moment from 'moment';

const Logging = Logger(__filename);

export const sendEmailForOrderingItems: SendEmailFunc = async (emailInfo, template) => {
    try {
        const emailClientInstance = new EmailClient().getInstance();
        const templatePath: string = await buildAppLaunchPath(template);
        const [completeDate, completeTime]: Array<string> = 
            prepareDateTime(emailInfo.date, emailInfo.startTime, emailInfo.endTime);
        const fullName: string = prepareFullName(emailInfo.firstName, emailInfo.lastName);
        const experience: string = emailInfo.experience;
        const { addOne, addTwo, addThree, addFour } = emailInfo.address;
        const address: string = prepareAddress(addOne, addTwo, addThree, addFour);
        const items: Array<object> = emailInfo.orderItems;
        const uid: string = emailInfo.uid;
        const finalCost: number | undefined = emailInfo?.finalCost;
        // eslint-disable-next-line max-len
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-call
        const data = await require('ejs').renderFile(templatePath, { 'firstName': emailInfo.firstName
            , 'date': completeDate, 'time': completeTime, 'fullName': fullName, 'experience': experience
            , 'address': address, 'items': items, 'uid': uid, 'finalCost': finalCost }) as string;
        
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
                    Data: `EMAYS Order Confirmation For - ${emailInfo.firstName}`
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

const prepareDateTime = (date: Date, startTime: string, endTime: string): Array<string> => {

    // Prepare full date
    const dayExt: string = moment(date, 'YYYY-MM-DD').format('ddd');
    const monthExt: string = moment(date, 'YYYY-MM-DD').format('MMMM');
    const dateExt: string = moment(date, 'YYYY-MM-DD').format('D');
    const yearExt: string = moment(date, 'YYYY-MM-DD').format('YYYY');
    const fullDate = `${dayExt} ${dateExt}, ${monthExt} ${yearExt}`;

    // Prepare full time
    const hour = `${startTime} to ${endTime}`;
    return [fullDate, hour];
};

const prepareFullName = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName}`;
};

const prepareAddress = (addressLineOne: string, addressLineTwo: string,
    addressLineThree: string, addressLineFour: string) => {
    return `${addressLineOne}, ${addressLineTwo}, ${addressLineThree}, ${addressLineFour}`;
};
