'use strict';

import { IExternalSystemDTO } from '../type/IExternalSystem';
import { PrepareDetailsToSendFunc } from '../type/externalSysDetailBuilder';

/**
 * Filter data to send
 * @param {IOrder} order Order details
 * @returns {IOrderDTO}  Data to send
 */
export const prepareUserDetailsToSend: PrepareDetailsToSendFunc = (externalSystem) => {
    const filteredData: IExternalSystemDTO = {
        _id: externalSystem?._id,
        extSysAddress: externalSystem?.extSysAddress,
        extSysEmail: externalSystem?.extSysEmail,
        extSysName: externalSystem?.extSysName,
        extLogo: externalSystem?.extLogo,
        extLogoContentType: externalSystem?.extLogoContentType,
        fiscalInfo: externalSystem?.fiscalInfo
    };
    return filteredData;
};
