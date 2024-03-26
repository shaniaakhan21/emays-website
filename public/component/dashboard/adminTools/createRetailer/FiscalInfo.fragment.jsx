import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Heading, TextInput, Column } from '@carbon/react';
import { newStoreSelectorMemoized } from '../../redux/selector/newStorSelector';
import ContactNumberInput from '../../../common/ContactNumberInput';
import GoogleMap from '../../../common/googleMap';

// SCSS
import '../../../../scss/component/dashboard/adminTools/fiscalInfo.scss';
import { getAppInfo } from '../../../../services/geo';
import GoogleMapWithSearchBar from '../../../common/googleMapWithSearchComponent';
import DropDownCustom from '../../../common/DropdownCustom';
import currencyTypes from '../../../../js/const/currencyTypes';

const CreateRetailerFiscalInfo = ({ setState, errorState = [] }) => {
    const [translate] = useTranslation();
    const [mapAPIKey, setMapAPIKey] = useState('');
    
    const [selectedImageURL, setSelectedImageURL] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const selector = useSelector(newStoreSelectorMemoized);

    const [state, setFormData] = useReducer((state, action) => {
        switch (action?.type) {
            case 'setCompanyName':
                return { ...state, companyName: action?.data };
            case 'setFiscalNumber':
                return { ...state, fiscalNumber: action?.data };
            case 'setStripeId':
                return { ...state, extStripeAccountId: action?.data };
            case 'setCurrencyType':
                return { ...state, currencyType: action?.data };
            case 'setCompanyPhone':
                return { ...state, companyPhone: action?.data };
            case 'setStreet':
                return { ...state, street: action?.data };
            case 'setZip':
                return { ...state, zip: action?.data };
            case 'setCity':
                return { ...state, city: action?.data };
            case 'setCountry':
                return { ...state, country: action?.data };
            default:
                return { ...state };
        }
    }, {
        companyName: '',
        fiscalNumber: '',
        companyPhone: '',
        street: '',
        zip: '',
        city: '',
        country: '',
        extStripeAccountId: '',
        currencyType: ''
    });

    // Load the state from Redux
    useState(() => {
        setFormData({ type: 'setCompanyName', data: selector?.phaseTwoFiscalData?.companyName });
        setFormData({ type: 'setFiscalNumber', data: selector?.phaseTwoFiscalData?.fiscalNumber });
        setFormData({ type: 'setCompanyPhone', data: selector?.phaseTwoFiscalData?.companyPhone });
        setFormData({ type: 'setStreet', data: selector?.phaseTwoFiscalData?.street });
        setFormData({ type: 'setZip', data: selector?.phaseTwoFiscalData?.zip });
        setFormData({ type: 'setCity', data: selector?.phaseTwoFiscalData?.city });
        setFormData({ type: 'setCountry', data: selector?.phaseTwoFiscalData?.country });
        setFormData({ type: 'setStripeId', data: selector?.phaseTwoFiscalData?.extStripeAccountId });
        setFormData({ type: 'setCurrencyType', data: selector?.phaseTwoFiscalData?.currencyType });
    }, []);

    // When changing the state, update the parent state 
    useEffect(() => {
        setState((currentState) => { return state; } );
        (async () => {
            const appInfo = await getAppInfo();
            setMapAPIKey(appInfo?.googleMapAPIKey);
        })();
    }, [state]);

    useEffect(() => {
        setState((currentState) => { return state; } );
    }, [state, errorState]);

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.fiscal.${key}`), [translate]);

    return (
        <>
            <Column className='em-card fiscal-1' lg={5} md={4} sm={4} xs={4}>
                <Heading className='sub-title'>{t('subtitle-fiscal')}</Heading>
                <TextInput labelText={t('company-name')} onChange={(e) => {
                    setFormData({ type: 'setCompanyName', data: e.target.value });
                }}
                value = {state?.companyName}
                />
                {errorState?.includes('companyName') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter company name</span>}
                <br />

                <TextInput labelText={t('fiscal-number')} onChange={(e) => {
                    setFormData({ type: 'setFiscalNumber', data: e.target.value });
                }}
                value = {state?.fiscalNumber}
                />
                {errorState?.includes('fiscalNumber') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter fiscal number</span>}
                {errorState?.includes('fiscalValidationFailed') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Not a valid fiscal number</span>}
                <br></br>
                <ContactNumberInput
                    actionFunc= {(value) => { setFormData({ type: 'setCompanyPhone', data: value }); }}
                    data = {state?.companyPhone || ''}
                />
                {errorState?.includes('companyPhone') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter phone</span>}
                <br/>
                <TextInput labelText={t('stripe-id')} onChange={(e) => {
                    setFormData({ type: 'setStripeId', data: e.target.value });
                }}
                value = {state?.extStripeAccountId}
                />
                {errorState?.includes('extStripeAccountId') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter stripe Id</span>}
                <br/>
                <DropDownCustom
                    type='inline'
                    id='storeCurrency'
                    className='storeCurrency'
                    items={[...currencyTypes]}
                    selectedItem={state?.currencyType ? 
                        [...currencyTypes].find((itm) => itm?.value === state?.currencyType) 
                        : undefined}
                    onChange = {(e) => {
                        setFormData({ type: 'setCurrencyType', data: e.selectedItem.value });
                    }}
                    label={t('currency-type')}
                    titleText={t('currency-type')}
                />
                <br/>
                {errorState?.includes('currencyType') &&
                                <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                    Please enter store currency type</span>}
                <br></br>
            </Column>
            <Column className='em-card right-container' lg={11} md={4} sm={4} xs={4}>
                <div className='fiscal-2'>
                    <div className='section-one'>
                        <Heading className='sub-title'>{t('subtitle-company-address')}</Heading>
                        <TextInput labelText={t('street')} onChange={(e) => {
                            setFormData({ type: 'setStreet', data: e.target.value });
                        }}
                        value = {state?.street}
                        />
                        {errorState?.includes('street') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter street</span>}
                        <br />
                        <TextInput labelText={t('zip')} onChange={(e) => {
                            setFormData({ type: 'setZip', data: e.target.value });
                        }}
                        value = {state?.zip}
                        />
                        {errorState?.includes('zip') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter zip</span>}
                        <br />
                    </div>
                    <div className='section-two'>
                        <br></br>
                        <TextInput labelText={t('city')} onChange={(e) => {
                            setFormData({ type: 'setCity', data: e.target.value });
                        }}
                        value = {state?.city}
                        />
                        {errorState?.includes('city') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter city</span>}
                        <br />
                        <TextInput labelText={t('country')} onChange={(e) => {
                            setFormData({ type: 'setCountry', data: e.target.value });
                        }}
                        value = {state?.country}
                        />
                        {errorState?.includes('country') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter country</span>}
                    </div>
                </div>
                <br></br>
                <div className='map'>
                    <a onClick={() => {
                        window.open('https://www.google.com/maps/place/45.464664,9.188540');
                    }}><Heading className='sub-title'>{t('sub-title5')}</Heading></a>
                    {
                        <GoogleMapWithSearchBar googleMapAPIKey={mapAPIKey} />
                    }
                </div>
            </Column>
            
        </>
    );
};

export default React.memo(CreateRetailerFiscalInfo);
