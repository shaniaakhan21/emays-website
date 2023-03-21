'use strict';

import { IJWTClaims, JWT_TYPE } from './IJWTClaims';

export type GenerateTokenFunc = (claims: Omit<Record<keyof IJWTClaims, string>,
     'time' | 'exp'>, type: JWT_TYPE) => string;

