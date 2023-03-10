'use strict';

import * as express from 'express';

const router = express.Router();
import { RoutePath } from '../const/routePath';
import { Logger } from '../log/logger';
import { DataToRender, DevLaunchTemplateData, LaunchRequestBody, LaunchUIContext } from '../type/ILaunchContext';
import { authorizeLaunchRoute, buildAppLaunchPath, getJWTForSession } from '../api/launchAPI';
import { config } from '../config/config';
import * as core from 'express-serve-static-core';
import buildRenderData from '../util/buildRenderData';
import { buildErrorMessage,
    buildInfoMessageRouteHit, buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import LogType from '../const/logType';

const Logging = Logger(__filename);

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
        Logging.log(buildInfoMessageRouteHit(req.path, `launching email for user ${uuid}`), LogType.INFO);
        // TODO: Validate if the user uuid is valid

        // TODO: Get the product details from the database
        const launchTemplateData: Array<LaunchUIContext> = [{
            productName: 'Nike Air Max 270',
            productColor: 'Black',
            productSize: 8,
            productQuantity: 1,
            productCost: '£120',
            productImage: 'https://cdn.ferragamo.com/wcsstore/FerragamoCatalo' +
                'gAssetStore/images/products/756608/756608_00_r20.jpg',
            productDeliveryInformation: 'Free delivery'
        }, {
            productName: 'Nike Air Max 270',
            productColor: 'White',
            productSize: 8,
            productQuantity: 1,
            productCost: '£120',
            productImage: 'https://cdn.ferragamo.com/wcsstore/FerragamoCatalo' +
                'gAssetStore/images/products/756608/756608_00_r20.jpg',
            productDeliveryInformation: 'Free delivery'
        }];

        const applicationPath: string = await buildAppLaunchPath(config.UI_APP_ENTRY_POINT);
        const stringify = JSON.stringify(launchTemplateData);
        const cleaned = stringify.replace(/\\/g, '');

        const cleanedLaunchType = JSON.stringify(launchType).replace(/[\\"]/g, '');

        return res.render(applicationPath, buildRenderData(sessionToken, cleaned).email(cleanedLaunchType));

    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'launch email'), LogType.ERROR);
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
        Logging.log(buildInfoMessageRouteHit(req.path, 'launching dev app'), LogType.INFO);
        const applicationPath: string = await buildAppLaunchPath(config?.DEV_ENTRY_POINT);

        const launchTemplateData: DevLaunchTemplateData = {
            environment: process.env.NODE_ENV as string
        };
        Logging.log(buildInfoMessageUserProcessCompleted('Launch dev app', 'dev testing' ), LogType.INFO);
        return res.render(applicationPath, launchTemplateData);
    })().catch((error) => {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'launch dev app'), LogType.ERROR);
    });
});

/**
 * To accept the launch request and render the UI
 */
router.post(RoutePath.LAUNCH, authorizeLaunchRoute, (req: express.Request,
    res: express.Response, next: express.NextFunction): void => {
    (async () => {
        Logging.log(buildInfoMessageRouteHit(req.path, 'launch ui'), LogType.INFO);
        // TODO make it an array when we integrate this with shopping cart
        const requestBody: LaunchRequestBody = req.body as LaunchRequestBody;

        // Get token for the session
        const sessionToken: string = getJWTForSession();

        // TODO: For the moment, I manually create an array. Later we remove this.
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

        const productData: DataToRender = { 'productList': cleaned, token: sessionToken };
        Logging.log(buildInfoMessageUserProcessCompleted('Launch UI app', `order: 
            ${JSON.stringify(productData)}` ), LogType.INFO);
        return res.render(applicationPath, buildRenderData(sessionToken, cleaned).default());

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

/**
 * This is a test route test email templates
 * ATTENTION: DO NOT CHANGE THE EMAILS TEMPLATES DESIGNS BY LOOKING HOW THEY APPEAR 
 * WHEN YOU CALL THIS ROUTE BECAUSE IN THE EMAIL IT IS TOTALLY DIFFERENT.
 */

/*
 * Router.get('/test', (req: express.Request,
 *     res: express.Response, next: express.NextFunction): void => {
 *     (async () => {
 *         const items = ['name', 'address'];
 */

//         Const applicationPath: string = await buildAppLaunchPath(config.EMAIL_TEMPLATE.RETAILER_EMAIL_TEMPLATE);
//         Return res.render(applicationPath, { 'firstName': 'Thathsara', 'date': 'Wed 27, February 2023'
//             , 'finalCost': 1260.00
//             , 'time': '14:00 to 15:00', 'fullName': 'Sample Name Coll iabichino'
//             , 'experience': 'Assist me, Tailoring, Inspire me.', 'address': 'Sample Address, Milano, Italia 06830'
//             , 'items': [{ 'productName': 'Denim shirt', 'productColor': 'blue', 'productSize': 'Large'
//                 , 'productQuantity': 2, 'productCost': '10$', 'productImage': 'url',
//                 'productDeliveryInformation': 'extra information' }]
//             , 'uid': '0001147583' });
//     })().catch((error) => {
//         Const errorObject: Error = error as Error;
//         Logging.log(buildErrorMessage(errorObject, 'launch ui app'), LogType.ERROR);
//         Next(error);
//         /*
//          * Need to display error template in the app.ts since
//          * There is no UI to cater the error message at this stage (due to form submit)
//          */
//     });
// });

export default router;
