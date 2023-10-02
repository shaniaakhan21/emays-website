'use strict';

import LogType from '../../const/logType';
import { Roles } from '../../const/roles';
import { ExternalSystemModel, saveExternalSystem } from '../../data/model/ExternalSystemModel';
import { Logger } from '../../log/logger';
import { CreateExternalSystemFunc, GetExternalSystemByIdFunc
    , RequestExternalSystemTokenFunc } from '../../type/orderServiceType';
import { buildErrorMessage, buildInfoMessageMethodCall
    , buildInfoMessageUserProcessCompleted } from '../../util/logMessageBuilder';
import { compareHash, hashPassword } from '../../util/passwordUtil';
import { serviceErrorBuilder } from '../../util/serviceErrorBuilder';
import { generateJWT } from '../../util/jwtUtil';
import { JWT_TYPE } from '../../type/IJWTClaims';
import ServiceError from '../../type/error/ServiceError';
import ErrorType from '../../const/errorType';
import { HTTPUserError } from '../../const/httpCode';
import { IExternalSystem, IExternalSystemDTO } from '../../type/IExternalSystem';
import { INVALID_CREDENTIALS_ERROR_MESSAGE, SYSTEM_NOT_FOUND_ERROR_MESSAGE } from '../../const/errorMessage';

const Logging = Logger(__filename);

/**
 * Create new external system
 * @param {IExternalSystem} externalSystem
 * @returns {Promise<IExternalSystemDTO>}
 */
export const createExternalSystem: CreateExternalSystemFunc = async (externalSystem) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Create external system', `ext email: ${externalSystem.extSysEmail}`), LogType.INFO);
        const password = externalSystem.extSysPassword;
        const hashedPassword = await hashPassword(password);
        externalSystem.extSysPassword = hashedPassword;
        const data = await saveExternalSystem(externalSystem);
        Logging.log(buildInfoMessageUserProcessCompleted('External system insertion', `System Data:
            ${JSON.stringify(data)}` ), LogType.INFO);
        return data;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Create external system'), LogType.ERROR);
        throw error;
    }
};

/**
 * External system request for access token, send JWT access token
 * @param {string} username External system username
 * @param {string} password External system password
 * @returns {Promise<string>}
 */
export const getExternalSystemToken: RequestExternalSystemTokenFunc = async (username, password) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get external system token', `ext username: ${username}`), LogType.INFO);
        const systemByUsername = await ExternalSystemModel.findOne({ 'extSysUsername': username }).exec();
        if (systemByUsername) {
            const isValidPassword = await compareHash(password, systemByUsername.extSysPassword);
            if (isValidPassword) {
                const claims = {
                    roles: Roles.EXTERNAL_SYSTEM as string,
                    id: systemByUsername._id as unknown as string
                };
                const successResponse = { token: generateJWT(claims, JWT_TYPE.EXTERNAL_SYSTEM)
                };
                Logging.log(buildInfoMessageUserProcessCompleted('Get external system token', `System Token:
                    ${JSON.stringify(successResponse.token)}` ), LogType.INFO);
                return successResponse;
            }
        }
        throw new ServiceError(ErrorType.UNAUTHORIZED, INVALID_CREDENTIALS_ERROR_MESSAGE, '', HTTPUserError.
            UNAUTHORIZED_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get external system token'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get external system by ID
 * @param {string} id External system id
 * @returns {Promise<IExternalSystemDTO>}
 */

export const getExternalSystemById: GetExternalSystemByIdFunc = async (id) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get external system by id', `ext id: ${id}`), LogType.INFO);
        const data = await ExternalSystemModel.findById(id) as IExternalSystemDTO;
        if (data) {
            return data;
        } 
        throw new ServiceError(
            ErrorType.SYSTEM_RETRIEVAL_ERROR, SYSTEM_NOT_FOUND_ERROR_MESSAGE, '', HTTPUserError.NOT_FOUND_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get external system by id'), LogType.ERROR);
        throw error;
    }
};
