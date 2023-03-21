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
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_HOST,
    MONGODB_DOCKER_PORT,
    MONGODB_DATABASE,
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
    SERVICE_CHARGE
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
    DB: {
        MONGODB_USER: MONGODB_USER || 'root',
        MONGODB_PASSWORD: MONGODB_PASSWORD || '123456',
        MONGODB_HOST: MONGODB_HOST || '172.17.0.2',
        MONGODB_DOCKER_PORT: MONGODB_DOCKER_PORT || 27017,
        MONGODB_DATABASE: MONGODB_DATABASE || 'emays_service_db'
    },
    AWS_SES: {
        AWS_SES_ACCESS_KEY: AWS_SES_ACCESS_KEY || 'AKIAUIFBMPO744WQUFXC',
        AWS_SES_SECRET_KEY: AWS_SES_SECRET_KEY || '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',
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
                    '511265999052-6cljhl98gvp7s3v10rgs9avtb4g0v41q.apps.googleusercontent.com',
                CLIENT_SECRET: GOOGLE_AUTH_CLIENT_SECRET || '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',
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
