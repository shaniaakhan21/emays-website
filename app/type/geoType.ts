'use strict';

export interface IGeoType {
    uid: string,
    area: string,
    lat: number,
    long: number
}

export interface IGeoTypeDTO {
    area: string,
    isInside: boolean,
    serviceFee: number
}
