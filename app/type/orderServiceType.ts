'use strict';

import OrderServiceError from './error/ServiceError';
import { IOrder, IOrderDTO } from './orderType';

export type CreateOrderFunc = (order: IOrder) => Promise<IOrderDTO>;

export type RetrieveOrderByUserIdFunc = (userId: string) => Promise<IOrderDTO>;

export type ServiceErrorBuilderFunc = (errorMessage: string) => void;

export type ValidatorErrorBuilderFunc = (error: Error, errorMessage: string) => OrderServiceError;
