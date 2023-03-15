/* eslint-disable camelcase */
'use strict';

import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { GetAccessToken, GetRedirectionURL, SendCalenderEvent } from '../type/calendarServiceType';
import { buildErrorMessage, buildInfoMessageMethodCall
    , buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import { serviceErrorBuilder } from '../util/serviceErrorBuilder';
import { config } from '../config/config';
import { google, calendar_v3 } from 'googleapis';
import { OAuth2ClientOptions } from 'google-auth-library';
import * as moment from 'moment';
import { retrieveOrderDetailsByUserId } from './orderService';

const Logging = Logger(__filename);

const clientOptions: OAuth2ClientOptions = {
    clientId: config.GOOGLE.OAUTH2.CLIENT.CLIENT_ID,
    clientSecret: config.GOOGLE.OAUTH2.CLIENT.CLIENT_SECRET,
    redirectUri: config.GOOGLE.OAUTH2.CLIENT.REDIRECTION_URL
};

const oAuthClient = new google.auth.OAuth2(
    clientOptions
);

// Get redirection URL for requesting user calender access
export const getRedirectionURL: GetRedirectionURL = (uuid) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get redirection URL', `user: ${uuid}`), LogType.INFO);
        const redirectURL = oAuthClient.generateAuthUrl({
            scope: config.GOOGLE.OAUTH2.SCOPE,
            state: uuid
        });
        Logging.log(buildInfoMessageUserProcessCompleted('Get redirection URL', `uuid:
            ${uuid}` ), LogType.INFO);
        return redirectURL;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Prepare Calendar Event Data'), LogType.ERROR);
        throw error;
    }
};

// Get access token from the redirection page data
export const getAccessToken: GetAccessToken = async (code) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get token', ''), LogType.INFO);
        const data = await oAuthClient.getToken(code);
        Logging.log(buildInfoMessageUserProcessCompleted('Get token', '' ), LogType.INFO);
        return data;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Get google oauth access token'), LogType.ERROR);
        throw error;
    }
};

// Create event on user calender
export const createEvent: SendCalenderEvent = async (uid, scope, accessToken, expiryDate, tokenType) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Send calendar event', `ui: ${uid}`), LogType.INFO);
        const orderData = await retrieveOrderDetailsByUserId(uid);
        const startDateTime = prepareDateTime(orderData.date as Date, orderData.startTime as string);
        const endDateTime = prepareDateTime(orderData.date as Date, orderData.endTime as string);
        const address: string = prepareAddress(orderData?.address?.addOne as 
            string, orderData?.address?.addTwo as string, orderData?.address?.addThree as
            string, orderData?.address?.addFour as string);
        const credentials = {
            'access_token': accessToken,
            'scope': scope,
            'token_type': tokenType,
            'expiry_date': expiryDate
        };
        const timeZone = orderData?.timeZone;
        oAuthClient.setCredentials(credentials);
        const calendar = google.calendar({ version: 'v3', auth: oAuthClient });
        const event: calendar_v3.Schema$Event = {
            summary: config.GOOGLE.CALENDER.SUMMERY,
            location: address,
            description: config.GOOGLE.CALENDER.DESCRIPTION,
            start: {
                dateTime: startDateTime,
                timeZone: timeZone
            },
            end: {
                dateTime: endDateTime,
                timeZone: timeZone
            }
        };
        const calendarId = 'primary';
        calendar.events.insert({ calendarId, requestBody: event }, (err, res) => {
            if (err) {
                throw err;
            }
            Logging.log(buildInfoMessageUserProcessCompleted('Create calender event', `uid: ${uid}` ), LogType.INFO);
        });
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Send Calendar Event'), LogType.ERROR);
        throw error;
    }
};

const prepareAddress = (addOne: string, addTwo: string, addThree: string, addFour: string ): string => {
    return `${addOne}, ${addTwo}, ${addThree}, ${addFour}`;
};

const prepareDateTime = (date: Date, time: string): string => {
    try {
        // Prepare full date
        const dateExt = moment.utc(date);
        const [hours, minutes] = time.split(':');
        dateExt.add(hours, 'hours');
        dateExt.add(minutes, 'minutes');
        const preparedDate = dateExt.utc().format('YYYY-MM-DDTHH:mm:ss.SSS');
        return preparedDate;

    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Prepare Date Time'), LogType.ERROR);
        throw error;
    }
};
