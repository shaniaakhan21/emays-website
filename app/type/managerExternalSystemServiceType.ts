'use strict';

import { IManagerExternalSystem, IManagerExternalSystemDTO } from './IManagerExternalSystem';
import { IExternalSystemDTO } from './IExternalSystem';

export type CreateManagerExternalSystemFunc = (manager: IManagerExternalSystem) => Promise<IManagerExternalSystemDTO>;

export type DeleteManagersBySystemIdFunc = (id: string) => Promise<unknown | Array<IManagerExternalSystemDTO>>;

export type RequestManagerExternalSystemTokenFunc = (managerUsername: string, managerPassword: string) => Promise<{token: string, roles: string}>;

export type GetManagerByIdFunc = (id: string) => Promise<IManagerExternalSystemDTO>;

export type GetExternalSystemByManagerIdFunc = (id: string) => Promise<IExternalSystemDTO>;
