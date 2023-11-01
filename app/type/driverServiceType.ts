'use strict';

import { IDriver, IDriverDTO } from './IDriver';

export type CreateDriverFunc = (driver: IDriver) => Promise<IDriverDTO>;

export type RequestDriverTokenFunc = (driverUsername: string, driverPassword: string) => Promise<{token: string, roles: string}>;

