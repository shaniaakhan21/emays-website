'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const setStageOneCreateStore = createAsyncThunk('newStore/phaseOne', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        console.log('----saving state');
        return data;
    }
});

export const setStageTwoCreateStore = createAsyncThunk('newStore/phaseTwo', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});

export const setStageThreeCreateStore = createAsyncThunk('newStore/phaseThree', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});
