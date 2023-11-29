'use strict';

import { createSelector } from '@reduxjs/toolkit';

const stripeSelector = (state) => state?.stripeState;

export const stripeSelectorMemoized = createSelector(stripeSelector, (stripeState) => stripeState);

