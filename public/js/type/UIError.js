'use strict';

/**
 * This is the generic error type
 */
class UIError extends Error {
    /**
     * UIError Constructor
     * @param {object} options: { cause: err }
     */
    constructor (options) {
        super('GENERIC_UI_ERROR', options);
        this.message = 'GENERIC_UI_ERROR';
        this.options = options;
    }
}

export default UIError;
