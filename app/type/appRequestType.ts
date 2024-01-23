import { Request } from 'express';
import { IJWTClaims } from './IJWTClaims';

export interface AppRequest extends Request {
  claims?: IJWTClaims
}

export interface AppRequestStoreCurrency extends AppRequest {
  currencyType: string
}

export interface AppRequestStoreCurrencyAndEmail extends AppRequest {
  currencyType: string,
  extSysEmail: string
}
