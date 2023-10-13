'use strict';

import LogType from '../../const/logType';
import { ExternalSystemModel } from '../../data/model/ExternalSystemModel';
import { Logger } from '../../log/logger';
import { buildErrorMessage, buildInfoMessageMethodCall
    , buildInfoMessageUserProcessCompleted } from '../../util/logMessageBuilder';
import { serviceErrorBuilder } from '../../util/serviceErrorBuilder';
import ServiceError from '../../type/error/ServiceError';
import ErrorType from '../../const/errorType';
import { HTTPUserError } from '../../const/httpCode';
import { USERNAME_RESERVED } from '../../const/errorMessage';
import { CreateLoginFunc } from '../../type/commonLoginServiceType';
import { AdminExternalSystemModel } from '../../data/model/AdminExternalSystemModel';
import { SuperUserModel } from '../../data/model/SuperUserModel';

const Logging = Logger(__filename);

/**
 * Check username in common
 * @param {string} username
 * @returns {Promise<Boolean>}
 */
export const checkUsernameInCommon: CreateLoginFunc = async (username) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Check username in common', `username: ${username}`), LogType.INFO);
        
        // Check usernames in common in different schemas
        const isUsernameReservedInExternalSystem = await ExternalSystemModel.
            findOne({ 'extSysUsername': username }).exec();
        const isUsernameReservedInAdmin = await AdminExternalSystemModel.findOne({ 'adminUsername': username }).exec();
        const isUsernameReservedInSuperUser = await SuperUserModel.findOne({ 'username': username }).exec();
        
        if (isUsernameReservedInAdmin || isUsernameReservedInExternalSystem || isUsernameReservedInSuperUser) {
            throw new ServiceError(
                ErrorType.DATABASE_ERROR, USERNAME_RESERVED, '', HTTPUserError
                    .CONFLICT_ERROR_CODE);
        }
        Logging.log(buildInfoMessageUserProcessCompleted('Check username in common', `Username:
            ${JSON.stringify(username)}` ), LogType.INFO);
        return true;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Username in common'), LogType.ERROR);
        throw error;
    }
};
