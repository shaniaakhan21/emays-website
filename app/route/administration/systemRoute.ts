'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import { allowedForExternalSystemSuperUserAndAdminRolesOnly, validateCreateExtSysRequestBody,
    validateExternalSystemTokenRequestBody, validateHeader,
    validateUserTokenRequestBody, 
    validateUsername } from '../../middleware/paramValidationMiddleware';
import { Logger } from '../../log/logger';
import { RoutePath } from '../../const/routePath';
import { buildErrorMessage, buildInfoMessageRouteHit
    , buildInfoMessageUserProcessCompleted } from '../../util/logMessageBuilder';
import LogType from '../../const/logType';
import { getExternalSystemById } from '../../service/administration/externalSystemService';
import { IExternalSystem, IExternalSystemDTO, IExternalSystemLogin } from '../../type/IExternalSystem';
import { createExternalSystem, getExternalSystemToken } from '../../service/administration/externalSystemService';
import { HTTPSuccess, HTTPUserError } from '../../const/httpCode';
import { successResponseBuilder } from '../../util/responseBuilder';
import { AppRequest } from '../../type/appRequestType';
import { IJWTClaims } from '../../type/IJWTClaims';
import { Roles } from '../../const/roles';
import { getAdminExternalSystemByAdminAssociatedId,
    getAdminExternalSystemToken } from '../../service/administration/adminExternalSystemService';
import { ICommonLoginCredentials } from '../../type/ICommonLogin';
import { checkUsernameInCommon } from '../../service/administration/commonLoginService';
import { ExternalSystemModel } from '../../data/model/ExternalSystemModel';
import { AdminExternalSystemModel } from '../../data/model/AdminExternalSystemModel';
import { SuperUserModel } from '../../data/model/SuperUserModel';
import { getSuperUserToken } from '../../service/administration/superUserService';
import ServiceError from '../../type/error/ServiceError';
import ErrorType from '../../const/errorType';
import { INVALID_CREDENTIALS_ERROR_MESSAGE } from '../../const/errorMessage';

const router = Router();
const Logging = Logger(__filename);

/**
 * Check username in common
 */
const reqUsernameValidity = `${RoutePath.EXTERNAL_SYSTEMS}${RoutePath.USERNAME_VALIDITY}`;
router.post(reqUsernameValidity, validateHeader, validateUsername, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, ''), LogType.INFO);
        const requestBody = req.body as { username: string };
        const usernameValidity = await checkUsernameInCommon(requestBody.username);
        if (usernameValidity) {
            return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder({ status: true }));
        }
        return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder({ status: false }));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, RoutePath.EXTERNAL_SYSTEMS), LogType.ERROR);
        next(error);
    });
});

/**
 * Register external system
 */
router.post(RoutePath.EXTERNAL_SYSTEMS, validateHeader, validateCreateExtSysRequestBody, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, ''), LogType.INFO);
        const externalSystem = req.body as IExternalSystem;
        const usernameValidity = await checkUsernameInCommon(externalSystem.extSysUsername);
        if (usernameValidity) {
            await createExternalSystem(externalSystem);
            res.sendStatus(HTTPSuccess.CREATED_CODE);
        }
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

/**
 * Get system info
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
const getSystemInfoPath = `${RoutePath.EXTERNAL_SYSTEMS}${RoutePath.EXTERNAL_SYSTEM_INFO}`;
router.post(getSystemInfoPath, validateHeader, allowedForExternalSystemSuperUserAndAdminRolesOnly, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => { 
        const claims = (req as AppRequest).claims as unknown as IJWTClaims;
        Logging.log(buildInfoMessageRouteHit(req.path, claims.id), LogType.INFO);
        let externalSystemInfo: IExternalSystemDTO = {
            extSysEmail: '',
            extSysName: '',
            id: '',
            extSysAddress: {
                addOne: '', addTwo: '', addThree: '', addFour: '', addFive: ''
            },
            extLogo: undefined,
            extLogoContentType: ''
        };
        if (claims.roles.includes(Roles.EXTERNAL_SYSTEM)) {
            externalSystemInfo = await getExternalSystemById(claims.id);
        } else if (claims.roles.includes(Roles.CLIENT)) {
            // NO LOGIC YET
        } else if (claims.roles.includes(Roles.SUPER)) {
            // NO LOGIC YET
        } else if (claims.roles.includes(Roles.ADMIN)) {
            externalSystemInfo = await getAdminExternalSystemByAdminAssociatedId(claims.id);
        }

        Logging.log(buildInfoMessageUserProcessCompleted(
            'Request external system info', claims.id), LogType.INFO);
        res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(externalSystemInfo));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, getSystemInfoPath), LogType.ERROR);
        next(error);
    });
});

/**
 * Get auth token for any role
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
const requestTokenPathCommonLogin = 
    `${RoutePath.LOGIN}`;
router.post(requestTokenPathCommonLogin, validateHeader, validateUserTokenRequestBody, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        const requestBody = req.body as ICommonLoginCredentials;
        Logging.log(buildInfoMessageRouteHit(req.path, requestBody.username), LogType.INFO);

        // Decide which user-type is trying to login
        const isUsernameReservedInExternalSystem = await ExternalSystemModel.
            findOne({ 'extSysUsername': requestBody.username }).exec();
        const isUsernameReservedInAdmin = await AdminExternalSystemModel.
            findOne({ 'adminUsername': requestBody.username }).exec();
        const isUsernameReservedInSuperUser = await SuperUserModel.findOne({ 'username': requestBody.username }).exec();
        
        if (isUsernameReservedInExternalSystem) {
            const externalSystemLoginResult = await getExternalSystemToken(requestBody.username, requestBody.password);
            Logging.log(buildInfoMessageUserProcessCompleted(
                'Request external user token', requestBody.username), LogType.INFO);
            return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(externalSystemLoginResult));
        } else if (isUsernameReservedInAdmin) {
            const adminLoginResult = await getAdminExternalSystemToken(
                requestBody.username, requestBody.password);
            Logging.log(buildInfoMessageUserProcessCompleted(
                'Request admin login user token', requestBody.username), LogType.INFO);
            return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(adminLoginResult));
        } else if (isUsernameReservedInSuperUser) {
            const superUserLoginResult = await getSuperUserToken(
                requestBody.username, requestBody.password);
            Logging.log(buildInfoMessageUserProcessCompleted(
                'Request superuser login user token', requestBody.username), LogType.INFO);
            return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(superUserLoginResult));
        }
        throw new ServiceError(ErrorType.UNAUTHORIZED, INVALID_CREDENTIALS_ERROR_MESSAGE, '', HTTPUserError.
            UNAUTHORIZED_CODE);
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, requestTokenPathCommonLogin), LogType.ERROR);
        next(error);
    });
});

export default router;
