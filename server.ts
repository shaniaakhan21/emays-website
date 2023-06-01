'use strict';

import App from './app';
import { config } from './app/config/config';

console.log('Starting Express Server...');
const runningPort: number = +config?.PORT?.NODE_DOCKER_PORT;
const exposedPort: number = +config?.PORT?.NODE_LOCAL_PORT;
const env: string = config.NODE_ENV;
if (runningPort) {
    App().then((app) => {
        app.listen(runningPort, () => {
            console.log(`App Environment:  ${env.toString().toUpperCase()}`);
            console.log(`Route path: ${config.ROUTE_PATH}`);
            console.log(`App is running on port: ${runningPort}`);
            console.log(`Container is exposed : ${exposedPort}`);
        }).on('error', (err) => {
            if (err) {
                console.log('An error observed in the server: ', err);
            }
        });
    }).catch((err) => {
        console.log('An error observed in the server: ', err);
    });
} else {
    console.error('Error: server port is not defined.');
}
