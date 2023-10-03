
/* eslint-disable max-lines */
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heading, Button } from '@carbon/react';
import DatePickerCustom from '../../common/DatePickerCustom';
import DropDownCustom from '../../common/DropdownCustom';
import timeframes from '../../../../app/const/timeframes';
import TextBoxCustom from '../../common/TextBoxCustom';
import TextAreaCustom from '../../common/TextAreaCustom';
// Scss
import '../../../scss/component/retailer/newOrders.scss';
import GeoContainer from '../../common/GeoContainer';
import { useDispatch, useSelector } from 'react-redux';
import { appInfoSelectorMemoized } from '../redux/selector/appInfoSelector';
import { validateObjectNullEmptyCheck } from '../../../js/util/validateObject';
import { setNewOrderPhaseOneData } from '../redux/thunk/newOrderThunk';

const NewOrder = ({ newOrderData }) => {
    const [translate] = useTranslation();
    const history = useHistory();
    const t = useCallback((key) => translate(`dashboard.newOrders.${key}`), [translate]);

    const [googleMapAPIKey, setGoogleMapInfo] = useState('');
    const [submitState, setSubmitState] = useState(false);

    const [state, setFormData] = useReducer((state, action) => {
        switch (action?.type) {
            case 'setFirstName':
                return { ...state, firstName: action?.data };
            case 'setLastName':
                return { ...state, lastName: action?.data };
            case 'setEmail':
                return { ...state, email: action?.data };
            case 'setDate':
                return { ...state, date: action?.data };
            case 'setPhone':
                return { ...state, phoneNumber: action?.data };
            case 'setStartTimeEndTime':
                return { ...state, startTime: action?.data?.startTime, endTime: action?.data?.endTime };
            case 'setExperience':
                return { ...state, experience: action?.data };
            case 'setTimeZone':
                const tZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                return { ...state, timeZone: tZone };
            case 'setDelInfo':
                return { ...state, deliveryInfo: action?.data };
            case 'setAddress':
                const completeAddress = action?.data?.split(',');
                return { ...state, address: {
                    addOne: completeAddress[0],
                    addTwo: completeAddress[1],
                    addThree: completeAddress[2],
                    addFour: completeAddress[3],
                    addFive: completeAddress[4],
                    addSix: completeAddress[5]
                } };
            case 'setServiceFee':
                return { ...state, serviceFee: action?.data };
            case 'setAddressLineOne':
                return { ...state, address: { ...state?.address, addOne: action?.data } };
            case 'setAddressLineTwo':
                return { ...state, address: { ...state?.address, addTwo: action?.data } };
            case 'setAddressLineThree':
                return { ...state, address: { ...state?.address, addThree: action?.data } };
            case 'setAddressLineFour':
                return { ...state, address: { ...state?.address, addFour: action?.data } };
            case 'setAddressLineFive':
                return { ...state, address: { ...state?.address, addFive: action?.data } };
            case 'setAddressLineSix':
                return { ...state, address: { ...state?.address, addSix: action?.data } };
            default:
                return { ...state };
        }
    }, {
        firstName: '',
        lastName: '',
        email: '',
        date: '',
        startTime: '',
        endTime: '',
        experience: '',
        timeZone: '',
        deliveryInfo: '',
        phoneNumber: '',
        address: {
            addOne: '',
            addTwo: '',
            addThree: '',
            addFour: '',
            addFive: '',
            addSix: ''
        },
        serviceFee: ''
    });

    const dispatch = useDispatch();
    const appInfoSelector = useSelector(appInfoSelectorMemoized);

    useEffect(() => {
        setFormData({ type: 'setTimeZone' });
        setGoogleMapInfo(appInfoSelector?.appInfoState?.data?.googleMapAPIKey);
    }, [appInfoSelector]);

    // State service fee update from GeoContainer
    const updateServiceFee = (fee) => {
    };

    const submitForm = () => {
        setSubmitState(true);
        const isDataValid = validateObjectNullEmptyCheck(
            state, ['addFive', 'addSix', 'experience', 'deliveryInfo', 'serviceFee']);
        if (isDataValid) {
            dispatch(setNewOrderPhaseOneData(state));
            history.push('/dashboard/deliveryOrders');
        }
    };

    return (
        <>
            <div className='newOrders'>
                <div className='header'>
                    <Heading className='title'>{t('title')}</Heading>
                    <Heading className='sub-title'>{t('sub-title')}</Heading>
                </div>
                <br></br>
                <br></br>
                <div className='main-layout'>
                    <div className='sub-main-layout'>
                        <div className='layout-sections'>
                            <div className='date'>
                                <div>
                                    <p>{t('delivery-day-date')}</p>
                                    <DatePickerCustom
                                        handleDateChange={(e) => setFormData(
                                            { type: 'setDate', data: e.target.value }) }
                                    />
                                    {submitState && !state?.date &&
                                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please select a date</span>}
                                </div>
                            </div>
                            <div className='date'>
                                <div>
                                    <p>{t('delivery-time')}</p>
                                    <DropDownCustom
                                        onChange={(e) => {
                                            const tf = timeframes[e.selectedItem?.id];
                                            setFormData({ type: 'setStartTimeEndTime', data: {
                                                startTime: tf.start,
                                                endTime: tf.end
                                            } });
                                        }}
                                        items={
                                            timeframes?.map((tf, k) => ({ id: k, text: `${tf.start} to ${tf.end}` 
                                            }))}
                                    />
                                    {submitState && !state?.startTime && !state?.endTime &&
                                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please select a time frame</span>}
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className='layout-sections start-it'>
                            <br></br>
                            <div className='full-width'>
                                <div>
                                    <p className='sub-text'>{t('sub-head-01')}</p>
                                </div>
                                <div className='textboxes-sec'>
                                    <div className='half-width'>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-01')}</p>
                                        <div>
                                            <TextBoxCustom
                                                onChange={
                                                    (e) => setFormData({ type: 'setFirstName', data: e.target.value })
                                                }
                                                placeholderText={t('Place-holder-01')} />
                                            {submitState && !state?.firstName && 
                                            <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please provide first name</span>}
                                        </div>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-02')}</p>
                                        <div>
                                            <TextBoxCustom
                                                onChange={
                                                    (e) => setFormData({ type: 'setPhone', data: e.target.value })
                                                }
                                                placeholderText={t('Place-holder-02')} />
                                            {submitState && !state?.phoneNumber && 
                                            <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please provide contact number</span>}
                                        </div>
                                    </div>
                                    <div className='half-width'>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-03')}</p>
                                        <div>
                                            <TextBoxCustom
                                                onChange={
                                                    (e) => setFormData({ type: 'setLastName', data: e.target.value })
                                                }
                                                placeholderText={t('Place-holder-03')} />
                                            {submitState && !state?.lastName && 
                                            <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please provide last name</span>}
                                        </div>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-04')}</p>
                                        <div>
                                            <TextBoxCustom
                                                onChange={
                                                    (e) => setFormData({ type: 'setEmail', data: e.target.value })
                                                }
                                                placeholderText={t('Place-holder-04')} />
                                            {submitState && !state?.email && 
                                            <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please provide email</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className='layout-sections start-it'>
                            <br></br>
                            <div className='full-width'>
                                <div>
                                    <p className='sub-text'>{t('sub-head-02')}</p>
                                </div>
                                <GeoContainer 
                                    appData={googleMapAPIKey}
                                    updateAddress={({ addOne }) => {
                                        setFormData({ type: 'setAddressLineOne', data: addOne });
                                    }}
                                    updateServiceFee={updateServiceFee} />
                                <br></br>
                                <div className='textboxes-sec'>
                                    <div className='half-width'>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-05')}</p>
                                        <div>
                                            <TextBoxCustom
                                                onKeyDown={(e) => { e.preventDefault(); }}
                                                onChange={
                                                    (e) => setFormData({ type: 'setAddressLineOne',
                                                        data: e.target.value })
                                                }
                                                value={state?.address?.addOne ?? ''}
                                                placeholderText={t('Place-holder-05')} />
                                            {submitState && !state?.address?.addOne && 
                                            <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please provide street</span>}
                                        </div>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-06')}</p>
                                        <div>
                                            <TextBoxCustom
                                                onChange={
                                                    (e) => setFormData({ type: 'setAddressLineTwo',
                                                        data: e.target.value })
                                                }
                                                placeholderText={t('Place-holder-06')} />
                                            {submitState && !state?.address?.addTwo && 
                                            <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please provide city</span>}
                                        </div>
                                    </div>
                                    <div className='half-width'>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-07')}</p>
                                        <div>
                                            <TextBoxCustom
                                                onChange={
                                                    (e) => setFormData({ type: 'setAddressLineThree',
                                                        data: e.target.value })
                                                }
                                                placeholderText={t('Place-holder-07')} />
                                            {submitState && !state?.address?.addThree && 
                                            <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please provide apartment number</span>}
                                        </div>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-08')}</p>
                                        <div>
                                            <TextBoxCustom
                                                onChange={
                                                    (e) => setFormData({ type: 'setAddressLineFour',
                                                        data: e.target.value })
                                                }
                                                placeholderText={t('Place-holder-08')} />
                                            {submitState && !state?.address?.addFour && 
                                            <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please provide zip code</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='sub-main-layout-02'>
                        <div className='box-it'>
                            <p>{t('sub-head-03')}</p>
                            <br></br>
                            <TextAreaCustom onChange={
                                (e) => setFormData({ type: 'setDelInfo',
                                    data: e.target.value })
                            }/>
                            {/* <p className='sub-title margin-2'>{t('p-text')}</p> */}
                            <Button onClick={() =>
                            { submitForm(); }}>{t('button-text')}</Button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(NewOrder);
