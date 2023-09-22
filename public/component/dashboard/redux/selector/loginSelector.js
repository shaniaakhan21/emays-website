'use strict';

import { createSelector } from '@reduxjs/toolkit';

const loginSelector = (state) => state?.loginState;

export const loginSelectorMemoized = createSelector(loginSelector, (loginState) => loginState);
