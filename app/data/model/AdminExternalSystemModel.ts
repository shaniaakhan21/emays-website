'use strict';

import { model } from 'mongoose';
import LogType from '../../const/logType';
import { Logger } from '../../log/logger';
import { buildErrorMessage } from '../../util/logMessageBuilder';
import { IAdminExternalSystem } from '../../type/IAdminExternalSystem';
import AdminExternalSystemSchema from '../schema/AdminExternalSystemSchema';
import { CreateAdminExternalSystemFunc, DeleteAdminsBySystemIdFunc } from '../../type/adminExternalSystemServiceType';

const Logging = Logger(__filename);

const MODEL_NAME = 'AdminExternalSystem';
export const AdminExternalSystemModel = model<IAdminExternalSystem>(MODEL_NAME, AdminExternalSystemSchema);

/**
 * Create Admin External System
 * @param {IAdminExternalSystem} adminExternalSystem
 * @returns {IAdminExternalSystemDTO}
 */
export const saveAdminExternalSystemUser: CreateAdminExternalSystemFunc = async (adminUser) => {
    try {
        const adminExternalSystemUserModel = new AdminExternalSystemModel(adminUser);
        const result = await adminExternalSystemUserModel.save();
        const data: IAdminExternalSystem = {
            adminFirstName: result.adminFirstName,
            adminLastName: result.adminLastName,
            adminUsername: result.adminUsername,
            adminPhone: result.adminPhone,
            adminPassword: result.adminPassword,
            adminEmail: result.adminEmail,
            externalSystemId: result.externalSystemId
        };
        return data;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Create Admin External System'), LogType.ERROR);
        throw error;
    }
};

/**
 * Delete admins by system id
 * @param {string} extSysId external system id
 * @returns {Array<IAdminExternalSystemDTO>} Returns extSysId
 */
export const deleteAdminsBySystemId: DeleteAdminsBySystemIdFunc = async (extSysId) => {
    try {
        const result = await AdminExternalSystemModel.deleteMany({ externalSystemId: extSysId });
        return result;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, `Deleted Admins by system id: ${extSysId}`), LogType.ERROR);
        throw error;
    }
};

