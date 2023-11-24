'use strict';

export const validateUsernameErrorBuilder = (error) => {
    if (error === 'Username already reserved') {
        return 'Username already reserved';
    } 
    return 'Some error occurred';
};
