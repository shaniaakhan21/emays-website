import React, { useState, useMemo, useCallback, useEffect } from 'react';
import DOHeader from './component/header';
import Table from '../../common/table';
import StatusBox from '../../common/statusBox';
import { useTranslation } from 'react-i18next';
import '../../../scss/component/dashboard/deliveryOrder.scss';
import { useDispatch, useSelector } from 'react-redux';
import { inCompleteOrderSelectorMemoized } from '../redux/selector/inCompleteOrderSelector';
import { getOrderDaDataById } from '../redux/thunk/inCompleteOrderThunk';
import { storeSelectedOrder } from '../redux/thunk/selectedOrderThunk';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getOrderStatus } from '../../../js/util/stateBuilderUtil';

const DeliveryOrder = ({ deliveryOrderData, updateData }) => {
    const [translate] = useTranslation();
    const t = useCallback((str) => translate(`dashboard.overview.${str}`), [translate]);

    const inCompletedOrderSelector = useSelector(inCompleteOrderSelectorMemoized);
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
            return +acc + (+next?.productCost * next?.productQuantity); }, 0.00);
        return (+itemsTotal).toFixed(2);
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
            history.push('/dashboard/selectedOrder');
        }
    };

    const searchId = async (id) => {
        const data = await dispatch(getOrderDaDataById({ orderId: id }));
        // Set selected row items
        setSelectedRow(data?.payload);
        // Set found row
        setTableRow([...prepareTableRows([data?.payload])]);
    };

    useEffect(() => {
    }, [selectedRow]);
    
    useEffect(() => {
        updateData(inCompletedOrderSelector);
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
                client: `${data?.firstName} ${data?.lastName}` || '',
                amount: `€ ${amount}`,
                date: data?.date?.split('T')[0] || '',
                time: `${hours}:${minutes}` || '',
                orderItems: data?.orderItems,
                status: <StatusBox status={getOrderStatus({ isDelivered: data?.isDelivered,
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
            <DOHeader searchFunction={searchId}/>
            <br></br>
            {
                inCompletedOrderSelector.isLoading && tableRow ? <p>Loading...</p> : <div className='overview'>
                    <div className='table'>
                        <Table rows={tableRow} headers={headers} onRowClick={(item) => {
                            prepareSelectedRowData(item);
                        }} />
                    </div>
                </div>
            }
        </>
    );
};

export default React.memo(DeliveryOrder);
