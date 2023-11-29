'use strict';

import { IExternalSystem, IExternalSystemDTO } from './IExternalSystem';

export type PrepareDetailsToSendFunc = (arg0: IExternalSystem) => IExternalSystemDTO;

export type PrepareDetailsToSendArrayFunc = (arg0: Array<IExternalSystem>) => Array<IExternalSystemDTO>;
