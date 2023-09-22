import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ShoppingItem from '../../checkout/ShoppingItem';
import StatusBox from '../../common/statusBox';

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

    const [tableRow, setTableRow] = useState([{
        id: '',
        client: '',
        amount: '',
        date: '',
        time: '',
        status: <StatusBox status={'Pending to pickup'}/>
    }]);
    
    useEffect(() => {
        updateData(overviewSelector);
    }, [overviewSelector]);

    const headers = useMemo(
        () => ['id', 'client', 'amount', 'date', 'time', 'status'].map(key => ({ key, header: t(`table.${key}`) })
        ), [t]);

    return (
        <>
            {
                overviewSelector.isLoading && tableRow ? <p>Loading...</p> : <div className='overview'>
                    <div className='table'>
                        <Table rows={tableRow} headers={headers} />
                    </div>
                    <div className='toBeDelivered'>
                        <h2 className='title'>{t('toBeDelivered-title')}</h2>
                        <div className='items'>
                            {overviewSelector?.overviewState?.data?.pages?.map((item, index) => <ShoppingItem
                                index={1}
                                itemName={'productName'}
                                image={FallBack}
                                color={'Red'}
                                size={'40'}
                                quantity={1} />)}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default React.memo(Overview);
