'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { getInCompleteOrderData } from '../thunk/inCompleteOrderThunk';
    
const initialState = {
    isLoading: true,
    data: {}
};

const inCompleteOrderSlice = createSlice({
    name: 'inCompleteOrder',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getInCompleteOrderData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getInCompleteOrderData.pending, (state, action) => {
            state.isLoading = true;
        });
    }
});

export default inCompleteOrderSlice.reducer;
