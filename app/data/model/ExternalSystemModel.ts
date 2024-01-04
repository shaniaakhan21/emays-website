'use strict';

import { model } from 'mongoose';
import LogType from '../../const/logType';
import { Logger } from '../../log/logger';
import { IExternalSystem, IExternalSystemDTO } from '../../type/IExternalSystem';
import { CreateExternalSystemFunc, DeleteExternalSystemsBySystemIdFunc, 
    GetAllExternalSystemsFunc, 
    PatchExternalSystemsBySystemIdFunc } from '../../type/orderServiceType';
import { buildErrorMessage } from '../../util/logMessageBuilder';
import ExternalSystemSchema from '../schema/ExternalSystemSchema';
import ServiceError from '../../type/error/ServiceError';
import ErrorType from '../../const/errorType';
import { EXY_SYS_NOT_FOUND_ERROR_MESSAGE } from '../../const/errorMessage';
import { HTTPUserError } from '../../const/httpCode';
import { prepareUserDetailsToSend } from '../../util/externalSystemDetailBuilder';

const Logging = Logger(__filename);

const MODEL_NAME = 'ExternalSystem';
export const ExternalSystemModel = model<IExternalSystem>(MODEL_NAME, ExternalSystemSchema);

/**
 * Save external system
 * @param {IExternalSystem} externalSystem
 * @returns {IExternalSystemDTO}
 */
export const saveExternalSystem: CreateExternalSystemFunc = async (externalSystem) => {
    try {
        const extSysModel = new ExternalSystemModel(externalSystem);
        const result = await extSysModel.save();
        const data: IExternalSystemDTO = {
            extSysEmail: result.extSysEmail,
            extSysName: result.extSysName,
            id: result._id as unknown as string,
            extSysAddress: result.extSysAddress,
            extLogo: result?.extLogo,
            extLogoContentType: result.extLogoContentType,
            fiscalInfo: result.fiscalInfo
        };
        return data;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Save Order Details'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get all external systems
 * @returns {Array<IExternalSystemDTO>} Returns IExternalSystemDTO array
 */
export const getAllExternalSystems : GetAllExternalSystemsFunc = async () => {
    try {
        const result = await ExternalSystemModel.find();
        return result;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get all external systems'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get external system object by system id and update it.
 * @param {string} systemId system Id
 * @returns {IOrderDTO} Returns IOrderDTO object
 */
export const findOneAndUpdateIfExist: PatchExternalSystemsBySystemIdFunc = async (extSysId, patchData) => {
    try {
        const currentExtSysData = await ExternalSystemModel.findOne({ '_id': extSysId }).exec();
        if (currentExtSysData) {
            const preparedData = prepareUserDetailsToSend(currentExtSysData);
            const updatedSystem = { ...preparedData, ...patchData } as IExternalSystem;
            const filter = {
                _id: currentExtSysData._id
            };
            await ExternalSystemModel.updateOne(filter, updatedSystem);
            const data: IExternalSystemDTO = {
                extSysName: updatedSystem?.extSysName,
                extSysEmail: updatedSystem?.extSysEmail,
                fiscalInfo: updatedSystem?.fiscalInfo,
                extSysAddress: updatedSystem?.extSysAddress
            };
            return data;
        }
        throw new ServiceError(
            ErrorType.EXTERNAL_SYSTEM_UPDATE_ERROR, EXY_SYS_NOT_FOUND_ERROR_MESSAGE, '', HTTPUserError
                .UNPROCESSABLE_ENTITY_CODE);
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, `Patch external system by system id ${extSysId}`), LogType.ERROR);
        throw error;
    }
};

/**
 * Delete external system by id
 * @param {string} extSysId external
 * @returns {IExternalSystemDTO} Returns IExternalSystemDTO object
 */
export const deleteExternalSystemById: DeleteExternalSystemsBySystemIdFunc = async (extSysId) => {
    try {
        const result = await ExternalSystemModel.findByIdAndDelete({ _id: extSysId }) as IExternalSystemDTO;
        return result;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, `Delete external system by Id: ${extSysId}`), LogType.ERROR);
        throw error;
    }
};
