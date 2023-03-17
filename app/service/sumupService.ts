/* eslint-disable camelcase */
'use strict';

import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { GetAccessToken, GetRedirectionURL, SendCalenderEvent } from '../type/calendarServiceType';
import { buildErrorMessage, buildInfoMessageMethodCall
    , buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import { serviceErrorBuilder } from '../util/serviceErrorBuilder';
import { config } from '../config/config';
import { google, calendar_v3 } from 'googleapis';
import { OAuth2ClientOptions } from 'google-auth-library';
import * as moment from 'moment';
import { retrieveOrderDetailsByUserId } from './orderService';
import axios from 'axios';

const Logging = Logger(__filename);

export type CheckoutRequestPersonalDetailsAddress = {
    country?: string
    city?: string
    line_1?: string
    tax_id?: string
    state?: string
    postal_code?: number
};

export type CheckoutRequestPersonalDetails = {
    email?: string
    first_name?: string
    last_name?: string
    tax_id?: string
    address?: CheckoutRequestPersonalDetailsAddress
};

export type CheckoutRequest = {
    checkout_reference: string
    amount: number
    currency: 'BGN' | 'BRL' | 'CHF' | 'CLP' | 'CZK' | 'DKK'
        | 'EUR' | 'GBP' | 'HRK' | 'HUF' | 'NOK' | 'PLN' | 'RON' | 'SEK' | 'USD'
    merchant_code: string
    pay_to_email?: string
    description?: string
    return_url?: string
    customer_id?: string
    redirect_url?: string
    payment_type?: string
    personal_details?: CheckoutRequestPersonalDetails
}

export type CheckoutResponseMandate = {
    type?: string
    status ?: string
    merchant_code?: string
}

export type CheckoutResponse = {
    checkout_reference?: string
    amount?: number
    currency?: string
    pay_to_email?: string
    merchant_code?: string
    description?: string
    id?: string
    status?: string
    date?: string
    valid_until?: string
    customer_id?: string
    mandate?: CheckoutResponseMandate
    transactions?: any[]
}

const instance = axios.create({
    baseURL: config.SUMUP.API_URL
});

export const checkout = async (info: CheckoutRequest): Promise<CheckoutResponse> => {
    try {
        return (await instance.post<CheckoutResponse>('/checkouts', info))?.data;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'SumUp Checkout Error'), LogType.ERROR);
        throw error;
    }
};

export type ProcessCheckoutRequestMandate = {
    type: string
    user_agent: string
    user_ip?: string
}

export type ProcessCheckoutRequestCard = {
    name: string
    number: string
    expiry_year?: string
    expiry_month?: string
    cvv?: string
    zip_cod?: string
}

export type ProcessCheckoutRequest = {
    payment_type: string
    installments?: number
    mandate?: ProcessCheckoutRequestMandate
    card?: ProcessCheckoutRequestCard
    token?: string
    customer_id?: string
}

export type ProcessCheckoutResponse200Mandate = {
    id?: string
    transaction_code?: string
    amount?: number
    currency?: string
    timestamp?: string
    status?: 'SUCCESSFUL' | 'CANCELLED' | 'FAILED' | 'PENDING'
    payment_type?: 'ECOM' | 'RECURRING'
    installments_count?: number
    merchant_code?: string
    vat_amount?: number
    tip_amount?: number
    entry_mode?: 'CUSTOMER_ENTRY'
    auth_code?: string
    internal_id?: number
}

export type ProcessCheckoutResponse200Transactions = {
    type?: string
    status?: string
    merchant_code?: string
}

export type ProcessCheckoutResponse200 = {
    checkout_reference?: string
    amount?: number
    currency?: string
    pay_to_email?: string
    merchant_code?: string
    description?: string
    return_url?: string
    id?: string
    status?: 'PENDING' | 'FAILED' | 'PAID'
    date?: string
    customer_id?: string
    mandate?: ProcessCheckoutResponse200Mandate
    transactions?: ProcessCheckoutResponse200Transactions[]
    transaction_code?: string
    transaction_id?: string
    merchant_name?: string
    redirect_url?: string
    payment_instrument?: {
        token?: string
    }
}

// In case of 3D Secure
export type ProcessCheckoutResponse202 = {
    next_step?: {
        url?: string
        method?: string
        redirect_url?: string
        mechanism?: ('iframe' | 'browser')[]
        payload?: any
    }
}

export const processCheckout = async (checkoutId: string, data: ProcessCheckoutRequest): Promise<ProcessCheckoutResponse200 | ProcessCheckoutResponse202> => {
    try {
        return (await instance.get<ProcessCheckoutResponse200 | ProcessCheckoutResponse202>(
            `/checkouts/${checkoutId}`)
        )?.data;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'SumUp Checkout Error'), LogType.ERROR);
        throw error;
    }
};

