'use strict';

import { ObjectId } from 'mongoose';

export interface IExternalAPIMapper {
    _id?: ObjectId,
    storeId: string,
    wordpressURI: string,
    wordpressAPIKey: string,
    wordpressAPISecret: string
}
export interface IExternalAPIMapperDTO {
    _id?: ObjectId,
    storeId: string,
    wordpressURI: string,
    wordpressAPIKey: string,
    wordpressAPISecret: string
}

export interface IWordpressProductData {
    productId: string,
    productName: string,
    productPrice: string,
    productImage: string
}
