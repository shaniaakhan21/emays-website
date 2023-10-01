'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { getOverviewData } from '../thunk/overviewThunk';
    
const initialState = {
    isLoading: true,
    data: {}
};

const overviewSlice = createSlice({
    name: 'overview',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getOverviewData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getOverviewData.pending, (state, action) => {
            state.isLoading = true;
        });
    }
});

export default overviewSlice.reducer;
