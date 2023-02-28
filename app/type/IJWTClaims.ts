'use strict';

import { Roles } from '../const/roles';
import { v4 as uuidv4 } from 'uuid';

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
