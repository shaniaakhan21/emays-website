'use strict';

import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { validatorErrorBuilder } from '../util/serviceErrorBuilder';
import { ADDRESS_REQUIRED, CONTENT_TYPE_REQUIRED, EMAIL_REQUIRED, EXPERIENCE_REQUIRED
    , EXTERNAL_SYSTEM_CONTACT_EMAIL_REQUIRED, EXTERNAL_SYSTEM_NAME_REQUIRED,
    EXTERNAL_SYSTEM_PASSWORD_REQUIRED, EXTERNAL_SYSTEM_USERNAME_REQUIRED,
    EXT_SYSTEM_PASSWORD_REQUIRED, EXT_SYSTEM_USERNAME_REQUIRED, ORDER_DATE_REQUIRED
    , ORDER_ID_REQUIRED_IN_PATH, ORDER_LIST_REQUIRED, ORDER_TIME_END_REQUIRED,
    ORDER_TIME_START_REQUIRED, TIME_ZONE_REQUIRED
    , USER_ID_REQUIRED, USER_ID_REQUIRED_IN_PATH } from '../const/errorMessage';
import { Logger } from '../log/logger';
import { buildErrorMessage } from '../util/logMessageBuilder';
import LogType from '../const/logType';

const Logging = Logger(__filename);

/**
 * Check the request body params for create order
 * @param req Request 
 * @param res Response
 * @param next NextFunction
 */
export const validateCreateOrder = (req: Request, res: Response, next: NextFunction) => {
    const checkOrderParams = Joi.object({
        body: {
            email: Joi.string().email().max(50).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EMAIL_REQUIRED); }),
            firstName: Joi.string().max(50).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EMAIL_REQUIRED); }),
            lastName: Joi.string().max(50).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EMAIL_REQUIRED); }),
            phoneNumber: Joi.string().max(15).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EMAIL_REQUIRED); }),
            retailerEmail: Joi.string().email().max(50).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EMAIL_REQUIRED); }),
            uid: Joi.string().max(36).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_ID_REQUIRED); }),
            date: Joi.date().iso().required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ORDER_DATE_REQUIRED); }),
            startTime: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ORDER_TIME_START_REQUIRED); }),
            endTime: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ORDER_TIME_END_REQUIRED); }),
            timeZone: Joi.string().max(20).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, TIME_ZONE_REQUIRED); }),
            experience: Joi.number().required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EXPERIENCE_REQUIRED); }),
            address: Joi.object().keys({ addOne: Joi.string().required(),
                addTwo: Joi.string().required(), addThree: Joi.string().required(),
                addFour: Joi.string().required() }).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADDRESS_REQUIRED); }),
            orderItems: Joi.array().items({
                productName: Joi.string().required(),
                productColor: Joi.string().required(),
                productSize: Joi.string().required(),
                productQuantity: Joi.number().required(),
                productCost: Joi.string().required(),
                productImage: Joi.string().required(),
                productDeliveryInformation: Joi.string().required()
            }).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ORDER_LIST_REQUIRED);
            })         
        }   
    });
    validateRequest(req, next, checkOrderParams);
};

/**
 * Check the request header params for create order
 * @param req Request 
 * @param res Response
 * @param next NextFunction
 */
export const validateHeader = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        headers: {
            'content-type': Joi.string().valid('application/json').required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, CONTENT_TYPE_REQUIRED); })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// External system create request body validator
export const validateCreateExtSysRequestBody = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        body: {
            extSysName: Joi.string().required().max(50).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EXTERNAL_SYSTEM_NAME_REQUIRED);
            }),
            extSysUsername: Joi.string().required().max(20).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EXTERNAL_SYSTEM_USERNAME_REQUIRED);
            }),
            extSysPassword: Joi.string().required().max(50).pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EXTERNAL_SYSTEM_PASSWORD_REQUIRED);
            }),
            extSysEmail: Joi.string().required().max(50).email().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EXTERNAL_SYSTEM_CONTACT_EMAIL_REQUIRED);
            })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Validate request external system token 
export const validateExternalSystemTokenRequestBody = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        body: {
            extSysUsername: Joi.string().required().max(20).error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EXT_SYSTEM_USERNAME_REQUIRED); }),
            extSysPassword: Joi.string().required().max(50).error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EXT_SYSTEM_PASSWORD_REQUIRED); })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// OrderId as parameter validation middleware 
export const validateParamOrderId = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        params: {
            orderId: Joi.string().required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ORDER_ID_REQUIRED_IN_PATH); })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// UserId as parameter validation middleware 
export const validateParamUserId = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        params: {
            userId: Joi.string().required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_ID_REQUIRED_IN_PATH); })
        }
    });
    validateRequest(req, next, validationCriteria);
};

/**
 * Validate request params
 * @param req Request 
 * @param next NextFunction
 * @param schema Joi.Schema
 */
const validateRequest = (req: Request, next: NextFunction, schema: Joi.Schema) => {
    validator(req, schema);
    next();
};

// Options for validate action
const options: {[key: string]: boolean} = {
    abortEarly: false,
    allowUnknown: true
};

// Validate object against the schema
export const validator = (data: object, validationCriteria: Joi.Schema) => {
    const { error } = validationCriteria.validate(data, options);
    if (error) {
        const err = error as Error;
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Save Order'), LogType.ERROR);
        throw err;
    }
};
