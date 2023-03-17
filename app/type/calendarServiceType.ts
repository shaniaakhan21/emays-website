'use strict';

import { ICalendarEvent } from './ICalenderContext';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client'; 

export type SendCalenderRequest = (uuid: string, address: string, startDateTime: string
    , endDateTime: string, timeZone: string) => ICalendarEvent;

export type GetRedirectionURL = (uuid: string) => string;

export type SendCalenderEvent = (uid: string, scope: string, accessToken: string
    , expiryDate: number, tokenType: string, ) => Promise<void>;

export type GetAccessToken = (code: string ) => Promise<GetTokenResponse>;
