'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { getOverviewData } from '../thunk/overviewThunk';
    
const initialState = {
    overviewState: {
        isLoading: true,
        data: {}
    }
};

const overviewSlice = createSlice({
    name: 'overview',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getOverviewData.fulfilled, (state, action) => {
            state.overviewState.data = action.payload;
            state.overviewState.isLoading = false;
        });
        builder.addCase(getOverviewData.pending, (state, action) => {
            state.overviewState.isLoading = true;
        });
    }
});

export default overviewSlice.reducer;
