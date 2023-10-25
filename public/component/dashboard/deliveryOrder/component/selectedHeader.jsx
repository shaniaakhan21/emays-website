import React, { useEffect, useState } from 'react';
import '../../../../scss/component/dashboard/historySelectedHeader.scss';
import { useSelector } from 'react-redux';
import { statsSelectorMemoized } from '../../redux/selector/statsSelector';
import { Tile } from '@carbon/react';
import moment from 'moment';

const DOSelectedOrderHeader = ({ data }) => {

    const [dateTime, setDateTime] = useState('');

    useEffect(() => {
        const dateArray = data[0]?.date?.split('-');
        const time = moment(data[0]?.time, 'HH:mm').format('hh:mm A');
        const preparedDate = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]} - ${time}`;
        setDateTime(preparedDate);
    }, []);

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
                </div>
                {
                    state && 
                    <div className='grid-2'>
                        <Tile className='banner-three'>
                            <div>
                                <h5 className='main-header'>Delivery time</h5>
                            </div>
                            <div>
                                <h3 className='value'>{dateTime}</h3>
                            </div>
                        </Tile>

                        <Tile className='banner-two'>
                            <div>
                                <h5 className='main-header'>Order Total</h5>
                            </div>
                            <div>
                                <h3 className='value'>{data[0]?.amount}</h3>
                            </div>
                        </Tile>

                        <Tile className='banner-one'>
                            <h5>New Customer!</h5>
                        </Tile>
                    </div>
                }
            </div>
        </>
    );
};

export default React.memo(DOSelectedOrderHeader);
