'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import { Logger } from '../../log/logger';
import { RoutePath } from '../../const/routePath';
import { buildErrorMessage, buildInfoMessageRouteHit } from '../../util/logMessageBuilder';
import LogType from '../../const/logType';
import { validateAPIMapper, validateHeader } from '../../middleware/paramValidationMiddleware';
import { HTTPSuccess } from '../../const/httpCode';
import { successResponseBuilder } from '../../util/responseBuilder';
import { AppRequest } from '../../type/appRequestType';
import { IExternalAPIMapper } from '../../type/externalAPIMapperType';
import { createExternalSystemAPIMapper,
    getWordpressStoreDataByStoreId } from '../../service/administration/externalSystemAPIMapperService';

const router = Router();
const Logging = Logger(__filename);

/**
 * Add external API mapper
 */
const createAPIMapper = `${RoutePath.EXTERNAL_API_MAPPER}`;
router.post(createAPIMapper, validateHeader, validateAPIMapper, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, ''), LogType.INFO);
        const requestBody = req.body as IExternalAPIMapper;
        const apiMapper = await createExternalSystemAPIMapper(requestBody);
        return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(
            { status: true, id: apiMapper?.storeId }));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Failed to create API mapper record.'), LogType.ERROR);
        next(error);
    });
});

/**
 * Get wordpress product data
 */
const getWordpressProductData = `${RoutePath.EXTERNAL_API_MAPPER}/wordpressStoreData`;
router.get(getWordpressProductData, validateHeader, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        const storeId = (req as AppRequest).claims?.id as string;
        Logging.log(buildInfoMessageRouteHit(req.path, ''), LogType.INFO);
        const wordpressStoreData = await getWordpressStoreDataByStoreId(storeId);
        return res.status(HTTPSuccess.OK_CODE).json(successResponseBuilder(wordpressStoreData));
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Get wordpress product data'), LogType.ERROR);
        next(error);
    });
});

export default router;
