'use strict';

import { createSelector } from '@reduxjs/toolkit';

const statsSelector = (state) => state?.statsState;

export const statsSelectorMemoized = createSelector(statsSelector, (statsState) => statsState);

