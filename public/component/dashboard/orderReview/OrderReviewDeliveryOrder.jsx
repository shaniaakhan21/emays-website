import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Heading } from '@carbon/react';
import ShoppingItem from '../../checkout/ShoppingItemDashboard';

// SCSS
import '../../../scss/component/retailer/orderReviewDeliveryOrder.scss';

const OrderReviewDeliveryOrder = ({ basicInfo, itemsInfo, infoTitle, itemsTitle }) => {

    const [translate] = useTranslation();
    const t = useCallback((key) => translate(`dashboard.orderCreated.${key}`), [translate]);

    return (
        <div className='content'>
            <div className='appointment-info'>
                <Heading className='title'>{infoTitle}</Heading>
                <div className='date-time'>
                    <div className='field'>
                        <label>{t('appointmentInfo.date')}</label>
                        <p>{basicInfo?.date ? basicInfo?.date?.split('T')[0] : basicInfo?.date}</p>
                    </div>
                    <div className='field'>
                        <label>{t('appointmentInfo.hour')}</label>
                        <p>{`${basicInfo?.startTime}-${basicInfo?.endTime}`}</p>
                    </div>
                </div>
                <div className='field'>
                    <label>{t('appointmentInfo.address')}</label>
                    <p>{`${basicInfo?.address?.addOne}, 
             ${basicInfo?.address?.addTwo}, 
             ${basicInfo?.address?.addThree}, 
             ${basicInfo?.address?.addFour}`}</p>
                </div>
                <div className='field'>
                    <label>{t('appointmentInfo.name')}</label>
                    <p>{`${basicInfo?.firstName} ${basicInfo?.lastName}`}</p>
                </div>
                <div className='field'>
                    <label>{t('appointmentInfo.email')}</label>
                    <p>{basicInfo?.email}</p>
                </div>
                <div className='field'>
                    <label>{t('appointmentInfo.tel')}</label>
                    <p>{basicInfo?.phoneNumber}</p>
                </div>
                <div className='field'>
                    <label>{t('appointmentInfo.comment')}</label>
                    <p>{basicInfo?.deliveryInfo}</p>
                </div>
                <div className='field'>
                    <label>{t('appointmentInfo.total')}</label>
                    <p>{itemsInfo?.total}</p>
                </div>
            </div>
            <div className='items-to-deliver'>
                <Heading className='title'>
                    {itemsTitle}
                </Heading>
                <div className='list'>
                    {itemsInfo?.items &&
             itemsInfo?.items?.length > 0 &&
              itemsInfo?.items?.map((item, index) => <ShoppingItem
                  index={index}
                  itemName={item?.itemName}
                  image={item?.image}
                  color={item?.color}
                  size={item?.size}
                  quantity={item?.quantity} />)}
                </div>
            </div>
        </div>
    );
};

export default OrderReviewDeliveryOrder;
