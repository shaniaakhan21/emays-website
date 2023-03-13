type ReturnType = {
    token: string, productList: string, launchType: string
}

export default function buildRenderData (token: string, productList: string): { email: (launchType: string) => ReturnType, custom: (launchType: string) => 
    ReturnType, default: () => ReturnType } {
    return {
        email: (launchType: string) => ({
            token,
            productList,
            launchType
        }),
        custom: (launchType: string) => ({
            token,
            productList,
            launchType
        }),
        default: () => ({
            token,
            productList,
            launchType: 'productLaunch'
        })
    };
}
