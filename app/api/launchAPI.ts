'use strict';

import * as path from 'path';
import * as express from 'express';
import { config } from '../config/config';
import LogType from '../const/logType';
import { v4 as uuidv4 } from 'uuid';
import { Roles } from '../const/roles';
import { IJWTBuildData } from '../type/IJWTClaims';
import { generateJWT } from '../util/jwtUtil';
import { Logger } from '../log/logger';
import { buildErrorMessage,
    buildInfoMessageMethodCall, buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';

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
 * Middleware to authorize launch routes
 * @param req: express.Request
 * @param res: express.Response
 * @param next: express.NextFunction
 */
export const authorizeLaunchRoute = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Authorize launch', ''), LogType.INFO);
        next();
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Authorize launch'), LogType.ERROR);
        throw error;
    }
};

/**
 * Generate JQT for session 
 * @param req: express.Request
 * @param res: express.Response
 * @param next: express.NextFunction
 * @returns token: string
 */
export const getJWTForSession = (): string => {
    try {
        const uuid: string = uuidv4();
        const role: Roles = Roles.CLIENT;
        Logging.log(buildInfoMessageMethodCall(
            'JWT token get', `User Id: ${uuid}`), LogType.INFO);
        const tokenBuildData: IJWTBuildData = {
            id: uuid,
            roles: role
        };
        const token: string = generateJWT(tokenBuildData);
        Logging.log(buildInfoMessageUserProcessCompleted(
            'JWT token get', `User Id: ${uuid}`), LogType.INFO);
        return token;
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'JWT token get'), LogType.ERROR);
        throw error;
    }
};

