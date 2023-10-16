'use strict';

import { createSelector } from '@reduxjs/toolkit';

const inCompleteOrderSelector = (state) => state?.inCompleteOrderState;

export const inCompleteOrderSelectorMemoized = createSelector(inCompleteOrderSelector, (inCompleteOrderState) => inCompleteOrderState);

