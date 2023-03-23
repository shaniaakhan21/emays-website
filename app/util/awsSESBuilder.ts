'use strict';

import * as AWS from 'aws-sdk';
import { config } from '../config/config';

class EmailClient {

    static instance: AWS.SES;

    constructor () {

        const client = { region: config.AWS_SES.AWS_REGION,
            accessKeyId: config.AWS_SES.AWS_SES_ACCESS_KEY,
            secretAccessKey: config.AWS_SES.AWS_SES_SECRET_KEY };

        if (!EmailClient.instance) {

            if (process.env.NODE_ENV === 'production') {
                AWS.config.update({ region: config.AWS_SES.AWS_REGION });
                AWS.config.credentials = new AWS.EC2MetadataCredentials();
                EmailClient.instance = new AWS.SES();
            } else {
                EmailClient.instance = new AWS.SES(client);
            }
        }
    }

    getInstance () {
        return EmailClient.instance;
    }

}

export default EmailClient;
