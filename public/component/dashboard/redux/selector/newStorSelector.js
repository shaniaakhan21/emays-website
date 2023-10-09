'use strict';

import { createSelector } from '@reduxjs/toolkit';

const newStoreSelector = (state) => state?.newStoreState;

export const newStoreSelectorMemoized = createSelector(newStoreSelector, (newStoreState) => newStoreState);

