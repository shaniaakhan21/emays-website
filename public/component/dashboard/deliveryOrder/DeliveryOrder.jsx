import React, { useState, useMemo, useCallback, useEffect } from 'react';
import HistoryHeader from './component/header';
import Table from '../../common/table';
import StatusBox from '../../common/statusBox';
import { Button } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import RowDetails from './component/RowDetails';
import '../../../scss/component/dashboard/deliveryOrder.scss';
import { useDispatch, useSelector } from 'react-redux';
import { overviewSelectorMemoized } from '../redux/selector/overviewSelector';
import ShoppingItem from '../../checkout/ShoppingItem';
import { getOverviewDataById } from '../redux/thunk/overviewThunk';
import HeaderPerRow from './component/headerPerRow';

const DeliveryOrder = ({ deliveryOrderData, updateData }) => {
    const [translate] = useTranslation();
    const t = useCallback((str) => translate(`dashboard.overview.${str}`), [translate]);

    const overviewSelector = useSelector(overviewSelectorMemoized);
    const [id, setSearchId] = useState(null);
    const dispatch = useDispatch();

    const [tableRow, setTableRow] = useState([{
        id: '#CH0001',
        client: 'GANCINI WATCH',
        amount: '50,00',
        date: '07-02-2023',
        time: '10:00 AM',
        orderItems: [{ 
            'productName': 'Denim shirt', 
            'productColor': 'blue', 
            'productSize': 'Large', 
            'productQuantity': 2, 
            'productCost': '10', 
            'productImage': 'https://drive.google.com/uc?export=view&id=1ozS_QYosuRRkw4vG6cRH2DhkvWNHG6nN', 
            'productDeliveryInformation': 'extra information' }, 
        { 'productName': 'Denim Trouser', 
            'productColor': 'blue', 
            'productSize': 'Large', 
            'productQuantity': 5, 
            'productCost': '20', 
            'productImage': 'https://drive.google.com/uc?export=view&id=1ozS_QYosuRRkw4vG6cRH2DhkvWNHG6nN', 
            'productDeliveryInformation': 'extra information' }],
        status: <StatusBox status={'Pending to pickup'} />
    },
        , {
            id: 'CH0002',
            client: 'Gertrude Pest',
            amount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            orderItems: [{ 
                'productName': 'Denim shirt', 
                'productColor': 'blue', 
                'productSize': 'Large', 
                'productQuantity': 2, 
                'productCost': '10', 
                'productImage': 'https://drive.google.com/uc?export=view&id=1ozS_QYosuRRkw4vG6cRH2DhkvWNHG6nN', 
                'productDeliveryInformation': 'extra information' }, 
            { 'productName': 'Denim Trouser', 
                'productColor': 'blue', 
                'productSize': 'Large', 
                'productQuantity': 5, 
                'productCost': '20', 
                'productImage': 'https://drive.google.com/uc?export=view&id=1ozS_QYosuRRkw4vG6cRH2DhkvWNHG6nN', 
                'productDeliveryInformation': 'extra information' }],
            status: <StatusBox status={'Pending to pickup'} />
        },
        {
            id: 'CH0003',
            client: 'Gertrude Pest',
            amount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            orderItems: [{ 
                'productName': 'Denim shirt', 
                'productColor': 'blue', 
                'productSize': 'Large', 
                'productQuantity': 2, 
                'productCost': '10', 
                'productImage': 'https://drive.google.com/uc?export=view&id=1ozS_QYosuRRkw4vG6cRH2DhkvWNHG6nN', 
                'productDeliveryInformation': 'extra information' }, 
            { 'productName': 'Denim Trouser', 
                'productColor': 'blue', 
                'productSize': 'Large', 
                'productQuantity': 5, 
                'productCost': '20', 
                'productImage': 'https://drive.google.com/uc?export=view&id=1ozS_QYosuRRkw4vG6cRH2DhkvWNHG6nN', 
                'productDeliveryInformation': 'extra information' }],
            status: <StatusBox status={'Pending to pickup'} />
        },
        {
            id: 'CH0004',
            client: 'Gertrude Pest',
            amount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            orderItems: [{ 
                'productName': 'Denim shirt', 
                'productColor': 'blue', 
                'productSize': 'Large', 
                'productQuantity': 2, 
                'productCost': '10', 
                'productImage': 'https://drive.google.com/uc?export=view&id=1ozS_QYosuRRkw4vG6cRH2DhkvWNHG6nN', 
                'productDeliveryInformation': 'extra information' }, 
            { 'productName': 'Denim Trouser', 
                'productColor': 'blue', 
                'productSize': 'Large', 
                'productQuantity': 5, 
                'productCost': '20', 
                'productImage': 'https://drive.google.com/uc?export=view&id=1ozS_QYosuRRkw4vG6cRH2DhkvWNHG6nN', 
                'productDeliveryInformation': 'extra information' }],
            status: <StatusBox status={'Pending to pickup'} />
        }

    ]);

    const searchId = async (id) => {
        const data = await dispatch(getOverviewDataById({ orderId: id }));
        // Set found row
        setTableRow([...prepareTableRows([data?.payload])]);
    };
    
    useEffect(() => {
        updateData(overviewSelector);
        const tableData = prepareTableRows(overviewSelector?.data?.pages);
        if (tableData && tableData?.length > 0) {
            setTableRow(tableData);
        }
    }, [overviewSelector]);

    const prepareTableRows = (orderArray) => {
        const tableData = orderArray?.map((data) => {
            // eslint-disable-next-line no-multi-spaces, max-len
            const amount =  data?.orderItems?.reduce((acc, current) => acc + (current?.productQuantity * current?.productCost), 0) || '';
            return {
                id: data?._id || '',
                client: `${data?.firstName} ${data?.lastName}` || '',
                amount: amount || '',
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
    const [selectedRow, setSelectedRow] = useState(null);
    const onRowClick = (row) => {
        setSelectedRow(row);
    };
    const handleRowClick = (row) => {
        setSelectedRow(row);
        onRowClick(row);
    };
    
    return (
        <>
            <br></br>
            {overviewSelector.isLoading && tableRow ? (
                <p>Loading...</p>
            ) : (
                <div className='overview'>
                    <div className='table'>
                        {selectedRow ? (
                            <><HistoryHeader searchFunction={searchId} />
                                <RowDetails row={selectedRow} headers={headers} tableRow={tableRow}/></>
                        ) : (
                            <><HeaderPerRow searchFunction={searchId} />
                                <Table rows={tableRow} headers={headers} onRowClick={handleRowClick} /></>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default React.memo(DeliveryOrder);
