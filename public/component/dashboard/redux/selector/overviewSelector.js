'use strict';

export const currentOverviewRecordSelector = (recordIndex) => currentOverviewPageSelector?.[recordIndex];

export const currentOverviewPageSelector = (pageIndex) => state?.overviewState?.[pageIndex];

