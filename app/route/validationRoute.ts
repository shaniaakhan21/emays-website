'use strict';
/* eslint max-lines: 0 */

import * as express from 'express';
import { RoutePath } from '../const/routePath';
import { Logger } from '../log/logger';
import { buildAppLaunchPath } from '../api/launchAPI';
import { config } from '../config/config';
import {
    buildErrorMessage
} from '../util/logMessageBuilder';
import LogType from '../const/logType';
import * as core from 'express-serve-static-core';
import { ErrorTemplateMessage } from '../const/errorTemplateMessage';
import { validateFiscalCode } from '../service/administration/validationService';
import { CountryCodes } from 'validate-vat-ts';

const router = express.Router();

const Logging = Logger(__filename);

/**
 * To validate the VAT/FISCAL Number
 */
router.get(`${RoutePath.VALIDATE}/fiscal`, (req:
    express.Request<core.ParamsDictionary, any, any, { fiscalCode: string, countryCode: CountryCodes}>,
res: express.Response, next: express.NextFunction): void => {
    (async () => {
        const fCode = req.query.fiscalCode;
        const cCode = req.query.countryCode;
        const responseData = await validateFiscalCode(fCode, cCode);
        res.send({ data: responseData });
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
