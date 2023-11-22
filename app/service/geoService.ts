/* eslint-disable*/
'use strict';

import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { GetGeoBasedServiceCost } from '../type/geoServiceType';
import { buildErrorMessage, buildInfoMessageMethodCall,
    buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import { serviceErrorBuilder } from '../util/serviceErrorBuilder';
import { Client, AddressType, PlaceType2 } from '@googlemaps/google-maps-services-js';
import { config } from '../config/config';
import { dataflow } from 'googleapis/build/src/apis/dataflow';
import { provideServiceAreasFunc } from '../type/adminExternalSystemServiceType';

const Logging = Logger(__filename);

/**
 * This service method require user lat and lang and the area to be checked.
 * It will return inside status and actual user location.
 * @param {IGeoType} userData User data object
 * @returns {Promise<IGeoTypeDTO>} Promise with area status
 */
export const getServiceCostBasedOnGeoLocation: GetGeoBasedServiceCost = async (userData) => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Get geo based service cost', `uid: ${userData.uid}`), LogType.INFO);
        
        const client = new Client({});
        const response = await client.reverseGeocode({
            params: {
                latlng: `${userData.lat},${userData.long}`,
                key: config.GOOGLE.MAP.API_KEY,
                result_type: [PlaceType2.locality]
            }
        });
        const { data } = response;
        const addressComponents = data?.results?.[0]?.address_components || [];
        const localityType: AddressType = PlaceType2.locality;
        // const selectedCountry = (config.SYSTEM_AVAILABLE_GEO_LOCATIONS as
        //     Array<{location: string, cost: number}>).
        //     find(item => item.location === userData.area);
        const locality = addressComponents.find((component) => component.types.includes(localityType)
        );
        // const isUserInside: boolean = locality?.short_name === userData.area;
        const foundCostRecord =  (config.SYSTEM_AVAILABLE_GEO_LOCATIONS as
                Array<{location: string, apiName: string, cost: number}>).
                find(item => item.location.toLowerCase() === locality?.short_name.toLocaleLowerCase());
                const result = {
            area: locality?.short_name as string,
            isInside: true,
            serviceFee: foundCostRecord?.cost as number
        };

        Logging.log(buildInfoMessageUserProcessCompleted('Get geo based service cost', `Geo Data:
            ${JSON.stringify({ ...result, uid: userData.uid })}` ), LogType.INFO);
        return result;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, `Get geo based service cost for user ${userData.uid}`), LogType.ERROR);
        throw error;
    }
};


/**
 * Provide area list
 * @returns {Promise<ServiceAreasDTO>}
 */
export const provideServiceAreaList: provideServiceAreasFunc = () => {
    try {
        const areaList = 
            ((config?.SYSTEM_AVAILABLE_GEO_LOCATIONS) as Array<{location: string}>)?.map((data) => data?.location);
        const result = {
            areas: areaList
        };
        return result;
    } catch (error) {
        const err = error as Error;
        Logging.log(buildErrorMessage(err, 'Validate zip code'), LogType.ERROR);
        throw error;
    }
};