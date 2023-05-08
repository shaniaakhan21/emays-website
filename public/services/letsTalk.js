import { apiBase, HTTPHelper as httpUtil } from '../js/util/httpUtil';

export const createAppointment = (data) => {
    return httpUtil.post(`${apiBase}/letsTalk`, {}, data);
};
