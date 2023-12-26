'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { registerDriver, resetAllDriverCreationData, resetIsLoadingPhaseFour,
    resetIsLoadingPhaseThree, setStageFourCreateDriver, setStageOneCreateDriver,
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
    phaseFourData: {
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
        builder.addCase(setStageFourCreateDriver.fulfilled, (state, action) => {
            state.phaseFourData = action.payload;
            state.phaseFourData.isLoading = false;
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
        builder.addCase(resetIsLoadingPhaseFour.fulfilled, (state, action) => {
            state.phaseFourData.isLoading = true;
        });
        builder.addCase(resetAllDriverCreationData.fulfilled, (state, action) => {
            state.phaseOneData = {};
            state.phaseOneData.isLoading = true;

            state.phaseTwoData = {};
            state.phaseTwoData.isLoading = true;

            state.phaseThreeData = {};
            state.phaseThreeData.isLoading = true;

            state.phaseFourData = {};
            state.phaseFourData.isLoading = true;

            state.saveStatus = {};
            state.isLoading = true;
        });
        builder.addCase(registerDriver.fulfilled, (state, action) => {
            state.saveStatus.result = action.payload;
            state.saveStatus.isLoading = false;
        });
    }
});

export default newDriverSlice.reducer;
