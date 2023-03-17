'use strict';

import { Schema } from 'mongoose';
import { IExternalSystem } from '../../type/IExternalSystem';

const ExternalSystemSchema = new Schema<IExternalSystem>({
    extSysName: { type: String, required: true },
    extSysUsername: { type: String, required: true, unique: true },
    extSysPassword: { type: String, required: true },
    extSysEmail: { type: String, required: true, unique: true }
});

export default ExternalSystemSchema;
