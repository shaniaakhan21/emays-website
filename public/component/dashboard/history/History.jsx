import React, { useState, useMemo, useCallback, useEffect } from 'react';
import HistoryHeader from './component/header';
import Table from '../../common/table';
import StatusBox from '../../common/statusBox';
import { useTranslation } from 'react-i18next';
import RowDetails from './component/RowDetails';
import '../../../scss/component/dashboard/history.scss';
import { useDispatch, useSelector } from 'react-redux';
import { completeOrderSelectorMemoized } from '../redux/selector/completeOrderSelector';
import ShoppingItem from '../../checkout/ShoppingItem';
import { getOrderDaDataById } from '../redux/thunk/inCompleteOrderThunk';

const History = ({ historyData, updateData }) => {
    const [translate] = useTranslation();
    const t = useCallback((str) => translate(`dashboard.overview.${str}`), [translate]);

    const completedOrderSelector = useSelector(completeOrderSelectorMemoized);
    const [selectedRow, setSelectedRow] = useState(null);
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

    const searchId = async (id) => {
        const data = await dispatch(getOrderDaDataById({ orderId: id }));
        // Set selected row items
        setSelectedRow(data?.payload?.orderItems);
        // Set found row
        setTableRow([...prepareTableRows([data?.payload])]);
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
                completedOrderSelector.isLoading && tableRow ? <p>Loading...</p> : <div className='overview'>
                    <div className='table'>
                        <Table rows={tableRow} headers={headers} onRowClick={(item) => {
                            setSelectedRow(item?.orderItems);
                        }} />
                    </div>
                    <div className='toBeDelivered'>
                        {/* <h2 className='title'>{t('toBeDelivered-title')}</h2> */}
                        <div className='items'>
                            {selectedRow?.map((item, index) => <ShoppingItem
                                index={index}
                                itemName={item?.productName}
                                image={item?.productImage}
                                color={item?.productColor}
                                size={'40'}
                                quantity={item?.productQuantity} />)}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default React.memo(History);
