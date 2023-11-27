'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { getReaderExe, collectPaymentExe, cardPresentExe, serverWebhookExe } from '../thunk/stripeThunk';
    
const initialState = {
    reader: [],
    terminalForPayment: null,
    terminalPaymentIntent: null,
    cardFlag: false,
    paymentStatus: null,
    error: null
};

const stripeSlice = createSlice({
    name: 'stripe',
    initialState,
    reducers: {
        setTerminal (state, action ) {
            state.terminalForPayment = action.payload;
        },
        setpaymentIntent (state, action) {
            state.terminalPaymentIntent = action.payload;
        },
        setCardFlag (state, action) {
            state.cardFlag = action.payload;
        } 
    },
    extraReducers: (builder) => {
        builder.addCase(getReaderExe.fulfilled, (state, action) => {
            state.reader = action.payload;
        });
        builder.addCase(collectPaymentExe.fulfilled, (state, action) => {
            state.terminalPaymentIntent = action.payload;
            state.cardFlag = true;
        });
        builder.addCase(cardPresentExe.fulfilled, (state, action) => {
            if (!action.payload.status) {
                state.paymentStatus = { status: 'Card Declined' };
                state.error = { msg: 'card Declined' };
            }
            else
            {
                state.cardFlag = false;
            }
        });
        builder.addCase(serverWebhookExe.fulfilled, (state, action) => {
            if (action.payload && action.payload.status && action?.payload.status === 'succeeded') {
                state.paymentStatus = { status: 'Payment Successful' };
            }
            else
            {
                state.paymentStatus = { status: 'Payment Pending' };
            }
        });
    }
});

export const { setTerminal, setpaymentIntent, setCardFlag } = stripeSlice.actions;
export default stripeSlice.reducer;
