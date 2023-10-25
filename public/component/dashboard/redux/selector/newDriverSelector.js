'use strict';

import { createSelector } from '@reduxjs/toolkit';

const newDriverSelector = (state) => state?.newDriverState;

export const newDriverSelectorMemoized = createSelector(newDriverSelector, (newDriverState) => newDriverState);

