'use strict';

const {
    NODE_ENV,
    NODE_DOCKER_PORT,
    NODE_LOCAL_PORT,
    ROUTE_PATH,
    JSON_WEB_TOKEN_EXP_HOURS_SHORT,
    JSON_WEB_TOKEN_EXP_HOURS_LONG,
    JSON_WEB_TOKEN_EXP_HOURS_EXTERNAL_SYSTEM,
    JSON_WEB_TOKEN_SECRET,
    AWS_SES_ACCESS_KEY,
    AWS_SES_SECRET_KEY,
    AWS_REGION,
    AWS_SOURCE_EMAIL,
    GOOGLE_AUTH_CLIENT_ID,
    GOOGLE_AUTH_CLIENT_SECRET,
    GOOGLE_AUTH_REDIRECTION_URL,
    GOOGLE_AUTH_SCOPE,
    GOOGLE_CALENDER_TASK_SUMMERY,
    GOOGLE_CALENDER_TASK_DESCRIPTION,
    CUSTOMER_EMAIL_TEMPLATE,
    RETAILER_EMAIL_TEMPLATE,
    SERVICE_CHARGE,
    ERROR_TEMPLATE,
    MONGO_URL
} = process.env;

export const config = {
    APP: 'APP-UI',
    NODE_ENV: NODE_ENV || 'development',
    DEV_ENTRY_POINT: 'testharness.html',
    ROUTE_PATH: ROUTE_PATH || '/api',
    STATIC_FILES_LOCATION: '/app-dist/dist',
    UI_APP_ENTRY_POINT: 'index.html',
    PORT: {
        NODE_DOCKER_PORT: NODE_DOCKER_PORT ?? 8080,
        NODE_LOCAL_PORT: NODE_LOCAL_PORT ?? 8080
    },
    UI_VERSIONS_LOCATION: '/dist',
    JSON_WEB_TOKEN_EXP_HOURS_SHORT: JSON_WEB_TOKEN_EXP_HOURS_SHORT || 1,
    JSON_WEB_TOKEN_EXP_HOURS_LONG: JSON_WEB_TOKEN_EXP_HOURS_LONG || 240,
    JSON_WEB_TOKEN_EXP_HOURS_EXTERNAL_SYSTEM: JSON_WEB_TOKEN_EXP_HOURS_EXTERNAL_SYSTEM || 3,
    JSON_WEB_TOKEN_SECRET: JSON_WEB_TOKEN_SECRET || 'secret123',
    ERROR_TEMPLATE: ERROR_TEMPLATE || '/template/error-template.html',
    DB: {
        MONGO_URL: MONGO_URL || 'mongodb://root:123456@172.17.0.2:27017/emays_service_db?authSource=admin'
    },
    AWS_SES: {
        AWS_SES_ACCESS_KEY: AWS_SES_ACCESS_KEY || '',
        AWS_SES_SECRET_KEY: AWS_SES_SECRET_KEY || '',
        AWS_REGION: AWS_REGION || 'us-east-2',
        AWS_SOURCE_EMAIL: AWS_SOURCE_EMAIL || 'thathsararaviraj@gmail.com'
    },
    EMAIL_TEMPLATE: {
        CUSTOMER_EMAIL_TEMPLATE: CUSTOMER_EMAIL_TEMPLATE || '/template/temp-customer-email.html',
        RETAILER_EMAIL_TEMPLATE: RETAILER_EMAIL_TEMPLATE || '/template/temp-retailer-email.html',
        URLS: {
            URL_LOGO: 'https://drive.google.com/uc?export=view&id=11X4cJtuABLOYE95IqbjdJO0ve5L9sbWP',
            PRODUCT_FALL_BACK: 'https://drive.google.com/uc?export=view&id=1ozS_QYosuRRkw4vG6cRH2DhkvWNHG6nN',
            ORDER_STATUS_PLACED: 'https://drive.google.com/uc?export=view&id=1PSHv1KnzXRxLLdnzKB-L8DpAyWC0qtBE',
            EXCLAMATION: 'https://drive.google.com/uc?export=view&id=1C2agRu6adMVXXizmQtTpTp7M2-tzUx6S',
            FACEBOOK_IMAGE: 'https://drive.google.com/uc?export=view&id=1-BonISa9pSVgaD4WdboBdoWPDssYPBUC',
            TWITTER_IMAGE: 'https://drive.google.com/uc?export=view&id=1qrmr-LtUB9LWbaygzWR65JYDUkGeV6Nl',
            INSTAGRAM_IMAGE: 'https://drive.google.com/uc?export=view&id=1kAxcTeHuY6Z4CaZdUfURiJKgXGVUTL1l',
            FACEBOOK_LINK: 'https://facebook.com',
            TWITTER_LINK: 'https://twitter.com',
            INSTAGRAM_LINK: 'https://instagram.com',
            EMAYS_CONTACT_US: 'https://emays.com/contact-us',
            EMAIL_REDIRECTION_PATH: 'http://localhost:8080/api-dev/launchMail' 
        }
    },
    GOOGLE: {
        OAUTH2: {
            CLIENT: {
                CLIENT_ID: GOOGLE_AUTH_CLIENT_ID || 
                    '',
                CLIENT_SECRET: GOOGLE_AUTH_CLIENT_SECRET || '',
                REDIRECTION_URL: GOOGLE_AUTH_REDIRECTION_URL || 'http://localhost:8080/api-dev/redirectGoogleAccess'
            },
            SCOPE: GOOGLE_AUTH_SCOPE || 'https://www.googleapis.com/auth/calendar'
        },
        CALENDER: {
            SUMMERY: GOOGLE_CALENDER_TASK_SUMMERY || 'Emays Order Arrival',
            DESCRIPTION: GOOGLE_CALENDER_TASK_DESCRIPTION || 
                'This event has been created by Emays System to remind you about your order arrival',
            BOOK_CALENDER_REDIRECTION_PATH: 'http://localhost:8080/api-dev/googleCalender' 
        }
    },
    SERVICE_CHARGE: SERVICE_CHARGE || 1200.00
};
