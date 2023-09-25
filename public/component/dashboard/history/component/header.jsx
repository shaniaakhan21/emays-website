import React from 'react';
import Counts from '../../components/counts';
import SearchComp from '../../components/searchComp';
import '../../../../scss/component/dashboard/history.scss';

const HistoryHeader = () => {
    return (
        <>
            <div className='header-content'>
                <div className='grid-1'>
                    <SearchComp />
                </div>
                <div className='grid-2'>
                    <Counts heading='Last 30 days' value='383 Orders' />
                    <Counts heading='Avg Days' value={6} />
                    <Counts heading='Completed' value={682} />
                </div>
            </div>
        </>
    );
};

export default React.memo(HistoryHeader);
