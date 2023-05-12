import React from 'react';

// SCSS
import './../../../scss/component/retailer/overview.scss';
import Table from '../../common/table';
import StatusBox from '../../common/statusBox';
import FallBack from '../../../icons/fallback.png';
import ShoppingItem from '../../checkout/ShoppingItem';

const headers = [
    {
        key: 'id',
        header: '# Order'
    },
    {
        key: 'client',
        header: 'Client'
    },
    {
        key: 'amount',
        header: 'Amount Purchased'
    },
    {
        key: 'date',
        header: 'Pick Up Date'
    },
    {
        key: 'time',
        header: 'Time'
    },
    {
        key: 'status',
        header: 'Status'
    }
];

const Overview = () => {

    const rows = [
        {
            id: 'CH0001',
            client: 'Gertrude Pest',
            amount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            status: <StatusBox status={'Pending to pick up'}/>
        }
    ];

    return (
        <div className='overview'>
            <div className='table'>
                <Table rows={rows} headers={headers}/>
            </div>
            <div className='toBeDelivered'>
                <h2 className='title'>Items To be delivered</h2>
                <div className='items'>
                    {Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9).map((item, index) => <ShoppingItem
                        index={1}
                        itemName={'productName'}
                        image={FallBack}
                        color={'Red'}
                        size={'40'}
                        quantity={1} />)}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Overview);
