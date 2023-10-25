'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { getHistoryStatsData } from '../thunk/historyStatsThunk';
import { getDeliveryOrderStatsData } from '../thunk/deliveryOrderStatsThunk';
import { getOverviewStatsData } from '../thunk/overviewStatsThunk';
    
const initialState = {
    historyStatsState: {
        isLoading: true,
        data: {}
    },
    deliveryOrderStatsState: {
        isLoading: true,
        data: {}
    },
    overviewStatsState: {
        isLoading: true,
        data: {}
    }
};

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getHistoryStatsData.fulfilled, (state, action) => {
            state.historyStatsState.data = action.payload;
            state.historyStatsState.isLoading = false;
        });
        builder.addCase(getHistoryStatsData.pending, (state, action) => {
            state.historyStatsState.isLoading = true;
        });
        builder.addCase(getDeliveryOrderStatsData.fulfilled, (state, action) => {
            state.deliveryOrderStatsState.data = action.payload;
            state.deliveryOrderStatsState.isLoading = false;
        });
        builder.addCase(getDeliveryOrderStatsData.pending, (state, action) => {
            state.deliveryOrderStatsState.isLoading = true;
        });
        builder.addCase(getOverviewStatsData.fulfilled, (state, action) => {
            state.overviewStatsState.data = action.payload;
            state.overviewStatsState.isLoading = false;
        });
        builder.addCase(getOverviewStatsData.pending, (state, action) => {
            state.overviewStatsState.isLoading = true;
        });
    }
});

export default statsSlice.reducer;
