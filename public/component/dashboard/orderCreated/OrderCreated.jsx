import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Heading, TextArea } from '@carbon/react';
import { Printer } from '@carbon/icons-react';

// SCSS
import '../../../scss/component/retailer/orderCreated.scss';
import ButtonCustom from '../../common/ButtonCustom';
import ShoppingItem from '../../checkout/ShoppingItem';
import FallBack from '../../../icons/fallback.png';

const OrderCreated = () => {
    const [translate] = useTranslation();

    const t = useCallback((key) => translate(`dashboard.orderCreated.${key}`), [translate]);

    return (
        <div className='orderCreated'>
            <div className='header'>
                <Heading className='title'>{t('title')}</Heading>
                <Heading className='sub-title'>{t('sub-title')}</Heading>
            </div>
            <div className='content'>
                <div className='appointment-info'>
                    <Heading className='title'>{t('appointmentInfo.title')}</Heading>
                    <div className='date-time'>
                        <div className='field'>
                            <label>{t('appointmentInfo.date')}</label>
                            <p>Wed 27, February 2023</p>
                        </div>
                        <div className='field'>
                            <label>{t('appointmentInfo.hour')}</label>
                            <p>14:00 to 15:00</p>
                        </div>
                    </div>
                    <div className='field'>
                        <label>{t('appointmentInfo.address')}</label>
                        <p>Sample Address, Milano, Italia 06830</p>
                    </div>
                    <div className='field'>
                        <label>{t('appointmentInfo.name')}</label>
                        <p>Sample Name Coll iabichino</p>
                    </div>
                    <div className='field'>
                        <label>{t('appointmentInfo.email')}</label>
                        <p>Sample@email.com</p>
                    </div>
                    <div className='field'>
                        <label>{t('appointmentInfo.tel')}</label>
                        <p>+39 000 000 00</p>
                    </div>
                </div>
                <div className='items-to-deliver'>
                    <Heading className='title'>
                        {t('items.title')}
                    </Heading>
                    <div className='list'>
                        {Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9).map((item, index) => <ShoppingItem
                            index={1}
                            itemName={'productName'}
                            image={FallBack}
                            color={'Red'}
                            size={'40'}
                            quantity={1} />)}
                    </div>
                    <Button>{t('items.button')}</Button>
                </div>
                <div className='comments'>
                    <TextArea placeholder={t('comments.input-placeholder')} labelText={t('comments.input-label')} />
                    <Printer />
                </div>
            </div>
        </div>
    );
};

export default React.memo(OrderCreated);
