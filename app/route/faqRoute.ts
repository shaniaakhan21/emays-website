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
import { HTTPSuccess } from '../const/httpCode';
import { getAllFAQs } from '../data/model/FAQModel';
import { FAQ, IFAQDTO } from '../type/faqType';
import { createFAQ, updateFAQ } from '../api/faqAPI';

const Logging = Logger(__filename);

router.get(
    RoutePath.FAQ, (req: express.Request, res: express.Response, next: express.NextFunction): void => {
        (async () => {
            Logging.log(buildInfoMessageRouteHit(req.path, 'Get all FAQs'), LogType.INFO);
            const faqArray = await getAllFAQs();
            Logging.log(buildInfoMessageUserProcessCompleted('All FAQs loaded', ''), LogType.INFO);
            res.send({ data: faqArray.map(({ question, answer }) => ({ question, answer })) });
        })().catch((error) => {
            const err = error as Error;
            Logging.log(buildErrorMessage(err, RoutePath.FAQ), LogType.ERROR);
            next(error);
        });
    });

router.put(
    RoutePath.FAQ, (req: express.Request, res: express.Response, next: express.NextFunction): void => {
        (async () => {
            const data = req.body as FAQ;
            Logging.log(buildInfoMessageRouteHit(req.path, 'Create new FAQ'), LogType.INFO);
            await createFAQ(data);
            Logging.log(buildInfoMessageUserProcessCompleted('All FAQs loaded', ''), LogType.INFO);
            res.sendStatus(HTTPSuccess.CREATED_CODE);
        })().catch((error) => {
            const err = error as Error;
            Logging.log(buildErrorMessage(err, RoutePath.FAQ), LogType.ERROR);
            next(error);
        });
    });

router.patch(
    RoutePath.FAQ, (req: express.Request, res: express.Response, next: express.NextFunction): void => {
        (async () => {
            const data = req.body as IFAQDTO;
            Logging.log(buildInfoMessageRouteHit(req.path, `Updating FAQ ${data._id!.toString()}`), LogType.INFO);
            await updateFAQ(data);
            Logging.log(buildInfoMessageUserProcessCompleted(
                'Updated FAQ', `ID: ${data._id!.toString()}`
            ), LogType.INFO);
            res.sendStatus(HTTPSuccess.OK_CODE);
        })().catch((error) => {
            const err = error as Error;
            Logging.log(buildErrorMessage(err, RoutePath.FAQ), LogType.ERROR);
            next(error);
        });
    });

export default router;
