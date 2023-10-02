import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Heading, TextArea } from '@carbon/react';
import { Printer } from '@carbon/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { newOrderPhaseOneSelectorMemoized } from '../redux/selector/newOrderSelector';
import { newOrderPhaseTwoSelectorMemoized } from '../redux/selector/newOrderSelector';

// SCSS
import '../../../scss/component/retailer/orderCreated.scss';
import ButtonCustom from '../../common/ButtonCustom';
import ShoppingItem from '../../checkout/ShoppingItem';

const OrderCreated = () => {
    const [translate] = useTranslation();
    const t = useCallback((key) => translate(`dashboard.orderCreated.${key}`), [translate]);

    const dispatch = useDispatch();
    const newOrderPhaseOneSelector = useSelector(newOrderPhaseOneSelectorMemoized);
    const newOrderPhaseTwoSelector = useSelector(newOrderPhaseTwoSelectorMemoized);

    useEffect(() => {
        console.log('PhaseOne', newOrderPhaseOneSelector);
        console.log('PhaseTwo', newOrderPhaseTwoSelector);
    }, [newOrderPhaseOneSelector, newOrderPhaseTwoSelector]);

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
                            <p>{newOrderPhaseOneSelector?.date}</p>
                        </div>
                        <div className='field'>
                            <label>{t('appointmentInfo.hour')}</label>
                            <p>{`${newOrderPhaseOneSelector?.startTime}-${newOrderPhaseOneSelector?.endTime}`}</p>
                        </div>
                    </div>
                    <div className='field'>
                        <label>{t('appointmentInfo.address')}</label>
                        <p>{`${newOrderPhaseOneSelector?.address?.addOne}, 
                         ${newOrderPhaseOneSelector?.address?.addTwo}, 
                         ${newOrderPhaseOneSelector?.address?.addThree}, 
                         ${newOrderPhaseOneSelector?.address?.addFour}`}</p>
                    </div>
                    <div className='field'>
                        <label>{t('appointmentInfo.name')}</label>
                        <p>{`${newOrderPhaseOneSelector?.firstName} ${newOrderPhaseOneSelector?.lastName}`}</p>
                    </div>
                    <div className='field'>
                        <label>{t('appointmentInfo.email')}</label>
                        <p>{newOrderPhaseOneSelector?.email}</p>
                    </div>
                    <div className='field'>
                        <label>{t('appointmentInfo.tel')}</label>
                        <p>{newOrderPhaseOneSelector?.phoneNumber}</p>
                    </div>
                </div>
                <div className='items-to-deliver'>
                    <Heading className='title'>
                        {t('items.title')}
                    </Heading>
                    <div className='list'>
                        {newOrderPhaseTwoSelector?.items &&
                         newOrderPhaseTwoSelector?.items?.length > 0 &&
                          newOrderPhaseTwoSelector?.items?.map((item, index) => <ShoppingItem
                              index={index}
                              itemName={item?.itemName}
                              image={item?.image}
                              color={item?.color}
                              size={item?.size}
                              quantity={item?.quantity} />)}
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
