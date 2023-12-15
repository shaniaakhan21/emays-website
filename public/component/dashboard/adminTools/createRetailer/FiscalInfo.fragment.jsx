import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Heading, TextInput, Column } from '@carbon/react';
import { newStoreSelectorMemoized } from '../../redux/selector/newStorSelector';
import ContactNumberInput from '../../../common/ContactNumberInput';
import GoogleMap from '../../../common/googleMap';

// SCSS
import '../../../../scss/component/dashboard/adminTools/fiscalInfo.scss';

const CreateRetailerFiscalInfo = ({ setState, errorState }) => {
    const [translate] = useTranslation();
    
    const [selectedImageURL, setSelectedImageURL] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const selector = useSelector(newStoreSelectorMemoized);

    const [state, setFormData] = useReducer((state, action) => {
        switch (action?.type) {
            case 'setCompanyName':
                return { ...state, companyName: action?.data };
            case 'setFiscalNumber':
                return { ...state, fiscalNumber: action?.data };
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
        country: ''
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
    }, []);

    // When changing the state, update the parent state 
    useEffect(() => {
        setState((currentState) => { return state; } );
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
                {errorState === 'companyName' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter company name</span>}
                <br />

                <TextInput labelText={t('fiscal-number')} onChange={(e) => {
                    setFormData({ type: 'setFiscalNumber', data: e.target.value });
                }}
                value = {state?.fiscalNumber}
                />
                {errorState === 'fiscalNumber' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter fiscal number</span>}
                <br></br>
                <ContactNumberInput
                    actionFunc= {(value) => { setFormData({ type: 'setCompanyPhone', data: value }); }}
                    data = {state?.companyPhone || ''}
                />
                {errorState === 'companyPhone' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter phone</span>}
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
                        {errorState === 'street' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter street</span>}
                        <br />
                        <TextInput labelText={t('zip')} onChange={(e) => {
                            setFormData({ type: 'setZip', data: e.target.value });
                        }}
                        value = {state?.zip}
                        />
                        {errorState === 'zip' &&
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
                        {errorState === 'city' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter city</span>}
                        <br />
                        <TextInput labelText={t('country')} onChange={(e) => {
                            setFormData({ type: 'setCountry', data: e.target.value });
                        }}
                        value = {state?.country}
                        />
                        {errorState === 'country' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter country</span>}
                    </div>
                </div>
                <br></br>
                <div className='map'>
                    <Heading className='sub-title'>Click here to open maps</Heading>
                    <br></br>
                    <GoogleMap />
                </div>
            </Column>
            
        </>
    );
};

export default React.memo(CreateRetailerFiscalInfo);
