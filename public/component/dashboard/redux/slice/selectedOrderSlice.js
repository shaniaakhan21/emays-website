'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { changeStatusSelectedOrder, storeSelectedOrder } from '../thunk/selectedOrderThunk';
    
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
        builder.addCase(changeStatusSelectedOrder.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(changeStatusSelectedOrder.fulfilled, (state, action) => {
            state.data.selectedTableRow[0].status.props.status = 'pending-pick-up';
            state.data.basicInfo.isPrepared = action?.payload?.patchedStatus;
            state.isLoading = false;
        });
    }
});

export default selectedOrderSlice.reducer;
