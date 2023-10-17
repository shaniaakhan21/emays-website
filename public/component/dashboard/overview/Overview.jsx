import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ShoppingItem from '../../checkout/ShoppingItem';
import StatusBox from '../../common/statusBox';
import OverviewHeader from './component/Header';

// SCSS
import './../../../scss/component/retailer/overview.scss';
import Table from '../../common/table';
import FallBack from '../../../icons/fallback.png';
import { useSelector } from 'react-redux';
import { overviewSelectorMemoized } from '../redux/selector/overviewSelector';

const Overview = ({ overviewData, updateData }) => {

    const [translate] = useTranslation();
    const t = useCallback((str) => translate(`dashboard.overview.${str}`), [translate]);

    const overviewSelector = useSelector(overviewSelectorMemoized);
    const [selectedRow, setSelectedRow] = useState(null);

    const [tableRow, setTableRow] = useState([{
        id: '#CH0001',
        client: 'GANCINI WATCH',
        amount: '50,00',
        date: '07-02-2023',
        time: '10:00 AM',
        status: <StatusBox status={'Pending to pickup'}/>
    }]);
    
    useEffect(() => {
        updateData(overviewSelector);
        const tableData = overviewSelector?.data?.pages?.map((data) => {
        // eslint-disable-next-line no-multi-spaces, max-len
            const amount =  data?.orderItems?.reduce((acc, current) => acc + (current?.productQuantity * current?.productCost), 0) || '';
            return {
                id: data?._id || '#CH0001',
                client: `${data?.firstName} ${data?.lastName}` || 'GANCINI WATCH',
                amount: amount || '50,00',
                date: data?.date || '07-02-2023',
                time: data?.createdAt || '10:00 AM',
                orderItems: data?.orderItems,
                status: <StatusBox status={'Pending to pickup'}/>
            };
        });
        if (tableData && tableData?.length > 0) {
            setTableRow(tableData);
        }
    }, [overviewSelector]);

    const headers = useMemo(
        () => ['id', 'client', 'amount', 'date', 'time', 'status'].map(key => ({ key, header: t(`table.${key}`) })
        ), [t]);

    return (
        <>
            <OverviewHeader />
        </>
    );
};

export default React.memo(Overview);
