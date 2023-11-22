import React, { useEffect, useState } from 'react';
import SearchComp from '../../components/searchComp';
import '../../../../scss/component/dashboard/history.scss';
import { useSelector } from 'react-redux';
import { statsSelectorMemoized } from '../../redux/selector/statsSelector';
import Counts from '../../components/counts';

const HistoryHeader = ({ searchFunction }) => {

    const selector = useSelector(statsSelectorMemoized);
    const [state, setState] = useState(null);

    useEffect(() => {
        if (!selector?.historyStatsState?.isLoading) {
            setState(selector?.historyStatsState?.data);
        }
    }, [selector?.historyStatsState?.isLoading]);

    return (
        <>
            {
                (state) && 
            <div className='header-content'>
                <div className='grid-1'>
                    <SearchComp searchButtonClick={searchFunction} />
                </div>
                <div className='grid-2'>
                    <Counts heading='Last 30 days' 
                        value={`${state?.lastThirtyDays || 0} Orders`} />
                    <Counts heading='Avg orders per day' 
                        value={(state?.average)?.toFixed(2) || 0} />
                    <Counts heading='Completed' 
                        value={state?.completed || 0} />
                </div>
            </div>
            }
        </>
    );
};

export default React.memo(HistoryHeader);
