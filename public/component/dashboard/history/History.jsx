import React, { useState, useMemo, useCallback, useEffect } from 'react';
import HistoryHeader from './component/header';
import Table from '../../common/table';
import StatusBox from '../../common/statusBox';
import { useTranslation } from 'react-i18next';
import '../../../scss/component/dashboard/history.scss';
import { useDispatch, useSelector } from 'react-redux';
import { completeOrderSelectorMemoized } from '../redux/selector/completeOrderSelector';
import { getOrderDaDataById } from '../redux/thunk/inCompleteOrderThunk';
import { storeSelectedOrder } from '../redux/thunk/selectedOrderThunk';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getOrderStatus } from '../../../js/util/stateBuilderUtil';
import moment from 'moment';
import { getCurrencySign } from '../../../js/util/currencyUtil';

const History = ({ historyData, updateData }) => {
    const [translate] = useTranslation();
    const t = useCallback((str) => translate(`dashboard.overview.${str}`), [translate]);

    const completedOrderSelector = useSelector(completeOrderSelectorMemoized);
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
        const itemSelected = completedOrderSelector?.data?.pages?.
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
                itemTitle: 'Delivered',
                headerType: 'History',
                selectedTableRow: [item] };
            setSelectedRow((state) => (finalData));
            dispatch(storeSelectedOrder(finalData));
            history.push('/dashboard/selectedOrder');
        }
    };

    const getSelectedOrderInfo = useCallback((id) => { 
        return dispatch(getOrderDaDataById({ orderId: id }));
    }, [dispatch]);

    const searchId = (id) => {
        (async () => {
            const data = await getSelectedOrderInfo(id);
            if (data) {
                // Set selected row items
                setSelectedRow(data?.payload?.orderItems);
                // Set found row
                setTableRow([...prepareTableRows([data?.payload])]);
            }
        })();
    };
    
    useEffect(() => {
        updateData(completedOrderSelector);
        const tableData = prepareTableRows(completedOrderSelector?.data?.pages);
        if (tableData && tableData?.length > 0) {
            setTableRow(tableData);
        }
    }, [completedOrderSelector]);

    const prepareTableRows = (orderArray) => {
        const tableData = orderArray?.map((data) => {
            // eslint-disable-next-line no-multi-spaces, max-len
            const amount =  data?.orderItems?.reduce((acc, current) => acc + (current?.productQuantity * current?.productCost), 0) || '';

            let amountWithComma;
            if (amount && amount.toString().includes('.')) {
                amountWithComma = `${amount?.toString()?.split('.')[0]},${amount?.toString()?.split('.')[1]}`;
            } else {
                amountWithComma = `${amount},00`;
            }

            const date = new Date(data?.createdAt);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const currencyType = getCurrencySign(data?.currencyType);
            return {
                id: data?._id || '',
                client: `${data?.firstName} ${data?.lastName}` || '',
                amount: `${currencyType} ${amountWithComma}`,
                date: moment(data?.date?.split('T')[0]).format('DD-MM-YYYY') || '',
                time: `${hours}:${minutes}` || '',
                orderItems: data?.orderItems,
                status: data?.isDelivered ? 
                    <StatusBox status={getOrderStatus({ isDelivered: data?.isDelivered,
                        isDriverPicked: data?.isDriverPicked,
                        isDriverApproved: data?.isDriverApproved,
                        isPrepared: data?.isPrepared })}/> : ''
            };
        });
        return tableData;
    };

    const headers = useMemo(
        () => ['id', 'client', 'amount', 'date', 'time', 'status'].map(key => ({ key, header: t(`table.${key}`) })
        ), [t]);
      
    return (
        <div className='history'>
            <HistoryHeader searchFunction={searchId}/>
            <br></br>
            {
                completedOrderSelector.isLoading && tableRow ? <p>Loading...</p> : <div className='overview'>
                    <div className='table'>
                        <Table rows={tableRow} headers={headers} onRowClick={(item) => {
                            prepareSelectedRowData(item);
                        }} />
                    </div>
                </div>
            }
        </div>
    );
};

export default React.memo(History);
