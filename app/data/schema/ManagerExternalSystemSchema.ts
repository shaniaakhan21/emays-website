'use strict';

import { Schema } from 'mongoose';
import { IManagerExternalSystem } from '../../type/IManagerExternalSystem';

const ManagerExternalSystemSchema = new Schema<IManagerExternalSystem>({
    managerFirstName: { type: String, required: true },
    managerLastName: { type: String, required: true },
    managerUsername: { type: String, required: true, unique: true },
    managerPhone: { type: String, required: true },
    managerPassword: { type: String, required: true },
    managerEmail: { type: String, required: true, unique: true },
    externalSystemId: { type: String, required: true }
});

export default ManagerExternalSystemSchema;
