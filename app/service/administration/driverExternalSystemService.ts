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
import { DRIVER_NOT_FOUND_ERROR_MESSAGE, INVALID_CREDENTIALS_ERROR_MESSAGE } from '../../const/errorMessage';
import { CreateDriverFunc, RequestDriverInfoByIdFunc, RequestDriverTokenFunc } from '../../type/driverServiceType';
import { DriverModel, saveDriver } from '../../data/model/DriverModel';
import { IDriverDTO } from '../../type/IDriver';
import { GetCompletedOrdersByDriverId } from '../../type/orderServiceType';
import { IOrderPaginationDTO } from '../../type/orderType';
import { getCompletedOrderDocumentSizeByDriverId,
    getCompletedOrdersByStartAndEndIndexAndDriverId } from '../../data/model/OrderECommerceModel';

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

/**
 * Get driver info by driver id
 * @param {string} id Driver id
 * @returns {Promise<IDriverDTO>}
 */
export const getDriverById: RequestDriverInfoByIdFunc = async (driverId) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get driver by driver id', `driver id: ${driverId}`), LogType.INFO);
        const driverById = await DriverModel.findById(driverId).exec();
        if (driverById) {
            const driverInfo: IDriverDTO = {
                firstName: driverById?.firstName,
                lastName: driverById?.lastName,
                phoneNumber: driverById?.phoneNumber,
                address: driverById?.address,
                license: driverById?.license,
                billing: driverById?.billing,
                id: driverById?._id as unknown as string
            };
            Logging.log(buildInfoMessageUserProcessCompleted('Get driver token', `Driver Token:
                    ${JSON.stringify(driverById.id)}` ), LogType.INFO);
            return driverInfo;
        }
        throw new ServiceError(ErrorType.DRIVER_RETRIEVAL_ERROR, DRIVER_NOT_FOUND_ERROR_MESSAGE, '', HTTPUserError.
            NOT_FOUND_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get driver info by id'), LogType.ERROR);
        throw error;
    }
};

/**
 * Pagination order history by driver id
 * @param {string} page page
 * @param {string} pageLimit page limit
 * @param {string} driverId driver id
 * @returns {Promise<Array<IOrderDTO>>} Promise with array of order data
 */
export const getDriverOrderHistoryWithPagination: GetCompletedOrdersByDriverId = async (page,
    pageSize, driverId) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get order history by driver id', driverId), LogType.INFO);
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;

        const results: IOrderPaginationDTO = {};
        const documentSize = await getCompletedOrderDocumentSizeByDriverId(driverId);
        results.allPagesAvailable = Math.ceil(documentSize / pageSize);
        if (endIndex < documentSize) {
            results.next = {
                page: page + 1,
                limit: pageSize
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: pageSize
            };
        }
        const orderData = 
            await getCompletedOrdersByStartAndEndIndexAndDriverId(startIndex, pageSize, driverId);
        results.pages = orderData;
        return results;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Get completed order pagination by driver id'), LogType.ERROR);
        throw error;
    }
};
