import { apiBase, HTTPHelper as httpUtil } from '../js/util/httpUtil';

export const saveOrder = (order) => {
    return httpUtil.post(`${apiBase}/orders`, {}, order);
};
