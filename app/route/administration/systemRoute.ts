'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import { validateCreateExtSysRequestBody,
    validateExternalSystemTokenRequestBody, validateHeader } from '../../middleware/paramValidationMiddleware';
import { Logger } from '../../log/logger';
import { RoutePath } from '../../const/routePath';
import { buildErrorMessage, buildInfoMessageRouteHit
    , buildInfoMessageUserProcessCompleted } from '../../util/logMessageBuilder';
import LogType from '../../const/logType';
import { IExternalSystem, IExternalSystemLogin } from '../../type/IExternalSystem';
import { createExternalSystem, getExternalSystemToken } from '../../service/administration/externalSystemService';
import { HTTPSuccess } from '../../const/httpCode';
import { successResponseBuilder } from '../../util/responseBuilder';

const router = Router();
const Logging = Logger(__filename);

/**
 * Register external system
 */
router.post(RoutePath.EXTERNAL_SYSTEMS, validateHeader, validateCreateExtSysRequestBody, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, ''), LogType.INFO);
        const externalSystem = req.body as IExternalSystem;
        await createExternalSystem(externalSystem);
        res.sendStatus(HTTPSuccess.CREATED_CODE);
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, RoutePath.EXTERNAL_SYSTEMS), LogType.ERROR);
        next(error);
    });
});

/**
 * Get auth token for external system 
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
const requestExtSysTokenPath = `${RoutePath.EXTERNAL_SYSTEMS}${RoutePath.EXTERNAL_SYSTEM_TOKEN}`;
router.post(requestExtSysTokenPath, validateHeader, validateExternalSystemTokenRequestBody, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        const requestBody = req.body as IExternalSystemLogin;
        Logging.log(buildInfoMessageRouteHit(req.path, requestBody.extSysUsername), LogType.INFO);
        const loginResult = await getExternalSystemToken(
            requestBody.extSysUsername, requestBody.extSysPassword);
        Logging.log(buildInfoMessageUserProcessCompleted(
            'Request external system token', requestBody.extSysUsername), LogType.INFO);
        res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(loginResult));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, requestExtSysTokenPath), LogType.ERROR);
        next(error);
    });
});

export default router;
