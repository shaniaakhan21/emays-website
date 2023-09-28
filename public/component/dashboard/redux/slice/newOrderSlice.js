'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { setNewOrderPhaseOneData } from '../thunk/newOrderThunk';
    
const initialState = {
    newOrderState: {
        isLoading: true,
        data: {}
    }
};

const newOrderSlice = createSlice({
    name: 'newOrder',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(setNewOrderPhaseOneData.fulfilled, (state, action) => {
            state.newOrderState.data = action.payload;
            state.newOrderState.isLoading = false;
        });
        builder.addCase(setNewOrderPhaseOneData.pending, (state, action) => {
            state.newOrderState.isLoading = true;
        });
    }
});

export default newOrderSlice.reducer;
