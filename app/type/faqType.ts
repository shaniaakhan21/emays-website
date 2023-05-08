'use strict';

import { ObjectId } from 'mongoose';

export interface IFAQ {
    _id?: ObjectId,
    question: string,
    answer: string,
}
export interface IFAQDTO {
    _id?: ObjectId,
    question: string,
    answer: string,
}

export interface FAQ {
    question: string,
    answer: string,
}
export interface IFAQPaginationDTO {
    pages?: Array<IFAQDTO>,
    next?: NextPageInfo,
    previous?: PreviousPageInfo,
    allPagesAvailable?: number
}

export interface NextPageInfo {
    page: number, limit: number
}

export interface PreviousPageInfo {
    page: number, limit: number
}
