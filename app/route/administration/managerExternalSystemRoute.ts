'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import { Logger } from '../../log/logger';
import { RoutePath } from '../../const/routePath';
import LogType from '../../const/logType';
import { HTTPSuccess } from '../../const/httpCode';
import { buildErrorMessage, buildInfoMessageRouteHit } from '../../util/logMessageBuilder';
import { IManagerExternalSystem } from '../../type/IManagerExternalSystem';
import { validateHeader, validateManagerExternalSystemUserRequestBody
} from '../../middleware/paramValidationMiddleware';
import { checkUsernameInCommon } from '../../service/administration/commonLoginService';
import { createManagerExternalSystem } from '../../service/administration/managerExternalSystemService';

const router = Router();
const Logging = Logger(__filename);

/**
 * Register manager  for external system
 */
router.post(RoutePath.MANAGER_EXTERNAL_SYSTEM_USERS, validateHeader, validateManagerExternalSystemUserRequestBody, (
    req: Request, res: Response, next: NextFunction): void => {
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, 'Manager external system user registration'), LogType.INFO);
        const managerExternalSystemUser = req.body as IManagerExternalSystem;
        const usernameValidity = await checkUsernameInCommon(managerExternalSystemUser.managerUsername);
        if (usernameValidity) {
            await createManagerExternalSystem(managerExternalSystemUser);
            res.sendStatus(HTTPSuccess.CREATED_CODE);
        }
    })().catch(error => {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, RoutePath.ADMIN_EXTERNAL_SYSTEM_USERS), LogType.ERROR);
        next(error);
    });
});

export default router;
