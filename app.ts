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
import calenderRoute from './app/route/calendarRoute';
import orderRoute from './app/route/userOrderRoute';
import customerRoutes from './app/route/customerRoute';
import externalSystemRoute from './app/route/systemRoute';
import sendErrorResponse from './app/middleware/errorResponseBuilderMiddleware';
import { AppConfigKey } from './app/const/appConfigKey';
import { validateJWT } from './app/middleware/jwtTokenValidationMiddleware';
import ServiceError from './app/type/error/ServiceError';
import { connectToMongoDB } from './app/data/db/connector';
import sumUpRoute from './app/route/sumUpRoute';

// Parses incoming requests with JSON payloads (body-parser)
app.use(express.json());
// Parses incoming requests with HTML Form (body-parser) 
app.use(express.urlencoded({ extended: true }));

// Connect to the database
(async () => {
    await connectToMongoDB();
})().catch(error => {
    process.exit(1);
});

// Static Files through /dist path since we have multiple versions
app.use(config.STATIC_FILES_LOCATION, express.static(__dirname + config.UI_VERSIONS_LOCATION));
// Set Template Engine
app.set(AppConfigKey.VIEWS, config.STATIC_FILES_LOCATION);
app.engine(AppConfigKey.HTML, require('ejs').renderFile);

// Auth token validation
app.use((req, res, next) => {
    validateJWT(req, res, next);
});

// Define Routes
app.use(config.ROUTE_PATH, healthRoute);
app.use(config.ROUTE_PATH, sumUpRoute);
app.use(config.ROUTE_PATH, launchRoute);
app.use(config.ROUTE_PATH, orderRoute);
app.use(config.ROUTE_PATH, calenderRoute);
app.use(config.ROUTE_PATH, externalSystemRoute);
app.use(customerRoutes);

/*
 * Error handling middleware
 */
app.use((err: ServiceError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    sendErrorResponse(err, res);
});

export const App = app;
