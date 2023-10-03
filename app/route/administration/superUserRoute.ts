'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import { Logger } from '../../log/logger';
import { RoutePath } from '../../const/routePath';
import LogType from '../../const/logType';
import { HTTPSuccess } from '../../const/httpCode';
import { buildErrorMessage, buildInfoMessageRouteHit
    , buildInfoMessageUserProcessCompleted } from '../../util/logMessageBuilder';
import { ISuperUser, ISuperUserLogin } from '../../type/ISuperUser';
import { createSuperUser, getSuperUserToken } from '../../service/administration/superUserService';
import { validateCreateSuperUserRequestBody, validateHeader
    , validateSuperUserTokenRequestBody } from '../../middleware/paramValidationMiddleware';
import { successResponseBuilder } from '../../util/responseBuilder';
import { checkUsernameInCommon } from '../../service/administration/commonLoginService';

const router = Router();
const Logging = Logger(__filename);

/**
 * Register superuser system
 */
router.post(RoutePath.SUPER_USERS, validateHeader, validateCreateSuperUserRequestBody, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, 'super user registration'), LogType.INFO);
        const superUser = req.body as ISuperUser;
        const usernameValidity = await checkUsernameInCommon(superUser.username);
        if (usernameValidity) {
            await createSuperUser(superUser);
            res.sendStatus(HTTPSuccess.CREATED_CODE);
        }
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, RoutePath.SUPER_USERS), LogType.ERROR);
        next(error);
    });
});

/**
 * Get auth token for super user
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
const requestExtSysTokenPath = `${RoutePath.SUPER_USERS}${RoutePath.SUPER_USER_TOKEN}`;
router.post(requestExtSysTokenPath, validateHeader, validateSuperUserTokenRequestBody, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        const requestBody = req.body as ISuperUserLogin;
        Logging.log(buildInfoMessageRouteHit(req.path, requestBody.username), LogType.INFO);
        const loginResult = await getSuperUserToken(
            requestBody.username, requestBody.password);
        Logging.log(buildInfoMessageUserProcessCompleted(
            'Request super user token', requestBody.username), LogType.INFO);
        res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(loginResult));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, requestExtSysTokenPath), LogType.ERROR);
        next(error);
    });
});

export default router;
