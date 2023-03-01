'use strict';

import * as jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { Roles } from '../const/roles';
import { IJWTClaims } from '../type/IJWTClaims';
import { GenerateTokenFunc } from '../type/ItokenGenerator';
import Logger from '../logger';

/**
 * Generate JWT token
 * @param claimData IJWTBuildData
 * @returns token string
 */
export const generateJWT: GenerateTokenFunc = (claimData) => {
    let token: string;
    try {
        const role = claimData.roles as Roles;
        const claims: IJWTClaims = {
            time: new Date(),
            exp: (Math.floor(Date.now() / 1000) + (60 * 60 * +config.JSON_WEB_TOKEN_EXP_HOURS)),
            roles: [role],
            id: claimData.id
        };
        token = jwt.sign(claims, config.JSON_WEB_TOKEN_SECRET);
        return token;
    } catch (error) {
        const errorObject: Error = error as Error;
        Logger.error(`Failed to build the auth token.
        Error stack: ${errorObject.stack as string}.`);
        throw error;
    }
};
