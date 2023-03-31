import { apiBase, HTTPHelper as httpUtil } from '../js/util/httpUtil';

export const getAppInfo = async () => {
    return httpUtil.get(`${apiBase}/appInfo`, {});
};

export const getServiceFee = async (area, lat, long) => {
    return httpUtil.get(`${apiBase}/geo/${area}/${lat}/${long}`, {});
};

