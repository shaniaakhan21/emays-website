'use strict';

import { Request, Response, NextFunction } from 'express';
import Logger from '../logger';
import { IOrderContext } from '../type/IOrderContext';

/**
 * Check the user session validity
 * @param req Request 
 * @param res Response
 * @param next NextFunction
 */
export const validateSession = (req: Request, res: Response, next: NextFunction) => {

    const requestBody: IOrderContext = req.body as IOrderContext;
    const userEmail: string = requestBody?.userEmail;
    try {
        // TODO: validation logic
        Logger.info(`Session validation is being called for the user Email ${userEmail}.`);
        next();
    } catch (error) {
        const errorObject: Error = error as Error;
        Logger.error(`Failed validate the session for user Email ${userEmail}.
        Error stack: ${errorObject.stack as string}.`);
        next(error);
    }
};
