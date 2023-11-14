import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { inCompleteOrderSelectorMemoized } from '../../redux/selector/inCompleteOrderSelector';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import StatusBox from '../../../common/statusBox';
import Table from '../../../common/table';
import { getOrderStatus } from '../../../../js/util/stateBuilderUtil';
import { storeSelectedOrder } from '../../redux/thunk/driverSelectedOrderThunk';
import { loginSelectorMemoized } from '../../redux/selector/loginSelector';

const DriverDeliveryOrder = ({ driverDeliveryOrderData }) => {

    const [translate] = useTranslation();
    const t = useCallback((str) => translate(`dashboard.overview.${str}`), [translate]);

    const inCompletedOrderSelector = useSelector(inCompleteOrderSelectorMemoized);
    const loginInfoSelector = useSelector(loginSelectorMemoized);
    const [selectedRow, setSelectedRow] = useState({ basicInfo: null, itemsInfo: null });
    const [id, setSearchId] = useState(null);

    const dispatch = useDispatch();

    const history = useHistory();

    const [tableRow, setTableRow] = useState([{
        id: '',
        client: '',
        amount: '',
        date: '',
        time: '',
        orderItems: [],
        status: <StatusBox status={''}/>
    }]);

    const getFinalCost = (itemsInfo, serviceCharge) => {
        const itemsTotal = itemsInfo?.reduce((acc, next) => {
            return +acc + +next?.productCost; }, 0.00);
        return (+serviceCharge + +itemsTotal).toFixed(2);
    };

    const prepareSelectedRowData = (item) => {
        const itemSelected = inCompletedOrderSelector?.data?.pages?.
            find((order) => order?._id === item?.id);
        if (itemSelected) {
            const cost = getFinalCost(itemSelected?.orderItems, itemSelected?.serviceFee);
            const preparedObject = { ...itemSelected };
            const preparedItemsData = itemSelected?.orderItems?.map((item) => ({
                itemName: item?.productName,
                image: item?.productImage,
                color: item?.productColor,
                size: item?.productSize,
                quantity: item?.productQuantity,
                productCost: item?.productCost
            }));
            const itemsInfo = {
                items: preparedItemsData,
                total: cost
            };
            const finalData = { ...selectedRow,
                basicInfo: preparedObject,
                itemsInfo: itemsInfo,
                infoTitle: 'Appointment',
                itemTitle: 'Items to be delivered',
                headerType: 'DeliveryOrder',
                selectedTableRow: [item] };
            setSelectedRow((state) => (finalData));
            dispatch(storeSelectedOrder(finalData));
        }
    };

    useEffect(() => {
    }, [selectedRow]);

    useEffect(() => {
        const tableData = prepareTableRows(inCompletedOrderSelector?.data?.pages);
        if (tableData && tableData?.length > 0) {
            setTableRow(tableData);
        }
    }, [inCompletedOrderSelector]);

    const prepareTableRows = (orderArray) => {
        const tableData = orderArray?.map((data) => {
            // eslint-disable-next-line no-multi-spaces, max-len
            const amount =  data?.orderItems?.reduce((acc, current) => acc + (current?.productQuantity * current?.productCost), 0) || '';
            const date = new Date(data?.createdAt);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return {
                id: data?._id || '',
                isGreenHighlighted: data?.driverId === loginInfoSelector?.userInfo?.id,
                client: `${data?.firstName} ${data?.lastName}` || '',
                amount: `€ ${amount}`,
                date: data?.date?.split('T')[0] || '',
                time: `${hours}:${minutes}` || '',
                orderItems: data?.orderItems,
                driverId: data?.driverId,
                status: <StatusBox status={getOrderStatus({ isDelivered: data?.isDelivered,
                    isDriverPicked: data?.isDriverPicked,
                    isDriverApproved: data?.isDriverApproved,
                    isPrepared: data?.isPrepared })}/>
            };
        });
        return tableData;
    };

    const headers = useMemo(
        () => ['id', 'client', 'amount', 'date', 'time', 'status'].map(key => ({ key, header: t(`table.${key}`) })
        ), [t]);

    return (
        <>
            {
            
                inCompletedOrderSelector.isLoading && tableRow ? <p>Loading...</p> : <div className='overview'>
                    <div className='table'>
                        <Table rows={tableRow} headers={headers} onRowClick={(item) => {
                            prepareSelectedRowData(item);
                            if (item?.status?.props?.status === 'pending-pick-up') {
                                history.push('/dashboard/driverSelectedOrder');
                            }
                            if (item?.status?.props?.status === 'items-to-be-return' && 
                            loginInfoSelector.userInfo.id === item?.driverId) {
                                history.push('/dashboard/driverSelectItems');
                            }
                        }} />
                    </div>
                </div>
            }
        </>
    );
};

export default React.memo(DriverDeliveryOrder);
