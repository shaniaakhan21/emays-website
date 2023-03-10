'use strict';

import { Roles } from '../const/roles';

export interface IJWTClaims {
    time: Date,
    exp: number,
    roles: Array<Roles>
    id: string
}

export interface IJWTBuildData {
    roles: Roles,
    id: string
}

export enum JWT_TYPE {
    LONG_LIVE = 'long live',
    SHORT_LIVE = 'short live',
}
