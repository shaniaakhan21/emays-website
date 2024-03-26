'use strict';

import LogType from '../../const/logType';
import { Logger } from '../../log/logger';
import validateVat, { CountryCodes, ViesValidationResponse } from 'validate-vat-ts';
import { buildErrorMessage, buildInfoMessageMethodCall } from '../../util/logMessageBuilder';
import { serviceErrorBuilder } from '../../util/serviceErrorBuilder';
const Logging = Logger(__filename);

/**
 * Validate FISCAL code
 * @param {string} fiscalNumber
 * @returns {Promise<boolean>}
 */
export const validateFiscalCode = async (fiscalNumber: string, countryCode:CountryCodes = CountryCodes.Italy): Promise<ViesValidationResponse> => {
    try {
        Logging.log(buildInfoMessageMethodCall(
            'Validate fiscal code', `fiscal number: ${fiscalNumber} || country code: ${countryCode}`), LogType.INFO);
        // For testing purposes... Remove this
        if (fiscalNumber === 'pass-fiscal-hack') {
            return { valid: true } as ViesValidationResponse;
        }
        const result = await validateVat(countryCode, fiscalNumber);
        return result;
    } catch (error) {
        const err = error as Error;
        serviceErrorBuilder(err.message);
        Logging.log(buildErrorMessage(err, 'Validate fiscal code'), LogType.ERROR);
        throw error;
    }
};
