'use strict';

import { model } from 'mongoose';
import LogType from '../../const/logType';
import { Logger } from '../../log/logger';
import { IExternalSystem, IExternalSystemDTO } from '../../type/IExternalSystem';
import { CreateExternalSystemFunc } from '../../type/orderServiceType';
import { buildErrorMessage } from '../../util/logMessageBuilder';
import ExternalSystemSchema from '../schema/ExternalSystemSchema';

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
            extSysName: result.extSysName
        };
        return data;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Save Order Details'), LogType.ERROR);
        throw error;
    }
};

