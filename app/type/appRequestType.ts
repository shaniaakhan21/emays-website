import { Request } from 'express';
import { IJWTClaims } from './IJWTClaims';

export interface AppRequest extends Request {
  claims?: IJWTClaims
}
