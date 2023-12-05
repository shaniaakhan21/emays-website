'use strict';

import { integer } from 'aws-sdk/clients/cloudfront';
import OrderServiceError from './error/ServiceError';
import { IExternalSystem, IExternalSystemDTO, IPatchExternalSystem } from './IExternalSystem';
import { IExternalSystemDeliveryOrderStatsDTO, IExternalSystemHistoryStatsDTO,
    IExternalSystemOverviewStatsDTO } from './IExternalSystemStats';
import { IOrder, IOrderDTO, IOrderPaginationDTO, IPatchOrder } from './orderType';
import { TimePeriod, TimePeriodDeliveryOrder, TimePeriodOverview } from '../const/timePeriods';

export type CreateOrderFunc = (order: IOrder) => Promise<IOrderDTO>;

export type DeleteOrderByOrderIdFunc = (id: string) => Promise<unknown | IOrder>;

export type CreateExternalSystemFunc = (externalSystem: IExternalSystem) => Promise<IExternalSystemDTO>;

export type PatchExternalSystemsBySystemIdFunc = (systemId: string, patchData: IPatchExternalSystem) => Promise<IExternalSystemDTO>;

export type RequestExternalSystemTokenFunc = (extSysUsername: string, extSysPassword: string) => Promise<{token: string, roles: string}>;

export type GetExternalSystemByIdFunc = (id: string) => Promise<IExternalSystemDTO>;

export type RetrieveOrderByUserIdFunc = (userId: string) => Promise<IOrderDTO>;

export type RetrieveOrderByOrderIdFunc = (storeId: string, orderId: string) => Promise<IOrderDTO>;

export type RetrieveOrdersByDeliveryStatusFunc = (isDelivered: boolean) => Promise<Array<IOrderDTO> | null>;

export type PatchOrderDetailsByUserIdFunc = (userId: string, patchData: IPatchOrder) => Promise<IOrderDTO>;

export type PatchOrderDetailsByOrderIdFunc = (orderId: string, patchData: IPatchOrder) => Promise<IOrderDTO>;

export type GetOrderDetailsWithPages = (noOfPages: number, pageLimit: number,
   role: string, branchId?: string, isCompleted?: boolean) => Promise<IOrderPaginationDTO>;

export type GetOrderDocumentSize = (branchId?: string, isCompleted?: boolean) => Promise<number>;

export type GetCompletedOrderDocumentSizeByDriverId = (driverId?: string) => Promise<number>;

export type GetOrderDetailDocumentsArrayByStartAndEndIndex = (startIndex: number,
    endIndex: number, branchId?: string, isCompleted?: boolean) => Promise<Array<IOrderDTO>>;

export type GetCompletedOrdersByStartAndEndIndexAndDriverId = (startIndex: number,
    endIndex: number, driverId: string) => Promise<Array<IOrderDTO>>;

export type GetCompletedOrdersByDriverId = (startIndex: number,
    endIndex: number, driverId: string) => Promise<IOrderPaginationDTO>;

export type ServiceErrorBuilderFunc = (errorMessage: string) => void;

export type ValidatorErrorBuilderFunc = (error: Error, errorMessage: string) => OrderServiceError;

export type GetExternalSystemHistoryStatsFunc = (timePeriod: TimePeriod, storeId?: string) => Promise<IExternalSystemHistoryStatsDTO>;

export type GetExternalSystemDeliveryOrderStatsFunc = (timePeriod: TimePeriodDeliveryOrder, storeId?: string) => Promise<IExternalSystemDeliveryOrderStatsDTO>;

export type GetExternalSystemOverviewStatsFunc = (timePeriod: TimePeriodOverview, storeId?: string) => Promise<IExternalSystemOverviewStatsDTO>;

export type GetCompletedOrderCountByDurationAndStoreIdFunc = (timePeriod: TimePeriod, storeId?: string) => Promise<integer>;

export type GetOrdersCountDeliveryOrder = (timePeriod: TimePeriodDeliveryOrder, isCompleted: boolean, storeId?: string) => Promise<integer>;

export type GetAllOrderCountByDurationAndStoreIdFunc = (timePeriod: TimePeriod, storeId?: string) => Promise<integer>;

export type GetOverviewAllOrderCountByDurationAndStoreIdFunc = (timePeriod: TimePeriodOverview, storeId?: string) => Promise<integer>;

export type GetActiveOrdersCountByDurationAndStoreIdFunc = (timePeriod: TimePeriod, storeId?: string) => Promise<integer>;

export type GetRevenueByDurationAndStoreIdFunc = (timePeriod: TimePeriod, storeId?: string) => Promise<integer>;

export type GetRevenueOverviewByDurationAndStoreIdFunc = (timePeriod: TimePeriodOverview, storeId?: string) => Promise<integer>;
