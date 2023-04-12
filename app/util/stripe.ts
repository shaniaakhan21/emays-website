/* eslint camelcase: 0 */
import Stripe from 'stripe';
import { config } from '../config/config';
import * as orderService from '../service/orderService';
import { calculateServiceFee } from '../service/orderService';

const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15'
});

export const initiateOrderServiceFeePayment = async (userId: string) => {
    const order = await orderService.retrieveOrderDetailsByUserId(userId);
    if (!order) {
        throw new Error('Order not found');
    }
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateServiceFee(order),
        currency: 'eur',
        automatic_payment_methods: {
            enabled: true
        }
    });
    order.paymentRef = paymentIntent.id;
    await orderService.patchOrderDetailsByUserId(userId, order);
    return paymentIntent;
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
