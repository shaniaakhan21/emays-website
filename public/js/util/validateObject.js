'use strict';

/**
 * Null and empty check of object values except given shippable keys
 * @param {*} object 
 * @param {Array<KeyNames>} string
 * @returns 
 */
export const validateObjectNullEmptyCheck = (object, skipItems) => {
    // Initialize main object validation as true
    let mainObjectValid = true;

    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const value = object[key];
            if (typeof value === 'object' && value !== null) {
                // If the value is an object, recursively check it
                const [innerObjectValid, innerObjectKey] = validateObjectNullEmptyCheck(value, skipItems);
                if (!innerObjectValid) {
                    mainObjectValid = false;
                    return [mainObjectValid, innerObjectKey];
                }
            } else if (value === undefined || value === null || value === '') {
                // If the value is missing (undefined or null), return false
                if (!(skipItems?.includes(key))) {
                    mainObjectValid = false;
                    return [mainObjectValid, key];
                }
            }
        }
    }

    // Return the main object validation status
    return [mainObjectValid];
};

