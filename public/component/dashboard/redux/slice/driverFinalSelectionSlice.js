'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { driverSelectFinal } from '../thunk/driverFinalSelectThunk';

const initialState = {
    finalSelection: {},
    isLoading: true
};

const driverFinalSelectionSlice = createSlice({
    name: 'driverFinalSelection',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(driverSelectFinal.fulfilled, (state, action) => {
            state.finalSelection = action.payload;
            state.isLoading = false;
        });
        builder.addCase(driverSelectFinal.pending, (state, action) => {
            state.isLoading = true;
        });

    }
});

export default driverFinalSelectionSlice.reducer;
