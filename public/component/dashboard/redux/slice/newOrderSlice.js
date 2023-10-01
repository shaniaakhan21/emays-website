'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { setNewOrderPhaseOneData, setNewOrderPhaseTwoData } from '../thunk/newOrderThunk';
    
const initialState = {
    phaseOneData: {
        isLoading: true
    },
    phaseTwoData: {
        isLoading: true
    }
};

const newOrderSlice = createSlice({
    name: 'newOrder',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(setNewOrderPhaseOneData.fulfilled, (state, action) => {
            state.phaseOneData = action.payload;
            state.phaseOneData.isLoading = false;
        });
        builder.addCase(setNewOrderPhaseOneData.pending, (state, action) => {
            state.phaseOneData.isLoading = true;
        });
        builder.addCase(setNewOrderPhaseTwoData.fulfilled, (state, action) => {
            state.phaseTwoData = action.payload;
            state.phaseTwoData.isLoading = false;
        });
        builder.addCase(setNewOrderPhaseTwoData.pending, (state, action) => {
            state.phaseTwoData.isLoading = true;
        });
    }
});

export default newOrderSlice.reducer;
