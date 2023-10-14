import React from 'react';
import Counts from '../../components/counts';
import '../../../../scss/component/dashboard/overviewHeader.scss';

const OverviewHeader = ({ searchFunction }) => {
    return (
        <>
            <div className='header-content'>
                <div className='grid-2'>
                    <Counts heading='Total revenue this year' value={'€ 0'} />
                    <Counts heading='Total revenue this Month' value='€ 0' />
                    <Counts heading='Average ticket' value={'€ 0'} />
                    <Counts heading='No of orders this month' value={'0'} />
                </div>
            </div>
        </>
    );
};

export default React.memo(OverviewHeader);
