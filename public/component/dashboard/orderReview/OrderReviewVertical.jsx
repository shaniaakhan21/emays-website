import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Heading } from '@carbon/react';
import ShoppingItem from '../../checkout/ShoppingItemDashboard';
import moment from 'moment';

// SCSS
import '../../../scss/component/retailer/orderReviewVertical.scss';
import { useSelector } from 'react-redux';
import { appInfoSelectorMemoized } from '../redux/selector/appInfoSelector';
import { getCurrencySign } from '../../../js/util/currencyUtil';

const OrderReviewVertical = ({ basicInfo, itemsInfo, infoTitle, itemsTitle }) => {

    const [translate] = useTranslation();
    const t = useCallback((key) => translate(`dashboard.orderCreated.${key}`), [translate]);
    const appInfoSelector = useSelector(appInfoSelectorMemoized);
    const currencySign = getCurrencySign(appInfoSelector?.systemInfoState?.data?.fiscalInfo?.currencyType);

    return (
        <div className='content-vertical'>
            <div className='appointment-info'>
                <Heading className='title'>{infoTitle}</Heading>
                <div className='date-time'>
                    <div className='field'>
                        <label>{t('appointmentInfo.date')}</label>
                        <p>{basicInfo?.date ? 
                            moment(basicInfo?.date?.split('T')[0]).format('ddd DD, MMMM, YYYY') ||
                             '' : basicInfo?.date}</p>
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
                    <p>{currencySign} {itemsInfo?.total}</p>
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
                  quantity={item?.quantity || 1}
                  price={`${item?.price}`}/>)}
                </div>
            </div>
        </div>
    );
};

export default OrderReviewVertical;
