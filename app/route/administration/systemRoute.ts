'use strict';

import * as express from 'express';
import * as core from 'express-serve-static-core';
import { Router, Request, Response, NextFunction } from 'express';
import { allowedForExternalSystemSuperUserAndAdminRolesOnly,
    validateCreateExtSysRequestBody,
    validateExternalSystemTokenRequestBody, validateHeader,
    validateStatRouteParams,
    validateUserTokenRequestBody, 
    validateUsername } from '../../middleware/paramValidationMiddleware';
import { Logger } from '../../log/logger';
import { RoutePath } from '../../const/routePath';
import { buildErrorMessage, buildInfoMessageRouteHit
    , buildInfoMessageUserProcessCompleted } from '../../util/logMessageBuilder';
import LogType from '../../const/logType';
import { getExternalSystemById,
    getExternalSystemDeliveryOrderStat,
    getExternalSystemHistoryStat, 
    getExternalSystemOverviewStat } from '../../service/administration/externalSystemService';
import { IExternalSystem, IExternalSystemDTO, IExternalSystemLogin } from '../../type/IExternalSystem';
import { createExternalSystem, getExternalSystemToken } from '../../service/administration/externalSystemService';
import { HTTPSuccess, HTTPUserError } from '../../const/httpCode';
import { successResponseBuilder } from '../../util/responseBuilder';
import { AppRequest } from '../../type/appRequestType';
import { IJWTClaims } from '../../type/IJWTClaims';
import { Roles } from '../../const/roles';
import { getAdminExternalSystemByAdminAssociatedId,
    getAdminExternalSystemToken } 
    from '../../service/administration/adminExternalSystemService';
import { ICommonLoginCredentials } from '../../type/ICommonLogin';
import { checkUsernameInCommon } from '../../service/administration/commonLoginService';
import { ExternalSystemModel } from '../../data/model/ExternalSystemModel';
import { AdminExternalSystemModel } from '../../data/model/AdminExternalSystemModel';
import { SuperUserModel } from '../../data/model/SuperUserModel';
import { getSuperUserToken } from '../../service/administration/superUserService';
import ServiceError from '../../type/error/ServiceError';
import ErrorType from '../../const/errorType';
import { INVALID_CREDENTIALS_ERROR_MESSAGE } from '../../const/errorMessage';
import { ManagerExternalSystemModel } from '../../data/model/ManagerExternalSystemModel';
import { getManagerExternalSystemToken } from '../../service/administration/managerExternalSystemService';
import DurationUtil from '../../util/durationUtil';

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
            const data = await createExternalSystem(externalSystem);
            res.status(HTTPSuccess.OK_CODE).json({ data: { sysId: data.id } });
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
            fiscalInfo: { companyName: '', fiscalNumber: '',
                companyPhone: '', street: '', zip: '', city: '', country: '' },
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
        const isUsernameReservedInManager = 
            await ManagerExternalSystemModel.findOne({ 'managerUsername': requestBody.username }).exec();

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
        } else if (isUsernameReservedInManager) {
            const managerUserLoginResult = await getManagerExternalSystemToken(
                requestBody.username, requestBody.password);
            Logging.log(buildInfoMessageUserProcessCompleted(
                'Request manager login user token', requestBody.username), LogType.INFO);
            return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(managerUserLoginResult));
        }
        throw new ServiceError(ErrorType.UNAUTHORIZED, INVALID_CREDENTIALS_ERROR_MESSAGE, '', HTTPUserError.
            UNAUTHORIZED_CODE);
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, requestTokenPathCommonLogin), LogType.ERROR);
        next(error);
    });
});

// ......STATS ROUTES......

/**
 * Get system history stats
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
const getSystemHistoryStats = `${RoutePath.EXTERNAL_SYSTEMS}${RoutePath.EXTERNAL_SYSTEMS_HISTORY_STATS}`;
// eslint-disable-next-line max-len
router.get(getSystemHistoryStats, validateHeader, allowedForExternalSystemSuperUserAndAdminRolesOnly, validateStatRouteParams, (
    req: express.Request<core.ParamsDictionary, any, any,
    { durationType: string, storeId: string }>, res: Response, next: NextFunction): void => {
    (async () => {
        const periodTypeValue = +req?.query?.durationType;
        const storeId = req?.query?.storeId;
        const stats = await getExternalSystemHistoryStat(DurationUtil.getPeriodType(periodTypeValue), storeId);
        return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(stats));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, getSystemHistoryStats), LogType.ERROR);
        next(error);
    });
});

/**
 * Get system delivery order stats
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
const getSystemDeliveryOrderStats = `${RoutePath.EXTERNAL_SYSTEMS}${RoutePath.EXTERNAL_SYSTEMS_DELIVERY_ORDER_STATS}`;
// eslint-disable-next-line max-len
router.get(getSystemDeliveryOrderStats, validateHeader, allowedForExternalSystemSuperUserAndAdminRolesOnly, validateStatRouteParams, (
    req: express.Request<core.ParamsDictionary, any, any,
    { durationType: string, storeId: string }>, res: Response, next: NextFunction): void => {
    (async () => {
        const periodTypeValue = +req?.query?.durationType;
        const storeId = req?.query?.storeId;
        const stats = await getExternalSystemDeliveryOrderStat(periodTypeValue, storeId);
        return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(stats));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, getSystemDeliveryOrderStats), LogType.ERROR);
        next(error);
    });
});

/**
 * Get overview order stats
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
const getOverviewOrderStats = `${RoutePath.EXTERNAL_SYSTEMS}${RoutePath.EXTERNAL_SYSTEMS_OVERVIEW_STATS}`;
// eslint-disable-next-line max-len
router.get(getOverviewOrderStats, validateHeader, allowedForExternalSystemSuperUserAndAdminRolesOnly, validateStatRouteParams, (
    req: express.Request<core.ParamsDictionary, any, any,
    { durationType: string, storeId: string }>, res: Response, next: NextFunction): void => {
    (async () => {
        const periodTypeValue = +req?.query?.durationType;
        const storeId = req?.query?.storeId;
        const stats = await getExternalSystemOverviewStat(periodTypeValue, storeId);
        return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(stats));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, getSystemDeliveryOrderStats), LogType.ERROR);
        next(error);
    });
});

export default router;
