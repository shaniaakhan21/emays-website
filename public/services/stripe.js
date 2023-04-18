import { apiBase, HTTPHelper as httpUtil } from '../js/util/httpUtil';

export const makeCheckout = (uuid) => {
    const params = new URLSearchParams({
        uuid
    });
    return httpUtil.get(`${apiBase}/stripe/checkout?${params?.toString()}`, {});
};

export const submitCheckout = (id, data) => {
    const params = new URLSearchParams({
        id
    });
    return httpUtil.post(`${apiBase}/stripe/checkout?${params?.toString()}`, {}, data);
};
