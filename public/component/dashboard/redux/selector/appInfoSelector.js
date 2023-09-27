'use strict';

import { createSelector } from '@reduxjs/toolkit';

const appInfoSelector = (state) => state?.appInfoState;

export const appInfoSelectorMemoized = createSelector(appInfoSelector, (appInfoState) => appInfoState);

