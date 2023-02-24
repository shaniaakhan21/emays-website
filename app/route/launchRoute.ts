'use strict';

import * as express from 'express';
const router = express.Router();
import Logger from '../logger';
import { RoutePath } from '../const/routePath';
import { DevLaunchTemplateData, LaunchRequestBody, LaunchUIContext } from '../type/ILaunchContext';
import { authorizeLaunchRoute, buildAppLaunchPath } from '../api/launchAPI';
import { config } from '../config/config';

/**
 * To access the dev world, this route will provide you a HTML form
 */
router.get(RoutePath.DEV_LAUNCH, (req: express.Request, res: express.Response): void => {
    (async () => {
        Logger.info('Requesting dev launch HTML form.');
        const applicationPath: string = await buildAppLaunchPath(config?.DEV_ENTRY_POINT);
        const launchTemplateData: DevLaunchTemplateData = {
            environment: process.env.NODE_ENV as string
        };
        Logger.info('App is going to deliver the HTML form from the default UI version.');
        return res.render(applicationPath, launchTemplateData);
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logger.error(`Failed to deliver the HTML form for the dev launch.
        Error stack: ${errorObject.stack as string}.`);
    });
});

/**
 * To accept the launch request and render the UI
 */
router.post(RoutePath.LAUNCH, authorizeLaunchRoute, (req: express.Request,
    res: express.Response, next: express.NextFunction): void => {
    (async () => {
        // TODO make it an array when we integrate this with shopping cart
        const requestBody: LaunchRequestBody = req.body as LaunchRequestBody;
        // TODO: Think  about a way to map the user from shopping cart to our site

        // TODO: For the moment, I manually create an array. Later we remove this.
        Logger.info('Requesting UI for a user.');
        const launchTemplateData: Array<LaunchUIContext> = [{
            productName: requestBody.productName,
            productColor: requestBody.productColor,
            productSize: requestBody.productSize,
            productQuantity: requestBody.productQuantity,
            productCost: requestBody.productCost,
            productImage: requestBody.productImage,
            productDeliveryInformation: requestBody.productDeliveryInformation
        }];
        const applicationPath: string = await buildAppLaunchPath(config.UI_APP_ENTRY_POINT);
        const stringify = JSON.stringify(launchTemplateData);
        const cleaned = stringify.replace(/\\/g, '');

        const productData = { 'productList': cleaned };
        return res.render(applicationPath, productData);

    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logger.error(`Failed to launch the UI for the order item.
        Error stack: ${errorObject.stack as string}.`);
        next(error);
        /*
         * Need to display error template in the app.ts since
         * there is no UI to cater the error message at this stage (due to form submit)
         */
    });
});

export default router;
