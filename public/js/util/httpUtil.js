
'use strict';

import { getAuthToken } from './SessionStorageUtil';
import ResponseValidator from './responseValidator';

export const apiBase = '/api';

export class HTTPHelper {
    static async get (uri, headers, token) {
        const response = await fetch(uri, {
            credentials: 'same-origin',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token ? token : getAuthToken()}`,
                ...headers
            }
        });
        return ResponseValidator.validate(response);
    }

    static async post (uri, headers, data = {}, token) {
        const response = await fetch(uri, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`,
                ...headers
            },
            body: JSON.stringify(data)
        });
        return ResponseValidator.validate(response);
    }

    static async put (uri, headers, data = {}) {
        const response = await fetch(uri, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`,
                ...headers
            },
            body: JSON.stringify(data)
        });
        return ResponseValidator.validate(response);
    }

    static async patch (uri, headers, data = {}) {
        const response = await fetch(uri, {
            method: 'PATCH',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`,
                ...headers
            },
            body: JSON.stringify(data)
        });
        return ResponseValidator.validate(response);
    }

    static async delete (uri, headers, data = {}) {
        const response = await fetch(uri, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`,
                ...headers
            },
            body: JSON.stringify(data)
        });
        return ResponseValidator.validate(response);
    }
}
