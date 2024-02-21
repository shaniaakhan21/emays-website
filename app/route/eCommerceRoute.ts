'use strict';
/* eslint max-lines: 0 */

import * as express from 'express';
import { RoutePath } from '../const/routePath';
import { Logger } from '../log/logger';
import { buildAppLaunchPath } from '../api/launchAPI';
import { config } from '../config/config';
import {
    buildErrorMessage,
    buildInfoMessageUserProcessCompleted
} from '../util/logMessageBuilder';
import LogType from '../const/logType';
import LaunchParamBuilder from '../util/LaunchParamBuilder';
import { LaunchType } from '../type/ILaunchPayload';
import { ErrorTemplateMessage } from '../const/errorTemplateMessage';

const router = express.Router();

const Logging = Logger(__filename);

/**
 * To accept the launch request and allow refreshing the e-Commerce UI
 */
router.get('/launch', (req: express.Request,
    res: express.Response, next: express.NextFunction): void => {
    (async () => {
        Logging.log(buildInfoMessageUserProcessCompleted('E-Commerce UI app', 'Dashboard' ), LogType.INFO);
        const paramBuilder = new LaunchParamBuilder(LaunchType.PRODUCT_LAUNCH);
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
