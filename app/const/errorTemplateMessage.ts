'use strict';

export enum ErrorTemplateMessage {
    LAUNCH_ERROR_HEADER = 'Launch Error',
    LAUNCH_ERROR_MESSAGE = 'This error may occurred due to an invalid integration of Emays application.',

    LAUNCH_ERROR_EMAIL_HEADER = 'Order Review Failed',
    LAUNCH_ERROR_EMAIL_MESSAGE = 'This error may occurred due to an invalid link.',
    LAUNCH_ERROR_EMAIL_MESSAGE_ORDER_CANCELED = 'This order is not any more active since you have canceled it.',

    WEBSITE_UNDER_ENHANCEMENTS_HEADER = 'Emays website is under constructions',
    WEBSITE_UNDER_ENHANCEMENTS_MESSAGE = 'We are working on the Emays website. Please be patient.',
}
