'use strict';
import { CurrencyType } from '../const/currencyType';

export interface ICreateOrderRequestBody {
    orderId: string,
    storeId: string,
    orderAmount: number,
    currencyType: CurrencyType
}
