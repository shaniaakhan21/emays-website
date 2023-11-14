'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { getDriverHistoryData } from '../thunk/driverHistoryThunk';

const initialState = {
    isLoading: true,
    data: {}
};

const driverHistorySlice = createSlice({
    name: 'driverHistory',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getDriverHistoryData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getDriverHistoryData.pending, (state, action) => {
            state.isLoading = true;
        });
    }
});

export default driverHistorySlice.reducer;
