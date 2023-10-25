'use strict';

import { IAdminExternalSystem, IAdminExternalSystemDTO } from './IAdminExternalSystem';
import { IExternalSystemDTO } from './IExternalSystem';
import { ServiceAreasDTO } from './IServiceAreas';

export type CreateAdminExternalSystemFunc = (admin: IAdminExternalSystem) => Promise<IAdminExternalSystemDTO>;

export type RequestAdminExternalSystemTokenFunc = (adminUsername: string, adminPassword: string) => Promise<{token: string, roles: string}>;

export type GetAdminByIdFunc = (id: string) => Promise<IAdminExternalSystemDTO>;

export type GetExternalSystemByAdminIdFunc = (id: string) => Promise<IExternalSystemDTO>;

export type provideServiceAreasFunc = () => ServiceAreasDTO;

