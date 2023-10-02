/* eslint-disable multiline-comment-style */
/* eslint-disable capitalized-comments */
/* eslint camelcase: 0 */
import Stripe from 'stripe';
import { config } from '../config/config';
import * as orderService from '../service/orderService';
import { calculateServiceFee } from '../service/orderService';

// eslint-disable-next-line max-len
const stripe = new Stripe('sk_test_51MyGFvB7uMaHzfLgYAJMVDmQrAV6KkgMe3vV2UMq2w0MppsugqMg8uPodMwx89gpuOSDOqhXjVBAHEAYAwq5hAvi00M4DD8qRu', {
    apiVersion: '2022-11-15'
});

export const initiateOrderServiceFeePayment = async (userId: string) => {
    const order = await orderService.retrieveOrderDetailsByUserId(userId);
    if (!order) {
        throw new Error('Order not found');
    }
    const paymentIntent = await stripe.paymentIntents.create({
        // eslint-disable-next-line max-len
        amount: order.orderItems.reduce((acc, item) => acc + (item.productQuantity * parseInt(item.productCost)), 0) * 100,
        currency: 'eur',
        // automatic_payment_methods: {
        //     enabled: true
        // }
        payment_method_types: ['card', 'ideal', 'sepa_debit'] 
    });
    order.paymentRef = paymentIntent.id;
    await orderService.patchOrderDetailsByUserId(userId, order);
    return paymentIntent;
};

export const initiateOrderTerminalPayment = async (userId: string) => {
    const order = await orderService.retrieveOrderDetailsByUserId(userId);
    if (!order) {
        throw new Error('Order not found');
    }
    const amount = order.orderItems.reduce((acc, item) => acc + (item.productQuantity * parseInt(item.productCost)), 0);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'eur',
        automatic_payment_methods: {
            enabled: true
        },
        capture_method: 'manual',
        metadata: {
            uid: userId
        }
    });
    order.terminalPaymentRef = paymentIntent.id;
    await orderService.patchOrderDetailsByUserId(userId, order);
    return paymentIntent;
};

export const showTerminalOrderInfo = async (terminalId: string, userId: string) => {
    const order = await orderService.retrieveOrderDetailsByUserId(userId);
    if (!order) {
        throw new Error('Order not found');
    }
    const amount = order.orderItems.reduce((acc, item) => acc + (item.productQuantity * parseInt(item.productCost)), 0);
    const reader = await stripe.terminal.readers.setReaderDisplay(
        terminalId, {
            type: 'cart',
            cart: {
                line_items: order.orderItems.map(item => ({
                    description: item.productName,
                    amount: parseInt(item.productCost),
                    quantity: item.productQuantity
                })),
                currency: 'eur',
                tax: 0,
                total: amount
            }
        }
    );
    return reader;
};

export const processTerminalOrder = async (terminalId: string, userId: string) => {
    const order = await orderService.retrieveOrderDetailsByUserId(userId);
    if (!order) {
        throw new Error('Order not found');
    }
    if (!order.terminalPaymentRef) {
        throw new Error('Order terminal payment intent not found');
    }
    const reader = await stripe.terminal.readers.processPaymentIntent(
        terminalId, { payment_intent: order.terminalPaymentRef }
    );
    return reader;
};

export const simulateTerminalOrderPaymentSuccess = async (terminalId: string) => {
    const reader = await stripe.testHelpers.terminal.readers.presentPaymentMethod(terminalId);
    return reader;
};

export const simulateTerminalOrderPaymentFailure = async (terminalId: string) => {
    const reader = await stripe.testHelpers.terminal.readers.presentPaymentMethod(
        terminalId, { type: 'card_present', card_present: { number: '4000000000000002' } }
    );
    return reader;
};

export const cancelOrderServiceFeePayment = async (userId: string) => {
    const order = await orderService.retrieveOrderDetailsByUserId(userId);
    if (!order) {
        throw new Error('Order not found');
    }
    if (!order.paymentRef) {
        throw new Error('Payment reference not found');
    }
    await stripe.paymentIntents.cancel(order.paymentRef);
};

export const confirmOrderServiceFeePayment = async (userId: string) => {
    const order = await orderService.retrieveOrderDetailsByUserId(userId);
    if (!order) {
        throw new Error('Order not found');
    }
    if (!order.paymentRef) {
        throw new Error('Payment reference not found');
    }
    return stripe.paymentIntents.retrieve(order.paymentRef);
};

export const createLocation = async (info: Stripe.Terminal.LocationCreateParams) => {
    return stripe.terminal.locations.create(info);
};

export const listLocations = async () => {
    return stripe.terminal.locations.list();
};

export const createReader = async (info: Stripe.Terminal.ReaderCreateParams) => {
    return stripe.terminal.readers.create(info);
};

export const listReaders = async () => {
    return stripe.terminal.readers.list();
};

export const createTerminalConnectionToken = async (info: Stripe.Terminal.ConnectionTokenCreateParams) => {
    return stripe.terminal.connectionTokens.create(info);
};

export const retrieveTerminalPayment = async (paymentIntentId: string) => {
    return stripe.terminal.readers.retrieve(paymentIntentId);
};

export const captureTerminalPayment = async (paymentIntentId: string) => {
    return stripe.paymentIntents.capture(paymentIntentId);
};
