import React, { useEffect, useState } from 'react';
import Counts from '../../components/counts';
import SearchComp from '../../components/searchComp';
import '../../../../scss/component/dashboard/history.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ButtonCustom from '../../../common/ButtonCustom';
import { useSelector } from 'react-redux';
import { statsSelectorMemoized } from '../../redux/selector/statsSelector';

const DOHeader = ({ searchFunction }) => {
    const history = useHistory();

    const selector = useSelector(statsSelectorMemoized);
    const [state, setState] = useState(null);

    useEffect(() => {
        if (!selector?.deliveryOrderStatsState?.isLoading) {
            setState(selector?.deliveryOrderStatsState?.data);
        }
    }, [selector?.deliveryOrderStatsState?.isLoading]);
    return (
        <>
            <div className='header-content'>
                <div className='grid-1'>
                    {/* <SearchComp searchButtonClick={searchFunction} /> */}
                    <ButtonCustom
                        text={'Create New Delivery +'}
                        action={() => { history.push('/dashboard/newOrders'); }}
                        type={'secondary'}
                        customStyle={{
                            minWidth: '24vw',
                            marginTop: '25px',
                            marginBottom: '15px',
                            alignContent: 'center',
                            justifyContent: 'center',
                            padding: '1%'
                        }}
                    />
                </div>
                {
                    state && 
                    <div className='grid-2'>
                        <Counts heading='Last 30 days' value={`${state?.lastThirtyDays || 0} Orders`} />
                        <Counts heading='Avg orders per day' value={(state?.average)?.toFixed(2) || 0} />
                        <Counts heading='Completed' value={state?.completed || 0} />
                        <Counts heading='Active Orders' value={state?.activeOrders || 0} />
                    </div>
                }
            </div>
        </>
    );
};

export default React.memo(DOHeader);
