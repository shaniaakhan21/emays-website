'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { loginExe } from '../thunk/loginThunk';
import { AUTH_TOKEN } from '../../../../js/const/SessionStorageConst';
    
const initialState = {
    token: '',
    isSuccess: false,
    role: ''
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logOut (state) {
            state.token = '';
            state.role = '';
            // You can consider this as isLoading too (!isSuccess = isLoading)
            state.isSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginExe.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.token = action.payload.token;
            state.role = action.payload.roles;
            // By setting this token to session storage, we can consumes methods in e-commerce.
            sessionStorage.setItem(AUTH_TOKEN, action.payload.token);
        });
        builder.addCase(loginExe.pending, (state, action) => {
            state.isSuccess = false;
        });
    }
}); 

export const { logOut } = loginSlice.actions;
export default loginSlice.reducer;
