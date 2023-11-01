'use strict';

import { Schema } from 'mongoose';
import { IDriver } from '../../type/IDriver';

const DriverSchema = new Schema<IDriver>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: Object, required: true },
    license: { type: Object, required: true },
    billing: { type: Object, required: true },
    driverPassword: { type: String, required: true },
    driverUsername: { type: String, required: true }
});

export default DriverSchema;
