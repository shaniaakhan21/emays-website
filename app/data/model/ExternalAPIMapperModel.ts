'use strict';

import { model } from 'mongoose';
import LogType from '../../const/logType';
import { Logger } from '../../log/logger';
import { buildErrorMessage } from '../../util/logMessageBuilder';
import { IExternalAPIMapper, IExternalAPIMapperDTO } from '../../type/externalAPIMapperType';
import ExternalAPIMapperSchema from '../schema/ExternalAPIMaperSchema';
import { CreateExternalAPIMapperFunc,
    GetExternalAPIMapperByStoreIdFunc } from '../../type/externalAPIMapperServiceType';

const Logging = Logger(__filename);

const MODEL_NAME = 'ExternalAPIMapper';
export const ExternalAPIMapperModel = model<IExternalAPIMapper>(MODEL_NAME, ExternalAPIMapperSchema);

/**
 * Save external api mapper
 * @param {IExternalAPIMapper} externalAPI new mapper
 * @returns {IExternalAPIMapperDTO} return DTO
 */
export const saveExternalAPI: CreateExternalAPIMapperFunc = async (externalAPIData: IExternalAPIMapper) => {
    try {
        const externalAPIModel = new ExternalAPIMapperModel(externalAPIData);
        const result: IExternalAPIMapperDTO = await externalAPIModel.save();
        return result;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Save External API Mapper Details'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get external API data by store Id
 * @param {string} storeId
 * @returns {IExternalAPIMapperDTO} Returns faq details array
 */
export const getExternalAPIById: GetExternalAPIMapperByStoreIdFunc = async (storeId) => {
    try {
        const externalAPIMapper = await ExternalAPIMapperModel.findOne({ 'storeId': storeId }).exec();
        const dto: IExternalAPIMapperDTO = {
            storeId: externalAPIMapper?.storeId as string,
            wordpressAPIKey: externalAPIMapper?.wordpressAPIKey as string,
            wordpressAPISecret: externalAPIMapper?.wordpressAPISecret as string,
            wordpressURI: externalAPIMapper?.wordpressURI as string
        };
        return dto;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Retrieve External API Mapper by store id'), LogType.ERROR);
        throw error;
    }
};

