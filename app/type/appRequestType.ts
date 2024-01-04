import { Request } from 'express';
import { IJWTClaims } from './IJWTClaims';

export interface AppRequest extends Request {
  claims?: IJWTClaims
}

export interface AppRequestStoreCurrency extends AppRequest {
  currencyType: string
}
