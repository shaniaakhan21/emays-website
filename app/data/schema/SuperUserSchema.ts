'use strict';

import { Schema } from 'mongoose';
import { ISuperUser } from '../../type/ISuperUser';

const SuperUserSchema = new Schema<ISuperUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

export default SuperUserSchema;
