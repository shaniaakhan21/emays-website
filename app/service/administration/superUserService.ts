'use strict';

import LogType from '../../const/logType';
import { Roles } from '../../const/roles';
import { Logger } from '../../log/logger';
import { buildErrorMessage, buildInfoMessageMethodCall
    , buildInfoMessageUserProcessCompleted } from '../../util/logMessageBuilder';
import { compareHash, hashPassword } from '../../util/passwordUtil';
import { serviceErrorBuilder } from '../../util/serviceErrorBuilder';
import { generateJWT } from '../../util/jwtUtil';
import { JWT_TYPE } from '../../type/IJWTClaims';
import ServiceError from '../../type/error/ServiceError';
import ErrorType from '../../const/errorType';
import { HTTPUserError } from '../../const/httpCode';
import { INVALID_CREDENTIALS_ERROR_MESSAGE, SUPE_USER_NOT_FOUND_ERROR_MESSAGE } from '../../const/errorMessage';
import { CreateSuperUserFunc, GetSuperUserByIdFunc, RequestSuperUserTokenFunc } from '../../type/superUserServiceType';
import { SuperUserModel, saveSuperUser } from '../../data/model/SuperUserModel';
import { ISuperUser } from '../../type/ISuperUser';

const Logging = Logger(__filename);

/**
 * Create new super user
 * @param {ISuperUser} superUser
 * @returns {Promise<ISuperUserDTO>}
 */
export const createSuperUser: CreateSuperUserFunc = async (superUser) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Create super user', `ext email: ${superUser.email}`), LogType.INFO);
        const password = superUser.password;
        const hashedPassword = await hashPassword(password);
        superUser.password = hashedPassword;
        const data = await saveSuperUser(superUser);
        Logging.log(buildInfoMessageUserProcessCompleted('Super User insertion', `System Data:
            ${JSON.stringify(data)}` ), LogType.INFO);
        return data;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Create super user'), LogType.ERROR);
        throw error;
    }
};

/**
 * Super user request for access token, send JWT access token
 * @param {string} username Super user username
 * @param {string} password Super user password
 * @returns {Promise<string>}
 */
export const getSuperUserToken: RequestSuperUserTokenFunc = async (username, password) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get super user token', `ext username: ${username}`), LogType.INFO);
        const superUserByUsername = await SuperUserModel.findOne({ 'username': username }).exec();
        if (superUserByUsername) {
            const isValidPassword = await compareHash(password, superUserByUsername.password);
            if (isValidPassword) {
                const claims = {
                    roles: Roles.SUPER as string,
                    id: superUserByUsername._id as unknown as string
                };
                const successResponse = { token: generateJWT(claims, JWT_TYPE.SHORT_LIVE)
                };
                Logging.log(buildInfoMessageUserProcessCompleted('Get super user token', `Super USer Token:
                    ${JSON.stringify(successResponse.token)}` ), LogType.INFO);
                return successResponse;
            }
        }
        throw new ServiceError(ErrorType.UNAUTHORIZED, INVALID_CREDENTIALS_ERROR_MESSAGE, '', HTTPUserError.
            UNAUTHORIZED_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get super user token'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get super user by ID
 * @param {string} id Super user id
 * @returns {Promise<ISuperUserDTO>}
 */

export const getSuperUserById: GetSuperUserByIdFunc = async (id) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get super user by id', `ext id: ${id}`), LogType.INFO);
        const data = await SuperUserModel.findById(id) as ISuperUser;
        if (data) {
            return data;
        } 
        throw new ServiceError(
            ErrorType.SUPER_USER_RETRIEVAL_ERROR, SUPE_USER_NOT_FOUND_ERROR_MESSAGE, '', HTTPUserError.NOT_FOUND_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get super user by id'), LogType.ERROR);
        throw error;
    }
};
