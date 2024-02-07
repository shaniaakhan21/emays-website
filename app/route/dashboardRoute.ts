'use strict';
/* eslint max-lines: 0 */

import * as express from 'express';
import { RoutePath } from '../const/routePath';
import { Logger } from '../log/logger';
import { DataToRender, DevLaunchTemplateData, LaunchRequest, LaunchRequestBody,
    LaunchRequestConverted, LaunchUIContext } from '../type/ILaunchContext';
import { authorizeLaunchRoute, buildAppLaunchPath, getJWTForSession } from '../api/launchAPI';
import { config } from '../config/config';
import * as core from 'express-serve-static-core';
import {
    buildErrorMessage,
    buildInfoMessageRouteHit,
    buildInfoMessageUserProcessCompleted
} from '../util/logMessageBuilder';
import LogType from '../const/logType';
import { validateJWTToken } from '../middleware/jwtTokenValidationMiddleware';
import { retrieveOrderDetailsByUserId } from '../service/orderService';
import { IPatchOrder, Order } from '../type/orderType';
import { IUser } from '../type/IUserType';
import { v4 as uuidv4 } from 'uuid';
import LaunchParamBuilder from '../util/LaunchParamBuilder';
import { LaunchType } from '../type/ILaunchPayload';
import { ErrorTemplateMessage } from '../const/errorTemplateMessage';
import { allowedForExternalSystemRoleOnly } from '../middleware/paramValidationMiddleware';
import ServiceError from '../type/error/ServiceError';
import ErrorType from '../const/errorType';
import { CAN_NOT_FIND_SELECTED_AREA, ORDER_NOT_ACTIVE } from '../const/errorMessage';
import { HTTPUserError } from '../const/httpCode';
import * as OrderService from '../service/orderService';
import { prepareUserPayload } from '../api/userAPI';
import { AppRequest, AppRequestStoreCurrency, AppRequestStoreCurrencyAndEmail } from '../type/appRequestType';
import { IJWTClaims } from '../type/IJWTClaims';

const router = express.Router();

const Logging = Logger(__filename);

/**
 * To accept the launch request and render the UI
 */
router.get(RoutePath.DASHBOARD, allowedForExternalSystemRoleOnly, (req: express.Request,
    res: express.Response, next: express.NextFunction): void => {
    (async () => {
        Logging.log(buildInfoMessageUserProcessCompleted('Launch UI app', 'Dashboard' ), LogType.INFO);
        const paramBuilder = new LaunchParamBuilder(LaunchType.DASHBOARD);
        const applicationPath: string = await buildAppLaunchPath(config.UI_APP_ENTRY_POINT);
        return res.render(applicationPath, paramBuilder.build());

    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'launch ui app'), LogType.ERROR);
        buildAppLaunchPath(config.ERROR_TEMPLATE).then((path) => {
            return res.render(path, { errorTitle: ErrorTemplateMessage.LAUNCH_ERROR_HEADER,
                errorDescription: ErrorTemplateMessage.LAUNCH_ERROR_MESSAGE });
        }).catch(err => next(error));
    });
});

export default router;
