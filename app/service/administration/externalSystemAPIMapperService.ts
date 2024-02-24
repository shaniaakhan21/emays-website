/* eslint-disable func-style */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
'use strict';

import LogType from '../../const/logType';
import * as crypto from 'crypto';
import { Logger } from '../../log/logger';
import { buildErrorMessage, buildInfoMessageMethodCall
    , buildInfoMessageUserProcessCompleted } from '../../util/logMessageBuilder';
import { serviceErrorBuilder } from '../../util/serviceErrorBuilder';
import { CreateExternalAPIMapperFunc,
    GetExternalAPIMapperByStoreIdFunc, 
    GetWordpressProductData } from '../../type/externalAPIMapperServiceType';
import { getExternalAPIById, saveExternalAPI } from '../../data/model/ExternalAPIMapperModel';
import { IWordpressProductData } from '../../type/externalAPIMapperType';

const Logging = Logger(__filename);
const encryptionKey = 'kea@$pafs';

/**
 * Create new external system API mapper object
 * @param {IDriver} driverData
 * @returns {Promise<IDriverDTO>}
 */
export const createExternalSystemAPIMapper: CreateExternalAPIMapperFunc = async (mapperObject) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Create external API mapper', `store id: ${mapperObject.storeId}`), LogType.INFO);
        const WORDPRESS_API_KEY = mapperObject.wordpressAPIKey;
        const WORDPRESS_API_SECRET = mapperObject.wordpressAPISecret;
        const encryptedAPIKey = encrypt(WORDPRESS_API_KEY);
        const encryptedAPISecret = encrypt(WORDPRESS_API_SECRET);
        mapperObject.wordpressAPIKey = encryptedAPIKey;
        mapperObject.wordpressAPISecret = encryptedAPISecret;
        const data = await saveExternalAPI(mapperObject);
        Logging.log(buildInfoMessageUserProcessCompleted('External API mapper object', `Mapper Data:
            ${JSON.stringify(data)}` ), LogType.INFO);
        return data;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'External API mapper creation'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get external API mapper data by store id
 * @param {string} storeId
 * @returns {Promise<IExternalAPIMapperDTO>}
 */
export const getExternalAPIMapperDataById: GetExternalAPIMapperByStoreIdFunc = async (storeId) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get external API mapper', `store id: ${storeId}`), LogType.INFO);
        const data = await getExternalAPIById(storeId);
        const decryptedAPIKey = decrypt(data?.wordpressAPIKey);
        const decryptedSecret = decrypt(data?.wordpressAPISecret);
        data.wordpressAPIKey = decryptedAPIKey;
        data.wordpressAPISecret = decryptedSecret;
        Logging.log(buildInfoMessageUserProcessCompleted('External API mapper object', `Mapper Data:
            ${JSON.stringify(data)}` ), LogType.INFO);
        return data;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'External API mapper fetching'), LogType.ERROR);
        throw error;
    }
};

/**
 * Get wordpress store data
 * @param {string} storeId
 * @returns {Promise<IExternalAPIMapperDTO>}
 */
export const getWordpressStoreDataByStoreId: GetWordpressProductData = async (storeId) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get wordpress store data', `store id: ${storeId}`), LogType.INFO);
        const storeDataMapper = await getExternalAPIMapperDataById(storeId);
        const data : Array<IWordpressProductData> = [
            {
                productId: '',
                productImage: '',
                productName: '',
                productPrice: ''
            }
        ];
        Logging.log(buildInfoMessageUserProcessCompleted('Wordpress product data', `Product Data:
            ${JSON.stringify(data)}` ), LogType.INFO);
        return data;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Wordpress product data fetching'), LogType.ERROR);
        throw error;
    }
};

// Function to encrypt sensitive information
const encrypt = (text: string) => {
    const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

// Function to decrypt sensitive information
const decrypt = (encryptedText: string) => {
    const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

