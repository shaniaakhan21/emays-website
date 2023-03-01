
'use strict';

import UIError from './UIError';

/**
 * Error type for Backend Errors
 */

class BackendError extends UIError {

    constructor (code, message, description) {
        super(message);
        this.code = code;
        this.message = message;
        this.description = description;
    }
}

export default BackendError;
