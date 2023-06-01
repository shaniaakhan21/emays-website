/* eslint-disable */
'use strict';

import * as express from 'express';
import { createServer as createViteServer } from 'vite'
const app = express();

import { config } from './app/config/config';

// Routes
import healthRoute from './app/route/healthRoute';
import launchRoute from './app/route/launchRoute';
import calenderRoute from './app/route/calendarRoute';
import orderRoute from './app/route/userOrderRoute';
import customerRoutes from './app/route/customerRoute';
import externalSystemRoute from './app/route/administration/systemRoute';
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
import * as fs from "fs";
import * as path from "path";

async function createServer() {
    // Parses incoming requests with JSON payloads (body-parser)
    app.use(express.json());
    // Parses incoming requests with HTML Form (body-parser)
    app.use(express.urlencoded({ extended: true }));

    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom'
    })

    app.use(vite.middlewares)

    // Connect to the database
    try {
        await connectToMongoDB();
    } catch (error) {
        process.exit(1);
    }

    // Static Files through /dist path since we have multiple versions
    app.use(config.STATIC_FILES_LOCATION, express.static(__dirname + config.UI_VERSIONS_LOCATION));
    app.use('/sw.js', express.static(__dirname + config.UI_VERSIONS_LOCATION + '/sw.js'));
    // Set Template Engine
    app.set(AppConfigKey.VIEWS, config.STATIC_FILES_LOCATION);
    app.engine(AppConfigKey.HTML, require('ejs').renderFile);
    // App.use(customerRoutes);

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl

        try {
            // 1. Read index.html
            let template = fs.readFileSync(
              path.resolve(__dirname, 'public/index.html'),
              'utf-8',
            )

            // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
            //    and also applies HTML transforms from Vite plugins, e.g. global
            //    preambles from @vitejs/plugin-react
            template = await vite.transformIndexHtml(url, template)

            // 3. Load the server entry. ssrLoadModule automatically transforms
            //    ESM source code to be usable in Node.js! There is no bundling
            //    required, and provides efficient invalidation similar to HMR.
            const { render } = await vite.ssrLoadModule(path.resolve(__dirname, 'public/entry-server.jsx'))

            // 4. render the app HTML. This assumes entry-server.js's exported
            //     `render` function calls appropriate framework SSR APIs,
            //    e.g. ReactDOMServer.renderToString()
            const appHtml = await render(url)

            // 5. Inject the app-rendered HTML into the template.
            const html = template.replace(`<!--ssr-outlet-->`, appHtml)

            // 6. Send the rendered HTML back.
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            // If an error is caught, let Vite fix the stack trace so it maps back
            // to your actual source code.
            vite.ssrFixStacktrace(e as any)
            console.error(e)
            next(e)
        }
    })

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

    /*
     * Error handling middleware
     */
    app.use((err: ServiceError, req: express.Request, res: express.Response, next: express.NextFunction) => {
        sendErrorResponse(err, res);
    });

    return app;
}

export default createServer;
