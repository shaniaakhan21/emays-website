import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { driverHistorySelectorMemoized } from '../../redux/selector/driverHistorySelector';
import Table from '../../../common/table';
import StatusBox from '../../../common/statusBox';
import { useTranslation } from 'react-i18next';
import { getOrderStatus } from '../../../../js/util/stateBuilderUtil';
import { storeSelectedOrder } from '../../redux/thunk/selectedOrderThunk';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const DriverHistory = () => {

    const dispatch = useDispatch();
    const completedOrderSelector = useSelector(driverHistorySelectorMemoized);
    const [selectedRow, setSelectedRow] = useState({ basicInfo: null, itemsInfo: null });
    const [tableRow, setTableRow] = useState([{
        id: '',
        client: '',
        amount: '',
        date: '',
        time: '',
        orderItems: [],
        status: <StatusBox status={''}/>
    }]);

    useEffect(() => {
        const tableData = prepareTableRows(completedOrderSelector?.data?.pages);
        if (tableData && tableData?.length > 0) {
            setTableRow(tableData);
        }
    }, [completedOrderSelector]);

    const history = useHistory();
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
                status: data?.isDelivered ? 
                    <StatusBox status={getOrderStatus({ isDelivered: data?.isDelivered,
                        isPrepared: data?.isPrepared })}/> : ''
            };
        });
        return tableData;
    };

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
                quantity: item?.productQuantity
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

    const [translate] = useTranslation();
    const t = useCallback((str) => translate(`dashboard.overview.${str}`), [translate]);
    const headers = useMemo(
        () => ['id', 'client', 'amount', 'date', 'time', 'status'].map(key => ({ key, header: t(`table.${key}`) })
        ), [t]);
      
    return (
        <>
            {
                completedOrderSelector.isLoading && tableRow ? <p>Loading...</p> : <div className='overview'>
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
