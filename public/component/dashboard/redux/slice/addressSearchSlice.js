'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { getAddressSearch } from '../thunk/addressSearchThunk';
    
const initialState = {
    address: {
        isLoading: true,
        data: {
            country: '',
            city: '',
            street: ''
        }
    }
};

const addressSearchSlice = createSlice({
    name: 'addressSearchInfo',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAddressSearch.fulfilled, (state, action) => {
            state.address.data.country = action.payload.country;
            state.address.data.city = action.payload.city;
            state.address.data.street = action.payload.street;
            state.address.isLoading = false;
        });
        builder.addCase(getAddressSearch.pending, (state, action) => {
            state.address.isLoading = true;
        });
    }
});

export default addressSearchSlice.reducer;
