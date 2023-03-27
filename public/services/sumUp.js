import { apiBase, HTTPHelper as httpUtil } from '../js/util/httpUtil';

export const makeCheckout = (uuid) => {
    const params = new URLSearchParams({
        uuid
    });
    return httpUtil.get(`${apiBase}/sumUp/checkout?${params?.toString()}`, {});
};

export const submitCheckout = (id, data) => {
    const params = new URLSearchParams({
        id
    });
    return httpUtil.post(`${apiBase}/sumUp/checkout?${params?.toString()}`, {}, data);
};
