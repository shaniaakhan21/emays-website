'use strict';

import { model } from 'mongoose';
import LogType from '../../const/logType';
import { Logger } from '../../log/logger';
import { buildErrorMessage } from '../../util/logMessageBuilder';
import { IManagerExternalSystem } from '../../type/IManagerExternalSystem';
import ManagerExternalSystemSchema from '../schema/ManagerExternalSystemSchema';
import { CreateManagerExternalSystemFunc, DeleteManagersBySystemIdFunc }
    from '../../type/managerExternalSystemServiceType';

const Logging = Logger(__filename);

const MODEL_NAME = 'ManagerExternalSystem';
export const ManagerExternalSystemModel = model<IManagerExternalSystem>(MODEL_NAME, ManagerExternalSystemSchema);

/**
 * Create Manager External System
 * @param {IManagerExternalSystem} managerExternalSystem
 * @returns {IManagerExternalSystemDTO}
 */
export const saveManagerExternalSystemUser: CreateManagerExternalSystemFunc = async (managerUser) => {
    try {
        const managerExternalSystemUserModel = new ManagerExternalSystemModel(managerUser);
        const result = await managerExternalSystemUserModel.save();
        const data: IManagerExternalSystem = {
            managerFirstName: result.managerFirstName,
            managerLastName: result.managerLastName,
            managerUsername: result.managerUsername,
            managerPhone: result.managerPhone,
            managerPassword: result.managerPassword,
            managerEmail: result.managerEmail,
            externalSystemId: result.externalSystemId
        };
        return data;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Create Manager External System'), LogType.ERROR);
        throw error;
    }
};

/**
 * Delete managers by system id
 * @param {string} extSysId branch / extSys ID
 * @returns { Array<IManagerExternalSystemDTO>} Returns Array<IManagerExternalSystemDTO>>
 */
export const deleteManagersBySystemId: DeleteManagersBySystemIdFunc = async (extSysId) => {
    try {
        const result = await ManagerExternalSystemModel.deleteMany({ externalSystemId: extSysId });
        return result;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, `Deleted Managers by system id: ${extSysId}`), LogType.ERROR);
        throw error;
    }
};
