'use strict';

import * as express from 'express';
const router = express.Router();

import { RoutePath } from '../const/routePath';
import Logger from '../logger';
import { buildAppLaunchPath } from '../api/launchAPI';
import { config } from '../config/config';
import buildRenderData from '../util/buildRenderData';
import { CUSTOMER_UI } from '../../public/js/const/SessionStorageConst';

router.get(RoutePath.CUSTOMER_UI, (req: express.Request, res: express.Response): void => {
    (async () => {
        Logger.info('Requesting dev launch HTML form.');
        const applicationPath: string = await buildAppLaunchPath(config?.UI_APP_ENTRY_POINT);

        Logger.info('App is going to deliver the HTML form from the default UI version.');
        return res.render(applicationPath, buildRenderData('', '[]').custom(CUSTOMER_UI));
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logger.error(`Failed to deliver the HTML form for the dev launch.
        Error stack: ${errorObject.stack as string}.`);
    });
});

export default router;
