'use strict';

import * as express from 'express';
import * as core from 'express-serve-static-core';
import { Router, Request, Response, NextFunction } from 'express';
import { Logger } from '../../log/logger';
import { PathParam, RoutePath } from '../../const/routePath';
import { buildErrorMessage, buildInfoMessageRouteHit } from '../../util/logMessageBuilder';
import LogType from '../../const/logType';
import { validateCreateDriver, validateHeader, validateOrderDetailsPagination,
    validateParamUserId } from '../../middleware/paramValidationMiddleware';
import { IDriver } from '../../type/IDriver';
import { checkUsernameInCommon } from '../../service/administration/commonLoginService';
import { createDriver, getDriverById,
    getDriverOrderHistoryWithPagination } from '../../service/administration/driverExternalSystemService';
import { HTTPSuccess } from '../../const/httpCode';
import { successResponseBuilder } from '../../util/responseBuilder';
import { AppRequest } from '../../type/appRequestType';

const router = Router();
const Logging = Logger(__filename);

/**
 * Add driver
 */
const registerDriver = `${RoutePath.DRIVERS}`;
router.post(registerDriver, validateHeader, validateCreateDriver, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, ''), LogType.INFO);
        const requestBody = req.body as IDriver;
        const usernameValidity = await checkUsernameInCommon(requestBody.driverUsername);
        
        if (usernameValidity) {
            const driver = await createDriver(requestBody);
            return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(
                { status: true, id: driver?.id as string }));
        }
        return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder({ status: false }));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, registerDriver), LogType.ERROR);
        next(error);
    });
});

/**
 * Get driver info
 */
const getDriverInfo = `${RoutePath.DRIVERS}/driverInfo`;
router.get(getDriverInfo, validateHeader, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        const driverId = (req as AppRequest).claims?.id as string;
        Logging.log(buildInfoMessageRouteHit(req.path, ''), LogType.INFO);
        const driver = await getDriverById(driverId);
        return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(driver));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, getDriverInfo), LogType.ERROR);
        next(error);
    });
});

/**
 * Get driver history pagination
 */
const getDriverHistory = `${RoutePath.DRIVERS}/driverHistory${PathParam.USER_ID}`;
router.get(getDriverHistory, validateHeader, validateParamUserId, validateOrderDetailsPagination, (
    req: express.Request<core.ParamsDictionary, any, any,
    // eslint-disable-next-line max-len
    { page: string, pageLimit: string, storeId: string, isCompleted: string }>, res: Response, next: NextFunction): void => {
    (async () => {
        const page = parseInt(req.query.page);
        const pageLimit = parseInt(req.query.pageLimit);
        const pathParamUserId = req.params.userId;
        Logging.log(buildInfoMessageRouteHit(req.path, ''), LogType.INFO);
        const driver = await getDriverOrderHistoryWithPagination(page, pageLimit, pathParamUserId);
        return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(driver));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, getDriverInfo), LogType.ERROR);
        next(error);
    });
});

export default router;
