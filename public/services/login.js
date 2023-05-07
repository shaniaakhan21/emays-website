import { apiBase, HTTPHelper as httpUtil } from '../js/util/httpUtil';

/**
 * Login super user
 * @param username {string}
 * @param password {string}
 * @returns {Promise<undefined|*>}
 */
export const loginSuperUser = (data) => {
    return httpUtil.post(`${apiBase}/superUsers/superUserToken`, {}, { ...data });
};
