'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { loginExe, logoutExe } from '../thunk/loginThunk';
import { AUTH_TOKEN } from '../../../../js/const/SessionStorageConst';
import { setAuthTokenLocalStorage } from '../../../../js/util/LocalStorageUtil';
import { setAuthToken } from '../../../../js/util/SessionStorageUtil';
    
const initialState = {
    token: '',
    isSuccess: false,
    role: '',
    userInfo: {}
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
            state.userInfo = action.payload.userInfo;
            // By setting this token to session storage, we can consumes methods in e-commerce.
            sessionStorage.setItem(AUTH_TOKEN, action.payload.token);
        });
        builder.addCase(loginExe.pending, (state, action) => {
            state.isSuccess = false;
        });
        builder.addCase(logoutExe.fulfilled, (state, action) => {
            setAuthToken('');
            setAuthTokenLocalStorage('');
            state.token = '';
            state.role = '';
            state.userInfo = {};
            state.isSuccess = false;
        });
    }
}); 

export const { logOut } = loginSlice.actions;
export default loginSlice.reducer;
