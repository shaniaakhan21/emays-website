'use strict';

import { IGeoType, IGeoTypeDTO } from './geoType';

export type GetGeoBasedServiceCost = (order: IGeoType) => Promise<IGeoTypeDTO>;
