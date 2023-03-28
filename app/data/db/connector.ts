'use strict';

import mongoose from 'mongoose';
import { config } from '../../config/config';
import { ISSUE_FOUND_WHILE_CONNECTING_DB_MESSAGE,
    ISSUE_FOUND_WHILE_DISCONNECTING_DB_MESSAGE } from '../../const/errorMessage';
import ErrorType from '../../const/errorType';
import { HTTPServerError } from '../../const/httpCode';
import LogType from '../../const/logType';

import { Logger } from '../../log/logger';
import ServiceError from '../../type/error/ServiceError';
import { buildErrorMessage, buildInfoMessageMethodCall
    , buildInfoMessageUserProcessCompleted } from '../../util/logMessageBuilder';

const Logging = Logger(__filename);

// Mongo DB Connection
export const connectToMongoDB = async () => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Connecting mongo db', 'app startup...'), LogType.INFO);
        await mongoose.connect('mongodb+srv://chathuranga:TFY2cFgXTqnBFm6p@jobsuae.v1' +
            'ivfl3.mongodb.net/emays?retryWrites=true&w=majority', {
            autoIndex: true
        });
        Logging.log(buildInfoMessageUserProcessCompleted(
            'Connecting mongo db', 'app startup...'), LogType.INFO);
    } catch (error) {
        const err = error as Error;
        const dbError = new ServiceError(ErrorType
            .DATABASE_ERROR, ISSUE_FOUND_WHILE_CONNECTING_DB_MESSAGE, err.
            message, HTTPServerError.INTERNAL_SERVER_ERROR_CODE);
        Logging.log(buildErrorMessage(dbError, 'Database'), LogType.ERROR);
        throw dbError;
    }
};

// Disconnect connection
export const disconnect = async () => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        const err = error as Error;
        const dbError = new ServiceError(ErrorType
            .DATABASE_ERROR, ISSUE_FOUND_WHILE_DISCONNECTING_DB_MESSAGE, err.
            message, HTTPServerError.INTERNAL_SERVER_ERROR_CODE);
        Logging.log(buildErrorMessage(dbError, 'Database Connection'), LogType.ERROR);
        throw dbError;
    }
};

export const prepareDBConnectionURL = (): string => {
    const { MONGO_URL } = config.DB;
    return MONGO_URL;
};

