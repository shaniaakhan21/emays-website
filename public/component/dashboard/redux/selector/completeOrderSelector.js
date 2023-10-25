'use strict';

import { createSelector } from '@reduxjs/toolkit';

const completeOrderSelector = (state) => state?.completeOrderState;

export const completeOrderSelectorMemoized = createSelector(completeOrderSelector, (completeOrderState) => completeOrderState);

