import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Column, Heading, TextInput } from '@carbon/react';
import ContactNumberInput from '../../../common/ContactNumberInput';
import { newDriverSelectorMemoized } from '../../redux/selector/newDriverSelector';
import { useSelector } from 'react-redux';

const CreateDriverBasicInfo = ({ setState, errorState }) => {

    const [translate] = useTranslation();

    const [state, setFormData] = useReducer((state, action) => {
        switch (action?.type) {
            case 'setFirstName':
                return { ...state, firstName: action?.data };
            case 'setLastName':
                return { ...state, lastName: action?.data };
            case 'setPhoneNumber':
                return { ...state, phoneNumber: action?.data };
            case 'setCity':
                return { ...state, city: action?.data };
            case 'setCountry':
                return { ...state, country: action?.data };
            case 'setZipCode':
                return { ...state, zipCode: action?.data };
            default:
                return { ...state };
        }
    }, {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        city: '',
        country: '',
        zipCode: ''
    });

    useEffect(() => {
        setState((currentState) => { return { ...currentState, ...state }; } );
    }, [state]);

    const selector = useSelector(newDriverSelectorMemoized);
    // Load the state from Redux
    useState(() => {
        setFormData({ type: 'setFirstName', data: selector?.phaseOneData?.firstName });
        setFormData({ type: 'setLastName', data: selector?.phaseOneData?.lastName });
        setFormData({ type: 'setPhoneNumber', data: selector?.phaseOneData?.phoneNumber });
        setFormData({ type: 'setCity', data: selector?.phaseOneData?.city });
        setFormData({ type: 'setCountry', data: selector?.phaseOneData?.country });
        setFormData({ type: 'setZipCode', data: selector?.phaseOneData?.zipCode });
    }, []);

    const t = useCallback((key) => translate(`dashboard.adminTools.createDriver.basic.${key}`), [translate]);

    return (
        <>
            <Column lg={6} md={6} sm={6} xs={6}>
                <div className='em-card'>
                    <Heading className='sub-title'>{t('sub-title')}</Heading>
                    <TextInput labelText={t('firstName')} onChange={(e) => {
                        setFormData({ type: 'setFirstName', data: e.target.value });
                    }} id='firstName' 
                    value = {state?.firstName}
                    />
                    {errorState === 'firstName' &&
                    <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            Please enter first name</span>}
                    <br />
                    <TextInput labelText={t('lastName')} onChange={(e) => {
                        setFormData({ type: 'setLastName', data: e.target.value });
                    }} id='lastName' 
                    value = {state?.lastName}
                    />
                    {errorState === 'lastName' &&
                    <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            Please enter last name</span>}
                    <br />
                    <ContactNumberInput
                        actionFunc= {(value) => { setFormData({ type: 'setPhoneNumber', data: value }); }}
                        data = {state?.phoneNumber || ''}
                    />
                    {errorState === 'phoneNumber' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter phone number</span>}
                    <br />
                    <TextInput labelText={t('city')} onChange={(e) => {
                        setFormData({ type: 'setCity', data: e.target.value });
                    }} id='city' 
                    value = {state?.city}
                    />
                    {errorState === 'city' &&
                    <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            Please enter city</span>}
                    <br />
                    <TextInput labelText={t('country')} onChange={(e) => {
                        setFormData({ type: 'setCountry', data: e.target.value });
                    }} id='country' 
                    value = {state?.country}
                    />
                    {errorState === 'country' &&
                    <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            Please enter country</span>}
                    <br />
                    <TextInput labelText={t('zip')} onChange={(e) => {
                        setFormData({ type: 'setZipCode', data: e.target.value });
                    }} id='zip' 
                    value = {state?.zipCode}
                    />
                    {errorState === 'zipCode' &&
                    <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            Please enter zip code</span>}
                </div>
            </Column>
            <Column lg={6} md={6} sm={6} xs={6}></Column>
        </>
    );
};

export default React.memo(CreateDriverBasicInfo);
