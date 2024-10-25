'use strict';

import { Schema } from 'mongoose';
import { IAdminExternalSystem } from '../../type/IAdminExternalSystem';

const AdminExternalSystemSchema = new Schema<IAdminExternalSystem>({
    adminFirstName: { type: String, required: true },
    adminLastName: { type: String, required: true },
    adminUsername: { type: String, required: true, unique: true },
    adminPhone: { type: String, required: true },
    adminPassword: { type: String, required: true },
    adminEmail: { type: String, required: true, unique: true },
    externalSystemId: { type: String, required: true }
});

export default AdminExternalSystemSchema;
