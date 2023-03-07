'use strict';

import { SES } from 'aws-sdk';
import { config } from '../config/config';

class EmailClient {

    static instance: SES;

    constructor () {
        const client = { region: config.AWS_SES.AWS_REGION,
            accessKeyId: config.AWS_SES.AWS_SES_ACCESS_KEY,
            secretAccessKey: config.AWS_SES.AWS_SES_SECRET_KEY };
        if (!EmailClient.instance) {
            EmailClient.instance = new SES(client);
        }
    }

    getInstance () {
        return EmailClient.instance;
    }

}

export default EmailClient;
