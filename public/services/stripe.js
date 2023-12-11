/* eslint-disable max-len */
import { apiBase, HTTPHelper as httpUtil } from '../js/util/httpUtil';

export const makeCheckout = (uuid, serviceFee) => {
    const params = new URLSearchParams({
        uuid,
        serviceFee
    });
    return httpUtil.get(`${apiBase}/stripe/checkout?${params?.toString()}`, {});
};

export const submitCheckout = (id, token, serviceFee, data) => {
    const params = new URLSearchParams({
        userId: id,
        serviceFee
    });
    return httpUtil.get(`${apiBase}/stripe/checkout/complete?${params?.toString()}`, {}, token);
};

export const getReader = async () => {
    const res = await httpUtil.get(`${apiBase}/stripe/terminal/reader`, {})
        .then((result) => {
            const readerMap = [];
            result.data.map((result) => {
                readerMap.push({ text: result.label, value: result });
            });
            return readerMap;
        });
    return res;
};

export const collectTerminalPayment = async (terminalId, orderId, storeId, orderAmount) => {
    const terminalPaymentIntent = await httpUtil.post(`${apiBase}/stripe/terminal/createOrderPayment`, {}, { orderId, storeId, orderAmount });
    if (terminalPaymentIntent)
    {
        const showOrder = await httpUtil.post(`${apiBase}/stripe/terminal/showOrderPayment`, {}, { orderId, storeId, terminalId });
        if (showOrder.status === 'online')
        {
            const paymentStatus = await httpUtil.post(`${apiBase}/stripe/terminal/processOrderPayment`, {}, { orderId, storeId, terminalId });
            if (paymentStatus)
            {
                return terminalPaymentIntent;
            }
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};

export const presentCardFunc = async (terminalId) => {
    const cardPayment = await httpUtil.post(`${apiBase}/stripe/terminal/test/success`, {}, { terminalId });
    console.log('card presented', cardPayment);
    if (cardPayment.action.status === 'failed')
    {
        return { status: false };
    }
    return { status: true };
};

export const pollForUpdates = async (PaymentIntent, intervalId) => {
    // Make a request to the server to check for updates
    console.log('pollig of server from services', intervalId );
    const serverWebhook = await httpUtil.post(`${apiBase}/stripe/check_paymentIntent_status`, {}, { paymentIntentId: PaymentIntent.id });
    return serverWebhook;
    
};

export const setTerminalOrderStatus = async (orderId, storeId) => {
    // Make a request to the server to check for updates
    const terminalOrder = await httpUtil.post(`${apiBase}/stripe/terminalPaymentComplete`, {}, { orderId, storeId });
    return terminalOrder;
    
};
