'use strict';

import { Request, Response, NextFunction } from 'express';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { IOrderContext } from '../type/IOrderContext';
import { buildErrorMessage, buildInfoMessageMethodCall } from '../util/logMessageBuilder';
const Logging = Logger(__filename);

/**
 * Check the user session validity
 * @param req Request 
 * @param res Response
 * @param next NextFunction
 */
export const validateSession = (req: Request, res: Response, next: NextFunction) => {

    const requestBody: IOrderContext = req.body as IOrderContext;
    try {
        // TODO: validation logic
        Logging.log(buildInfoMessageMethodCall(
            'Validate session', `User: ${requestBody.uid} ${requestBody.email}`), LogType.INFO);
        next();
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Validate session'), LogType.ERROR);
        next(error);
    }
};
