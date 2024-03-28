'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAddressSearch = createAsyncThunk('addressSearch', async (data, { getState }) => {
    return data;
});
