'use strict';

import * as express from 'express';
import { config } from '../config/config';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
const router = express.Router();

import { RoutePath } from '../const/routePath';
import { allowedForClientRoleAndSuperAdminOnly } from '../middleware/paramValidationMiddleware';
import { buildInfoMessageRouteHit } from '../util/logMessageBuilder';
import { AppRequest } from '../type/appRequestType';
import { successResponseBuilder } from '../util/responseBuilder';
import { HTTPSuccess } from '../const/httpCode';

const Logging = Logger(__filename);

/**
 * Get application info for frontend
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
// eslint-disable-next-line max-len
router.get(RoutePath.APP_INFO, allowedForClientRoleAndSuperAdminOnly, (req: express.Request, res: express.Response): void => {
    const request: AppRequest = (req as AppRequest);
    Logging.log(buildInfoMessageRouteHit(req.path, `uid: ${request?.claims?.id as string}`), LogType.INFO);
    res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder({ googleMapAPIKey: config.GOOGLE.MAP.API_KEY }));
});

export default router;
