/* eslint-disable max-len */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getReader, collectTerminalPayment, presentCardFunc, pollForUpdates, setTerminalOrderStatus } from '../../../../services/stripe';

export const getReaderExe = createAsyncThunk('stripe/getReader', async () => {
    const reader = await getReader();
    console.log('reader from thunk', reader);
    if (reader) {
        return reader;
    }
});

export const collectPaymentExe = createAsyncThunk('stripe/collectPayment', async (data, { getState }) => {
    console.log('coming to collect payment exe');
    const terminalId = getState().stripePaymentState.terminalForPayment.id;
    const orderId = getState().driverSelectedOrderState.orderInfo.basicInfo._id;
    const storeId = getState().driverSelectedOrderState.orderInfo.basicInfo.branchId;
    const orderAmount = getState().driverFinalSelectionState.finalSelection.reduce((acc, item) => acc + (parseInt(item.quantity) * parseInt(item.productCost)), 0);
    const payment = await collectTerminalPayment(terminalId, orderId, storeId, orderAmount);
    if (payment) {
        return payment;
    }
});

export const cardPresentExe = createAsyncThunk('stripe/cardPresent', async (data, { getState }) => {
    const cardPayment = await presentCardFunc(getState().stripePaymentState.terminalForPayment.id);
    if (cardPayment) {
        return cardPayment;
    }
});

export const serverWebhookExe = createAsyncThunk('stripe/serverWebhook', async (data, { getState }) => {
    // eslint-disable-next-line max-len
    console.log('coming to server polling thunk function', data.intervalId, getState().stripePaymentState.terminalPaymentIntent);
    const serverStatus = await pollForUpdates(getState().stripePaymentState.terminalPaymentIntent, data.intervalId);
    console.log('server status from webexe', serverStatus);
    if (serverStatus)
    {
        console.log('server status from webexe', serverStatus);
        if (serverStatus && serverStatus.status === 'succeeded')
        {
            const orderId = getState().driverSelectedOrderState.orderInfo.basicInfo._id;
            const storeId = getState().driverSelectedOrderState.orderInfo.basicInfo.branchId;
            const order = await setTerminalOrderStatus(orderId, storeId);
            clearInterval(data.intervalId);
        }
        return serverStatus;
    }
});
