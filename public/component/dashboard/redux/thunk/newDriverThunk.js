'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';

// -----------------CREATE DRIVER-------------------

export const setStageOneCreateDriver = createAsyncThunk('newDriver/phaseOne', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});

export const resetIsLoadingPhaseOne = createAsyncThunk('newStore/resetPhaseOne', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return true;
    }
});

export const resetIsLoadingPhaseTwo = createAsyncThunk('newStore/resetPhaseTwo', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return true;
    }
});

export const resetIsLoadingPhaseThree = createAsyncThunk('newStore/resetPhaseThree', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return true;
    }
});

