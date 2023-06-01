'use strict';

import App from './app';
import { config } from './app/config/config';

console.log('Starting Express Server...');
const runningPortDev: number = +config?.PORT?.NODE_DOCKER_PORT;
const exposedPortDev: number = +config?.PORT?.NODE_LOCAL_PORT;
const env: string = config.NODE_ENV;
if (runningPortDev) {
    App()
        .then((app) => {
            app.listen(runningPortDev, () => {
                console.log(`App Environment:  ${env.toString().toUpperCase()}`);
                console.log(`Route path: ${config.ROUTE_PATH}`);
                console.log(`App is running on port: ${runningPortDev}`);
                console.log(`Container is exposed : ${exposedPortDev}`);
            }).on('error', (err) => {
                if (err) {
                    console.log('An error observed in the server: ', err);
                }
            });
        }).catch((err) => {
            console.log('An error observed in the server: ', err);
        });
} else {
    console.error('Error: dev-server port is not defined.');
}
