'use strict';

import LogType from '../../const/logType';
import { Roles } from '../../const/roles';
import { ExternalSystemModel, deleteExternalSystemById, findOneAndUpdateIfExist, 
    getAllExternalSystems, 
    saveExternalSystem } from '../../data/model/ExternalSystemModel';
import { Logger } from '../../log/logger';
import { CreateExternalSystemFunc, DeleteExternalSystemsBySystemIdFunc, GetAllExternalSystemsFunc,
    GetExternalSystemByIdFunc
    , GetExternalSystemDeliveryOrderStatsFunc, GetExternalSystemHistoryStatsFunc,
    GetExternalSystemOverviewStatsFunc,
    PatchExternalSystemsBySystemIdFunc,
    RequestExternalSystemTokenFunc } from '../../type/orderServiceType';
import { ObjectId } from 'mongoose';
import { buildErrorMessage, buildInfoMessageMethodCall
    , buildInfoMessageUserProcessCompleted } from '../../util/logMessageBuilder';
import { compareHash, hashPassword } from '../../util/passwordUtil';
import { serviceErrorBuilder } from '../../util/serviceErrorBuilder';
import { generateJWT } from '../../util/jwtUtil';
import { JWT_TYPE } from '../../type/IJWTClaims';
import ServiceError from '../../type/error/ServiceError';
import ErrorType from '../../const/errorType';
import { HTTPUserError } from '../../const/httpCode';
import { IExternalSystemDTO } from '../../type/IExternalSystem';
import { INVALID_CREDENTIALS_ERROR_MESSAGE,
    SYSTEM_NOT_FOUND_ERROR_MESSAGE } from '../../const/errorMessage';
import { deleteOrdersBySystemId, getActiveOrdersCountByDurationAndStoreId, getAllOrderCountByDurationAndStoreId,
    getCompletedOrdersCountByDurationAndStoreId, 
    getOrdersDeliveryOrderPage, 
    getOrdersHistoryPage, 
    getOverviewAllOrderCountByDurationAndStoreId, 
    getRevenueForOverviewByDurationAndStoreId } from '../../data/model/OrderECommerceModel';
import { TimePeriod, TimePeriodDeliveryOrder, TimePeriodHistory } from '../../const/timePeriods';
import { deleteManagersBySystemId } from '../../data/model/ManagerExternalSystemModel';
import { deleteAdminsBySystemId } from '../../data/model/AdminExternalSystemModel';

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
 * Get all external systems
 * @returns {Promise<IExternalSystemDTO>}
 */
export const getAllExtSystems: GetAllExternalSystemsFunc = async () => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get all external systems', ''), LogType.INFO);
        const data = await getAllExternalSystems();
        return data;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Create external system'), LogType.ERROR);
        throw error;
    }
};

/**
 * Patch external system
 * @param {IExternalSystem} externalSystem
 * @returns {Promise<IExternalSystemDTO>}
 */
export const patchExternalSystemBySystemId: PatchExternalSystemsBySystemIdFunc = async (extSysId, patchData) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Patch ext system basic data', `uid: ${extSysId}`), LogType.INFO);
        const result = await findOneAndUpdateIfExist(extSysId, patchData);
        Logging.log(buildInfoMessageUserProcessCompleted('Patch ext system data', `External System Data:
           ${JSON.stringify(result)}` ), LogType.INFO);
        return result;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Patch External System'), LogType.ERROR);
        throw error;
    }
};

/**
 * Delete external system & Admins & Managers & Orders related to store
 * @param {IExternalSystem} externalSystem
 * @returns {Promise<IExternalSystemDTO>}
 */
export const deleteExternalSystemAndItsRelatedRecordsBySystemId: DeleteExternalSystemsBySystemIdFunc = async (extSysId) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Delete ext system basic data', `uid: ${extSysId}`), LogType.INFO);
        // Delete All Orders
        Logging.log(buildInfoMessageUserProcessCompleted('Deleting all orders from this store', `Store Id:
            ${extSysId}` ), LogType.INFO);
        const resultDelOrders = await deleteOrdersBySystemId(extSysId);
        Logging.log(buildInfoMessageUserProcessCompleted('Deleted all orders', `External System id:
           ${JSON.stringify(resultDelOrders)}` ), LogType.INFO);

        // Delete All Managers
        Logging.log(buildInfoMessageUserProcessCompleted('Deleting all managers from this store', `Store Id:
            ${extSysId}` ), LogType.INFO);
        const resultDelManagers = await deleteManagersBySystemId(extSysId);
        Logging.log(buildInfoMessageUserProcessCompleted('Deleted all managers', `External System id:
           ${JSON.stringify(resultDelManagers)}` ), LogType.INFO);

        // Delete All Admins deleteAdminsBySystemId
        Logging.log(buildInfoMessageUserProcessCompleted('Deleting all admins from this store', `Store Id:
            ${extSysId}` ), LogType.INFO);
        const resultDelAdmins = await deleteAdminsBySystemId(extSysId);
        Logging.log(buildInfoMessageUserProcessCompleted('Deleted all admins', `External System id:
           ${JSON.stringify(resultDelAdmins)}` ), LogType.INFO);

        // Delete Store
        Logging.log(buildInfoMessageUserProcessCompleted('Deleting store', `Store Id:
        ${extSysId}` ), LogType.INFO);
        const resultDelStore = await deleteExternalSystemById(extSysId);
        Logging.log(buildInfoMessageUserProcessCompleted('Deleted store', `External System:
           ${JSON.stringify(resultDelStore)}` ), LogType.INFO);

        return resultDelStore;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Patch External System'), LogType.ERROR);
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
                const successResponse = { token: generateJWT(claims, JWT_TYPE.EXTERNAL_SYSTEM),
                    roles: Roles.EXTERNAL_SYSTEM 
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
            const preparedData: IExternalSystemDTO = {
                extSysName: data?.extSysName,
                extSysEmail: data?.extSysEmail,
                extSysAddress: data?.extSysAddress,
                fiscalInfo: data?.fiscalInfo,
                id: data?._id?.toString() as string
            };
            return preparedData;
        } 
        throw new ServiceError(
            ErrorType.SYSTEM_RETRIEVAL_ERROR, SYSTEM_NOT_FOUND_ERROR_MESSAGE, '', HTTPUserError.NOT_FOUND_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get external system by id'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get system history stats
 * @param {TimePeriod} timePeriod
 * @param {string} id External system id
 * @returns {Promise<IExternalSystemDTO>}
 */

export const getExternalSystemHistoryStat: GetExternalSystemHistoryStatsFunc = async (id) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get external system history stats', `ext id: ${id as string}`), LogType.INFO);
        const completedAllTime = await getOrdersHistoryPage(TimePeriodHistory.ALL, true, id);
        const completedLastThirtyDays = await getOrdersHistoryPage(TimePeriodHistory.LAST_THIRTY_DAYS, true, id);

        return {
            completed: completedAllTime,
            average: completedLastThirtyDays / 30,
            lastThirtyDays: completedLastThirtyDays
        };
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get external system history stats by id'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get system delivery order stats
 * @param {TimePeriod} timePeriod
 * @param {string} id External system id
 * @returns {Promise<IExternalSystemDTO>}
 */
export const getExternalSystemDeliveryOrderStat: GetExternalSystemDeliveryOrderStatsFunc = async (id) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get external system delivery orders stats by id', `ext id: ${id as string}`), LogType.INFO);
        const activeLastThirtyDays = 
        await getOrdersDeliveryOrderPage(TimePeriodDeliveryOrder.LAST_THIRTY_DAYS, false, id);
        
        const completedAllTime = 
        await getOrdersDeliveryOrderPage(TimePeriodDeliveryOrder.LAST_THIRTY_DAYS, true, id);

        const activeAllTime = 
        await getOrdersDeliveryOrderPage(TimePeriodDeliveryOrder.ALL, false, id);
        return {
            completed: completedAllTime,
            average: activeLastThirtyDays / 30,
            lastThirtyDays: activeLastThirtyDays,
            activeOrders: activeAllTime
        };
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get external system delivery order stats by id'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get system delivery order stats
 * @param {TimePeriod} timePeriod
 * @param {string} id External system id
 * @returns {Promise<IExternalSystemDTO>}
 */
export const getExternalSystemOverviewStat: GetExternalSystemOverviewStatsFunc = async (timePeriod, id) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get external system overview stats by id', `ext id: ${id as string}`), LogType.INFO);
        const allOrders = await getOverviewAllOrderCountByDurationAndStoreId(timePeriod, id);
        const revenue = await getRevenueForOverviewByDurationAndStoreId(timePeriod, id);
        // TODO: get the Stripe commission using stipe APIs according the given date range and add to the revenue
        return {
            noOfOrders: allOrders,
            // This is the average ticket price
            average: allOrders === 0 ? 0 : (revenue / allOrders),
            totalRevenue: revenue || 0
        };
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get external system overview stats by id'), LogType.ERROR);
        throw error;
    }
};
