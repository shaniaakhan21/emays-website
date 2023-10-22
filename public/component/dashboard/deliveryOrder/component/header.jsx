import React from 'react';
import Counts from '../../components/counts';
import SearchComp from '../../components/searchComp';
import '../../../../scss/component/dashboard/history.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ButtonCustom from '../../../common/ButtonCustom';
import CommonHead from '../../components/commonHead';

const DOHeader = ({ searchFunction }) => {
    const history = useHistory();
    return (
        <>
            <CommonHead/>
            <div className='header-content'>
                <div className='grid-2'>
                    <Counts heading='Pick up time' value='02/07/23 - 10:00 AM' showCalendarIcon={true} />
                    <Counts heading='Total Order' value='€ 50.00' showCalendarIcon={false}/>
                </div>
            </div>
        </>
    );
};

export default React.memo(DOHeader);
