/* eslint-disable capitalized-comments */
/* eslint-disable multiline-comment-style */
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
import eCommerceRoute from './app/route/eCommerceRoute';
import driverRoute from './app/route/administration/driverRoute';
import orderRoute from './app/route/userOrderRoute';
import externalSystemRoute from './app/route/administration/systemRoute';
import adminExternalSystemRoute from './app/route/administration/adminExternalSystemRoute';
import managerExternalSystemRoute from './app/route/administration/managerExternalSystemRoute';
import geoRoute from './app/route/geoRoute';
import appInfoRoute from './app/route/appInfoRoute';
import emailReminderRoute from './app/route/emailReminderRoute';
import superUserRoute from './app/route/administration/superUserRoute';
import stripeRoute from './app/route/stripeRoute';
import sendErrorResponse from './app/middleware/errorResponseBuilderMiddleware';
import { AppConfigKey } from './app/const/appConfigKey';
import { validateJWT } from './app/middleware/jwtTokenValidationMiddleware';
import ServiceError from './app/type/error/ServiceError';
import { connectToMongoDB } from './app/data/db/connector';
import letsTalkRoute from './app/route/letsTalkRoute';
import faqRoute from './app/route/faqRoute';
import { emailScheduler } from './app/service/schedulerEmailService';
import dashboard from './app/route/dashboardRoute';
import website from './app/route/websiteRoute';
import { WEBSITE_UI_PATHS } from './app/const/routePath';

const UI_PATHS: Array<string> = WEBSITE_UI_PATHS;

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

// Start reminding email scheduler
emailScheduler();

// Static Files through /dist path since we have multiple versions
app.use(config.STATIC_FILES_LOCATION, express.static(__dirname + config.UI_VERSIONS_LOCATION));
app.use('/sw.js', express.static(__dirname + config.UI_VERSIONS_LOCATION + '/sw.js'));
// Set Template Engine
app.set(AppConfigKey.VIEWS, config.STATIC_FILES_LOCATION);
app.engine(AppConfigKey.HTML, require('ejs').renderFile);

// Auth token validation
app.use((req, res, next) => {
    validateJWT(req, res, next);
});

// Define Routes
app.use(config.ROUTE_PATH, healthRoute);
app.use(config.ROUTE_PATH, stripeRoute);
app.use(config.ROUTE_PATH, launchRoute);
app.use(config.ROUTE_PATH, orderRoute);
app.use(config.ROUTE_PATH, calenderRoute);
app.use(config.ROUTE_PATH, externalSystemRoute);
app.use(config.ROUTE_PATH, geoRoute);
app.use(config.ROUTE_PATH, appInfoRoute);
app.use(config.ROUTE_PATH, emailReminderRoute);
app.use(config.ROUTE_PATH, superUserRoute);
app.use(config.ROUTE_PATH, letsTalkRoute);
app.use(config.ROUTE_PATH, faqRoute);
app.use(config.ROUTE_PATH, adminExternalSystemRoute);
app.use(config.ROUTE_PATH, managerExternalSystemRoute);
app.use(config.ROUTE_PATH, driverRoute);
// This allows to refresh the e-commerce pages
app.use(config.ROUTE_PATH, eCommerceRoute);
app.use(dashboard);
app.use(website);
/*
 * Error handling middleware
 */
app.use((err: ServiceError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    sendErrorResponse(err, res);
});

export const App = app;
