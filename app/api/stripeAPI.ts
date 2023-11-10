/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use strict';

import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { buildErrorMessage,
    buildInfoMessageMethodCall } from '../util/logMessageBuilder';
import { patchOrderDetailsByUserId, retrieveOrderDetailsByUserId } from '../service/orderService';
import {
    captureTerminalPayment,
    confirmOrderServiceFeePayment,
    createLocation, createReader,
    initiateAccountLink,
    initiateOrderServiceFeePayment, initiateOrderTerminalPayment,
    listLocations, listReaders
} from '../util/stripe';
import Stripe from 'stripe';
import { IOrderDTO } from '../type/orderType';
import { APIList } from 'googleapis/build/src/apis';

const Logging = Logger(__filename);

/**
 * Generate Stripe checkout info using user ID
 * @param uuid: string User ID
 * @returns Promise<CheckoutResponse> Stripe checkout response
 */
export const buildCheckoutPath = async (uuid: string): Promise<Stripe.Response<Stripe.PaymentIntent>> => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Generate stripe checkout info', `User Id: ${uuid}`), LogType.INFO);
        return initiateOrderServiceFeePayment(uuid);
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Generate stripe checkout info'), LogType.ERROR);
        throw error;
    }
};

export const discoverReader = async () => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'discover Reader', 'id'), LogType.INFO);
        return listReaders();
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Generate stripe checkout info'), LogType.ERROR);
        throw error;
    }
};

export const buildAccountLinkPath = async () => {
    try {
        return initiateAccountLink();
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Generate stripe checkout info'), LogType.ERROR);
        throw error;
    }
};

/**
 * Complete Stripe checkout
 * @param checkoutId: string Checkout ID
 * @returns Promise<CheckoutResponse> Stripe checkout response
 */
export const buildCompleteCheckoutPath = async (checkoutId: string, uid: string): Promise<IOrderDTO> => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Complete Stripe checkout', `checkoutId: ${checkoutId}`), LogType.INFO);

        /*
         * Todo: Retrieve checkout info from Stripe and check if the checkout is still valid
         * Todo: Using checkout_reference to retrieve order details from DB and check if the order status is still valid
         */

        const paymentIntent = await confirmOrderServiceFeePayment(uid);

        if (!paymentIntent) {
            throw new Error('Invalid checkout ID');
        }

        const order = await retrieveOrderDetailsByUserId(uid);

        if (!order) {
            throw new Error('Invalid user ID');
        }

        order.payed = true;

        await patchOrderDetailsByUserId(uid, order);

        return order;

        // Todo: Update order status to 'PAID'
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Generate Stripe checkout info'), LogType.ERROR);
        throw error;
    }
};

/**
 * Create Stripe location
 * @param info: Stripe.Terminal.LocationCreateParams Stripe location info
 * @returns Promise<Stripe.Terminal.Location> Stripe location
 */
export const createStripeLocation = async (info: Stripe.Terminal.LocationCreateParams) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Create Stripe location', `name: ${info.display_name}`), LogType.INFO);
        return createLocation(info);
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Create Stripe location'), LogType.ERROR);
        throw error;
    }
};

/**
 * Create terminal reader
 * @param info: Stripe.Terminal.ReaderCreateParams Stripe reader info
 * @returns Promise<Stripe.Terminal.Reader> Stripe reader
 */
export const createStripeReader = async (info: Stripe.Terminal.ReaderCreateParams) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Create Stripe reader', `label: ${info.label ?? ''}`), LogType.INFO);
        return createReader(info);
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Create Stripe reader'), LogType.ERROR);
        throw error;
    }
};

/**
 * List Stripe readers
 * @returns Promise<Stripe.Terminal.Reader[]> Stripe readers
 */
export const listStripeReaders = async () => {
    try {
        Logging.log(buildInfoMessageMethodCall('List Stripe readers', ''), LogType.INFO);
        return listReaders();
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'List Stripe readers'), LogType.ERROR);
        throw error;
    }
};

/**
 * List Stripe locations
 * @returns Promise<Stripe.Terminal.Location[]> Stripe locations
 */

export const listStripeLocations = async () => {
    try {
        Logging.log(buildInfoMessageMethodCall('List Stripe locations', ''), LogType.INFO);
        return listLocations();
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'List Stripe locations'), LogType.ERROR);
        throw error;
    }
};

/**
 * Handle Stripe Webhook Event
 * @param event: Stripe.Event Stripe webhook event
 */
export const handleStripeWebhookEvent = async (event: Stripe.Event) => {
    try {
        Logging.log(buildInfoMessageMethodCall('Handle Stripe Webhook Event', event.type), LogType.INFO);
        switch (event.type) {
            case 'terminal.reader.action_succeeded':
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                console.log('webhook called when the payment suceeded');
                const order = await retrieveOrderDetailsByUserId(paymentIntent.metadata.uid);
                await captureTerminalPayment(paymentIntent.id);
                order.terminalPayment = true;
                await patchOrderDetailsByUserId(paymentIntent.metadata.uid, order);
                break;
            default:
                break;
        }
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Handle Stripe Webhook Event'), LogType.ERROR);
        throw error;
    }
};

/**
 * Create payment intent for terminal order payment
 * @param uid: string User ID
 * @returns Promise<Stripe.PaymentIntent> Stripe payment intent
 */

export const createTerminalPaymentIntent = async (uid: string) => {
    try {
        Logging.log(buildInfoMessageMethodCall('Create payment intent for terminal order payment', uid), LogType.INFO);
        const paymentIntent = await initiateOrderTerminalPayment(uid);
        return paymentIntent;
    } catch (error) {
        const errorObject: Error = error as Error;
        Logging.log(buildErrorMessage(errorObject, 'Create payment intent for terminal order payment'), LogType.ERROR);
        throw error;
    }
};

