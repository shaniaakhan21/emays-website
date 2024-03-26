import { apiBase, HTTPHelper as httpUtil } from '../js/util/httpUtil';

export const validateFiscal = async (number, country) => {
    let URI = '';
    if (country) {
        URI = `${apiBase}/validate/fiscal?fiscalCode=${number}&countryCode=${country}`;
    } else {
        URI = `${apiBase}/validate/fiscal?fiscalCode=${number}`;
    }
    return httpUtil.get(URI, {});
};
