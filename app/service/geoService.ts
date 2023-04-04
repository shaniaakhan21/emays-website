/* eslint-disable camelcase */
'use strict';

import LogType from '../const/logType';
import { Logger } from '../log/logger';
import { GetGeoBasedServiceCost } from '../type/geoServiceType';
import { buildErrorMessage, buildInfoMessageMethodCall,
    buildInfoMessageUserProcessCompleted } from '../util/logMessageBuilder';
import { serviceErrorBuilder } from '../util/serviceErrorBuilder';
import { Client, AddressType, PlaceType2 } from '@googlemaps/google-maps-services-js';
import { config } from '../config/config';

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
        const selectedCountry = (config.SYSTEM_AVAILABLE_GEO_LOCATIONS as
            Array<{location: string, insideCost: number, outsideCost: number}>).
            find(item => item.location === userData.area);
        const locality = addressComponents.find((component) => component.types.includes(localityType)
        );
        const isUserInside: boolean = locality?.short_name === userData.area;
        const fee = isUserInside ? selectedCountry?.insideCost : selectedCountry?.outsideCost;
        const result = {
            area: locality?.short_name as string,
            isInside: isUserInside,
            serviceFee: fee as number
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