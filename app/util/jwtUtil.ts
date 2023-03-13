'use strict';

import * as jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { Roles } from '../const/roles';
import { IJWTClaims, JWT_TYPE } from '../type/IJWTClaims';
import { GenerateTokenFunc } from '../type/ItokenGenerator';
import { Logger } from '../log/logger';
import { buildErrorMessage } from './logMessageBuilder';
import LogType from '../const/logType';

const Logging = Logger(__filename);

// TODO: make JWT tokens role based and enhance method access security based on the role.
/**
 * Generate JWT token
 * @param claimData IJWTBuildData
 * @returns token string
 */
export const generateJWT: GenerateTokenFunc = (claimData, type) => {
    let token: string;
    let expiration: number;
    try {
        if (type && type === JWT_TYPE.SHORT_LIVE) {
            expiration = +config.JSON_WEB_TOKEN_EXP_HOURS_SHORT;
        } else {
            expiration = +config.JSON_WEB_TOKEN_EXP_HOURS_LONG;
        }
        const role = claimData.roles as Roles;
        const claims: IJWTClaims = {
            time: new Date(),
            exp: (Math.floor(Date.now() / 1000) + (60 * 60 * expiration)),
            roles: [role],
            id: claimData.id
        };
        token = jwt.sign(claims, config.JSON_WEB_TOKEN_SECRET);
        return token;
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Build JWT'), LogType.ERROR);
        throw error;
    }
};
