import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Column, Dropdown, FileUploaderDropContainer, Heading, TextInput } from '@carbon/react';

const CreateDriverBillingInformation = ({ setState, errorState }) => {
    const [translate] = useTranslation();

    const onChange = useCallback((e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }, [setState]);

    const [state, setFormData] = useReducer((state, action) => {
        switch (action?.type) {
            case 'setAddress':
                return { ...state, billingAddress: action?.data };
            case 'setEmail':
                return { ...state, billingEmail: action?.data };
            case 'setBankName':
                return { ...state, bankName: action?.data };
            case 'setAccountNumber':
                return { ...state, accountNumber: action?.data };
            case 'setSwiftNumber':
                return { ...state, swiftNumber: action?.data };
            case 'setCountry':
                return { ...state, country: action?.data };
            default:
                return { ...state };
        }
    }, {
        billingAddress: '',
        billingEmail: '',
        bankName: '',
        accountNumber: '',
        swiftNumber: '',
        country: ''
    });

    // Load the state from Redux
    useState(() => {
    }, []);

    // When changing the state, update the parent state 
    useEffect(() => {
        setState((currentState) => { return state; } );
    }, [state]);

    const t = useCallback((key) => translate(`dashboard.adminTools.createDriver.billing.${key}`), [translate]);

    return (
        <>
            <Column lg={5} md={4} sm={8} xs={8}>
                <div className='em-card'>
                    <Heading className='sub-title'>{t('sub-title')}</Heading>
                    <TextInput labelText={t('address')} onChange={(e) => {
                        setFormData({ type: 'setAddress', data: e.target.value });
                    }} id='address' 
                    value = {state?.billingAddress}
                    />
                    {errorState === 'billingAddress' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter billing address</span>}

                    <TextInput labelText={t('email')} onChange={(e) => {
                        setFormData({ type: 'setEmail', data: e.target.value });
                    }} id='email' 
                    value = {state?.billingEmail}
                    />
                    {errorState === 'billingEmail' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter email address</span>}
                    {errorState === 'billingEmailInvalid' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter an email address</span>}
                </div>
            </Column>
            <Column lg={11} md={4} sm={8} xs={8}>
                <div className='em-card'>
                    <Heading className='sub-title'>
                        {t('sub-title2')}
                    </Heading>
                    <div className='grid-2'>

                        <TextInput labelText={t('bank')} onChange={(e) => {
                            setFormData({ type: 'setBankName', data: e.target.value });
                        }} id='bankName' 
                        value = {state?.bankName}
                        />
                        <br />
                        {errorState === 'bankName' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter bank name</span>}

                        <TextInput labelText={t('swift')} onChange={(e) => {
                            setFormData({ type: 'setSwiftNumber', data: e.target.value });
                        }} id='swiftNumber' 
                        value = {state?.swiftNumber}
                        />
                        {errorState === 'swiftNumber' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter swift number</span>}

                        <TextInput labelText={t('account')} onChange={(e) => {
                            setFormData({ type: 'setAccountNumber', data: e.target.value });
                        }} id='accountNumber' 
                        value = {state?.accountNumber}
                        />
                        {errorState === 'accountNumber' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter account number</span>}

                        <TextInput labelText={t('country')} onChange={(e) => {
                            setFormData({ type: 'setCountry', data: e.target.value });
                        }} id='country' 
                        value = {state?.country}
                        />
                        {errorState === 'country' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter country</span>}
                        <Dropdown
                            type='inline'
                            id='paymentCurrency'
                            items={[]}
                            label={t('paymentCurrency-label')}
                            titleText={t('paymentCurrency')}
                        />
                    </div>
                </div>
            </Column>
        </>
    );
};

export default React.memo(CreateDriverBillingInformation);
