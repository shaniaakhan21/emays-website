import React, { useEffect, useState } from 'react';
import '../../../../scss/component/dashboard/selectedHeader.scss';
import { useSelector } from 'react-redux';
import { Tile } from '@carbon/react';
import moment from 'moment';
import { selectedOrderSelectorMemoized } from '../../redux/selector/selectedOrderSelector';
import { appInfoSelectorMemoized } from '../../redux/selector/appInfoSelector';
import { getCurrencySign } from '../../../../js/util/currencyUtil';

const DOSelectedOrderHeader = ({ data }) => {

    const [dateTime, setDateTime] = useState('');
    const [amountState, setAmount] = useState('');
    const appInfoSelector = useSelector(appInfoSelectorMemoized);
    const currencySign = getCurrencySign(appInfoSelector?.systemInfoState?.data?.fiscalInfo?.currencyType);

    useEffect(() => {
        const dateArray = data[0]?.date?.split('-');
        const time = moment(data[0]?.time, 'HH:mm').format('hh:mm A');
        const preparedDate = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]} - ${time}`;
        setDateTime(preparedDate);

        const amount = selector?.data?.itemsInfo?.total;
        let amountWithComma;
        if (amount && amount.toString().includes('.')) {
            amountWithComma = `${amount?.toString()?.split('.')[0]},${amount?.toString()?.split('.')[1]}`;
        } else {
            amountWithComma = `${amount},00`;
        }
        setAmount(amountWithComma);
    }, []);

    const selector = useSelector(selectedOrderSelectorMemoized);

    useEffect(() => {
    }, [selector?.isLoading]);
    return (
        <>
            <div className='header-content-selected'>
                {
                    !selector?.isLoading && 
                    <div className='grid-2'>
                        <Tile className='banner-one'>
                            <h5>New Customer!</h5>
                        </Tile>

                        <Tile className='banner-two'>
                            <div>
                                <h5 className='main-header'>Total Order</h5>
                            </div>
                            <div>
                                <h3 className='value'>{currencySign} {amountState}</h3>
                            </div>
                        </Tile>

                        <Tile className='banner-three'>
                            <div>
                                <h5 className='main-header'>Appointment Time & Date</h5>
                            </div>
                            <div>
                                <h3 className='value'>{dateTime}</h3>
                            </div>
                        </Tile>
                    </div>
                }
            </div>
        </>
    );
};

export default React.memo(DOSelectedOrderHeader);
