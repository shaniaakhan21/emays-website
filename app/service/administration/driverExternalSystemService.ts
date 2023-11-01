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
import { INVALID_CREDENTIALS_ERROR_MESSAGE } from '../../const/errorMessage';
import { CreateDriverFunc, RequestDriverTokenFunc } from '../../type/driverServiceType';
import { DriverModel, saveDriver } from '../../data/model/DriverModel';

const Logging = Logger(__filename);

/**
 * Create new driver
 * @param {IDriver} driverData
 * @returns {Promise<IDriverDTO>}
 */
export const createDriver: CreateDriverFunc = async (driver) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Create driver', `driver name: ${driver.firstName}`), LogType.INFO);
        const password = driver.driverPassword;
        const hashedPassword = await hashPassword(password);
        driver.driverPassword = hashedPassword;
        const data = await saveDriver(driver);
        Logging.log(buildInfoMessageUserProcessCompleted('Driver registration', `Driver Data:
            ${JSON.stringify(data)}` ), LogType.INFO);
        return data;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Register driver'), LogType.ERROR);
        throw error;
    }
};

/**
 * Driver request for access token, send JWT access token
 * @param {string} username Driver username
 * @param {string} password Driver password
 * @returns {Promise<string>}
 */
export const getDriverToken: RequestDriverTokenFunc = async (username, password) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get driver token', `driver username: ${username}`), LogType.INFO);
        const driverByUsername = await DriverModel.findOne({ 'driverUsername': username }).exec();
        if (driverByUsername) {
            const isValidPassword = await compareHash(password, driverByUsername.driverPassword);
            if (isValidPassword) {
                const claims = {
                    roles: Roles.DRIVER as string,
                    id: driverByUsername._id as unknown as string
                };
                const successResponse = { token: generateJWT(claims, JWT_TYPE.SHORT_LIVE), roles: Roles.DRIVER
                };
                Logging.log(buildInfoMessageUserProcessCompleted('Get driver token', `Driver Token:
                    ${JSON.stringify(successResponse.token)}` ), LogType.INFO);
                return successResponse;
            }
        }
        throw new ServiceError(ErrorType.UNAUTHORIZED, INVALID_CREDENTIALS_ERROR_MESSAGE, '', HTTPUserError.
            UNAUTHORIZED_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get driver token'), LogType.ERROR);
        throw error;
    }
};
