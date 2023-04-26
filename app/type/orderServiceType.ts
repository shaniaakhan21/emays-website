'use strict';

import OrderServiceError from './error/ServiceError';
import { IExternalSystem, IExternalSystemDTO } from './IExternalSystem';
import { IOrder, IOrderDTO, IOrderPaginationDTO, IPatchOrder } from './orderType';

export type CreateOrderFunc = (order: IOrder) => Promise<IOrderDTO>;

export type CreateExternalSystemFunc = (externalSystem: IExternalSystem) => Promise<IExternalSystemDTO>;

export type RequestExternalSystemTokenFunc = (extSysUsername: string, extSysPassword: string) => Promise<{token: string}>;

export type GetExternalSystemByIdFunc = (id: string) => Promise<IExternalSystemDTO>;

export type RetrieveOrderByUserIdFunc = (userId: string) => Promise<IOrderDTO>;

export type RetrieveOrdersByDeliveryStatusFunc = (isDelivered: boolean) => Promise<Array<IOrderDTO> | null>;

export type PatchOrderDetailsByUserIdFunc = (userId: string, patchData: IPatchOrder) => Promise<IOrderDTO>;

export type GetOrderDetailsWithPages = (noOfPages: number, pageLimit: number, role: string) => Promise<IOrderPaginationDTO>;

export type GetOrderDocumentSize = () => Promise<number>;

export type GetOrderDetailDocumentsArrayByStartAndEndIndex = (startIndex: number,
    endIndex: number) => Promise<Array<IOrderDTO>>;

export type ServiceErrorBuilderFunc = (errorMessage: string) => void;

export type ValidatorErrorBuilderFunc = (error: Error, errorMessage: string) => OrderServiceError;
