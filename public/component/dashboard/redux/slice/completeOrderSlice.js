'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { getCompletedOrderData } from '../thunk/completeOrderThunk';
    
const initialState = {
    isLoading: true,
    data: {}
};

const completeOrderSlice = createSlice({
    name: 'completeOrder',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getCompletedOrderData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getCompletedOrderData.pending, (state, action) => {
            state.isLoading = true;
        });
    }
});

export default completeOrderSlice.reducer;
