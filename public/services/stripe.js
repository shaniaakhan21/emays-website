import { apiBase, HTTPHelper as httpUtil } from '../js/util/httpUtil';

export const makeCheckout = (uuid) => {
    const params = new URLSearchParams({
        uuid
    });
    return httpUtil.get(`${apiBase}/stripe/checkout?${params?.toString()}`, {});
};

export const submitCheckout = (id, token, data) => {
    const params = new URLSearchParams({
        userId: id
    });
    return httpUtil.get(`${apiBase}/stripe/checkout/complete?${params?.toString()}`, {}, token);
};
