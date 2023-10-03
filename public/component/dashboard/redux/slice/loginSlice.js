'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { loginExe } from '../thunk/loginThunk';
    
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
        });
        builder.addCase(loginExe.pending, (state, action) => {
            state.isSuccess = false;
        });
    }
}); 

export const { logOut } = loginSlice.actions;
export default loginSlice.reducer;
