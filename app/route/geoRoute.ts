'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { buildErrorMessage, buildInfoMessageRouteHit }
    from '../util/logMessageBuilder';
import { PathParam, RoutePath } from '../const/routePath';
import { HTTPSuccess } from '../const/httpCode';
import { allowedForClientRoleOnly, validateGeoBasedServiceFeePathParams,
    validateHeader } from '../middleware/paramValidationMiddleware';
import { AppRequest } from '../type/appRequestType';
import { IGeoType, IGeoTypeDTO } from '../type/geoType';
import { getServiceCostBasedOnGeoLocation } from '../service/geoService';
import { successResponseBuilder } from '../util/responseBuilder';

const router = Router();
const Logging = Logger(__filename);

const GeoRoutePath: string = RoutePath.GEO;

/**
 * Get service fee based on the geo location
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next middleware function
 * @returns {void}
 */
const middleware = [allowedForClientRoleOnly, validateHeader, validateGeoBasedServiceFeePathParams];
router.get(
    `${GeoRoutePath}${PathParam.AREA_NAME}${PathParam.AREA_LATITUDE}${PathParam.AREA_LONGITUDE}`, middleware, (
        req: Request, res: Response, next: NextFunction
    ): void => {
        (async () => {
            const request: AppRequest = (req as AppRequest);
            const area: string = req.params.area;
            const latitude: string = req.params.lat;
            const longitude: string = req.params.long; 
            Logging.log(buildInfoMessageRouteHit(req.path, `uid: ${request?.claims?.id as string}`), LogType.INFO);
            const data: IGeoType = {
                uid: request?.claims?.id as string,
                area: area,
                lat: +latitude,
                long: +longitude
            };
            const result: IGeoTypeDTO = await getServiceCostBasedOnGeoLocation(data);
            res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(result));
        })().catch(error => {
            const err = error as Error;
            Logging.log(buildErrorMessage(err, GeoRoutePath), LogType.ERROR);
            next(error);
        });
    });

export default router;
