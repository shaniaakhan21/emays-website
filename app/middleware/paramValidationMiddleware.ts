'use strict';

import { Request, Response, NextFunction } from 'express';
import Logger from '../logger';

import * as Joi from 'joi';
import OrderError from '../error/OrderError';
import ErrorType from '../error/type/errorType';
import { ErrorInfo } from '../const/error';
import { HTTPOrderError } from '../const/httpCode';

/**
 * Check the request body params for create order
 * @param req Request 
 * @param res Response
 * @param next NextFunction
 */
export const validateCreateOrder = (req: Request, res: Response, next: NextFunction) => {
    const checkOrderParams = Joi.object({
        body: {
            email: Joi.string().email().max(50).error((error) => {
                return new OrderError(ErrorType.
                    ORDER_INVALID_REQUEST, ErrorInfo.
                    USER_EMAIL_REQUIRED, error as unknown as Error, HTTPOrderError.BAD_REQUEST_CODE); }),
            date: Joi.date().iso().required().error((error) => {
                return new OrderError(ErrorType.
                    ORDER_INVALID_REQUEST, ErrorInfo.
                    ORDER_DATE_REQUIRED, error as unknown as Error, HTTPOrderError.BAD_REQUEST_CODE); }),
            startTime: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required().error((error) => {
                return new OrderError(ErrorType.
                    ORDER_INVALID_REQUEST, ErrorInfo.
                    ORDER_TIME_START_REQUIRED, error as unknown as Error, HTTPOrderError.BAD_REQUEST_CODE); }),
            endTime: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required().error((error) => {
                return new OrderError(ErrorType.
                    ORDER_INVALID_REQUEST, ErrorInfo.
                    ORDER_TIME_END_REQUIRED, error as unknown as Error, HTTPOrderError.BAD_REQUEST_CODE); }),
            experience: Joi.number().required().error((error) => {
                return new OrderError(ErrorType.
                    ORDER_INVALID_REQUEST, ErrorInfo.
                    EXPERIENCE_REQUIRED, error as unknown as Error, HTTPOrderError.BAD_REQUEST_CODE); }),
            address: Joi.object().keys({ addOne: Joi.string().required(),
                addTwo: Joi.string().required(), addThree: Joi.string().required(),
                addFour: Joi.string().required() }).required().error((error) => {
                return new OrderError(ErrorType.
                    ORDER_INVALID_REQUEST, ErrorInfo.
                    ADDRESS_REQUIRED, error as unknown as Error, HTTPOrderError.BAD_REQUEST_CODE); })
                            
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
                return new OrderError(ErrorType.
                    ORDER_INVALID_REQUEST, ErrorInfo.
                    CONTENT_TYPE_REQUIRED, error as unknown as Error, HTTPOrderError.BAD_REQUEST_CODE); })        
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
        Logger.error(`Failed to validate data ${err.stack as string}`);
        throw err;
    }
};
