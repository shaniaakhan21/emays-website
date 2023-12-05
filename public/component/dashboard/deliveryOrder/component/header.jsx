import React, { useEffect, useState } from 'react';
import Counts from '../../components/counts';
import '../../../../scss/component/dashboard/deliveryOrderHeader.scss';
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
                    <div className='button'>
                        <ButtonCustom
                            text={'Create New delivery Order +'}
                            action={() => { history.push('/dashboard/newOrders'); }}
                            type={'secondary'}
                            customStyle={{
                                minWidth: '250px',
                                alignContent: 'center',
                                justifyContent: 'center',
                                minHeight: '118px',
                                padding: '1%',
                                marginRight: '33px'
                            }}
                        />
                    </div>
                    {
                        state && 
                    <>
                        <Counts heading='Active Orders' value={state?.activeOrders || 0} />
                        <Counts heading='Orders Completed' value={state?.completed || 0} />
                        <Counts heading='Avg. orders per day' value={(state?.average)?.toFixed(2) || 0} />
                        <Counts heading='Last 30 days' value={`${state?.lastThirtyDays || 0} Orders`} />
                    </>
                    }
                </div>
                
            </div>
        </>
    );
};

export default React.memo(DOHeader);
