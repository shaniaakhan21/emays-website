'use strict';

import * as path from 'path';
import * as express from 'express';
import { config } from '../config/config';
import Logger from '../logger';

/**
 * Build the UI entry point path
 * @param file: string
 * @returns URL: string
 */
export const buildAppLaunchPath = async (file: string): Promise<string> => {
    try {
        Logger.info('Application launch path is being built.');
        const pathToUI: string = await new Promise((resolve) => {
            const serverJsPath: unknown = require.main?.filename;
            const pathToUI = `${path.
                dirname(
                    serverJsPath as string)}${config?.UI_VERSIONS_LOCATION}/${file}`;
            Logger.info(`Application launch path has been built successfully. Path: ${pathToUI}`);
            return resolve(pathToUI);
        });
        return pathToUI;
    } catch (error) {
        const errorObject: Error = error as Error;
        Logger.error(`Failed to build the application launch path.
        Error stack: ${errorObject.stack as string}.`);
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
        Logger.info('Authorization is being done.');
        next();
    } catch (error) {
        const errorObject: Error = error as Error;
        Logger.error(`Authorization failed.
        Error stack: ${errorObject.stack as string}.`);
        throw error;
    }
};

