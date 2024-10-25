/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable max-lines */
import { useCallback, useEffect, useState } from 'react';
import { Grid, Column } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import TextBoxCustom from '../common/TextBoxCustom';
import ShoppingBag from './ShoppingBag';
import ButtonCustom from '../common/ButtonCustom';
import StripeProvider from './Payment';

// SCSS
import '../../scss/component/checkout/confirm.scss';

// Images
import Emays from '../../logo/emays-logo-white.png';
import EditIcon from '../../icons/edit.svg';

// Util
import { getProductList, getSelectedLaunchArea } from '../../js/util/SessionStorageUtil';
import { useTranslation } from 'react-i18next';
import useSessionState from '../../js/util/useSessionState';
import { CHECKOUT_INFO, EMAIL_EDIT, SERVICE_FEE_PAYED } from '../../js/const/SessionStorageConst';
import { saveOrder, updateOrder } from '../../services/order';
import { useMessage } from '../common/messageCtx';
import { getUserData, getRetailerData } from '../../js/util/SessionStorageUtil';
import LoadingIndicator from '../LoadingIndicator';
import ContactNumberInput from '../common/ContactNumberInput';

const Confirm = () => {

    const [t] = useTranslation();
    const pushAlert = useMessage();
    const history = useNavigate();

    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [state, setState] = useSessionState(CHECKOUT_INFO);
    const [open, setOpen] = useState();
    const [isPaymentOpen, setPaymentOpen] = useState(false);
    const closeModal = () => {
        setPaymentOpen(false);
    };

    // Fetch product data from session storage
    useEffect(() => {
        const productData = getProductList()?.map((item) => {
            console.log(item);
            if (!item?.productColor) {
                item.productColor = 'Not available';
            }
            if (!item?.productSize) {
                item.productSize = 'Not available';
            }
            return item;
        });
        setProductData(productData);
    }, [state]);
    
    const submit = useCallback(async () => {
        try {
            setLoading(true);

            const commonData = {
                uid: getUserData().uid,
                retailerEmail: getRetailerData().retailerEmail,
                branchId: getRetailerData().branchId,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                orderItems: productData,
                serviceFee: state.serviceFee || 0,
                serviceArea: getSelectedLaunchArea(),
                currencyType: getRetailerData().currency
            };
            const { locked, options, ...rest } = state;
            const errors = [
                { k: 'firstName', l: t('confirm.contact-details.first-name') },
                { k: 'lastName', l: t('confirm.contact-details.last-name') },
                { k: 'phoneNumber', l: t('confirm.contact-details.phone-number') },
                { k: 'email', l: t('confirm.contact-details.email') }
            ].reduce(
                (acc, { k, l }) => (
                    state?.[k] && state?.[k] !== '' ? acc : { ...acc, [k]: `${l} is Required` }
                ), {}
            );
            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                return;
            }
            const order = { ...rest, ...commonData, experience: `${[
                options?.assist ? 'Assist Me' : undefined,
                options?.tailoring ? 'Tailoring' : undefined,
                options?.wait ? 'Contactless Delivery' : undefined,
                options?.inspire ? 'Inspire Me' : undefined
            ]?.filter(i => i).join(', ')}.` };
            if (state.launchType === EMAIL_EDIT) {
                await updateOrder(commonData.uid, order);
                pushAlert({
                    statusIconDescription: t('common.success'),
                    title: t('common.success'),
                    subtitle: t('confirm.success'),
                    kind: 'success'
                });
            } else {
                // Clean currency format to decimal if comma include
                for (let i = 0; i <= commonData?.orderItems?.length; i++) {
                    const itemPrice = commonData?.orderItems[i]?.productCost;
                    if (itemPrice && itemPrice?.includes(',')) {
                        const [wholeNumber, decimal] = itemPrice?.split(',');
                        const formattedAmount = `${wholeNumber}.${(decimal)}`;
                        commonData.orderItems[i].productCost = (+formattedAmount).toFixed(2);
                    } else if (itemPrice && itemPrice?.includes('.')) {
                        const [wholeNumber, decimal] = itemPrice?.split('.');
                        const formattedAmount = `${wholeNumber}.${(decimal)}`;
                        commonData.orderItems[i].productCost = (+formattedAmount).toFixed(2);
                    } else if (itemPrice) {
                        commonData.orderItems[i].productCost = `${itemPrice}.00`;
                    }
                }
                // Taking this try-catch if order is already saved, let it go to payment
                try {
                    await saveOrder({ ...rest, ...commonData, experience: `${[
                        options?.assist ? 'Assist Me' : undefined,
                        options?.tailoring ? 'Tailoring' : undefined,
                        options?.wait ? 'Contactless Delivery' : undefined,
                        options?.inspire ? 'Inspire Me' : undefined
                    ]?.filter(i => i).join(', ')}.` });
                } catch (error) {
                    if (error?.code !== 409) {
                        pushAlert({ statusIconDescription: t('common.error'), title: t('common.error'), subtitle: error.message });
                        return;
                    }
                }
                const paymentMethod = getRetailerData().paymentMethod;
                if (paymentMethod === 'CLIENT_HOUSE') {
                    pushAlert({
                        statusIconDescription: t('common.success'),
                        title: t('common.success'),
                        subtitle: t('common.success-message')
                    });
                } else {
                    // CHECK PAYMENT DONE HERE
                    setOpen(getUserData());
                    setPaymentOpen(true);
                }
            }
        } catch (e) {
            pushAlert({ statusIconDescription: t('common.error'), title: t('common.error'), subtitle: e.message });
        } finally {
            setLoading(false);
        }
    }, [state, productData]);

    return (
        <>
            {/* <Payment open={open} setOpen={setOpen} /> */}
            <StripeProvider open={open}
                serviceFee={state?.serviceFee} isPaymentOpen = {isPaymentOpen} setPaymentOpen = {closeModal} />
            <Grid className='landing-page'>
                <Column lg={16} md={16} sm={16} xs={16} className='logo'>
                    <div className='store-logo'></div>
                    <div className='emays-logo'>
                        <p>Powered by</p><img src={Emays} alt='The Emays logo' />
                    </div>
                </Column>
                {!loading ? (<Column lg={8} md={8} sm={4} xs={4} className='your-appointment'>
                    <div className='edit-appointment'>
                        <div className='text'>
                            <p>{t('confirm.edit-appointment.header')}</p>
                        </div>
                        <div className='edit-button'>
                            <div>
                                <img src={EditIcon} alt='edit icon' />
                            </div>
                            <div>
                                <a onClick={() => history(-1)}>{t('confirm.edit-appointment.edit-button')}</a>
                            </div>
                        </div>
                    </div>
                    <div className='user-appointment-info'>
                        <div className='date-time'>
                            <div className='date'>
                                <p><strong>{t('confirm.user-appointment-info.date')}</strong></p>
                                <div className='value'>
                                    <p>{new Date(state?.date)?.toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className='hour'>
                                <p><strong>{t('confirm.user-appointment-info.hour')}</strong></p>
                                <div className='value'>
                                    <p>{ `${state?.startTime} to ${state?.endTime}`}</p>
                                </div>
                            </div>
                        </div>
                        <div className='selected-experience'>
                            <p><strong>{t('confirm.user-appointment-info.selected-experience')}</strong></p>
                            <div className='value'>
                                {Object.entries(state?.options ?? {}).map(([key, value]) => {
                                    if (value) {
                                        return <span key={key}>{key.replace(/^\w/, c => c.toUpperCase())}, </span>;
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                        <div className='delivery-address'>
                            <p><strong>{t('confirm.user-appointment-info.delivery-address')}</strong></p>
                            <div className='value'>
                                <p>{[
                                    state?.address?.addOne,
                                    state?.address?.addTwo,
                                    state?.address?.addThree,
                                    state?.address?.addFour,
                                    state?.address?.addFive,
                                    state?.address?.addSix
                                ]?.filter(e => !!e).join(', ')}</p>
                            </div>
                            <br/>
                            <p><strong>{t('confirm.user-appointment-info.delivery-info')}</strong></p>
                            <div className='value'>
                                <p>{ state?.deliveryInfo ? state?.deliveryInfo : 'No comment added'}</p>
                            </div>
                        </div>
                    </div>
                    <div className='contact-details'>
                        <div className='text'>
                            <p>{t('confirm.contact-details.header')}</p>
                        </div>
                        <div className='info-text'>
                            <p>
                                <u><strong>{t('confirm.contact-details.info-text-important')}</strong></u>
                                &nbsp;{t('confirm.contact-details.info-text')}
                            </p>
                        </div>
                        <div className='user-contact-name'>
                            <div className='text-fields-contact'>
                                <TextBoxCustom
                                    placeholderText={t('confirm.contact-details.first-name')}
                                    customStyle={{ backgroundColor: 'white' }}
                                    onChange={(e) => {
                                        setState(cs => ({
                                            ...cs,
                                            firstName: e.target.value
                                        }));
                                    }}
                                    value={state?.firstName}
                                    autoComplete='given-name'
                                    invalidText={errors?.firstName}
                                />
                            </div>
                            <div className='text-fields-contact'>
                                <TextBoxCustom
                                    placeholderText={t('confirm.contact-details.last-name')}
                                    customStyle={{ backgroundColor: 'white' }}
                                    onChange={(e) => {
                                        setState(cs => ({
                                            ...cs,
                                            lastName: e.target.value
                                        }));
                                    }}
                                    value={state?.lastName}
                                    autoComplete='family-name'
                                    invalidText={errors?.lastName}
                                />
                            </div>
                        </div>
                        <div className='user-contact-email-number'>
                            <div className='text-fields-contact'>
                                <ContactNumberInput
                                    actionFunc= {(value) => { setState(cs => ({
                                        ...cs,
                                        phoneNumber: value
                                    })); }}
                                    data = {state?.phoneNumber || ''}
                                />
                                { errors?.phoneNumber && 
                                <span style={{ color: '#da1e28', fontSize: '12px', fontWeight: '400px' }}>Phone Number Required</span> }
                            </div>
                            <div className='text-fields-contact'>
                                <TextBoxCustom
                                    className='email'
                                    placeholderText={t('confirm.contact-details.email')}
                                    customStyle={{ backgroundColor: 'white' }}
                                    onChange={(e) => {
                                        setState(cs => ({
                                            ...cs,
                                            email: e.target.value
                                        }));
                                    }}
                                    value={state?.email}
                                    autoComplete='email'
                                    invalidText={errors?.email}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='submit-button'>
                        <ButtonCustom
                            text={t('confirm.submit-button')}
                            action={submit}
                            type={'secondary'}
                            customStyle={{
                                minWidth: '100%',
                                marginTop: '25px',
                                marginBottom: '15px',
                                alignContent: 'center',
                                justifyContent: 'center',
                                paddingLeft: '40px'
                            }}
                        />

                    </div>
                </Column>) : (<Column lg={8} md={8} sm={4} xs={4} className='loading-indicator'>
                    <LoadingIndicator description={t('confirm.loading-description')} />
                </Column>)}
                <Column lg={8} md={8} sm={4} xs={4} className='shopping-bag'>
                    <ShoppingBag productList={productData} serviceFee={state?.serviceFee}
                        currencyType = {getRetailerData().currency}/>
                </Column>
            </Grid>
        </>
    );

};

export default Confirm;
