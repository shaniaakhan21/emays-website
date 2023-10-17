'use strict';

import { createSelector } from '@reduxjs/toolkit';

const selectedOrderSelector = (state) => state?.selectedOrderState;

export const selectedOrderSelectorMemoized = createSelector(selectedOrderSelector, (selectedOrderState) => selectedOrderState);

