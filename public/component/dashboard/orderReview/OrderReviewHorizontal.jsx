import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Heading } from '@carbon/react';
import ShoppingItem from '../../checkout/ShoppingItemDashboard';
import moment from 'moment';

// SCSS
import '../../../scss/component/retailer/orderReviewHorizontal.scss';

const OrderReviewHorizontal = ({ basicInfo, itemsInfo, infoTitle, itemsTitle }) => {

    const [translate] = useTranslation();
    const t = useCallback((key) => translate(`dashboard.orderCreated.${key}`), [translate]);

    return (
        <div className='content-horizontal'>
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
                  quantity={item?.quantity}
                  price={item?.productCost} />)}
                </div>
            </div>
            <div className='appointment-info'>
                <Heading className='title'>{infoTitle}</Heading>
                <div className='date-time'>
                    <div className='field date'>
                        <label>{t('appointmentInfo.date')}</label>
                        <p>{moment(basicInfo?.date ?
                            basicInfo?.date?.split('T')[0] : basicInfo?.date).format('ddd DD, MMMM, YYYY')}</p>
                    </div>
                    <div className='field time'>
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
                    <p>€ {itemsInfo?.total}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderReviewHorizontal;
