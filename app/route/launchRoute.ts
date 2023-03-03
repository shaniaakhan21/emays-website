'use strict';

import * as express from 'express';

const router = express.Router();
import Logger from '../logger';
import { RoutePath } from '../const/routePath';
import { DataToRender, DevLaunchTemplateData, LaunchRequestBody, LaunchUIContext } from '../type/ILaunchContext';
import { authorizeLaunchRoute, buildAppLaunchPath, getJWTForSession } from '../api/launchAPI';
import { config } from '../config/config';
import * as core from 'express-serve-static-core';

/**
 * To accept the launch request from email and render the UI
 */
router.get(RoutePath.LAUNCH_MAIL, (
    req: express.Request<core.ParamsDictionary, any, any, { uuid: string, launchType: string }>,
    res: express.Response, next: express.NextFunction): void => {
    (async () => {
        // Get token for the session
        const sessionToken: string = getJWTForSession();

        const uuid = req.query.uuid;
        const launchType = req.query.launchType;
        Logger.log('info', `Requesting UI for a user with uuid: ${uuid} and launchType: ${launchType}.`);
        // TODO: Validate if the user uuid is valid

        // TODO: Get the product details from the database
        const launchTemplateData: Array<LaunchUIContext> = [{
            productName: 'Nike Air Max 270',
            productColor: 'Black',
            productSize: 8,
            productQuantity: 1,
            productCost: '£120',
            productImage: 'https://static.nike.com/a/images/t_PDP_864_v1/' +
                'f_auto,b_rgb:f5f5f5/8b1b3b1a-1b1a-4b1a-9b1a-1b1a4b1a9b1a/air-max-270-react-shoe-1JZxJx.jpg',
            productDeliveryInformation: 'Free delivery'
        }, {
            productName: 'Nike Air Max 270',
            productColor: 'White',
            productSize: 8,
            productQuantity: 1,
            productCost: '£120',
            productImage: 'https://static.nike.com/a/images/t_PDP_864_v1/' +
                'f_auto,b_rgb:f5f5f5/8b1b3b1a-1b1a-4b1a-9b1a-1b1a4b1a9b1a/air-max-270-react-shoe-1JZxJx.jpg',
            productDeliveryInformation: 'Free delivery'
        }];

        const applicationPath: string = await buildAppLaunchPath(config.UI_APP_ENTRY_POINT);
        const stringify = JSON.stringify(launchTemplateData);
        const cleaned = stringify.replace(/\\/g, '');

        const cleanedLaunchType = JSON.stringify(launchType).replace(/[\\"]/g, '');

        return res.render(applicationPath, {
            productList: cleaned,
            launchType: cleanedLaunchType,
            token: sessionToken });

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

        // Get token for the session
        const sessionToken: string = getJWTForSession();

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

        const productData = { 'productList': cleaned, 'launchType': 'productLaunch', token: sessionToken };
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
