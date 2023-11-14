'use strict';

import { createSelector } from '@reduxjs/toolkit';

const driverHistorySelector = (state) => state?.driverHistoryState;

export const driverHistorySelectorMemoized = createSelector(driverHistorySelector, (completedOrdersState) => completedOrdersState);

