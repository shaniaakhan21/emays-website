import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { driverSelectedOrderSelectorMemoized } from '../redux/selector/driverSelectedOrderSelector';
import { useDispatch, useSelector } from 'react-redux';
import DriverOrderReviewVertical from '../orderReview/DriverOrderReviewVertical';
import { getAdminByStoreId, getStoreInformationByStoreId } from '../redux/thunk/driverSelectedOrderThunk';

// SCSS
import '../../../scss/component/dashboard/selectedItem.scss';

const DriverOrderSelected = () => {
    console.log('Driver selected order');
    const [translate] = useTranslation();
    const t = useCallback((str) => translate(`dashboard.overview.${str}`), [translate]);
    const selectedOrderSelector = useSelector(driverSelectedOrderSelectorMemoized);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!(selectedOrderSelector?.orderInfo?.isLoading)) {
            dispatch(getStoreInformationByStoreId({ storeId: selectedOrderSelector?.orderInfo?.basicInfo?.branchId }));
            dispatch(getAdminByStoreId({ storeId: selectedOrderSelector?.orderInfo?.basicInfo?.branchId }));
        }
    }, [selectedOrderSelector?.orderInfo?.isLoading]);

    return (

        <div className={'selected-item-container'}>
            <div className={'item-row selected-item-items'}>
                <div>
                    { 
                        // Selected row
                        selectedOrderSelector?.orderInfo && 
                        <DriverOrderReviewVertical basicInfo = {selectedOrderSelector?.orderInfo?.basicInfo}
                            itemsInfo = {selectedOrderSelector?.orderInfo?.itemsInfo}
                            infoTitle = {selectedOrderSelector?.orderInfo?.infoTitle}
                            itemsTitle = {selectedOrderSelector?.orderInfo?.itemTitle}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default DriverOrderSelected;
