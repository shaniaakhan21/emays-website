'use strict';

import { createSlice } from '@reduxjs/toolkit';
    
const initialState = {
    token: '',
    isSuccess: false
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login (state, action) {
            state.token = action.payload;
            state.isSuccess = true;
        },
        logOut (state) {
            state.token = '';
            state.isSuccess = false;
        }
    }
});

export const { login, logOut } = loginSlice.actions;
export default loginSlice.reducer;
