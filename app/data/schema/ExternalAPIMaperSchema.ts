'use strict';

import { Schema } from 'mongoose';
import { IExternalAPIMapper } from '../../type/externalAPIMapperType';

const ExternalAPIMapperSchema = new Schema<IExternalAPIMapper>({
    storeId: { type: String, required: true },
    wordpressURI: { type: String, required: false },
    wordpressAPIKey: { type: String, required: false },
    wordpressAPISecret: { type: String, required: false }
});

export default ExternalAPIMapperSchema;
