/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use strict';

import * as express from 'express';
const app = express();

import { config } from './app/config/config';

// Routes
import healthRoute from './app/route/healthRoute';
import launchRoute from './app/route/launchRoute';
import orderRoute from './app/route/orderRoute';
import { buildErrorResponseAndSend } from './app/middleware/errorResponseBuilderMiddleware';
import { AppConfigKey } from './app/const/appConfigKey';
import Logger from './app/logger';

// Parses incoming requests with JSON payloads (body-parser)
app.use(express.json());
// Parses incoming requests with HTML Form (body-parser) 
app.use(express.urlencoded({ extended: true }));

// Static Files through /dist path since we have multiple versions
app.use(config.STATIC_FILES_LOCATION, express.static(__dirname + config.UI_VERSIONS_LOCATION));
// Set Template Engine
app.set(AppConfigKey.VIEWS, config.STATIC_FILES_LOCATION);
app.engine(AppConfigKey.HTML, require('ejs').renderFile);

// Define Routes
app.use(config.ROUTE_PATH, healthRoute);
app.use(config.ROUTE_PATH, launchRoute);
app.use(config.ROUTE_PATH, orderRoute);

/*
 * Error handling middleware
 */
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Get sessionID that has been passed with request headers
    Logger.error(`Application error builder is being called with the error : ${err.message}.`);
    buildErrorResponseAndSend(err, res);
});

export const App = app;
