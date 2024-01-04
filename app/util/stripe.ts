/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable max-len */
/* eslint-disable multiline-comment-style */
/* eslint-disable capitalized-comments */
/* eslint camelcase: 0 */
import Stripe from 'stripe';
import { config } from '../config/config';
import * as orderService from '../service/orderService';
import { getExternalSystemById } from '../service/administration/externalSystemService';
import { calculateServiceFee } from '../service/orderService';

// eslint-disable-next-line max-len
const stripe = new Stripe('sk_test_51MyGFvB7uMaHzfLgYAJMVDmQrAV6KkgMe3vV2UMq2w0MppsugqMg8uPodMwx89gpuOSDOqhXjVBAHEAYAwq5hAvi00M4DD8qRu', {
    apiVersion: '2022-11-15'
});

export const initiateOrderServiceFeePayment = async (userId: string, serviceFee: number) => {
    const order = await orderService.retrieveOrderDetailsByUserId(userId);
    if (!order) {
        throw new Error('Order not found');
    }
    const paymentIntent = await stripe.paymentIntents.create({
        // eslint-disable-next-line max-len
        amount: serviceFee * 100,
        currency: 'eur',
        // automatic_payment_methods: {
        //     enabled: true
        // }
        // application_fee_amount: order.serviceFee * 100,
        payment_method_types: ['card', 'ideal', 'sepa_debit']
        // transfer_data: {
        //     destination: 'acct_1O9QU3BLOZerdFWG'
        // } 
    });
    order.paymentRef = paymentIntent.id;
    await orderService.patchOrderDetailsByUserId(userId, order);
    return paymentIntent;
};

export const initiateAccountLink = async () => {
    const account = await stripe.accounts.create({
        type: 'standard'
    });
    console.log('accountId is', account.id);
    const accountLink = await stripe.accountLinks.create({
        account: `${account.id}`,
        refresh_url: `http://localhost:8080/#/connectStripe/${account.id}/refresh`,
        return_url: `http://localhost:8080/#/connectStripe/${account.id}/return`,
        type: 'account_onboarding'
    });
    return accountLink.url;
};

export const initiateOrderTerminalPayment = async (orderId: string, storeId: string, orderAmount: number) => {
    const order = await orderService.retrieveOrderDetailsByOrderId(storeId, orderId);
    if (!order) {
        throw new Error('Order not found');
    }
    const amount = orderAmount;
    const store = await getExternalSystemById(storeId);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'eur',
        // automatic_payment_methods: {
        //     enabled: true
        // },
        payment_method_types: ['card_present'],
        capture_method: 'automatic',
        application_fee_amount: (0.1 * amount) * 100,
        metadata: {
            orderId
        },
        transfer_data: {
            destination: store.fiscalInfo.extStripeAccountId as string
        }
    });
    order.paymentRef = paymentIntent.id;
    await orderService.patchOrderDetailsByOrderId(orderId, order);
    return paymentIntent;
};

export const showTerminalOrderInfo = async (terminalId: string, orderId: string, storeId: string ) => {
    const order = await orderService.retrieveOrderDetailsByOrderId(storeId, orderId);
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

export const processTerminalOrder = async (terminalId: string, orderId: string, storeId: string) => {
    const order = await orderService.retrieveOrderDetailsByOrderId(storeId, orderId);
    if (!order) {
        throw new Error('Order not found');
    }
    if (!order.paymentRef) {
        throw new Error('Order terminal payment intent not found');
    }
    const reader = await stripe.terminal.readers.processPaymentIntent(
        terminalId, { payment_intent: order.paymentRef }
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
    // const transfer = await stripe.transfers.create({
    //     amount: order.orderItems.reduce((acc, item) => acc + (item.productQuantity * parseInt(item.productCost)), 0) * 100,
    //     currency: 'eur',
    //     destination: 'acct_1O55JwCGQ8QDOLxm'
    // });
    // if (!transfer)
    // {
    //     throw new Error('payment not transfered to store');
    // }
    
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
export const checkPaymentIntentStatusFunction = async (paymentIntentId: string) => {
    return stripe.paymentIntents.retrieve(paymentIntentId);
};
export const setTerminalPaymentStatus = async (orderId: string, storeId: string, finalSelection: any []) => {
    const order = await orderService.retrieveOrderDetailsByOrderId(storeId, orderId);
    if (!order) {
        throw new Error('Order not found');
    }
    order.payed = true;
    order.isDelivered = true;
    order.driverSelectedItems = finalSelection;
    order.payedDate = new Date();
    await orderService.patchOrderDetailsByOrderId(orderId, order);
    return order;

};
