import React, { useEffect, useState } from 'react';
import Counts from '../../components/counts';
import '../../../../scss/component/dashboard/overviewHeader.scss';
import { useDispatch, useSelector } from 'react-redux';
import { statsSelectorMemoized } from '../../redux/selector/statsSelector';
import DropDownCustom from '../../../common/DropdownCustom';
import { getOverviewStatsData } from '../../redux/thunk/overviewStatsThunk';

const OverviewHeader = ({ searchFunction }) => {

    const selector = useSelector(statsSelectorMemoized);
    const [state, setState] = useState(null);
    const [type, setType] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!selector?.overviewStatsState?.isLoading) {
            setState(selector?.overviewStatsState?.data);
        }
    }, [selector?.overviewStatsState?.isLoading]);

    const reloadStats = (value) => {
        dispatch(getOverviewStatsData({ durationType: value }));
    };

    const getRevSuffix = (type) => {
        switch (type) {
            case 1: 
                return 'this Month';
            case 2:
                return 'past Month';
            case 3: 
                return 'last 90 Days';
            case 4:
                return 'all Time';
            default:
                return 'this Month';
        }
    };
    
    return (
        <>
            <div className='time-duration'>
                <DropDownCustom
                    key={1}
                    onChange={(e) => {
                        const duration = e.selectedItem?.id;
                        setType(duration);
                        reloadStats(duration);
                    }}
                    items={['Current Month', 'Past Month',
                        'Last 90 Days',
                        'All Time']?.map((value, k) => ({ id: (+k + 1), text: `${value}` }))}
                />
            </div>
            <div className='header-content'>
                {
                    state &&
                    <div className='grid-2'>
                        <Counts heading='No. orders' value={state?.noOfOrders} />
                        <Counts heading='Average ticket' value={`€ ${(state?.average).toFixed(2)}`} />
                        <Counts heading={`Total revenue ${getRevSuffix(type)}`} 
                            value={`€ ${(state?.totalRevenue).toFixed(2)}`} />
                    </div>
                }
            </div>
        </>
    );
};

export default React.memo(OverviewHeader);
