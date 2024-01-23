/* eslint-disable max-lines */
import { Grid, Column } from '@carbon/react';
import { useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

// Components
import ContentSwitcherCustom from '../common/ContentSwitcherCustom';
import DatePickerCustom from '../common/DatePickerCustom';
import DropDownCustom from '../common/DropdownCustom';
import CheckBoxCustom from '../common/CheckBoxCustom';
import TextBoxCustom from '../common/TextBoxCustom';
import ButtonCustom from '../common/ButtonCustom';
import ShoppingBag from './ShoppingBag';
import TextAreaCustom from '../common/TextAreaCustom';
import DialogueModal from '../common/ReusableDialogueModal';
import InfoModal from '../common/ReusableInfoModal';

// SCSS
import '../../scss/component/checkout/checkout.scss';

// Images
import Emays from '../../logo/emays-logo-white.png';
import CorrectSign from '../../icons/correct-sign.png';

// Util
import { getProductList, getRetailerData } from '../../js/util/SessionStorageUtil';
import { CHECKOUT_INFO, EMAIL_EDIT } from '../../js/const/SessionStorageConst';
import { useTranslation } from 'react-i18next';
import useSessionState from '../../js/util/useSessionState';
import timeframes from '../../../app/const/timeframes';
import LoadingIndicator from '../LoadingIndicator';
import GeoContainer from '../common/GeoContainer';
import FallBack from '../../icons/fallback.png';
import ShoppingItem from './ShoppingItem';
import { useMessage } from '../common/messageCtx';
import { cancelOrder, updateOrder } from '../../services/order';
import styled from 'styled-components';
import { getCurrencySign } from '../../js/util/currencyUtil';

const Checkout = () => {

    const [t] = useTranslation();
    const history = useHistory();
    const pushAlert = useMessage();

    const [state, setState] = useSessionState(CHECKOUT_INFO, {
        address: {}, options: {},
        serviceFee: null,
        isNotInServiceArea: false
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showDelete, setShowDelete] = useState(undefined);
    const [showDeleteAppointment, setDeleteAppointment] = useState(false);
    const [showAppointmentDeleteSuccess, setSuccessAppointmentDelete] = useState(false);

    // Handler function for option change
    const handleOptionChange = (option) => {
        setState(cs => ({ ...cs, options: { ...cs.options, [option]: !cs.options[option] } }));
    };

    // State address update function from GeoContainer
    const updateAddress = ({ addOne, addTwo, addThree, addFour }) => {
        setState(cs => ({ ...cs, address: { ...cs.address,
            addOne: addOne, addTwo: addTwo, addThree: addThree, addFour: addFour } }));
    };

    // State service fee update from GeoContainer
    const updateServiceFee = (fee) => {
        if (!fee) {
            setState(cs => ({ ...cs, isNotInServiceArea: true }));
        } else {
            setState(cs => ({ ...cs, isNotInServiceArea: false }));
        }
        setState(cs => ({ ...cs, serviceFee: fee }));
    };

    // State for product data
    const [productData, setProductData] = useState([]);

    // Component load logics
    useEffect(() => {
        const productData = getProductList();
        setProductData(productData);
    }, [state]);

    const preventTyping = (event) => {
        // Event.preventDefault();
    };

    const submit = () => {
        if (productData?.length < 1) {
            pushAlert({
                kind: 'error',
                title: t('statusMessage.error'),
                subtitle: t('statusMessage.message.no-products')
            });
            return;
        }
        const errors = ['addOne', 'addTwo', 'addThree', 'addFour', 'addFive', 'addSix'].reduce(
            (acc, k) => (
                state?.address?.[k] && state?.address?.[k] !== '' ? acc : { ...acc, [k]: true }
            ), {}
        );
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        if (!state?.serviceFee && !state?.serviceFee > 0) {
            pushAlert({
                kind: 'error',
                title: t('statusMessage.error'),
                subtitle: t('statusMessage.message.change-location-error')
            });
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setState(cs => ({ ...cs, locked: true }));
            setLoading(false);
            history.push('/confirm');
        }, 1000);
    };

    const removeItem = useCallback(async () => {
        try {
            setLoading(true);
            // Await updateOrder(state.uid, { orderItems: productData?.filter((o, i) => i !== showDelete) });
            setShowDelete(false);
            setProductData(productData?.filter((o, i) => i !== showDelete));
        } catch (e) {
            pushAlert({ statusIconDescription: t('common.error'), title: t('common.error'), subtitle: e.message });
        } finally {
            setLoading(false);
        }
    }, [showDelete]);

    const deleteAppointmentAction = async () => {
        const result = await cancelOrder(state.uid);
        if (result) {
            setDeleteAppointment(false);
            setSuccessAppointmentDelete(true);
        }
    };

    const AppointmentCancellationSuccessMessageContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        & p {
            font-size: 16px;
            padding-top: 10px;
        }
    `;

    const AppointmentCancellationDialogueMessageContainer = styled.div`
        & p {
            font-size: 16px;
            padding-top: 20px;
        }
    `;

    return (
        <Grid className='landing-page'>
            <DialogueModal
                showModal={showDelete !== undefined && showDelete !== false}
                closeModal={() => { setShowDelete(false); }}
                title={t('checkout.delete-item-title')}
                confirmButtonText={t('checkout.delete-item-confirm')}
                cancelButtonText={t('checkout.delete-item-cancel')}
                body={
                    <ShoppingItem
                        index={showDelete}
                        itemName={productData[showDelete]?.productName}
                        image={productData[showDelete]?.productImage || FallBack}
                        color={productData[showDelete]?.productColor}
                        size={productData[showDelete]?.productSize}
                        quantity={productData[showDelete]?.productQuantity}
                        price={`${productData[showDelete]?.productCost}`}
                        currencySign={getCurrencySign(getRetailerData()?.currency || '')} />
                }
                confirmAction={removeItem}
            />
            <Column lg={16} md={16} sm={16} xs={16} className='logo'>
                <div className='store-logo'></div>
                <div className='emays-logo'>
                    <p>Powered by</p><img src={Emays} alt='The Emays logo' />
                </div>
            </Column>
            {loading ? <Column lg={8} md={8} sm={4} xs={4} className='loading-indicator'>
                <LoadingIndicator description='Saving changes' />
            </Column>
                : <Column lg={8} md={8} sm={4} xs={4} className='book-appointment'>
                    <p>{t('checkout.book-appointment.header')}</p>
                    <div className='next-date-picker'>
                        <ContentSwitcherCustom
                            disabled={state?.locked}
                            nextDateOne='Today Sat, Nov 2nd'
                            nextDateTwo='Sat, Nov 2nd'
                            nextDateThree='Sat, Nov 2nd' />
                    </div>
                    <div className='date-time-pick'>
                        <p>{t('checkout.book-appointment.custom-date')}</p>
                        <div className='items'>
                            <div className='date'>
                                <p>{t('checkout.book-appointment.choose-date')}</p>
                                {state?.date ? <DatePickerCustom
                                    key={1}
                                    disabled={state?.locked}
                                    handleDateChange={e => setState(cs => ({ ...cs, date: e.target.value }))}
                                    selectedDate={state?.date}
                                /> : <DatePickerCustom
                                    key={2}
                                    disabled={state?.locked}
                                    handleDateChange={e => setState(cs => ({ ...cs, date: e.target.value }))}
                                />}
                            </div>
                            <div className='time-window'>
                                <p>{t('checkout.book-appointment.choose-time')}</p>
                                <DropDownCustom
                                    key={1}
                                    onChange={(e) => {
                                        const tf = timeframes[e.selectedItem?.id];
                                        setState(cs => ({ ...cs, startTime: tf.start, endTime: tf.end }));
                                    }}
                                    items={timeframes?.map((tf, k) => ({ id: k, text: `${tf.start} to ${tf.end}` }))}
                                    selectedItem={
                                        state?.startTime ? {
                                            id: timeframes?.findIndex(tf => tf.start === state?.startTime),
                                            text: `${state.startTime} to ${state.endTime}`
                                        }
                                            : undefined}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='customize-experience'>
                        <div className='header'>
                            <p>{t('checkout.customize-experience.header')}</p>
                        </div>
                        <div className='options'>
                            <div className='checkbox-wait'>
                                <CheckBoxCustom
                                    labelText={t('checkout.customize-experience.checkbox-wait-label')}
                                    id={'op1'}
                                    action={() => handleOptionChange('inspire')}
                                    checked={state?.options?.inspire}
                                />
                            </div>
                            <div className='checkbox-assist'>
                                <CheckBoxCustom
                                    labelText={t('checkout.customize-experience.checkbox-assist-label')}
                                    id={'op2'}
                                    action={() => handleOptionChange('assist')}
                                    checked={state?.options?.assist}
                                />
                            </div>
                            <div className='checkbox-basic'>
                                <CheckBoxCustom
                                    labelText={t('checkout.customize-experience.checkbox-basic-label')}
                                    id={'op3'}
                                    action={() => handleOptionChange('tailoring')}
                                    checked={state?.options?.tailoring}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='delivery-address'>
                        <div className='header'>
                            <p>{t('checkout.delivery-address.header')}</p>
                        </div>
                        <div className='address'>
                            <div>
                                <p>{t('checkout.delivery-address.address')}</p>
                            </div>
                            <div className='learn_more'>
                                <a target='blank' href='https://emaysstyle.com/#/'>Learn more about this</a>
                            </div>
                        </div>
                        <div className={'address_search'}>
                            <GeoContainer
                                updateAddress={updateAddress} updateServiceFee={updateServiceFee} />
                            { state?.isNotInServiceArea && 
                            <p className='no-service-info'>{t('checkout.not-in-service-area')}</p> }
                        </div>
                        <div className='address-info'>
                            <div>
                                <TextBoxCustom
                                    cols={'100'}
                                    onKeyDown={preventTyping}
                                    id={'addressStreet'}
                                    placeholderText={t('checkout.book-appointment.addOnePlaceHolder')}
                                    customStyle={{ backgroundColor: 'white' }}
                                    value={state?.address?.addOne ?? ''}
                                    onChange={
                                        (e) => setState(
                                            cs => ({ ...cs, address: { ...cs.address, addOne: e.target.value } })
                                        )
                                    }
                                    invalid={errors?.addOne} />
                            </div>
                            <div>
                                <TextBoxCustom
                                    placeholderText={t('checkout.book-appointment.addTwoPlaceHolder')}
                                    customStyle={{ backgroundColor: 'white' }}
                                    value={state?.address?.addTwo}
                                    onChange={
                                        (e) => setState(
                                            cs => ({ ...cs, address: { ...cs.address, addTwo: e.target.value } })
                                        )
                                    }
                                    invalid={errors?.addTwo} />
                            </div>
                            <div>
                                <TextBoxCustom
                                    placeholderText={t('checkout.book-appointment.addThreePlaceHolder')}
                                    customStyle={{ backgroundColor: 'white' }}
                                    value={state?.address?.addThree}
                                    onChange={
                                        (e) => setState(
                                            cs => ({ ...cs, address: { ...cs.address, addThree: e.target.value } })
                                        )
                                    }
                                    invalid={errors?.addThree} />
                            </div>
                            <div>
                                <TextBoxCustom
                                    placeholderText={t('checkout.book-appointment.addFourPlaceHolder')}
                                    customStyle={{ backgroundColor: 'white' }}
                                    value={state?.address?.addFour}
                                    onChange={
                                        (e) => setState(
                                            cs => ({ ...cs, address: { ...cs.address, addFour: e.target.value } })
                                        )
                                    }
                                    invalid={errors?.addFour} />

                            </div>
                            <div>
                                <TextBoxCustom
                                    placeholderText={t('checkout.book-appointment.addFivePlaceHolder')}
                                    customStyle={{ backgroundColor: 'white' }}
                                    value={state?.address?.addFive}
                                    onChange={
                                        (e) => setState(
                                            cs => ({ ...cs, address: { ...cs.address, addFive: e.target.value } })
                                        )
                                    }
                                    invalid={errors?.addFive} />
                            </div>
                            <div>
                                <TextBoxCustom
                                    placeholderText={t('checkout.book-appointment.addSixPlaceHolder')}
                                    customStyle={{ backgroundColor: 'white' }}
                                    value={state?.address?.addSix}
                                    onChange={
                                        (e) => setState(
                                            cs => ({ ...cs, address: { ...cs.address, addSix: e.target.value } })
                                        )
                                    }
                                    invalid={errors?.addSix} />
                            </div>
                        </div>
                        <div className='delivery-info'>
                            <p>{t('checkout.delivery-info')}</p>
                            <TextAreaCustom
                                className='user-message'
                                placeholder={t('checkout.book-appointment.deliveryInfoPlaceholder')}
                                enableCounter
                                maxCount={100}
                                name='message'
                                value={state.deliveryInfo}
                                onChange={
                                    (e) => setState(
                                        cs => ({ ...cs, deliveryInfo: e.target.value })
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className='submit-button'>
                        <ButtonCustom
                            text={state.launchType === EMAIL_EDIT ?
                                t('checkout.save-changes') : t('checkout.submit-button')}
                            action={submit}
                            type={'secondary'}
                            customStyle={{
                                minWidth: '100%',
                                marginTop: '25px',
                                marginBottom: '15px',
                                alignContent: 'center',
                                justifyContent: 'center',
                                padding: '1%'
                            }}
                        />
                    </div>
                    <div>
                        {
                            state.launchType === EMAIL_EDIT &&
                            <ButtonCustom
                                text={t('checkout.cancel-order')}
                                action={() => {
                                    setDeleteAppointment(true);
                                    setSuccessAppointmentDelete(false); }}
                                type={'danger'}
                                customStyle={{
                                    minWidth: '100%',
                                    marginTop: '25px',
                                    marginBottom: '15px',
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    padding: '1%'
                                }}
                            />
                        }
                    </div>
                </Column>}
            <Column lg={8} md={8} sm={16} className='shopping-bag'>
                <ShoppingBag onDelete={(index) => {
                    setShowDelete(index);
                }} productList={productData}
                serviceFee={state.serviceFee} currencyType = {getRetailerData().currency}/>
            </Column>
            {/* Appointment cancellation dialogue */}
            <DialogueModal
                showModal={showDeleteAppointment}
                closeModal={ () => { setDeleteAppointment(false); }}
                title={t('email-launch.cancellation.dialogue-header')}
                body={
                    <AppointmentCancellationDialogueMessageContainer>
                        <p>{t('email-launch.cancellation.dialogue-body')}</p>
                    </AppointmentCancellationDialogueMessageContainer>
                }
                confirmAction={ deleteAppointmentAction }
            />
            {/* Appointment cancelled info */}
            <InfoModal
                showModal={showAppointmentDeleteSuccess}
                closeModal={ () => {
                    setSuccessAppointmentDelete(false);
                }}
                cancelText={'Close'}
                title={t('email-launch.cancellation.info-header')}
                body={
                    <AppointmentCancellationSuccessMessageContainer>
                        <div>
                            <img src={CorrectSign} alt='Completed image' />
                        </div>
                        <div>
                            <p>{t('email-launch.cancellation.info-body')}</p>
                        </div>
                    </AppointmentCancellationSuccessMessageContainer>
                }
            />
        </Grid>
    );

};

Checkout.propTypes = {
    address: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selectedOptions: PropTypes.shape({
        assist: PropTypes.bool.isRequired,
        tailoring: PropTypes.bool.isRequired,
        inspire: PropTypes.bool.isRequired
    }).isRequired,
    handleDateChange: PropTypes.func.isRequired,
    handleAddressChange: PropTypes.func.isRequired,
    handleOptionChange: PropTypes.func.isRequired
};

export default Checkout;
