'use strict';

import { model } from 'mongoose';
import LogType from '../../const/logType';
import { Logger } from '../../log/logger';
import DriverSchema from '../schema/DriverSchema';
import { IDriver, IDriverDTO } from '../../type/IDriver';
import { CreateDriverFunc } from '../../type/driverServiceType';
import { buildErrorMessage } from '../../util/logMessageBuilder';

const Logging = Logger(__filename);

const MODEL_NAME = 'Driver';
export const DriverModel = model<IDriver>(MODEL_NAME, DriverSchema);

/**
 * Create driver
 * @param {IAdminExternalSystem} adminExternalSystem
 * @returns {IAdminExternalSystemDTO}
 */
export const saveDriver: CreateDriverFunc = async (driver) => {
    try {
        const driverModel = new DriverModel(driver);
        const result = await driverModel.save();
        const data: IDriverDTO = {
            firstName: result.firstName,
            lastName: result.lastName,
            phoneNumber: result.phoneNumber,
            address: result.address,
            license: result.license,
            billing: result.billing
        };
        return data;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Create driver'), LogType.ERROR);
        throw error;
    }
};

