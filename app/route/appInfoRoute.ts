'use strict';

import * as express from 'express';
import { config } from '../config/config';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
const router = express.Router();

import { RoutePath } from '../const/routePath';
import { allowedForClientRoleOnly } from '../middleware/paramValidationMiddleware';
import { buildInfoMessageRouteHit } from '../util/logMessageBuilder';
import { AppRequest } from '../type/appRequestType';

const Logging = Logger(__filename);

/**
 * Get application info for frontend
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
router.get(RoutePath.APP_INFO, allowedForClientRoleOnly, (req: express.Request, res: express.Response): void => {
    const request: AppRequest = (req as AppRequest);
    Logging.log(buildInfoMessageRouteHit(req.path, `uid: ${request?.claims?.id as string}`), LogType.INFO);
    res.json({ googleMapAPIKey: config.GOOGLE.MAP.API_KEY });
});

export default router;
