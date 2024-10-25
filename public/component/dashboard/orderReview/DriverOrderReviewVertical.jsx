import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Heading } from '@carbon/react';
import { useDispatch, useSelector } from 'react-redux';
import { driverSelectedOrderSelectorMemoized } from '../redux/selector/driverSelectedOrderSelector';
import ButtonCustom from '../../common/ButtonCustom';
import { changeStatusSelectedOrder } from '../redux/thunk/driverSelectedOrderThunk';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../common/messageCtx';
import { loginSelectorMemoized } from '../redux/selector/loginSelector';

// SCSS
import '../../../scss/component/retailer/driverOrderReviewVertical.scss';
import { getCurrencySign } from '../../../js/util/currencyUtil';

const DriverOrderReviewVertical = ({ basicInfo, itemsInfo, infoTitle, itemsTitle }) => {

    const history = useNavigate();
    const pushAlert = useMessage();
    const [translate] = useTranslation();
    const dispatch = useDispatch();
    const [m] = useTranslation();
    const t = useCallback((key) => translate(`dashboard.orderCreated.${key}`), [translate]);
    const selectedOrderSelector = useSelector(driverSelectedOrderSelectorMemoized);
    const currencySign = getCurrencySign(selectedOrderSelector?.orderInfo?.basicInfo?.currencyType);
    const loggedInUser = useSelector(loginSelectorMemoized);
    const systemInfo = selectedOrderSelector?.storeInfo;
    const orderInfo = selectedOrderSelector?.orderInfo;
    const adminInfo = selectedOrderSelector?.adminInfo;

    const changeStatus = useCallback(() => {
        return dispatch(changeStatusSelectedOrder({ orderId: orderInfo?.basicInfo?._id,
            patchData: {
                driverId: loggedInUser?.userInfo?.id,
                isDriverApproved: true 
            } }));
    });

    return (
        <div className='content-vertical'>
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
                    <p>{currencySign} {itemsInfo?.total}</p>
                </div>
            </div>
            <div className='store-info'>
                <Heading className='title'></Heading>
                <div className='field'>
                    <label>{t('appointmentInfo.storeAddress')}</label>
                    <p>{`${systemInfo?.extSysAddress?.addOne}, ${systemInfo?.extSysAddress?.addTwo}, 
                    ${systemInfo?.extSysAddress?.addThree}`}</p>
                </div>
                <div className='field'>
                    <label>{t('appointmentInfo.storeName')}</label>
                    <p>{`${systemInfo?.extSysName}`}</p>
                </div>
                <div className='field'>
                    <label>{t('appointmentInfo.storeSalesAssistant')}</label>
                    <p>{`${adminInfo[0]?.adminFirstName} ${adminInfo[0]?.adminLastName}`}</p>
                </div>
                <div className='field'>
                    <label>{t('appointmentInfo.storePhone')}</label>
                    <p>{`${systemInfo?.fiscalInfo?.fiscalNumber}`}</p>
                </div>
                <div className='field'>
                    <label>{t('appointmentInfo.quantityItems')}</label>
                    <p>{`${itemsInfo?.items?.reduce((acc, currentVal) => acc + currentVal?.quantity, 0)} items`}</p>
                </div>
                <ButtonCustom
                    text={'Mark on my way'}
                    action={async () => {
                        const result = await changeStatus();
                        if (result?.payload?.patchedStatus) {
                            pushAlert({
                                kind: 'success',
                                title: m('statusMessage.success'),
                                subtitle: m('statusMessage.message.success-update')
                            });
                            history('/');
                        }
                    }}
                    customStyle={{
                        width: '180px',
                        marginTop: '25px',
                        marginBottom: '15px',
                        padding: '1%',
                        color: 'white'
                    }}
                />
            </div>
        </div>
    );
};

export default DriverOrderReviewVertical;
