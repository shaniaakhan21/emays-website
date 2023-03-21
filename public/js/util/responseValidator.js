'use strict';

import { CREATED, FOUND_AT, NO_CONTENT } from '../const/HTTPCodes';
import BackendError from '../type/BackendError';

class ResponseValidator {
    static async validate (response) {
        if (response.status === CREATED || 
            response.status === NO_CONTENT ||
            response.status === FOUND_AT 
        ) {
            return;
        }
        const result = await response.json();
        // Backend throws errors with the key error
        if (result.error) {                 
            throw new BackendError(response.status, result?.error, result?.error);
        }
        return result.data;
    }
}

export default ResponseValidator;
