'use strict';

import * as express from 'express';
const router = express.Router();

import { RoutePath } from '../const/routePath';

/**
 * To check the status of the BFF
 */
router.get(RoutePath.HEALTH, (req: express.Request, res: express.Response): void => {
    res.json({ status: 'running...' });
});

export default router;
