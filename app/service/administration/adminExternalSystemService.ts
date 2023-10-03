'use strict';

import LogType from '../../const/logType';
import { Roles } from '../../const/roles';
import { AdminExternalSystemModel, saveAdminExternalSystemUser } from '../../data/model/AdminExternalSystemModel';
import { Logger } from '../../log/logger';
import { CreateAdminExternalSystemFunc,
    GetAdminByIdFunc, GetExternalSystemByAdminIdFunc,
    RequestAdminExternalSystemTokenFunc } from '../../type/adminExternalSystemServiceType';
import { buildErrorMessage, buildInfoMessageMethodCall
    , buildInfoMessageUserProcessCompleted } from '../../util/logMessageBuilder';
import { compareHash, hashPassword } from '../../util/passwordUtil';
import { serviceErrorBuilder } from '../../util/serviceErrorBuilder';
import { generateJWT } from '../../util/jwtUtil';
import { JWT_TYPE } from '../../type/IJWTClaims';
import ServiceError from '../../type/error/ServiceError';
import ErrorType from '../../const/errorType';
import { HTTPUserError } from '../../const/httpCode';
import { IAdminExternalSystem } from '../../type/IAdminExternalSystem';
import { INVALID_CREDENTIALS_ERROR_MESSAGE, SYSTEM_NOT_FOUND_ERROR_MESSAGE } from '../../const/errorMessage';
import { getExternalSystemById } from './externalSystemService';

const Logging = Logger(__filename);

/**
 * Create new admin external system
 * @param {IAdminExternalSystem} adminExternalSystem
 * @returns {Promise<IAdminExternalSystem>}
 */
export const createAdminExternalSystem: CreateAdminExternalSystemFunc = async (adminEternalSystem) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Create admin external system', `admin email: ${adminEternalSystem.adminEmail}`), LogType.INFO);
        const password = adminEternalSystem.adminPassword;
        const hashedPassword = await hashPassword(password);
        adminEternalSystem.adminPassword = hashedPassword;
        const data = await saveAdminExternalSystemUser(adminEternalSystem);
        Logging.log(buildInfoMessageUserProcessCompleted('Admin external system insertion', `System Data:
            ${JSON.stringify(data)}` ), LogType.INFO);
        return data;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Create admin external system'), LogType.ERROR);
        throw error;
    }
};

/**
 * Admin external system request for access token, send JWT access token
 * @param {string} username Admin external system username
 * @param {string} password Admin external system password
 * @returns {Promise<string>}
 */
export const getAdminExternalSystemToken: RequestAdminExternalSystemTokenFunc = async (username, password) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get admin external system token', `admin username: ${username}`), LogType.INFO);
        const adminSystemByUsername = await AdminExternalSystemModel.findOne({ 'adminUsername': username }).exec();
        if (adminSystemByUsername) {
            const isValidPassword = await compareHash(password, adminSystemByUsername.adminPassword);
            if (isValidPassword) {
                const claims = {
                    roles: Roles.ADMIN as string,
                    id: adminSystemByUsername._id as unknown as string
                };
                const successResponse = { token: generateJWT(claims, JWT_TYPE.SHORT_LIVE), roles: Roles.ADMIN
                };
                Logging.log(buildInfoMessageUserProcessCompleted('Get admin external system token', `System Token:
                    ${JSON.stringify(successResponse.token)}` ), LogType.INFO);
                return successResponse;
            }
        }
        throw new ServiceError(ErrorType.UNAUTHORIZED, INVALID_CREDENTIALS_ERROR_MESSAGE, '', HTTPUserError.
            UNAUTHORIZED_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get admin external system token'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get admin external system by ID
 * @param {string} id Admin external system id
 * @returns {Promise<IAdminExternalSystem>}
 */

export const getAdminExternalSystemById: GetAdminByIdFunc = async (id) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get admin external system by id', `admin id: ${id}`), LogType.INFO);
        const data = await AdminExternalSystemModel.findById(id) as IAdminExternalSystem;
        if (data) {
            return data;
        } 
        throw new ServiceError(
            ErrorType.SYSTEM_RETRIEVAL_ERROR, SYSTEM_NOT_FOUND_ERROR_MESSAGE, '', HTTPUserError.NOT_FOUND_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get admin external system by id'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get associated external system by admin ID
 * @param {string} id Admin external system id
 * @returns {Promise<IExternalSystemDTO>}
 */

export const getAdminExternalSystemByAdminAssociatedId: GetExternalSystemByAdminIdFunc = async (id) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get external system by admin id', `admin id: ${id}`), LogType.INFO);
        const data = await AdminExternalSystemModel.findById(id) as IAdminExternalSystem;
        const externalSystemId = data.externalSystemId;
        const externalSystemInfo = await getExternalSystemById(externalSystemId);
        if (externalSystemInfo) {
            return externalSystemInfo;
        } 
        throw new ServiceError(
            ErrorType.SYSTEM_RETRIEVAL_ERROR, SYSTEM_NOT_FOUND_ERROR_MESSAGE, '', HTTPUserError.NOT_FOUND_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get admin external system by id'), LogType.ERROR);
        throw error;
    }
};
