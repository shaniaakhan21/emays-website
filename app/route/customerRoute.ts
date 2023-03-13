'use strict';

import * as express from 'express';
import { RoutePath } from '../const/routePath';
import { Logger } from '../log/logger';
import { buildAppLaunchPath } from '../api/launchAPI';
import { config } from '../config/config';
import buildRenderData from '../util/buildRenderData';
import { CUSTOMER_UI } from '../../public/js/const/SessionStorageConst';
import LogType from '../const/logType';

// eslint-disable-next-line max-len
const router = express.Router();
const Logging = Logger(__filename);
router.get(
    [RoutePath.CUSTOMER_UI, `${RoutePath.CUSTOMER_UI}*`], (req: express.Request, res: express.Response): void => {
        (async () => {
            Logging.log('Requesting dev launch HTML form.', LogType.INFO);
            const applicationPath: string = await buildAppLaunchPath(config?.UI_APP_ENTRY_POINT);

            Logging.log('App is going to deliver the HTML form from the default UI version.', LogType.INFO);
            return res.render(applicationPath, buildRenderData('', '[]').custom(CUSTOMER_UI));
        })().catch((error) => {
            const errorObject: Error = error as Error;
            Logging.log(`Failed to deliver the HTML form for the dev launch.
        Error stack: ${errorObject.stack as string}.`, LogType.ERROR);
        });
    });

export default router;
