'use strict';

export const validateObject = (object) => {
    for (const key in object) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];

            if (typeof value === 'object' && value !== null) {
                // If the value is an object, recursively check it
                if (!checkObject(value)) {
                    return false;
                }
            } else if (value === undefined || value === null) {
                // If the value is missing (undefined or null), return false
                return false;
            }
        }
    }
    // If all values are present, return true
    return true;
};
