'use strict';

import { Schema } from 'mongoose';
import { IExternalSystem, PaymentMethod } from '../../type/IExternalSystem';

const ExternalSystemSchema = new Schema<IExternalSystem>({
    extSysName: { type: String, required: true },
    extSysUsername: { type: String, required: true, unique: true },
    extSysPassword: { type: String, required: true },
    extSysEmail: { type: String, required: true, unique: true },
    extSysAddress: { type: Object, required: true },
    extLogo: { type: Buffer },
    extLogoContentType: { type: String },
    paymentMethod: { type: String, required: true, enum: Object.values(PaymentMethod), default: PaymentMethod.POPUP }
});

export default ExternalSystemSchema;
