'use strict';

import { IJWTClaims } from './IJWTClaims';

export type GenerateTokenFunc = (claims: Omit<Record<keyof IJWTClaims, string>,
     'time' | 'exp'>) => string

export type validateTokenFunc = (path: string) => boolean;
