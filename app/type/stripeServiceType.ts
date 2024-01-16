import Stripe from 'stripe';
import { ICreateOrderRequestBody } from './paymentRequestTypes';

export type CreatePayment = (payment: ICreateOrderRequestBody) => 
    Promise<Stripe.Response<Stripe.PaymentIntent>>;
