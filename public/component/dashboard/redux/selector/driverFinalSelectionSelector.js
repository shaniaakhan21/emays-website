'use strict';

import { createSelector } from '@reduxjs/toolkit';

const driverFinalSelectionSelector = (state) => state?.driverFinalSelectionState;

export const driverFinalSelectionSelectorMemoized = createSelector(driverFinalSelectionSelector, (driverSelection) => driverSelection);

