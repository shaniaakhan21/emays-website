'use strict';

import * as express from 'express';
import { ErrorInfo } from '../const/error';
import Logger from '../logger';

/**
 * Build the error response in a meaningful way and send it to the UI based on different Error Types
 * @param err Error 
 * @param res express.Response
 * @returns res express.Response
 */
export const buildErrorResponseAndSend = (err: Error, res: express.Response) => {
    switch (err.name) {
        case ErrorInfo.APP_ERROR:
            Logger.error('Application general error observed.');
            // TODO; send the error with res.send
        default:
            Logger.error('Application error observed.');
            // TODO; send the error with res.send
    }
};
