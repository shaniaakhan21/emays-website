import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getOverviewData } from '../redux/thunk/overviewThunk';
import ShoppingItem from '../../checkout/ShoppingItem';
import { loginSelector } from '../redux/selector/loginSelector';

// SCSS
import './../../../scss/component/retailer/overview.scss';
import Table from '../../common/table';
import StatusBox from '../../common/statusBox';
import FallBack from '../../../icons/fallback.png';

const Overview = () => {

    const [translate] = useTranslation();
    const dispatch = useDispatch();
    const loginDataSelector = useSelector(loginSelector);

    useEffect(() => {
        const data = { dispatch: dispatch, loginSelector: loginDataSelector, pageNumber: 1, pageLimit: 2 };
        dispatch(getOverviewData(data));
    }, []);

    const t = useCallback((str) => translate(`dashboard.overview.${str}`), [translate]);

    const rows = [
        {
            id: 'CH0001',
            client: 'Gertrude Pest',
            amount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            status: <StatusBox status={'Pending to pick up'}/>
        }
    ];

    const headers = useMemo(
        () => ['id', 'client', 'amount', 'date', 'time', 'status'].map(key => ({ key, header: t(`table.${key}`) })
        ), [t]);

    return (
        <div className='overview'>
            <div className='table'>
                <Table rows={rows} headers={headers} />
            </div>
            <div className='toBeDelivered'>
                <h2 className='title'>{t('toBeDelivered-title')}</h2>
                <div className='items'>
                    {Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9).map((item, index) => <ShoppingItem
                        index={1}
                        itemName={'productName'}
                        image={FallBack}
                        color={'Red'}
                        size={'40'}
                        quantity={1} />)}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Overview);
