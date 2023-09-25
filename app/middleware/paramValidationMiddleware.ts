/* eslint-disable max-lines */
'use strict';

import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { validatorErrorBuilder } from '../util/serviceErrorBuilder';
import { ADDRESS_REQUIRED, AREA_REQUIRED, BRANCH_ID_REQUIRED, CANCELLATION_STATUS_REQUIRED, CONTENT_TYPE_REQUIRED
    , CREATED_TIME_CAN_NOT_MODIFY, DELIVERED_STATUS_REQUIRED, DELIVERY_INFO_REQUIRED
    , EMAIL_REQUIRED, EXPERIENCE_REQUIRED
    , EXTERNAL_SYSTEM_CONTACT_EMAIL_REQUIRED, EXTERNAL_SYSTEM_NAME_REQUIRED,
    EXTERNAL_SYSTEM_PASSWORD_REQUIRED, EXTERNAL_SYSTEM_USERNAME_REQUIRED,
    EXT_SYSTEM_PASSWORD_REQUIRED, EXT_SYSTEM_USERNAME_REQUIRED, HISTORY_CAN_NOT_MODIFY
    , LATITUDE_REQUIRED, LONGITUDE_REQUIRED, ORDER_DATE_REQUIRED
    , ORDER_ID_REQUIRED_IN_PATH, ORDER_LIST_REQUIRED, ORDER_TIME_END_REQUIRED,
    ORDER_TIME_START_REQUIRED, PAGE_LIMIT_REQUIRED, PAGE_REQUIRED, PAYMENT_REFERENCE_REQUIRED
    , SERVICE_FEE_REQUIRED, SUPER_USER_EMAIL_REQUIRED,
    SUPER_USER_FIRST_NAME_REQUIRED, SUPER_USER_LAST_NAME_REQUIRED,
    SUPER_USER_PASSWORD_REQUIRED, SUPER_USER_USERNAME_REQUIRED
    , TIME_ZONE_REQUIRED
    , USER_FIRST_NAME_REQUIRED, USER_ID_REQUIRED, USER_ID_REQUIRED_IN_PATH, USER_LAST_NAME_REQUIRED
    , USER_PHONE_NUMBER_REQUIRED, 
    USER_UNAUTHORIZED } from '../const/errorMessage';
import { Logger } from '../log/logger';
import { buildErrorMessage } from '../util/logMessageBuilder';
import LogType from '../const/logType';
import { config } from '../config/config';
import { Roles } from '../const/roles';

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
                return validatorErrorBuilder(err as Error, USER_FIRST_NAME_REQUIRED); }),
            lastName: Joi.string().max(50).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_LAST_NAME_REQUIRED); }),
            phoneNumber: Joi.string().max(15).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_PHONE_NUMBER_REQUIRED); }),
            retailerEmail: Joi.string().email().max(50).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EMAIL_REQUIRED); }),
            uid: Joi.string().max(36).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_ID_REQUIRED); }),
            branchId: Joi.string().max(36).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, BRANCH_ID_REQUIRED); }),
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
            experience: Joi.string().required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EXPERIENCE_REQUIRED); }),
            deliveryInfo: Joi.string().required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, DELIVERY_INFO_REQUIRED); }),
            serviceFee: Joi.number().required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, SERVICE_FEE_REQUIRED); }),
            address: Joi.object().keys({ 
                // Street
                addOne: Joi.string().required(),
                // Portal number
                addTwo: Joi.string().required(),
                // Apartment, suit
                addThree: Joi.string().required(),
                // City
                addFour: Joi.string().required(),
                // Country
                addFive: Joi.string().required(),
                // Post code
                addSix: Joi.string().required() }).required().error((error) => {
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

// Validate only client role allowed route
export const allowedForClientRoleOnly = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        claims: {
            roles: Joi.array().required().items(Joi.string().valid(Roles.CLIENT)).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_UNAUTHORIZED);
            })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Validate only external system role allowed route
export const allowedForExternalSystemRoleOnly = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        claims: {
            roles: Joi.array().required().items(Joi.string().valid(Roles.EXTERNAL_SYSTEM)).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_UNAUTHORIZED);
            })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Validate only external system, super user roles allowed route
export const allowedForExternalSystemSuperUserRolesOnly = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        claims: {
            roles: Joi.array().required().items(Joi.string()
                .valid(Roles.EXTERNAL_SYSTEM, Roles.SUPER)).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_UNAUTHORIZED);
            })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Validate only super role allowed route
export const allowedForSuperRoleOnly = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        claims: {
            roles: Joi.array().required().items(Joi.string().valid(Roles.SUPER)).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_UNAUTHORIZED);
            })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Validate only retailer role allowed route
export const allowedForRetailerRoleOnly = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        claims: {
            roles: Joi.array().required().items(Joi.string().valid(Roles.RETAILER)).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_UNAUTHORIZED);
            })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Validate only assistant role allowed route
export const allowedForAssistantRoleOnly = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        claims: {
            roles: Joi.array().required().items(Joi.string().valid(Roles.ASSISTANT)).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_UNAUTHORIZED);
            })
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

// Super user create request body validator
export const validateCreateSuperUserRequestBody = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        body: {
            firstName: Joi.string().required().max(50).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, SUPER_USER_FIRST_NAME_REQUIRED);
            }),
            lastName: Joi.string().required().max(50).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, SUPER_USER_LAST_NAME_REQUIRED);
            }),
            username: Joi.string().required().max(20).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, SUPER_USER_USERNAME_REQUIRED);
            }),
            password: Joi.string().required().max(50).pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, SUPER_USER_PASSWORD_REQUIRED);
            }),
            email: Joi.string().required().max(50).email().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, SUPER_USER_EMAIL_REQUIRED);
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

// Validate request super user token 
export const validateSuperUserTokenRequestBody = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        body: {
            username: Joi.string().required().max(20).error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, SUPER_USER_USERNAME_REQUIRED); }),
            password: Joi.string().required().max(50).error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, SUPER_USER_PASSWORD_REQUIRED); })
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

// Order details by pagination
export const validateOrderDetailsPagination = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        query: Joi.object().keys({
            page: Joi.string().required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, PAGE_REQUIRED); }),
            pageLimit: Joi.string().required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, PAGE_LIMIT_REQUIRED); })
        })
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

// Get service gee path param validation
export const validateGeoBasedServiceFeePathParams = (req: Request, res: Response, next: NextFunction) => {
    const validLocations: Array<string> = (config.SYSTEM_AVAILABLE_GEO_LOCATIONS as
         Array<{location: string, insideCost: number, outsideCost: number}>).map(c => c.location);
    const validationCriteria = Joi.object({
        params: {
            area: Joi.string().valid(
                ...validLocations).required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, AREA_REQUIRED); }),
            lat: Joi.number().required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, LATITUDE_REQUIRED); }),
            long: Joi.number().required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, LONGITUDE_REQUIRED); })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Validate order patch request
export const validateOrderPatchRequestBody = (req: Request, res: Response, next: NextFunction) => {
    const checkOrderParams = Joi.object({
        body: {
            firstName: Joi.string().max(50).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EMAIL_REQUIRED); }),
            lastName: Joi.string().max(50).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EMAIL_REQUIRED); }),
            phoneNumber: Joi.string().max(15).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EMAIL_REQUIRED); }),
            payed: Joi.boolean().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_ID_REQUIRED); }),
            date: Joi.date().iso().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ORDER_DATE_REQUIRED); }),
            startTime: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ORDER_TIME_START_REQUIRED); }),
            endTime: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ORDER_TIME_END_REQUIRED); }),
            timeZone: Joi.string().max(20).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, TIME_ZONE_REQUIRED); }),
            experience: Joi.string().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EXPERIENCE_REQUIRED); }),
            address: Joi.object().keys({ addOne: Joi.string(),
                addTwo: Joi.string(), addThree: Joi.string(),
                addFour: Joi.string() }).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADDRESS_REQUIRED); }),
            createdAt: Joi.string().forbidden().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, CREATED_TIME_CAN_NOT_MODIFY); }),
            history: Joi.object().forbidden().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, HISTORY_CAN_NOT_MODIFY); }),
            paymentRef: Joi.string().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, PAYMENT_REFERENCE_REQUIRED); }),
            isCanceled: Joi.boolean().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, CANCELLATION_STATUS_REQUIRED); }),
            isDriverPicked: Joi.boolean().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, CANCELLATION_STATUS_REQUIRED); }),
            isDelivered: Joi.boolean().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, DELIVERED_STATUS_REQUIRED); }),
            serviceFee: Joi.number().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, SERVICE_FEE_REQUIRED); })
        }   
    });
    validateRequest(req, next, checkOrderParams);
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
export const validator = (data: Request, validationCriteria: Joi.Schema) => {
    const { error } = validationCriteria.validate(data, options);
    if (error) {
        const err = error as Error;
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, data?.path), LogType.ERROR);
        throw err;
    }
};
