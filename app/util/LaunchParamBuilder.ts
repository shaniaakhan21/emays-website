'use strict';

import { LaunchType } from '../type/ILaunchPayload';

class LaunchParamBuilder {

    token: string;

    productList: string;

    launchType: LaunchType;
    
    userData: string;

    retailerData: string;

    selectedLaunchArea: string;

    serviceCostData: string;

    constructor (launchType: LaunchType) { 
        this.launchType = launchType;
        this.token = '';
        this.productList = '';
        this.userData = '';
        this.retailerData = '';
        this.selectedLaunchArea = '';
        this.serviceCostData = '';

    }

    makeAuthentic (authToken: string) {
        this.token = authToken;
        return this;
    }

    makeUserPayload (userData: string) {
        this.userData = userData;
        return this;
    }

    makeProductPayload (productData: string) {
        this.productList = productData;
        return this;
    }

    makeRetailerPayload (retailerData: string) {
        this.retailerData = retailerData;
        return this;
    }

    makeSelectedLaunchArea (selectedLaunchArea: string) {
        this.selectedLaunchArea = selectedLaunchArea;
        return this;
    }

    makeServiceCostPayload (serviceCostData: string) {
        this.serviceCostData = serviceCostData;
        return this;
    }

    build () {
        return {
            token: this.token,
            productList: this.productList,
            launchType: this.launchType,
            userData: this.userData,
            retailerData: this.retailerData,
            selectedLaunchArea: this.selectedLaunchArea,
            serviceCostData: this.serviceCostData
        };
    }

}

export default LaunchParamBuilder;
