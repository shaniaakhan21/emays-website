'use strict';

import * as express from 'express';
const router = express.Router();
import LogType from '../const/logType';
import { Logger } from '../log/logger';
const Logging = Logger(__filename);
import { RoutePath } from '../const/routePath';
import { dailyReminder } from '../service/lambdaService';

/**
 * To send emails by AWS Lambda
 */
router.post(RoutePath.EMAIL_REMINDERS, (req: express.Request, res: express.Response): void => {
    (async () => {
        Logging.log('Send email reminders to customers', LogType.INFO);
        await dailyReminder();
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(`Failed to send email reminders.
        Error stack: ${errorObject.stack as string}.`, LogType.ERROR);
    });
});

export default router;
