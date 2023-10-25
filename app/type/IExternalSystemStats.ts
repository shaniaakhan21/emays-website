'use strict';

export interface IExternalSystemHistoryStatsDTO {
    completed: number,
    average: number,
    lastThirtyDays: number
}

export interface IExternalSystemDeliveryOrderStatsDTO {
    completed: number,
    average: number,
    lastThirtyDays: number,
    activeOrders: number
}

export interface IExternalSystemOverviewStatsDTO {
    noOfOrders: number,
    average: number,
    totalRevenue: number
}

