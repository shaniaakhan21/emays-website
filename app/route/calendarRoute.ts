/* eslint-disable camelcase */
'use strict';

import { RoutePath } from '../const/routePath';
import * as express from 'express';
const router = express.Router();
import { createEvent, getAccessToken, getRedirectionURL } from '../service/calendarService';
import { Logger } from '../log/logger';
import { buildErrorMessage, buildInfoMessageRouteHit } from '../util/logMessageBuilder';
import LogType from '../const/logType';
import * as core from 'express-serve-static-core';
import { validateJWTToken } from '../middleware/jwtTokenValidationMiddleware';

const Logging = Logger(__filename);

/**
 * To request access to the user google account
 */
router.get(RoutePath.CALENDER_ACCESS, (req:
        express.Request<core.ParamsDictionary, any, any, { uuid: string, authToken: string }>
, res: express.Response, next: express.NextFunction): void => {
    try {
        validateJWTToken(req.query.authToken);
        const uuid = req.query.uuid;
        Logging.log(
            buildInfoMessageRouteHit(req.path, `requesting google calender access for user ${uuid}`), LogType.INFO);
        const url = getRedirectionURL(uuid);
        return res.redirect(url);

    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Calender access request'), LogType.ERROR);
        next(error);
    }
});

/**
 * Redirection page
 */
router.get(RoutePath.CALENDER_REDIRECTION, (req: express.Request, res: express.Response
    , next: express.NextFunction): void => {
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, 'getting google auth token info'), LogType.INFO);
        const { code, state } = req.query;
        const tokenData = await getAccessToken(code as string);
        const { access_token, scope, token_type, expiry_date } = tokenData.tokens;
        await createEvent(state as string, scope as string, access_token as 
            string, expiry_date as 
            number, token_type as string);
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'launch ui app'), LogType.ERROR);
        next(error);
        /*
         * Need to display error template in the app.ts since
         * there is no UI to cater the error message at this stage (due to form submit)
         */
    });
});

export default router;
