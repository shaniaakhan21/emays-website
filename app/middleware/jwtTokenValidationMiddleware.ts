
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
import { AppRequest } from '../type/appRequestType';

const Logging = Logger(__filename);

export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    // TODO: add service-worker implementation to add the token with the UI files requests.
    if (req.path !== `${config.ROUTE_PATH}${RoutePath.HEALTH}` &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.DEV_LAUNCH}`) &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.LETS_TALK}`) &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.FAQ}`) &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.CALENDER_ACCESS}`) &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.CALENDER_REDIRECTION}`) &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.EXTERNAL_SYSTEMS}`) &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.ADMIN_EXTERNAL_SYSTEM_USERS}`) &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.MANAGER_EXTERNAL_SYSTEM_USERS}`) &&
        // eslint-disable-next-line max-len
        (req.path !== `${config.ROUTE_PATH}${RoutePath.ADMIN_EXTERNAL_SYSTEM_USERS}${RoutePath.ADMIN_EXTERNAL_SYSTEM_USER_TOKEN}`) &&
        // eslint-disable-next-line max-len
        (req.path !== `${config.ROUTE_PATH}${RoutePath.MANAGER_EXTERNAL_SYSTEM_USERS}${RoutePath.MANAGER_EXTERNAL_SYSTEM_USER_TOKEN}`) &&
        (req.path !== `${config.ROUTE_PATH}/login`) &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.STRIPE}/checkout/complete`) &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.STRIPE}/webhook`) &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.EXTERNAL_SYSTEMS}${RoutePath.EXTERNAL_SYSTEM_TOKEN}`) &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.SUPER_USERS}`) &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.SUPER_USERS}${RoutePath.SUPER_USER_TOKEN}`) &&
        (req.path !== '/') &&
        (req.path !== `${config.ROUTE_PATH}${RoutePath.LAUNCH_MAIL}`) &&
        (req.path !== `${config.ROUTE_PATH}/test`) &&
        !req.path.includes('app-dist') &&
        req.path !== '/favicon.ico') {
        const authHeader = req?.headers?.authorization as string;
        const [authType, authToken] = authHeader ? authHeader?.split(' ') : [null, null];
        // Sometimes token comes with the request body. Ex: launch
        const token = (req.body as {authToken: string})?.authToken;
        if (authType && authType === 'Bearer' && authToken) {
            const claims = validateJWTToken(authToken);
            (req as AppRequest).claims = claims;
        } else if (token) {
            const claims = validateJWTToken(token);
            (req as AppRequest).claims = claims;
        } else {
            throw new ServiceError(ErrorType.ORDER_SERVICE_ERROR, 'Not a valid token', '', HTTPUserError.
                UNAUTHORIZED_CODE);
        }
    }
    next();
};

export const validateJWTToken = (token: string) => {
    let claims;
    jwt.verify(token, config.JSON_WEB_TOKEN_SECRET, (
        error, decode) => {
        if (error) {
            throw new ServiceError(ErrorType.UNAUTHORIZED, error.message, '', HTTPUserError.
                UNAUTHORIZED_CODE);
        }
        claims = decode as IJWTClaims;
        const userId = claims?.id;
        Logging.log(buildInfoMessageUserProcessCompleted(
            'JWT token validation', `User Id: ${userId}, roles: ${claims.roles.toString()}`), LogType.INFO);
    });
    return claims;
};

