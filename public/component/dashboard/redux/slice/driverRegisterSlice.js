'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { resetIsLoadingPhaseThree, setStageOneCreateDriver,
    setStageThreeCreateDriver, setStageTwoCreateDriver } from '../thunk/newDriverThunk';
import { resetIsLoadingPhaseOne, resetIsLoadingPhaseTwo } from '../thunk/newDriverThunk';

const initialState = {
    phaseOneData: {
        isLoading: true
    },
    phaseTwoData: {
        isLoading: true
    },
    phaseThreeData: {
        isLoading: true
    },
    saveStatus: {
        isLoading: true
    }
};

const newDriverSlice = createSlice({
    name: 'newDriver',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(setStageOneCreateDriver.fulfilled, (state, action) => {
            state.phaseOneData = action.payload;
            state.phaseOneData.isLoading = false;
        });
        builder.addCase(setStageTwoCreateDriver.fulfilled, (state, action) => {
            state.phaseTwoData = action.payload;
            state.phaseTwoData.isLoading = false;
        });
        builder.addCase(setStageThreeCreateDriver.fulfilled, (state, action) => {
            state.phaseThreeData = action.payload;
            state.phaseThreeData.isLoading = false;
        });
        builder.addCase(resetIsLoadingPhaseOne.fulfilled, (state, action) => {
            state.phaseOneData.isLoading = true;
        });
        builder.addCase(resetIsLoadingPhaseTwo.fulfilled, (state, action) => {
            state.phaseTwoData.isLoading = true;
        });
        builder.addCase(resetIsLoadingPhaseThree.fulfilled, (state, action) => {
            state.phaseThreeData.isLoading = true;
        });
        
    }
});

export default newDriverSlice.reducer;
