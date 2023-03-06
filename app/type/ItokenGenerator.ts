'use strict';

import { HTTPSuccess } from '../const/httpCode';
import { IJWTClaims } from './IJWTClaims';
import { IOrderContext } from './IOrderContext';

export type GenerateTokenFunc = (claims: Omit<Record<keyof IJWTClaims, string>,
     'time' | 'exp'>) => string;

export type SaveOrderFunc = (orderData: IOrderContext) => Promise<HTTPSuccess.CREATED_CODE>;

