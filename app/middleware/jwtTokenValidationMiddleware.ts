'use strict';

import { Request, Response, NextFunction } from 'express';
import { config } from '../config/config';
import * as jwt from 'jsonwebtoken';
import { RoutePath } from '../const/routePath';
import { IJWTClaims } from '../type/IJWTClaims';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import ServiceError from '../type/error/ServiceError';
import ErrorType from '../const/errorType';
import { HTTPUserError } from '../const/httpCode';
import { buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';

const Logging = Logger(__filename);

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
                    throw new ServiceError(ErrorType.ORDER_SERVICE_ERROR, error.message, '', HTTPUserError.
                        UNAUTHORIZED_CODE);
                }
                const claims = decode as IJWTClaims;
                const userId = claims.id;
                // Add claims to the request object
                Logging.log(buildInfoMessageUserProcessCompleted(
                    'JWT token validation', `User Id: ${userId}`), LogType.INFO);
            });
        } else {
            throw new ServiceError(ErrorType.ORDER_SERVICE_ERROR, 'Not a valid token', '', HTTPUserError.
                UNAUTHORIZED_CODE);
        }
    }
    next();
};

export default validateJWT;
