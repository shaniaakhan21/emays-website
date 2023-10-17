import React, { useState, useMemo, useCallback, useEffect } from 'react';
import HistoryHeader from './component/header';
import Table from '../../common/table';
import StatusBox from '../../common/statusBox';
import { useTranslation } from 'react-i18next';
import '../../../scss/component/dashboard/deliveryOrder.scss';
import { useDispatch, useSelector } from 'react-redux';
import { inCompleteOrderSelectorMemoized } from '../redux/selector/inCompleteOrderSelector';
import { getOrderDaDataById } from '../redux/thunk/inCompleteOrderThunk';
import OrderReview from '../orderReview/OrderReview';

const DeliveryOrder = ({ deliveryOrderData, updateData }) => {
    const [translate] = useTranslation();
    const t = useCallback((str) => translate(`dashboard.overview.${str}`), [translate]);

    const inCompletedOrderSelector = useSelector(inCompleteOrderSelectorMemoized);
    const [selectedRow, setSelectedRow] = useState({ basicInfo: null, itemsInfo: null });
    const [id, setSearchId] = useState(null);

    const dispatch = useDispatch();

    const [tableRow, setTableRow] = useState([{
        id: '',
        client: '',
        amount: '',
        date: '',
        time: '',
        orderItems: [],
        status: <StatusBox status={'Pending to pickup'}/>
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
                quantity: item?.productQuantity
            }));
            const itemsInfo = {
                items: preparedItemsData,
                total: cost
            };
            setSelectedRow((state) => ({ ...state, basicInfo: preparedObject, itemsInfo: itemsInfo }));
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
            return {
                id: data?._id || '',
                client: `${data?.firstName} ${data?.lastName}` || '',
                amount: amount,
                date: data?.date || '',
                time: data?.createdAt || '',
                orderItems: data?.orderItems,
                status: <StatusBox status={'Pending to pickup'}/>
            };
        });
        return tableData;
    };

    const headers = useMemo(
        () => ['id', 'client', 'amount', 'date', 'time', 'status'].map(key => ({ key, header: t(`table.${key}`) })
        ), [t]);
      
    return (
        <>
            <HistoryHeader searchFunction={searchId}/>
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
            <br></br>
            {
                <div className='items'>
                    {(selectedRow?.basicInfo && selectedRow?.itemsInfo) &&
                    <OrderReview basicInfo = {selectedRow?.basicInfo}
                        itemsInfo = { selectedRow?.itemsInfo }
                        infoTitle = {'Appointment'}
                        itemsTitle = {'Items to be delivered'}/>
                    }
                </div>
            }
        </>
    );
};

export default React.memo(DeliveryOrder);
