'use strict';

import { ISuperUser, ISuperUserDTO } from './ISuperUser';

export type CreateSuperUserFunc = (superUser: ISuperUser) => Promise<ISuperUserDTO>;

export type RequestSuperUserTokenFunc = (superUserUsername: string, superUserPassword: string) => Promise<{token: string, roles: string}>;

export type GetSuperUserByIdFunc = (id: string) => Promise<ISuperUserDTO>;
