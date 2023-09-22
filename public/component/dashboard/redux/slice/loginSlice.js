'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { loginExe } from '../thunk/loginThunk';
    
const initialState = {
    token: '',
    isSuccess: false
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logOut (state) {
            state.token = '';
            state.isSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginExe.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.token = action.payload;
        });
    }
}); 

export const { logOut } = loginSlice.actions;
export default loginSlice.reducer;
