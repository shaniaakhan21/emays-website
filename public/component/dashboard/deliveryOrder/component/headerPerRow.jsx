import React from 'react';
import Counts from '../../components/counts';
import SearchComp from '../../components/searchComp';
import '../../../../scss/component/dashboard/history.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ButtonCustom from '../../../common/ButtonCustom';
import CommonHead from '../../components/commonHead';

const HeaderPerRow = ({ searchFunction }) => {
    const history = useHistory();
    return (
        <>
            <CommonHead/>
            <div className='header-content'>
                <div className='grid-1'>
                    {/* <SearchComp searchButtonClick={searchFunction} /> */}
                    <ButtonCustom
                        text={'Create New Delivery +'}
                        action={() => { history.push('/dashboard/newOrders'); }}
                        type={'secondary'}
                        customStyle={{
                            minWidth: '24vw',
                            marginTop: '25px',
                            marginBottom: '15px',
                            alignContent: 'center',
                            justifyContent: 'center',
                            padding: '1%'
                        }}
                    />
                </div>
                <div className='grid-2'>
                    <Counts heading='Last 30 days' value='0 Orders' />
                    <Counts heading='Avg Days' value={0} />
                    <Counts heading='Completed' value={0} />
                    <Counts heading='Active Orders' value={0} />
                </div>
            </div>
        </>
    );
};

export default React.memo(HeaderPerRow);
