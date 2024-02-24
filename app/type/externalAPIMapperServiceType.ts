'use strict';

import { IExternalAPIMapper, IExternalAPIMapperDTO, IWordpressProductData } from './externalAPIMapperType';

export type CreateExternalAPIMapperFunc = (mapper: IExternalAPIMapper) => Promise<IExternalAPIMapperDTO>;

export type GetExternalAPIMapperByStoreIdFunc = (storeId: string) => Promise<IExternalAPIMapperDTO>;

export type GetWordpressProductData = (storeId: string) => Promise<Array<IWordpressProductData>>;
