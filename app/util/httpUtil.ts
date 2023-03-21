'use strict';
import * as axios from 'axios';
import { AxiosResponse } from 'axios';

/**
 * This is a HTTP request wrapper that helps to call external endpoints.
 * A place to put common request attributes.
 */
export class HttpUtil {

    static async get<Type> (uri: string, headers: object | undefined): Promise<AxiosResponse<Type>> {
        const response = await axios.default.get<Type>(uri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        });
        return response;
    }

    static async post<Type, TypeData> (uri: string,
        data: TypeData, headers: object | undefined): Promise<AxiosResponse<Type>> {
        const response = await axios.default.post<Type>(uri, data, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        });
        return response;
    }

    static async postUrlEncoded<Type> (uri: string, queryStringData: string | undefined, 
        headers: object | undefined): Promise<AxiosResponse<Type>> {

        const response = await axios.default.post<Type>(uri, queryStringData, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...headers
            }     
        });
        return response;
    }

    static async put<Type, TypeData> (uri: string, 
        data: TypeData, headers: object | undefined): Promise<AxiosResponse<Type>> {
        const response = await axios.default.put<Type>(uri, data, {
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        });
        return response;
    }

}
