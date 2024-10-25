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
    const terminalId = getState().stripePaymentState.terminalForPayment.id;
    const orderId = getState().driverSelectedOrderState.orderInfo.basicInfo._id;
    const storeId = getState().driverSelectedOrderState.orderInfo.basicInfo.branchId;
    const orderAmount = +data?.finalAmountToPay;
    const currencyType = data?.currencyType;
    const payment = await collectTerminalPayment(terminalId, orderId, storeId, orderAmount, currencyType);
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
            const driverFinalSelection = getState().driverFinalSelectionState.finalSelection;
            const order = await setTerminalOrderStatus(orderId, storeId, driverFinalSelection);
            clearInterval(data.intervalId);
        }
        return serverStatus;
    }
});

export const resetPayment = createAsyncThunk('stripe/resetPayment', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return true;
    }
});
