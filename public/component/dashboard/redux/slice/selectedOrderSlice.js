'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { storeSelectedOrder } from '../thunk/selectedOrderThunk';
    
const initialState = {
    isLoading: true,
    data: {}
};

const selectedOrderSlice = createSlice({
    name: 'selectedOrder',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(storeSelectedOrder.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        });
        builder.addCase(storeSelectedOrder.pending, (state, action) => {
            state.isLoading = true;
        });
    }
});

export default selectedOrderSlice.reducer;
