'use strict';

type ReturnType = {
    token: string, productList: string, launchType: string, userData?: string
}

export default function buildRenderData (token: string, productList: string, userData: string):
    { email: (launchType: string) => ReturnType
        , custom: (launchType: string) => ReturnType
            , default: () => ReturnType } {
    return {
        email: (launchType: string) => ({
            token,
            productList,
            launchType,
            userData
        }),
        custom: (launchType: string) => ({
            token,
            productList,
            launchType,
            userData
        }),
        default: () => ({
            token,
            productList,
            launchType: 'productLaunch',
            userData
        })
    };
}
