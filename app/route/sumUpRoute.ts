'use strict';

import * as express from 'express';
const router = express.Router();

import { RoutePath } from '../const/routePath';
import { validateJWTToken } from '../middleware/jwtTokenValidationMiddleware';
import { buildErrorMessage } from '../util/logMessageBuilder';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import * as core from 'express-serve-static-core';
import { buildSnapCheckoutPath } from '../api/sumupAPI';

const Logging = Logger(__filename);

router.get(`${RoutePath.SUMUP}/checkout`, (
    req: express.Request<core.ParamsDictionary, any, any, { uuid: string, launchType: string, authToken: string }>,
    res: express.Response,
    next: express.NextFunction
) => {
    (async () => {
        validateJWTToken(req.query.authToken);

        // Todo: Get UUID from JWT instead of query param
        const uuid = req.query.uuid;

        const data = await buildSnapCheckoutPath(uuid);

        res.json(data);
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'sumUp Checkout'), LogType.ERROR);
        next(error);
    });
});

export default router;
