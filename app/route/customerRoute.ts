'use strict';

import * as express from 'express';
const router = express.Router();

import { RoutePath } from '../const/routePath';
import { buildAppLaunchPath } from '../api/launchAPI';
import { config } from '../config/config';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import LaunchParamBuilder from '../util/LaunchParamBuilder';
import { LaunchType } from '../type/ILaunchPayload';
import { ErrorTemplateMessage } from '../const/errorTemplateMessage';

const Logging = Logger(__filename);

router.get(
    RoutePath.CUSTOMER_UI, (req: express.Request, res: express.Response, next: express.NextFunction): void => {
        (async () => {
            Logging.log('Requesting customer website', LogType.INFO);
            const applicationPath: string = await buildAppLaunchPath(config?.UI_APP_ENTRY_POINT);
    
            Logging.log('App is going to deliver the customer website.', LogType.INFO);
            const paramBuilder = new LaunchParamBuilder(LaunchType.CUSTOMER_UI);
            return res.render(applicationPath, paramBuilder.build());
        })().catch((error) => {
            const errorObject: Error = error as Error;
            Logging.log(`Failed to deliver the static website.
            Error stack: ${errorObject.stack as string}.`, LogType.ERROR);
            buildAppLaunchPath(config.ERROR_TEMPLATE).then((path) => {
                return res.render(path, { errorTitle: ErrorTemplateMessage.WEBSITE_UNDER_ENHANCEMENTS_HEADER,
                    errorDescription: ErrorTemplateMessage.WEBSITE_UNDER_ENHANCEMENTS_MESSAGE });
            }).catch(err => next(error));
        });
    });

export default router;
