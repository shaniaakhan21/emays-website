'use strict';

import { IOrder, IOrderDTO } from './orderType';

export type PrepareDetailsToSendFunc = (arg0: IOrder) => IOrderDTO;

export type PrepareDetailsToSendArrayFunc = (arg0: Array<IOrder>) => Array<IOrderDTO>;
