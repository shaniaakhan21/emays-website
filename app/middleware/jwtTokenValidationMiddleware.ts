'use strict';

import { Request, Response, NextFunction } from 'express';
import Logger from '../logger';
import { config } from '../config/config';
import * as jwt from 'jsonwebtoken';
import { HTTPOrderError } from '../const/httpCode';
import { RoutePath } from '../const/routePath';
import ErrorType from '../error/type/errorType';
import { ErrorInfo } from '../const/error';
import OrderError from '../error/OrderError';
import { IJWTClaims } from '../type/IJWTClaims';

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    // TODO: add service-worker implementation to add the token with the UI files requests.
    if (req.path !== `${config.ROUTE_PATH}${RoutePath.HEALTH}` &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.DEV_LAUNCH}`) &&  
        (req.path !== `${config.ROUTE_PATH}${RoutePath.LAUNCH_MAIL}`) &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.LAUNCH}`) && !req.path.includes('app-dist') &&
        req.path !== '/favicon.ico') {
        const authHeader = req?.headers?.authorization as string;
        const [authType, authToken] = authHeader ? authHeader?.split(' ') : [null, null];
        if (authType && authType === 'Bearer' && authToken) {
            jwt.verify(authToken, config.JSON_WEB_TOKEN_SECRET, (
                error, decode) => {
                if (error) {
                    throw new OrderError(ErrorType.
                        USER_UNAUTHORIZED, ErrorInfo.
                        USER_ACCESS_TOKEN_INVALID_MESSAGE, error as unknown as
                             Error, HTTPOrderError.UNAUTHORIZED_CODE);
                }
                const claims = decode as IJWTClaims;
                const userId = claims.id;
                // Add claims to the request object
                Logger.info(`Auth validation succeed for the use ${userId}.`);
            });
        } else {
            throw new OrderError(ErrorType.
                USER_UNAUTHORIZED, ErrorInfo.
                USER_ACCESS_TOKEN_INVALID_MESSAGE, new Error(''), HTTPOrderError.UNAUTHORIZED_CODE);
        }
    }
    next();
};

export default validateJWT;
