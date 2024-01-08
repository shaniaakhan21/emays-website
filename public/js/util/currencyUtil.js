'use strict';

export const getCurrencySign = (currencyType) => {
    // eslint-disable-next-line no-nested-ternary
    return currencyType === 'euro' ? '€' :
        currencyType === 'aed' ? 'AED' :
            '';
};
