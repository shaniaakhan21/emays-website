'use strict';

import { integer } from 'aws-sdk/clients/cloudfront';
import OrderServiceError from './error/ServiceError';
import { IExternalSystem, IExternalSystemDTO } from './IExternalSystem';
import { IExternalSystemDeliveryOrderStatsDTO, IExternalSystemHistoryStatsDTO,
    IExternalSystemOverviewStatsDTO } from './IExternalSystemStats';
import { IOrder, IOrderDTO, IOrderPaginationDTO, IPatchOrder } from './orderType';
import { TimePeriod } from '../const/timePeriods';

export type CreateOrderFunc = (order: IOrder) => Promise<IOrderDTO>;

export type DeleteOrderByOrderIdFunc = (id: string) => Promise<unknown | IOrder>;

export type CreateExternalSystemFunc = (externalSystem: IExternalSystem) => Promise<IExternalSystemDTO>;

export type RequestExternalSystemTokenFunc = (extSysUsername: string, extSysPassword: string) => Promise<{token: string, roles: string}>;

export type GetExternalSystemByIdFunc = (id: string) => Promise<IExternalSystemDTO>;

export type RetrieveOrderByUserIdFunc = (userId: string) => Promise<IOrderDTO>;

export type RetrieveOrderByOrderIdFunc = (storeId: string, orderId: string) => Promise<IOrderDTO>;

export type RetrieveOrdersByDeliveryStatusFunc = (isDelivered: boolean) => Promise<Array<IOrderDTO> | null>;

export type PatchOrderDetailsByUserIdFunc = (userId: string, patchData: IPatchOrder) => Promise<IOrderDTO>;

export type GetOrderDetailsWithPages = (noOfPages: number, pageLimit: number,
   role: string, branchId?: string, isCompleted?: boolean) => Promise<IOrderPaginationDTO>;

export type GetOrderDocumentSize = (branchId?: string, isCompleted?: boolean) => Promise<number>;

export type GetOrderDetailDocumentsArrayByStartAndEndIndex = (startIndex: number,
    endIndex: number, branchId?: string, isCompleted?: boolean) => Promise<Array<IOrderDTO>>;

export type ServiceErrorBuilderFunc = (errorMessage: string) => void;

export type ValidatorErrorBuilderFunc = (error: Error, errorMessage: string) => OrderServiceError;

export type GetExternalSystemHistoryStatsFunc = (timePeriod: TimePeriod, storeId?: string) => Promise<IExternalSystemHistoryStatsDTO>;

export type GetExternalSystemDeliveryOrderStatsFunc = (timePeriod: TimePeriod, storeId?: string) => Promise<IExternalSystemDeliveryOrderStatsDTO>;

export type GetExternalSystemOverviewStatsFunc = (timePeriod: TimePeriod, storeId?: string) => Promise<IExternalSystemOverviewStatsDTO>;

export type GetCompletedOrderCountByDurationAndStoreIdFunc = (timePeriod: TimePeriod, storeId?: string) => Promise<integer>;

export type GetAllOrderCountByDurationAndStoreIdFunc = (timePeriod: TimePeriod, storeId?: string) => Promise<integer>;

export type GetActiveOrdersCountByDurationAndStoreIdFunc = (timePeriod: TimePeriod, storeId?: string) => Promise<integer>;

export type GetRevenueByDurationAndStoreIdFunc = (timePeriod: TimePeriod, storeId?: string) => Promise<integer>;
