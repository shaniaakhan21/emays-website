import { apiBase, HTTPHelper as httpUtil } from '../js/util/httpUtil';

export const getAppInfo = () => {
    return httpUtil.get(`${apiBase}/appInfo`, {});
};
