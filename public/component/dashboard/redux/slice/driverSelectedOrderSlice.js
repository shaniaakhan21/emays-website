'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { changeStatusSelectedOrder, getAdminByStoreId,
    getStoreInformationByStoreId, storeSelectedOrder } from '../thunk/driverSelectedOrderThunk';
    
const initialState = {
    orderInfo: {
        isLoading: true
    },
    storeInfo: {
        isLoading: true
    },
    adminInfo: {
        isLoading: true
    }
};

const driverSelectedOrderSlice = createSlice({
    name: 'driverSelectedOrder',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(storeSelectedOrder.fulfilled, (state, action) => {
            state.orderInfo = action.payload;
            state.orderInfo.isLoading = false;
        });
        builder.addCase(storeSelectedOrder.pending, (state, action) => {
            state.orderInfo.isLoading = true;
        });
        builder.addCase(getStoreInformationByStoreId.pending, (state, action) => {
            state.storeInfo.isLoading = true;
        });
        builder.addCase(getStoreInformationByStoreId.fulfilled, (state, action) => {
            state.storeInfo = action.payload;
            state.storeInfo.isLoading = false;
        });
        builder.addCase(getAdminByStoreId.pending, (state, action) => {
            state.adminInfo.isLoading = true;
        });
        builder.addCase(getAdminByStoreId.fulfilled, (state, action) => {
            state.adminInfo = action.payload;
            state.adminInfo.isLoading = false;
        });
    }
});

export default driverSelectedOrderSlice.reducer;
