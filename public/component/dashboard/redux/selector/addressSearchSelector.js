'use strict';

import { createSelector } from '@reduxjs/toolkit';

const addressSearchSelector = (state) => state?.addressSearchState?.address;

export const addressSearchSelectorMemoized = createSelector(addressSearchSelector, (addressSearched) => addressSearched);
