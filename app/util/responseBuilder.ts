'use strict';

import { IAdminExternalSystemDTO } from '../type/IAdminExternalSystem';
import { IDriverDTO } from '../type/IDriver';
import { IExternalSystemDTO } from '../type/IExternalSystem';
import { IExternalSystemHistoryStatsDTO, IExternalSystemOverviewStatsDTO } from '../type/IExternalSystemStats';
import { ServiceAreasDTO } from '../type/IServiceAreas';
import { ISystemInfoResponse } from '../type/customResponseType';
import { IGeoTypeDTO } from '../type/geoType';
import { IOrderPaginationDTO } from '../type/orderType';
import { IOrderDTO } from '../type/orderType';
import { ErrorResponseBuilderFunc, SuccessResponseBuilderFunc } from '../type/responseBuilderType';

/**
 * Generate error response
 * @param {OrderServiceError} error Error object
 * @returns {ErrorResponseBuilderResponse} Error response
 */
export const errorResponseBuilder: ErrorResponseBuilderFunc = (error) => {
    return { error: error.message };
};

/**
 * Generate success response data
 * @param {object} data Built response
 * @returns {SuccessResponseBuilderResponse} Success response
 */
export const successResponseBuilder: SuccessResponseBuilderFunc<IOrderDTO | 
    {token: string} |
    {googleMapAPIKey: string} |
    {status: boolean} |
    IExternalSystemDTO |
    IOrderPaginationDTO |
    ISystemInfoResponse |
    ServiceAreasDTO | 
    IExternalSystemHistoryStatsDTO |
    IExternalSystemOverviewStatsDTO |
    IAdminExternalSystemDTO |
    IDriverDTO |
     IGeoTypeDTO > = (data) => {
         return { data: data };
     };
