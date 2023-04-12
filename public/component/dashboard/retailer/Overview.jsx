import React from 'react';
import TotalRevenueCard from './RevenueCard';
import '../../../scss/component/dashboard/retailer/overview.scss';
import OrderTable from './OrderTable';
import { useTranslation } from 'react-i18next';
import NewOrderAlert from './NewOrderAlert';

const Overview = () => {
    const { t } = useTranslation();
    const orders = [
        {
            order: 'CH0001',
            client: 'Gertrude Pest',
            purchasedamount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            status: 'Payment completed'
        },
        {
            order: 'CH0002',
            client: 'Gertrude Pest',
            purchasedamount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            status: 'Pending to pick up'
        },
        {
            order: 'CH0003',
            client: 'Gertrude Pest',
            purchasedamount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            status: 'Items to be returned'
        },
        {
            order: 'CH0004',
            client: 'Gertrude Pest',
            purchasedamount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            status: 'On Delivery'
        },
        {
            order: 'CH0002',
            client: 'Gertrude Pest',
            purchasedamount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            status: 'Pending to pick up'
        },
        {
            order: 'CH0003',
            client: 'Gertrude Pest',
            purchasedamount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            status: 'Items to be returned'
        },
        {
            order: 'CH0004',
            client: 'Gertrude Pest',
            purchasedamount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            status: 'On Delivery'
        },
        {
            order: 'CH0001',
            client: 'Gertrude Pest',
            purchasedamount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            status: 'Payment completed'
        },
        {
            order: 'CH0002',
            client: 'Gertrude Pest',
            purchasedamount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            status: 'Pending to pick up'
        },
        {
            order: 'CH0003',
            client: 'Gertrude Pest',
            purchasedamount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            status: 'Items to be returned'
        },
        {
            order: 'CH0004',
            client: 'Gertrude Pest',
            purchasedamount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            status: 'On Delivery'
        },
        {
            order: 'CH0002',
            client: 'Gertrude Pest',
            purchasedamount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            status: 'Pending to pick up'
        },
        {
            order: 'CH0003',
            client: 'Gertrude Pest',
            purchasedamount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            status: 'Items to be returned'
        },
        {
            order: 'CH0004',
            client: 'Gertrude Pest',
            purchasedamount: '€ 50,00',
            date: '07-02.2023',
            time: '10:00 am',
            status: 'On Delivery'
        }
    ];
  
    return (
        <>  <NewOrderAlert />
            <NewOrderAlert />
            <div className='main-div-config'>
                {[0, 1, 2, 3].map((index) => (
                    <TotalRevenueCard
                        key={index}
                        title={t('dashboard.revenue-card.data.' + index + '.title')}
                        value={t('dashboard.revenue-card.data.' + index + '.value')}
                    />
                ))}
            </div>
            <OrderTable data={orders} />
        </>
    );
};

export default Overview;
