'use strict';

import { createSelector } from '@reduxjs/toolkit';

const overviewSelector = (state) => state?.overviewState;

export const overviewSelectorMemoized = createSelector(overviewSelector, (overviewState) => overviewState);

