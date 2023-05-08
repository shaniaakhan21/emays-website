'use strict';

import * as express from 'express';

const router = express.Router();

import { RoutePath } from '../const/routePath';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import {
    buildErrorMessage,
    buildInfoMessageRouteHit,
    buildInfoMessageUserProcessCompleted
} from '../util/logMessageBuilder';
import { LetsTalkEmailData } from '../type/emailServiceType';
import { HTTPSuccess } from '../const/httpCode';
import { sendLetsTalkEmail } from '../service/letsTalkService';
import { validateRecaptcha } from '../service/reCaptchaService';
import { INVALID_RECAPTCHA_ERROR_MESSAGE } from '../const/errorMessage';

const Logging = Logger(__filename);

router.post(
    RoutePath.LETS_TALK, (req: express.Request, res: express.Response, next: express.NextFunction): void => {
        (async () => {
            const data = req.body as LetsTalkEmailData;
            Logging.log(buildInfoMessageRouteHit(req.path, `Lets Talk Appointment : ${data.email}`), LogType.INFO);
            const valid = await validateRecaptcha(data.reCaptcha);
            if (!valid) {
                throw new Error(INVALID_RECAPTCHA_ERROR_MESSAGE);
            }
            await sendLetsTalkEmail(data);
            Logging.log(buildInfoMessageUserProcessCompleted('Lets Talk Email Sent', ''), LogType.INFO);
            res.sendStatus(HTTPSuccess.CREATED_CODE);
        })().catch((error) => {
            const err = error as Error;
            Logging.log(buildErrorMessage(err, RoutePath.LETS_TALK), LogType.ERROR);
            next(error);
        });
    });

export default router;
