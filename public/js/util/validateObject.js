'use strict';

/**
 * Null and empty check of object values except given shippable keys
 * @param {*} object 
 * @param {Array<KeyNames>} string
 * @returns 
 */
export const validateObjectNullEmptyCheck = (object, skipItems) => {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const value = object[key];

            if (typeof value === 'object' && value !== null) {
                // If the value is an object, recursively check it
                if (!validateObjectNullEmptyCheck(value, skipItems)) {
                    return false;
                }
            } else if (value === undefined || value === null || value === '') {
                // If the value is missing (undefined or null), return false
                if (!(skipItems?.includes(key))) {
                    return false;
                }
            }
        }
    }
    // If all values are present, return true
    return true;
};
