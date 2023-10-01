'use strict';

import { createSelector } from '@reduxjs/toolkit';

const newOrderSelectorPhaseOne = (state) => state?.newOrderState?.phaseOneData;

export const newOrderPhaseOneSelectorMemoized = createSelector(newOrderSelectorPhaseOne, (phaseOneData) => phaseOneData);

const newOrderSelectorPhaseTwo = (state) => state?.newOrderState?.phaseTwoData;

export const newOrderPhaseTwoSelectorMemoized = createSelector(newOrderSelectorPhaseTwo, (phaseTwoData) => phaseTwoData);
