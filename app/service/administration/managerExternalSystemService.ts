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
import { IManagerExternalSystem } from '../../type/IManagerExternalSystem';
import { INVALID_CREDENTIALS_ERROR_MESSAGE, SYSTEM_NOT_FOUND_ERROR_MESSAGE } from '../../const/errorMessage';
import { getExternalSystemById } from './externalSystemService';
import { IExternalSystemDTO } from '../../type/IExternalSystem';
import { CreateManagerExternalSystemFunc,
    GetExternalSystemByManagerIdFunc,
    GetManagerByIdFunc,
    RequestManagerExternalSystemTokenFunc } from '../../type/managerExternalSystemServiceType';
import { ManagerExternalSystemModel, saveManagerExternalSystemUser } from '../../data/model/ManagerExternalSystemModel';

const Logging = Logger(__filename);

/**
 * Create new manager external system
 * @param {IManagerExternalSystem} managerExternalSystem
 * @returns {Promise<IManagerExternalSystem>}
 */
export const createManagerExternalSystem: CreateManagerExternalSystemFunc = async (managerExternalSystem) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Create manager external system', `manager email: ${managerExternalSystem.managerEmail}`), LogType.INFO);
        const password = managerExternalSystem.managerPassword;
        const hashedPassword = await hashPassword(password);
        managerExternalSystem.managerPassword = hashedPassword;
        const data = await saveManagerExternalSystemUser(managerExternalSystem);
        Logging.log(buildInfoMessageUserProcessCompleted('Manager external system insertion', `System Data:
            ${JSON.stringify(data)}` ), LogType.INFO);
        return data;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Create manager external system'), LogType.ERROR);
        throw error;
    }
};

/**
 * Manager external system request for access token, send JWT access token
 * @param {string} username Manager external system username
 * @param {string} password Manager external system password
 * @returns {Promise<string>}
 */
export const getManagerExternalSystemToken: RequestManagerExternalSystemTokenFunc = async (username, password) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get manager external system token', `manager username: ${username}`), LogType.INFO);
        const managerSystemByUsername = 
            await ManagerExternalSystemModel.findOne({ 'managerUsername': username }).exec();
        if (managerSystemByUsername) {
            const isValidPassword = await compareHash(password, managerSystemByUsername.managerPassword);
            if (isValidPassword) {
                const claims = {
                    roles: Roles.MANAGER as string,
                    id: managerSystemByUsername._id as unknown as string
                };
                const successResponse = { token: generateJWT(claims, JWT_TYPE.SHORT_LIVE), roles: Roles.MANAGER
                };
                Logging.log(buildInfoMessageUserProcessCompleted('Get manager external system token', `System Token:
                    ${JSON.stringify(successResponse.token)}` ), LogType.INFO);
                return successResponse;
            }
        }
        throw new ServiceError(ErrorType.UNAUTHORIZED, INVALID_CREDENTIALS_ERROR_MESSAGE, '', HTTPUserError.
            UNAUTHORIZED_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get manager external system token'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get manager external system by ID
 * @param {string} id Manager external system id
 * @returns {Promise<IManagerExternalSystem>}
 */

export const getManagerExternalSystemById: GetManagerByIdFunc = async (id) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get manager external system by id', `manager id: ${id}`), LogType.INFO);
        const data = await ManagerExternalSystemModel.findById(id) as IManagerExternalSystem;
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
 * @param {string} id Manager external system id
 * @returns {Promise<IExternalSystemDTO>}
 */

export const getManagerExternalSystemByManagerAssociatedId: GetExternalSystemByManagerIdFunc = async (id) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get external system by manager id', `manager id: ${id}`), LogType.INFO);
        const data = await ManagerExternalSystemModel.findById(id) as IManagerExternalSystem;
        const externalSystemId = data.externalSystemId;
        const externalSystemInfo = await getExternalSystemById(externalSystemId);
        const preparedData: IExternalSystemDTO = {
            extSysEmail: externalSystemInfo.extSysEmail,
            extSysName: externalSystemInfo.extSysName,
            extSysAddress: externalSystemInfo.extSysAddress,
            fiscalInfo: externalSystemInfo.fiscalInfo,
            id: externalSystemInfo.id
        };
        if (preparedData) {
            return preparedData;
        } 
        throw new ServiceError(
            ErrorType.SYSTEM_RETRIEVAL_ERROR, SYSTEM_NOT_FOUND_ERROR_MESSAGE, '', HTTPUserError.NOT_FOUND_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get external system by id manager id'), LogType.ERROR);
        throw error;
    }
};
