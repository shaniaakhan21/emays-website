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

/**
 * Password validation
 * @param {string} password 
 * @returns 
 */
export const validatePassword = (password) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Test the password against the pattern
    const isValid = pattern.test(password);
    return isValid;
};

/**
 * Email validation
 * @param {string} password 
 * @returns 
 */
export const validateEmail = (password) => {
    const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    // Test the password against the pattern
    const isValid = pattern.test(password);
    return isValid;
};
