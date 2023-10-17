'use strict';

import { apiBase, HTTPHelper as httpUtil } from '../../js/util/httpUtil';

/**
 * Login super user
 * @param data {object}
 * @returns {Promise<undefined|*>}
 */
export const loginSuperUser = (data) => {
    return httpUtil.post(`${apiBase}/superUsers/superUserToken`, {}, { ...data });
};

/**
 * Login any user
 * @param data {object}
 * @returns {Promise<undefined|*>}
 */
export const loginAnyUser = (data) => {
    return httpUtil.post(`${apiBase}/login`, {}, { ...data });
};
