'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import { Logger } from '../../log/logger';
import { PathParam, RoutePath } from '../../const/routePath';
import LogType from '../../const/logType';
import { HTTPSuccess } from '../../const/httpCode';
import { buildErrorMessage, buildInfoMessageRouteHit
    , buildInfoMessageUserProcessCompleted } from '../../util/logMessageBuilder';
import { IAdminExternalSystem, IAdminExternalSystemLogin } from '../../type/IAdminExternalSystem';
import { createAdminExternalSystem,
    getAdminByExternalSystemId,
    getAdminExternalSystemToken } from '../../service/administration/adminExternalSystemService';
import { allowedForExternalSystemSuperUserAndAdminAndManagerAndDriverRolesOnly,
    validateAdminExternalSystemTokenRequestBody, validateAdminExternalSystemUserRequestBody, validateHeader
} from '../../middleware/paramValidationMiddleware';
import { successResponseBuilder } from '../../util/responseBuilder';
import { checkUsernameInCommon } from '../../service/administration/commonLoginService';
import { AppRequest } from '../../type/appRequestType';
import { IJWTClaims } from '../../type/IJWTClaims';

const router = Router();
const Logging = Logger(__filename);

/**
 * Register admin user for external system
 */
router.post(RoutePath.ADMIN_EXTERNAL_SYSTEM_USERS, validateHeader, validateAdminExternalSystemUserRequestBody, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, 'Admin external system user registration'), LogType.INFO);
        const adminExternalSystemUser = req.body as IAdminExternalSystem;
        const usernameValidity = await checkUsernameInCommon(adminExternalSystemUser.adminUsername);
        if (usernameValidity) {
            await createAdminExternalSystem(adminExternalSystemUser);
            res.sendStatus(HTTPSuccess.CREATED_CODE);
        }
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, RoutePath.ADMIN_EXTERNAL_SYSTEM_USERS), LogType.ERROR);
        next(error);
    });
});

/**
 * Get auth token for admin external system user
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
const requestAdminExtSysTokenPath = 
    `${RoutePath.ADMIN_EXTERNAL_SYSTEM_USERS}${RoutePath.ADMIN_EXTERNAL_SYSTEM_USER_TOKEN}`;
router.post(requestAdminExtSysTokenPath, validateHeader, validateAdminExternalSystemTokenRequestBody, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        const requestBody = req.body as IAdminExternalSystemLogin;
        Logging.log(buildInfoMessageRouteHit(req.path, requestBody.adminUsername), LogType.INFO);
        const loginResult = await getAdminExternalSystemToken(
            requestBody.adminUsername, requestBody.adminPassword);
        Logging.log(buildInfoMessageUserProcessCompleted(
            'Request admin external  user token', requestBody.adminUsername), LogType.INFO);
        res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(loginResult));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, requestAdminExtSysTokenPath), LogType.ERROR);
        next(error);
    });
});

/**
 * Get admin info by system id
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
// eslint-disable-next-line max-len
const getAdminInfoBySysId = `${RoutePath.ADMIN_EXTERNAL_SYSTEM_USERS}${RoutePath.EXTERNAL_SYSTEMS}${PathParam.STORE_ID}`;
// eslint-disable-next-line max-len
router.get(getAdminInfoBySysId, validateHeader, allowedForExternalSystemSuperUserAndAdminAndManagerAndDriverRolesOnly, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => { 
        const claims = (req as AppRequest).claims as unknown as IJWTClaims;
        Logging.log(buildInfoMessageRouteHit(req.path, claims.id), LogType.INFO);
        const storeId: string = req.params.storeId;
        const externalSystemInfo = await getAdminByExternalSystemId(storeId);

        Logging.log(buildInfoMessageUserProcessCompleted(
            'Request admin info by system id', storeId), LogType.INFO);
        res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(externalSystemInfo));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, getAdminInfoBySysId), LogType.ERROR);
        next(error);
    });
});

export default router;
