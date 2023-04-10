'use strict';

import * as express from 'express';
const router = express.Router();

import { RoutePath } from '../const/routePath';
import { buildErrorMessage } from '../util/logMessageBuilder';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import * as core from 'express-serve-static-core';
import { buildCheckoutPath, buildCompleteCheckoutPath } from '../api/sumupAPI';
import { ProcessCheckoutRequest } from '../service/sumupService';
import { allowedForClientRoleOnly } from '../middleware/paramValidationMiddleware';

const Logging = Logger(__filename);

router.get(`${RoutePath.SUMUP}/checkout`, allowedForClientRoleOnly, (
    req: express.Request<core.ParamsDictionary, any, any, { uuid: string }>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        // Todo: Validate JWT

        const data = await buildCheckoutPath(req.query.uuid);

        res.json(data);
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'sumUp Checkout'), LogType.ERROR);
        next(error);
    });
});

router.post(`${RoutePath.SUMUP}/checkout`, (
    req: express.Request<core.ParamsDictionary, any, ProcessCheckoutRequest['card'], { id: string }>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        // Todo: Validate JWT

        const data = await buildCompleteCheckoutPath(req.query.id, { card: req.body });

        res.json(data);
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'sumUp Checkout'), LogType.ERROR);
        next(error);
    });
});

export default router;
