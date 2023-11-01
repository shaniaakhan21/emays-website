'use strict';

import * as express from 'express';
import * as core from 'express-serve-static-core';
import { Router, Request, Response, NextFunction } from 'express';
import { Logger } from '../../log/logger';
import { RoutePath } from '../../const/routePath';
import { buildErrorMessage, buildInfoMessageRouteHit
    , buildInfoMessageUserProcessCompleted } from '../../util/logMessageBuilder';
import LogType from '../../const/logType';
import { validateCreateDriver, validateHeader } from '../../middleware/paramValidationMiddleware';
import { IDriver } from '../../type/IDriver';
import { checkUsernameInCommon } from '../../service/administration/commonLoginService';
import { createDriver } from '../../service/administration/driverExternalSystemService';
import { HTTPSuccess } from '../../const/httpCode';
import { successResponseBuilder } from '../../util/responseBuilder';

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
            await createDriver(requestBody);
            return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder({ status: true }));
        }
        return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder({ status: false }));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, registerDriver), LogType.ERROR);
        next(error);
    });
});

export default router;
