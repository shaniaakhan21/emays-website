import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setStageOneCreateStore } from '../../redux/thunk/newStoreThunk';
import { useDispatch, useSelector } from 'react-redux';

// SCSS
import '../../../../scss/component/dashboard/adminTools/fiscalInfo.scss';

import { Column, FileUploaderDropContainer, Grid, Heading, TextInput } from '@carbon/react';
import { newStoreSelectorMemoized } from '../../redux/selector/newStorSelector';
import ContactNumberInput from '../../../common/ContactNumberInput';

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
            default:
                return { ...state };
        }
    }, {
        companyName: '',
        fiscalNumber: '',
        phoneNumber: '',
        companyPhone: ''
    });

    // Load the state from Redux
    useState(() => {
        setFormData({ type: 'setCompanyName', data: selector?.phaseTwoFiscalData?.companyName });
        setFormData({ type: 'setFiscalNumber', data: selector?.phaseTwoFiscalData?.fiscalNumber });
        setFormData({ type: 'setPhoneNumber', data: selector?.phaseTwoFiscalData?.phoneNumber });
    }, []);

    // When changing the state, update the parent state 
    useEffect(() => {
        setState((currentState) => { return { ...currentState, ...state }; } );
    }, [state]);

    useEffect(() => {
        setState((currentState) => { return { ...currentState, ...state }; } );
    }, [state, errorState]);

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.fiscal.${key}`), [translate]);

    return (
        <div className='em-card-container'>
            <div className='em-card fiscal-1'>
                <Heading className='sub-title'>{t('subtitle-fiscal')}</Heading>
                <TextInput labelText={t('company-name')} onChange={(e) => {
                    setFormData({ type: 'setCompanyName', data: e.target.value });
                }}
                value = {state?.storeName}
                />
                {errorState === 'companyName' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter company name</span>}

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
            </div>
            <div className='em-card fiscal-2'>
                <div className='section-one'>
                    <Heading className='sub-title'>{t('subtitle-company-address')}</Heading>
                    <TextInput labelText={t('company-name')} onChange={(e) => {
                        setFormData({ type: 'setCompanyName', data: e.target.value });
                    }}
                    value = {state?.storeName}
                    />
                    {errorState === 'companyName' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter company name</span>}

                </div>
                <div className='section-two'>
                    <br></br>
                    <TextInput labelText={t('company-name')} onChange={(e) => {
                        setFormData({ type: 'setCompanyName', data: e.target.value });
                    }}
                    value = {state?.storeName}
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(CreateRetailerFiscalInfo);
