import { apiBase, HTTPHelper as httpUtil } from '../js/util/httpUtil';

export const getAll = () => {
    return httpUtil.get(`${apiBase}/faq`, {});
};
