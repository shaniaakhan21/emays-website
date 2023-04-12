'use strict';

import { model } from 'mongoose';
import LogType from '../../const/logType';
import { Logger } from '../../log/logger';
import { buildErrorMessage } from '../../util/logMessageBuilder';
import { ISuperUser, ISuperUserDTO } from '../../type/ISuperUser';
import SuperUserSchema from '../schema/SuperUserSchema';
import { CreateSuperUserFunc } from '../../type/superUserServiceType';

const Logging = Logger(__filename);

const MODEL_NAME = 'SuperUser';
export const SuperUserModel = model<ISuperUser>(MODEL_NAME, SuperUserSchema);

/**
 * Create Super User
 * @param {ISuperUser} externalSystem
 * @returns {ISuperUserDTO}
 */
export const saveSuperUser: CreateSuperUserFunc = async (superUser) => {
    try {
        const superUserModel = new SuperUserModel(superUser);
        const result = await superUserModel.save();
        const data: ISuperUserDTO = {
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email
        };
        return data;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Create Super User'), LogType.ERROR);
        throw error;
    }
};

