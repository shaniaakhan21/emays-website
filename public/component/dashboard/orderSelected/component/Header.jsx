import React from 'react';
import Counts from '../../components/counts';
import SearchComp from '../../components/searchComp';
import '../../../../scss/component/dashboard/history.scss';

const OrderSelectedHeader = ({ searchFunction, headerComponents }) => {
    return (
        <>
            <div className='header-content'>
                <div className='grid-1'>
                    <SearchComp searchButtonClick={searchFunction} />
                </div>
                <div className='grid-2'>
                    {
                        headerComponents
                    }
                </div>
            </div>
        </>
    );
};

export default React.memo(OrderSelectedHeader);
