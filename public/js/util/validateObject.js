/* eslint-disable func-style */
'use strict';

/**
 * Null and empty check of object values except given shippable keys
 * Give one error at a time
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
 * Null and empty check of object values except given shippable keys
 * Give all errors
 * @param {*} object 
 * @param {Array<KeyNames>} string
 * @returns 
 */
export const validateObjectNullEmptyCheckArray = (object, skipItems) => {
    const errorArr = [];
  
    function traverseObject (obj, parentKey = '') {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                const fullKey = parentKey ? `${parentKey}.${key}` : key; 
  
                if (typeof value === 'object' && value !== null) {
                    traverseObject(value, fullKey);
                } else if (value === undefined || value === null || value === '') {
                    if (!(skipItems?.includes(fullKey))) {
                        errorArr.push(fullKey);
                    }
                }
            }
        }
    }
  
    traverseObject(object);
  
    return [errorArr.length === 0, errorArr];
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
export const validateEmail = (email) => {
    const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    // Test the password against the pattern
    const isValid = pattern.test(email);
    return isValid;
};
