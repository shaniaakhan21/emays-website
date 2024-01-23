'use strict';

import * as path from 'path';
import * as express from 'express';
import { config } from '../config/config';
import LogType from '../const/logType';
import { Roles } from '../const/roles';
import { IJWTBuildData, IJWTClaims, JWT_TYPE } from '../type/IJWTClaims';
import { generateJWT } from '../util/jwtUtil';
import { Logger } from '../log/logger';
import { buildErrorMessage,
    buildInfoMessageMethodCall, buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import { getExternalSystemById } from '../service/administration/externalSystemService';
import ServiceError from '../type/error/ServiceError';
import ErrorType from '../const/errorType';
import { HTTPUserError } from '../const/httpCode';
import { NOT_AUTHORIZED_TO_ACCESS_EMAYS_ERROR_MESSAGE } from '../const/errorMessage';
import { AppRequest, AppRequestStoreCurrencyAndEmail } from '../type/appRequestType';

const Logging = Logger(__filename);

/**
 * Build the UI entry point path
 * @param file: string
 * @returns URL: string
 */
export const buildAppLaunchPath = async (file: string): Promise<string> => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Build launch path', `File: ${file}`), LogType.INFO);
        const pathToUI: string = await new Promise((resolve) => {
            const serverJsPath: unknown = require.main?.filename;
            const pathToUI = `${path.
                dirname(
                    serverJsPath as string)}${config?.UI_VERSIONS_LOCATION}/${file}`;
            Logging.log(buildInfoMessageUserProcessCompleted(
                'Build launch path', `File: ${file}`), LogType.INFO);
            return resolve(pathToUI);
        });
        return pathToUI;
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Build launch path'), LogType.ERROR);
        throw error;
    }
};

/**
 * Middleware to authorize the main launch route
 * @param req: express.Request
 * @param res: express.Response
 * @param next: express.NextFunction
 */
export const authorizeLaunchRoute = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Authorize launch', ''), LogType.INFO);
        const claims = (req as AppRequest).claims as unknown as IJWTClaims;
        if (claims.roles.includes(Roles.EXTERNAL_SYSTEM)) {

            const storeData = await getExternalSystemById(claims.id);
            (req as AppRequestStoreCurrencyAndEmail).currencyType = storeData?.fiscalInfo?.currencyType as string;
            (req as AppRequestStoreCurrencyAndEmail).extSysEmail = storeData?.extSysEmail;
        } else {
            throw new 
            ServiceError(ErrorType.ORDER_SERVICE_ERROR, NOT_AUTHORIZED_TO_ACCESS_EMAYS_ERROR_MESSAGE, '', HTTPUserError.
                UNAUTHORIZED_CODE);
        }
        next();
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Authorize launch'), LogType.ERROR);
        throw error;
    }
};

/**
 * Generate JWT for session 
 * @param req: express.Request
 * @param res: express.Response
 * @param next: express.NextFunction
 * @returns token: string
 */
export const getJWTForSession = (uuid: string): string => {
    try {
        const role: Roles = Roles.CLIENT;
        Logging.log(buildInfoMessageMethodCall(
            'JWT token get', `User Id: ${uuid}`), LogType.INFO);
        const tokenBuildData: IJWTBuildData = {
            id: uuid,
            roles: role
        };
        const token: string = generateJWT(tokenBuildData, JWT_TYPE.SHORT_LIVE);
        Logging.log(buildInfoMessageUserProcessCompleted(
            'JWT token get', `User Id: ${uuid}`), LogType.INFO);
        return token;
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'JWT token get'), LogType.ERROR);
        throw error;
    }
};

