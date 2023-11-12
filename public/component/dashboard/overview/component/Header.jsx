import React, { useEffect, useState } from 'react';
import Counts from '../../components/counts';
import '../../../../scss/component/dashboard/overviewHeader.scss';
import { useDispatch, useSelector } from 'react-redux';
import { statsSelectorMemoized } from '../../redux/selector/statsSelector';
import DropDownCustom from '../../../common/DropdownCustom';
import { getOverviewStatsData } from '../../redux/thunk/overviewStatsThunk';
import CommonHead from '../../components/commonHead';

const OverviewHeader = ({ searchFunction }) => {

    const selector = useSelector(statsSelectorMemoized);
    const [state, setState] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!selector?.overviewStatsState?.isLoading) {
            setState(selector?.overviewStatsState?.data);
        }
    }, [selector?.overviewStatsState?.isLoading]);

    const reloadStats = (value) => {
        dispatch(getOverviewStatsData({ durationType: value }));
    };
    
    return (
        <>
            <CommonHead/>
            <div className='time-duration'>
                <DropDownCustom
                    key={1}
                    onChange={(e) => {
                        const duration = e.selectedItem?.id;
                        reloadStats(duration);
                    }}
                    items={['Three months a go',
                        'Six months a go',
                        'Year a go']?.map((value, k) => ({ id: (+k + 1), text: `${value}` }))}
                />
            </div>
            <div className='header-content'>
                {
                    state &&
                    <div className='grid-2'>
                        <Counts heading='Total revenue' value={`€ ${state?.totalRevenue}`} />
                        <Counts heading='Average ticket' value={(state?.average).toFixed(2) || 0} />
                        <Counts heading='No of orders' value={state?.noOfOrders} />
                    </div>
                }
            </div>
        </>
    );
};

export default React.memo(OverviewHeader);
