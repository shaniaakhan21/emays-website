import { useCallback, useEffect, useState } from 'react';
import { Grid, Column, InlineLoading } from '@carbon/react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TextBoxCustom from '../common/TextBoxCustom';
import ShoppingBag from './ShoppingBag';
import ButtonCustom from '../common/ButtonCustom';
import Payment from './Payment';

// SCSS
import '../../scss/component/checkout/confirm.scss';

// Images
import Emays from '../../logo/emays-logo-white.png';
import EditIcon from '../../icons/edit.svg';

// Util
import { getAddress, getLaunchType, getProductList, getServiceCost } from '../../js/util/SessionStorageUtil';
import { useTranslation } from 'react-i18next';
import useSessionState from '../../js/util/useSessionState';
import { CHECKOUT_INFO, EMAIL_EDIT } from '../../js/const/SessionStorageConst';
import ErrorBoundary from '../ErrorBoundary';
import { saveOrder, updateOrder } from '../../services/order';
import { useMessage } from '../common/messageCtx';
import { getUserData, getRetailerData } from '../../js/util/SessionStorageUtil';
import LoadingIndicator from '../LoadingIndicator';

const Confirm = () => {

    const [t] = useTranslation();
    const pushAlert = useMessage();
    const history = useHistory();
    const launchType = getLaunchType();

    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [state, setState] = useSessionState(CHECKOUT_INFO);
    const [open, setOpen] = useState();

    // Fetch product data from session storage
    useEffect(() => {
        const productData = getProductList();
        setProductData(productData);
    }, []);

    const submit = useCallback(async () => {
        try {
            console.log('getRetailerData()()', getRetailerData());
            setLoading(true);
            const commonData = {
                uid: getUserData().uid,
                retailerEmail: getRetailerData().retailerEmail,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                orderItems: productData
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
                options?.inspire ? 'Inspire Me' : undefined
            ]?.filter(i => i).join(', ')}.` };
            if (launchType === EMAIL_EDIT) {
                await updateOrder(commonData.uid, order);
                pushAlert({
                    statusIconDescription: t('common.success'),
                    title: t('common.success'),
                    subtitle: t('confirm.success'),
                    kind: 'success'
                });
            } else {
                await saveOrder({ ...rest, ...commonData, experience: `${[
                    options?.assist ? 'Assist Me' : undefined,
                    options?.tailoring ? 'Tailoring' : undefined,
                    options?.inspire ? 'Inspire Me' : undefined
                ]?.filter(i => i).join(', ')}.` });    
                setOpen({ uuid: commonData.uuid });
            }
        } catch (e) {
            pushAlert({ statusIconDescription: t('common.error'), title: t('common.error'), subtitle: e.message });
        } finally {
            setLoading(false);
        }
    }, [state, productData, launchType]);

    return (
        <ErrorBoundary>
            <Payment open={open} setOpen={setOpen} />
            <Grid className='landing-page'>
                <Column lg={16} md={16} sm={16} xs={16} className='logo'>
                    <img src={Emays} alt='The Emays logo' />
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
                                <a onClick={() => history.go(-1)}>{t('confirm.edit-appointment.edit-button')}</a>
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
                                    <p>14:00 to 15:00</p>
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
                                    state?.address?.addFour
                                ]?.filter(e => !!e).join(', ')}</p>
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
                            <div>
                                <p>{t('confirm.contact-details.first-name')}</p>
                                <TextBoxCustom
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
                            <div>
                                <p>{t('confirm.contact-details.last-name')}</p>
                                <TextBoxCustom
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
                            <div>
                                <p>{t('confirm.contact-details.phone-number')}</p>
                                <TextBoxCustom
                                    customStyle={{ backgroundColor: 'white' }}
                                    onChange={(e) => {
                                        setState(cs => ({
                                            ...cs,
                                            phoneNumber: e.target.value
                                        }));
                                    }}
                                    value={state?.phoneNumber}
                                    autoComplete='tel'
                                    invalidText={errors?.phoneNumber}
                                />
                            </div>
                            <div>
                                <p>{t('confirm.contact-details.email')}</p>
                                <TextBoxCustom
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
                <Column lg={8} md={8} sm={16} className='shopping-bag'>
                    <ShoppingBag productList={productData} serviceFee={getServiceCost()}/>
                </Column>
            </Grid>
        </ErrorBoundary>
    );

};

export default Confirm;
