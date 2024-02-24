/* eslint-disable max-lines */
'use strict';

import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { validatorErrorBuilder } from '../util/serviceErrorBuilder';
import { ADDRESS_REQUIRED, ADMIN_EXT_EMAIL_REQUIRED, ADMIN_EXT_FIRST_NAME_REQUIRED,
    ADMIN_EXT_ID_REQUIRED, ADMIN_EXT_LAST_NAME_REQUIRED, ADMIN_EXT_PASSWORD_REQUIRED,
    ADMIN_EXT_PHONE_REQUIRED,
    ADMIN_EXT_USERNAME_REQUIRED, AREA_REQUIRED, BRANCH_ID_REQUIRED, CANCELLATION_STATUS_REQUIRED, CONTENT_TYPE_REQUIRED
    , CREATED_TIME_CAN_NOT_MODIFY, CREATE_PAYMENT_ORDER_AMOUNT_REQUIRED,
    CREATE_PAYMENT_ORDER_ID_REQUIRED, CREATE_PAYMENT_STORE_ID_REQUIRED, CURRENCY_TYPE_REQUIRED,
    DELIVERED_STATUS_REQUIRED,
    DELIVERY_INFO_REQUIRED
    , DRIVER_BILLING_ACCOUNT_COUNTRY_REQUIRED, 
    DRIVER_BILLING_ACCOUNT_NUMBER_REQUIRED, DRIVER_BILLING_ACCOUNT_SWIFT_NUMBER_REQUIRED,
    DRIVER_BILLING_ADDRESS_REQUIRED, DRIVER_BILLING_BANK_NAME_REQUIRED, 
    DRIVER_BILLING_EMAIL_REQUIRED, DRIVER_CAR_MODEL_REQUIRED, DRIVER_CAR_PLATE_REQUIRED, DRIVER_CITY_REQUIRED,
    DRIVER_CONTACT_NUMBER_REQUIRED, DRIVER_COUNTRY_REQUIRED, DRIVER_EMAIL_REQUIRED,
    DRIVER_FIRST_NAME_REQUIRED, DRIVER_LAST_NAME_REQUIRED,
    DRIVER_LICENSE_NUMBER_REQUIRED, DRIVER_PASSWORD_REQUIRED, DRIVER_PAYMENT_CURRENCY_REQUIRED,
    DRIVER_USERNAME_REQUIRED, DRIVER_ZIP_CODE_REQUIRED,
    DURATION_REQUIRED, EMAIL_REQUIRED, EXPERIENCE_REQUIRED,
    EXTERNAL_API_MAP_STORE_ID_REQUIRED, EXTERNAL_API_MAP_WORDPRESS_URI_REQUIRED,
    EXTERNAL_API_WORDPRESS_API_KEY_REQUIRED,
    EXTERNAL_API_WORDPRESS_API_SECRET_REQUIRED, EXTERNAL_SYSTEM_CONTACT_EMAIL_REQUIRED,
    EXTERNAL_SYSTEM_FISCAL_INFO_REQUIRED, EXTERNAL_SYSTEM_NAME_REQUIRED,
    EXTERNAL_SYSTEM_PASSWORD_REQUIRED, EXTERNAL_SYSTEM_USERNAME_REQUIRED,
    EXT_SYSTEM_PASSWORD_REQUIRED, EXT_SYSTEM_USERNAME_REQUIRED, HISTORY_CAN_NOT_MODIFY
    , LATITUDE_REQUIRED, LONGITUDE_REQUIRED, MANAGER_EXT_PHONE_REQUIRED, ORDER_DATE_REQUIRED
    , ORDER_ID_REQUIRED_IN_PATH, ORDER_LIST_REQUIRED, ORDER_TIME_END_REQUIRED,
    ORDER_TIME_START_REQUIRED, PAGE_LIMIT_REQUIRED, PAGE_REQUIRED, PAYMENT_REFERENCE_REQUIRED
    , PAYMENT_STRIPE_AMOUNT_REQUIRED, PAYMENT_STRIPE_UUID_REQUIRED, RETAILER_EMAIL_REQUIRED, SERVICE_AREA_REQUIRED,
    SERVICE_FEE_REQUIRED, SUPER_USER_EMAIL_REQUIRED,
    SUPER_USER_FIRST_NAME_REQUIRED, SUPER_USER_LAST_NAME_REQUIRED,
    SUPER_USER_PASSWORD_REQUIRED, SUPER_USER_USERNAME_REQUIRED
    , SYSTEM_ID_REQUIRED_IN_PATH, TIME_ZONE_REQUIRED
    , USERNAME_REQUIRED, USER_FIRST_NAME_REQUIRED, USER_ID_REQUIRED, USER_ID_REQUIRED_IN_PATH, USER_LAST_NAME_REQUIRED
    , USER_PHONE_NUMBER_REQUIRED, 
    USER_UNAUTHORIZED, 
    VALID_STORE_ID_REQUIRED, 
    ZIP_CODE_REQUIRED } from '../const/errorMessage';
import { Logger } from '../log/logger';
import { buildErrorMessage } from '../util/logMessageBuilder';
import LogType from '../const/logType';
import { config } from '../config/config';
import { Roles } from '../const/roles';
import { CurrencyType } from '../const/currencyType';

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
                return validatorErrorBuilder(err as Error, RETAILER_EMAIL_REQUIRED); }),
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
            currencyType: Joi.string().valid(CurrencyType.AED, CurrencyType.EURO, CurrencyType.USD).
                required().error((error) => {
                    const err = error as Error | unknown;
                    return validatorErrorBuilder(err as Error, CURRENCY_TYPE_REQUIRED); }),
            serviceArea: Joi.string().required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, SERVICE_AREA_REQUIRED); }),
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
                /*
                 * ProductColor: Joi.string().required(),
                 * productSize: Joi.string().required(),
                 */
                productQuantity: Joi.number().required(),
                // Important: check currency value contains comma
                productCost: Joi.string().disallow(',').required(),
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
 * Check register driver params
 * @param req Request 
 * @param res Response
 * @param next NextFunction
 */
export const validateCreateDriver = (req: Request, res: Response, next: NextFunction) => {
    const checkOrderParams = Joi.object({
        body: {
            firstName: Joi.string().max(50).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, DRIVER_FIRST_NAME_REQUIRED); }),
            lastName: Joi.string().max(50).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, DRIVER_LAST_NAME_REQUIRED); }),
            phoneNumber: Joi.string().max(15).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, DRIVER_CONTACT_NUMBER_REQUIRED); }),
            address: Joi.object().keys({
                city: Joi.string().max(50).required().error((error) => {
                    const err = error as Error | unknown;
                    return validatorErrorBuilder(err as Error, DRIVER_CITY_REQUIRED); }),
                country: Joi.string().max(50).required().error((error) => {
                    const err = error as Error | unknown;
                    return validatorErrorBuilder(err as Error, DRIVER_COUNTRY_REQUIRED); }),
                zipCode: Joi.string().max(15).required().error((error) => {
                    const err = error as Error | unknown;
                    return validatorErrorBuilder(err as Error, DRIVER_ZIP_CODE_REQUIRED); })
            }),
            license: Joi.object().keys({
                licenseNumber: Joi.string().max(15).required().error((error) => {
                    const err = error as Error | unknown;
                    return validatorErrorBuilder(err as Error, DRIVER_LICENSE_NUMBER_REQUIRED); }),
                carModel: Joi.string().max(15).required().error((error) => {
                    const err = error as Error | unknown;
                    return validatorErrorBuilder(err as Error, DRIVER_CAR_MODEL_REQUIRED); }),
                carPlate: Joi.string().max(15).required().error((error) => {
                    const err = error as Error | unknown;
                    return validatorErrorBuilder(err as Error, DRIVER_CAR_PLATE_REQUIRED); })
            }),
            billing: Joi.object().keys({
                address: Joi.string().max(120).required().error((error) => {
                    const err = error as Error | unknown;
                    return validatorErrorBuilder(err as Error, DRIVER_BILLING_ADDRESS_REQUIRED); }),
                email: Joi.string().required().max(50).email().error((error) => {
                    const err = error as Error | unknown;
                    return validatorErrorBuilder(err as Error, DRIVER_BILLING_EMAIL_REQUIRED);
                }),
                bankName: Joi.string().required().max(50).error((error) => {
                    const err = error as Error | unknown;
                    return validatorErrorBuilder(err as Error, DRIVER_BILLING_BANK_NAME_REQUIRED);
                }),
                accountNumber: Joi.string().required().max(50).error((error) => {
                    const err = error as Error | unknown;
                    return validatorErrorBuilder(err as Error, DRIVER_BILLING_ACCOUNT_NUMBER_REQUIRED);
                }),
                paymentCurrency: Joi.string().required().max(10).error((error) => {
                    const err = error as Error | unknown;
                    return validatorErrorBuilder(err as Error, DRIVER_PAYMENT_CURRENCY_REQUIRED);
                }),
                swiftNumber: Joi.string().required().max(50).error((error) => {
                    const err = error as Error | unknown;
                    return validatorErrorBuilder(err as Error, DRIVER_BILLING_ACCOUNT_SWIFT_NUMBER_REQUIRED);
                }),
                country: Joi.string().required().max(50).error((error) => {
                    const err = error as Error | unknown;
                    return validatorErrorBuilder(err as Error, DRIVER_BILLING_ACCOUNT_COUNTRY_REQUIRED);
                })
            }),
            driverUsername: Joi.string().required().max(20).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, DRIVER_USERNAME_REQUIRED);
            }),
            driverPassword: Joi.string().required().max(50).pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, DRIVER_PASSWORD_REQUIRED);
            }),
            driverEmail: Joi.string().required().max(50).email().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, DRIVER_EMAIL_REQUIRED);
            })
        }
    });
    validateRequest(req, next, checkOrderParams);
};

/**
 * Check create api mapper
 * @param req Request 
 * @param res Response
 * @param next NextFunction
 */
export const validateAPIMapper = (req: Request, res: Response, next: NextFunction) => {
    const checkAPIMapperParams = Joi.object({
        body: {
            storeId: Joi.string().max(30).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EXTERNAL_API_MAP_STORE_ID_REQUIRED); }),
            wordpressURI: Joi.string().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EXTERNAL_API_MAP_WORDPRESS_URI_REQUIRED); }),
            wordpressAPIKey: Joi.string().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EXTERNAL_API_WORDPRESS_API_KEY_REQUIRED); }),
            wordpressAPISecret: Joi.string().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EXTERNAL_API_WORDPRESS_API_SECRET_REQUIRED); })
        }
    });
    validateRequest(req, next, checkAPIMapperParams);
};

/**
 * Validate zip code
 * @param req Request 
 * @param res Response
 * @param next NextFunction
 */
export const validateZipCode = (req: Request, res: Response, next: NextFunction) => {
    const checkOrderParams = Joi.object({
        body: {
            zipCode: Joi.string().max(15).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ZIP_CODE_REQUIRED);
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

// Validate only driver role allowed route
export const allowedForDriverAndClientRoleOnly = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        claims: {
            roles: Joi.array().required().items(Joi.string().valid(Roles.DRIVER, Roles.CLIENT)).error((error) => {
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

// Validate only client role, admin, manager,store, super user allowed route
export const allowedForClientRoleAndSuperAdminAndAdminAndManagerAndStoreOnly = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        claims: {
            roles: Joi.array().required().items(Joi.string().
                valid(Roles.CLIENT, Roles.SUPER, Roles.ADMIN, Roles.MANAGER, Roles.EXTERNAL_SYSTEM)).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_UNAUTHORIZED);
            })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Validate only client role, admin, super user allowed route
export const allowedForClientRoleAndSuperAdminAndAdminOnly = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        claims: {
            roles: Joi.array().required().items(Joi.string().
                valid(Roles.CLIENT, Roles.SUPER, Roles.ADMIN)).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_UNAUTHORIZED);
            })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Validate only external system, super user, admin, manager, driver roles allowed route
export const allowedForExternalSystemSuperUserAndAdminAndManagerAndDriverRolesOnly = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        claims: {
            roles: Joi.array().required().items(Joi.string()
                .valid(Roles.EXTERNAL_SYSTEM, Roles.SUPER, Roles.ADMIN, Roles.MANAGER, Roles.DRIVER)).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_UNAUTHORIZED);
            })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Validate only external system, super user, admin, manager, driver, client roles allowed route
export const allowedForExternalSystemSuperUserAndAdminAndManagerAndDriverClientRolesOnly = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        claims: {
            roles: Joi.array().required().items(Joi.string()
                // eslint-disable-next-line max-len
                .valid(Roles.EXTERNAL_SYSTEM, Roles.SUPER, Roles.ADMIN, Roles.MANAGER, Roles.DRIVER, Roles.CLIENT)).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USER_UNAUTHORIZED);
            })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Validate only external system, super user roles allowed route
export const allowedForExternalSystemSuperUserAndAdminANDManagerRolesOnly = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        claims: {
            roles: Joi.array().required().items(Joi.string()
                .valid(Roles.EXTERNAL_SYSTEM, Roles.SUPER, Roles.ADMIN, Roles.MANAGER)).error((error) => {
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

// Validate only driver role allowed route
export const allowedForDriverRoleOnly = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        claims: {
            roles: Joi.array().required().items(Joi.string().valid(Roles.DRIVER)).error((error) => {
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
            }),
            fiscalInfo: Joi.object().keys({ 
                // Registered name
                companyName: Joi.string().required(),
                // Fiscal number
                fiscalNumber: Joi.string().required(),
                // Company phone
                companyPhone: Joi.string().required(),
                // Street
                street: Joi.string().required(),
                // Zip / Postal code
                zip: Joi.string().required(),
                // City
                city: Joi.string().required(),
                // Country
                country: Joi.string().required(),
                // Shopify ID
                extStripeAccountId: Joi.string().required(),
                // Currency Type
                currencyType: Joi.string().valid(CurrencyType.AED, CurrencyType.EURO, CurrencyType.USD).required()
            }).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, EXTERNAL_SYSTEM_FISCAL_INFO_REQUIRED);
            }),
            extSysAddress: Joi.object().keys({ 
                // Street
                addOne: Joi.string().required(),
                // Portal number
                addTwo: Joi.string().required(),
                // City
                addThree: Joi.string().required(),
                // Country
                addFour: Joi.string().required(),
                // Zip / Postal code
                addFive: Joi.string().required() }).required().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADDRESS_REQUIRED); })
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

// Admin external system create request body validator
export const validateAdminExternalSystemUserRequestBody = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        body: {
            adminFirstName: Joi.string().required().max(50).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADMIN_EXT_FIRST_NAME_REQUIRED);
            }),
            adminLastName: Joi.string().required().max(50).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADMIN_EXT_LAST_NAME_REQUIRED);
            }),
            adminUsername: Joi.string().required().max(20).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADMIN_EXT_USERNAME_REQUIRED);
            }),
            adminPhone: Joi.string().required().max(20).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADMIN_EXT_PHONE_REQUIRED);
            }),
            adminPassword: Joi.string().required().max(50).pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADMIN_EXT_PASSWORD_REQUIRED);
            }),
            adminEmail: Joi.string().required().max(50).email().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADMIN_EXT_EMAIL_REQUIRED);
            }),
            externalSystemId: Joi.string().required().max(50).pattern(
                /^[0-9a-fA-F]{24}$/).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADMIN_EXT_ID_REQUIRED);
            })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Manger external system create request body validator
export const validateManagerExternalSystemUserRequestBody = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        body: {
            managerFirstName: Joi.string().required().max(50).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADMIN_EXT_FIRST_NAME_REQUIRED);
            }),
            managerLastName: Joi.string().required().max(50).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADMIN_EXT_LAST_NAME_REQUIRED);
            }),
            managerPhone: Joi.string().required().max(20).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, MANAGER_EXT_PHONE_REQUIRED);
            }),
            managerUsername: Joi.string().required().max(20).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADMIN_EXT_USERNAME_REQUIRED);
            }),
            managerPassword: Joi.string().required().max(50).pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADMIN_EXT_PASSWORD_REQUIRED);
            }),
            managerEmail: Joi.string().required().max(50).email().error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADMIN_EXT_EMAIL_REQUIRED);
            }),
            externalSystemId: Joi.string().required().max(50).pattern(
                /^[0-9a-fA-F]{24}$/).error((error) => {
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADMIN_EXT_ID_REQUIRED);
            })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Validate checkout params
export const validateCheckoutParams = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        query: {
            uuid: Joi.string().required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, PAYMENT_STRIPE_UUID_REQUIRED); }),
            serviceFee: Joi.number().required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, PAYMENT_STRIPE_AMOUNT_REQUIRED); })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Validate create payment for the order
export const validateCreatePaymentParams = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        body: {
            orderId: Joi.string().required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, CREATE_PAYMENT_ORDER_ID_REQUIRED); }),
            storeId: Joi.string().required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, CREATE_PAYMENT_STORE_ID_REQUIRED); }),
            orderAmount: Joi.number().required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, CREATE_PAYMENT_ORDER_AMOUNT_REQUIRED); }),
            currencyType: Joi.string().valid(CurrencyType.AED, CurrencyType.EURO, CurrencyType.USD).
                required().error((error) => {
                    const err = error as Error | unknown;
                    return validatorErrorBuilder(err as Error, CURRENCY_TYPE_REQUIRED); })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Validate checkout complete params
export const validateCheckoutCompleteParams = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        query: {
            userId: Joi.string().required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, PAYMENT_STRIPE_UUID_REQUIRED); }),
            serviceFee: Joi.number().required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, PAYMENT_STRIPE_AMOUNT_REQUIRED); })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Validate checkout request
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

// Validate username
export const validateUsername = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        body: {
            username: Joi.string().required().max(20).error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, USERNAME_REQUIRED); })
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

// Validate request user token 
export const validateUserTokenRequestBody = (req: Request, res: Response, next: NextFunction) => {
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

// Validate admin external system request token 
export const validateAdminExternalSystemTokenRequestBody = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        body: {
            adminUsername: Joi.string().required().max(20).error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADMIN_EXT_USERNAME_REQUIRED); }),
            adminPassword: Joi.string().required().max(50).error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, ADMIN_EXT_PASSWORD_REQUIRED); })
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

// Ext sys id as parameter validation middleware 
export const validateExtSysId = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        params: {
            externalSystemId: Joi.string().required().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, SYSTEM_ID_REQUIRED_IN_PATH); })
        }
    });
    validateRequest(req, next, validationCriteria);
};

// Get service gee path param validation
export const validateGeoBasedServiceFeePathParams = (req: Request, res: Response, next: NextFunction) => {
    const validLocations: Array<string> = (config.SYSTEM_AVAILABLE_GEO_LOCATIONS as
         Array<{location: string, apiName: string, cost: number}>).map(c => c.apiName);
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

// Validate stat route
export const validateStatRouteParams = (req: Request, res: Response, next: NextFunction) => {
    const validationCriteria = Joi.object({
        query: {
            storeId: Joi.string().error((error) => { 
                const err = error as Error | unknown;
                return validatorErrorBuilder(err as Error, VALID_STORE_ID_REQUIRED); })
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
            isPrepared: Joi.boolean().error((error) => {
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
