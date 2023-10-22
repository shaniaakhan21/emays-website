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
    noOfOderCurrentMonth: number,
    avgTickets: number,
    lastThirtyDays: number,
    activeOrders: number
}

