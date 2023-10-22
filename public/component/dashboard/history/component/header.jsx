import React from 'react';
import Counts from '../../components/counts';
import SearchComp from '../../components/searchComp';
import '../../../../scss/component/dashboard/history.scss';
import CommonHead from '../../components/commonHead';

const HistoryHeader = ({ searchFunction }) => {
    return (
        <>
            <CommonHead/>
            <div className='header-content'>
                <div className='grid-1'>
                    <SearchComp searchButtonClick={searchFunction} />
                </div>
                <div className='grid-2'>
                    <Counts heading='Last 30 days' value='0 Orders' />
                    <Counts heading='Avg Days' value={0} />
                    <Counts heading='Completed' value={0} />
                </div>
            </div>
        </>
    );
};

export default React.memo(HistoryHeader);
