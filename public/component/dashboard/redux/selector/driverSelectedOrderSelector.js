'use strict';

import { createSelector } from '@reduxjs/toolkit';

const driverSelectedOrderSelector = (state) => state?.driverSelectedOrderState;

export const driverSelectedOrderSelectorMemoized = createSelector(driverSelectedOrderSelector, (driverSelectedOrderState) => driverSelectedOrderState);

