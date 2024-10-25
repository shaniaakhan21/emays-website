/* eslint-disable max-len */
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
    ERROR_TEMPLATE,
    MONGO_URL,
    CUSTOMER_EMAIL_REMINDER_ON_DEL_DAY_BEFORE_DRIVER_PICK,
    CUSTOMER_EMAIL_REMINDER_SECOND,
    CUSTOMER_INVOICE_EMAIL,
    CUSTOMER_CANCEL_EMAIL,
    RETAILER_REMINDER_EMAIL,
    RETAILER_REMINDER_EMAIL_ON_DEL_DAY_BEFORE_DRIVER_PICK,
    RETAILER_EMAIL_ITEMS_SOLD,
    GOOGLE_MAP_API_KEY,
    SYSTEM_AVAILABLE_GEO_LOCATIONS,
    STRIPE_SECRET_KEY,
    STRIPE_RETURN_DOMAIN,
    STRIPE_WEBHOOK_SECRET,
    UI_VERSIONS_LOCATION,
    LETS_TALK_EMAIL,
    RECAPTCHA_SECRET,
    RECAPTCHA_PROJECT_ID,
    RECAPTCHA_SITE_KEY,
    EMAIL_REDIRECTION_PATH
} = process.env;

export const config = {
    APP: 'APP-UI',
    NODE_ENV: NODE_ENV || 'development',
    DEV_ENTRY_POINT: 'testharness.html',
    ROUTE_PATH: ROUTE_PATH || '/api',
    STATIC_FILES_LOCATION: '/app-dist/dist',
    UI_APP_ENTRY_POINT: 'index.html',
    WEBSITE_ENTRY_POINT: 'website.html',
    PORT: {
        NODE_DOCKER_PORT: NODE_DOCKER_PORT ?? 8080,
        NODE_LOCAL_PORT: NODE_LOCAL_PORT ?? 8080
    },
    UI_VERSIONS_LOCATION: UI_VERSIONS_LOCATION ?? '/dist',
    JSON_WEB_TOKEN_EXP_HOURS_SHORT: JSON_WEB_TOKEN_EXP_HOURS_SHORT || 1,
    JSON_WEB_TOKEN_EXP_HOURS_LONG: JSON_WEB_TOKEN_EXP_HOURS_LONG || 240,
    JSON_WEB_TOKEN_EXP_HOURS_EXTERNAL_SYSTEM: JSON_WEB_TOKEN_EXP_HOURS_EXTERNAL_SYSTEM || 3,
    JSON_WEB_TOKEN_SECRET: JSON_WEB_TOKEN_SECRET || 'secret123',
    ERROR_TEMPLATE: ERROR_TEMPLATE || '/template/error-template.html',
    DB: {
        MONGO_URL: MONGO_URL || 'mongodb://root:123456@172.17.0.2:27017/emays_service_db?authSource=admin'
    },
    AWS_SES: {
        AWS_SES_ACCESS_KEY: AWS_SES_ACCESS_KEY || 'AKIARTWJSQERXNUOO6P6',
        AWS_SES_SECRET_KEY: AWS_SES_SECRET_KEY || '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',
        AWS_REGION: AWS_REGION || 'eu-west-1',
        AWS_SOURCE_EMAIL: AWS_SOURCE_EMAIL || 'system@emaysstyle.com'
    },
    EMAIL_REMINDERS_SCHEDULING: '30 00 * * *',
    EMAIL_TEMPLATE: {
        CUSTOMER_EMAIL_TEMPLATE: CUSTOMER_EMAIL_TEMPLATE || '/template/customer/temp-customer-email.html',
        RETAILER_EMAIL_TEMPLATE: RETAILER_EMAIL_TEMPLATE || '/template/retailer/temp-retailer-email.html',
        CUSTOMER_EMAIL_REMINDER_ON_DEL_DAY_BEFORE_DRIVER_PICK:
        CUSTOMER_EMAIL_REMINDER_ON_DEL_DAY_BEFORE_DRIVER_PICK || '/template/customer/customer-reminder-email.html',
        CUSTOMER_EMAIL_REMINDER_SECOND: CUSTOMER_EMAIL_REMINDER_SECOND || '/template/customer/customer-reminder-email-second.html',
        CUSTOMER_INVOICE_EMAIL: CUSTOMER_INVOICE_EMAIL || '/template/customer/customer-invoice.html',
        CUSTOMER_CANCEL_EMAIL: CUSTOMER_CANCEL_EMAIL || '/template/customer/customer-cancel-order.html',
        RETAILER_REMINDER_EMAIL:
        RETAILER_REMINDER_EMAIL || '/template/retailer/retailer-reminder-email.html',
        RETAILER_REMINDER_EMAIL_ON_DEL_DAY_BEFORE_DRIVER_PICK:
        RETAILER_REMINDER_EMAIL_ON_DEL_DAY_BEFORE_DRIVER_PICK || '/template/retailer/retailer-reminder-email-second.html',
        RETAILER_EMAIL_ITEMS_SOLD: RETAILER_EMAIL_ITEMS_SOLD || '/template/retailer/retailer-items-sold.html',

        URLS: {
            URL_LOGO: 'https://drive.google.com/uc?export=view&id=11X4cJtuABLOYE95IqbjdJO0ve5L9sbWP&raw=true',
            PRODUCT_FALL_BACK: 'https://drive.google.com/uc?export=view&id=1ozS_QYosuRRkw4vG6cRH2DhkvWNHG6nN',
            ORDER_STATUS_PLACED: 'https://drive.google.com/uc?export=view&id=1PSHv1KnzXRxLLdnzKB-L8DpAyWC0qtBE',
            ORDER_STATUS_ONTHEWAY: 'https://drive.google.com/uc?export=view&id=1ct5qDqIwPBhEXcCswtoBY7YFN2wEaQkO&raw=true',
            ORDER_STATUS_DELIVERED: 'https://drive.google.com/uc?export=view&id=1DQU9fxWwk2k1zNOt5cLbEgzo8vTvP-_r&raw=true',
            TRUSTPILOT_REVIEW: 'https://drive.google.com/uc?export=view&id=1x0F13iMoJlXzQrJ8gbRpA7WfrYTAnTnz&raw=true',
            EXCLAMATION: 'https://drive.google.com/uc?export=view&id=1C2agRu6adMVXXizmQtTpTp7M2-tzUx6S',
            FACEBOOK_IMAGE: 'https://drive.google.com/uc?export=view&id=1-BonISa9pSVgaD4WdboBdoWPDssYPBUC',
            TWITTER_IMAGE: 'https://drive.google.com/uc?export=view&id=1qrmr-LtUB9LWbaygzWR65JYDUkGeV6Nl',
            INSTAGRAM_IMAGE: 'https://drive.google.com/uc?export=view&id=1kAxcTeHuY6Z4CaZdUfURiJKgXGVUTL1l',
            FACEBOOK_LINK: 'https://facebook.com',
            TWITTER_LINK: 'https://twitter.com',
            INSTAGRAM_LINK: 'https://instagram.com',
            EMAYS_CONTACT_US: 'mailto:thathsararaviraj@gmail.com?subject=Contact%20Emays',
            EMAIL_REDIRECTION_PATH: EMAIL_REDIRECTION_PATH || 'http://localhost:8080/api-dev/launchMail'
        }
    },
    GOOGLE: {
        OAUTH2: {
            CLIENT: {
                CLIENT_ID: GOOGLE_AUTH_CLIENT_ID || '8912263962-gj8l7t93rvu1fnu164f32677f2v47jol.apps.googleusercontent.com',
                CLIENT_SECRET: GOOGLE_AUTH_CLIENT_SECRET || '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',
                REDIRECTION_URL: GOOGLE_AUTH_REDIRECTION_URL || 'https://emaysstyle.com/api/redirectGoogleAccess'
            },
            SCOPE: GOOGLE_AUTH_SCOPE || 'https://www.googleapis.com/auth/calendar'
        },
        CALENDER: {
            SUMMERY: GOOGLE_CALENDER_TASK_SUMMERY || 'Emays Order Arrival',
            DESCRIPTION: GOOGLE_CALENDER_TASK_DESCRIPTION ||
                'This event has been created by Emays System to remind you about your order arrival',
            BOOK_CALENDER_REDIRECTION_PATH: 'https://emaysstyle.com/api/googleCalender'
        },
        MAP: {
            API_KEY: GOOGLE_MAP_API_KEY || 'AIzaSyDnBgw1GwjiMwOXKujnP_1cGRPOmxT-okE'
        }
    },
    SYSTEM_AVAILABLE_GEO_LOCATIONS: SYSTEM_AVAILABLE_GEO_LOCATIONS || [
        // 14.99€
        { location: 'Milan', apiName: 'Milano', cost: 14.99 }, 
        // 35€
        { location: 'Pavia', apiName: 'Pavia', cost: 35 },
        // 60€
        { location: 'Cremona', apiName: 'Cremona', cost: 60 },
        // 25€
        { location: 'Monza', apiName: 'Monza', cost: 25 },
        // 40€
        { location: 'Bergamo', apiName: 'Bergamo', cost: 40 },
        // 32€
        { location: 'Lecco', apiName: 'Lecco', cost: 32 },
        // 40€
        { location: 'Como', apiName: 'Como', cost: 40 },
        // 40€
        { location: 'Varese', apiName: 'Varese', cost: 40 },
        // 75€
        { location: 'Turin', apiName: 'Torino', cost: 75 }
    ],
    STRIPE_SECRET_KEY: STRIPE_SECRET_KEY || 'sk_test_51MyGFvB7uMaHzfLgYAJMVDmQrAV6KkgMe3vV2UMq2w0MppsugqMg8uPodMwx89gpuOSDOqhXjVBAHEAYAwq5hAvi00M4DD8qRu',
    STRIPE_WEBHOOK_SECRET: STRIPE_WEBHOOK_SECRET || '',
    STRIPE_RETURN_DOMAIN: STRIPE_RETURN_DOMAIN || 'http://localhost:3000',
    LETS_TALK_EMAIL: LETS_TALK_EMAIL || 'info@emaysstyle.com',
    RECAPTCHA_PROJECT_ID: RECAPTCHA_PROJECT_ID || '',
    RECAPTCHA_SITE_KEY: RECAPTCHA_SITE_KEY || '',
    RECAPTCHA_SECRET: RECAPTCHA_SECRET || '',
    SERVICE_CHARGE: 14
};
