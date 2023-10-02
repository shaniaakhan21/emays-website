'use strict';

import { IAdminExternalSystem, IAdminExternalSystemDTO } from './IAdminExternalSystem';
import { IExternalSystemDTO } from './IExternalSystem';

export type CreateAdminExternalSystemFunc = (admin: IAdminExternalSystem) => Promise<IAdminExternalSystemDTO>;

export type RequestAdminExternalSystemTokenFunc = (adminUsername: string, adminPassword: string) => Promise<{token: string}>;

export type GetAdminByIdFunc = (id: string) => Promise<IAdminExternalSystemDTO>;

export type GetExternalSystemByAdminIdFunc = (id: string) => Promise<IExternalSystemDTO>;
