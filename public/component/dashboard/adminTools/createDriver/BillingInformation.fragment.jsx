import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Column, Dropdown, FileUploaderDropContainer, Heading, TextInput } from '@carbon/react';
import DropDownCustom from '../../../common/DropdownCustom';
import { newDriverSelectorMemoized } from '../../redux/selector/newDriverSelector';
import { useSelector } from 'react-redux';
import currencyTypes from '../../../../js/const/currencyTypes';

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
            case 'setPaymentCurrency':
                return { ...state, paymentCurrency: action?.data };
            default:
                return { ...state };
        }
    }, {
        billingAddress: '',
        billingEmail: '',
        bankName: '',
        accountNumber: '',
        swiftNumber: '',
        paymentCurrency: '',
        country: ''
    });

    // Load the state from Redux
    useState(() => {
    }, []);

    // When changing the state, update the parent state 
    useEffect(() => {
        setState((currentState) => { return state; });
    }, [state]);

    const selector = useSelector(newDriverSelectorMemoized);
    // Load the state from Redux
    useState(() => {
        setFormData({ type: 'setAddress', data: selector?.phaseThreeData?.billingAddress });
        setFormData({ type: 'setEmail', data: selector?.phaseThreeData?.billingEmail });
        setFormData({ type: 'setBankName', data: selector?.phaseThreeData?.bankName });
        setFormData({ type: 'setAccountNumber', data: selector?.phaseThreeData?.accountNumber });
        setFormData({ type: 'setSwiftNumber', data: selector?.phaseThreeData?.swiftNumber });
        setFormData({ type: 'setCountry', data: selector?.phaseThreeData?.country });
        setFormData({ type: 'setPaymentCurrency', data: selector?.phaseThreeData?.paymentCurrency });
    }, []);

    const t = useCallback((key) => translate(`dashboard.adminTools.createDriver.billing.${key}`), [translate]);

    return (
        <>
            <Column className={'driver-billing-info-left'} lg={5} md={4} sm={8} xs={8}>
                <div className='em-card'>
                    <Heading className='sub-title'>{t('sub-title')}</Heading>
                    <TextInput labelText={t('address')} onChange={(e) => {
                        setFormData({ type: 'setAddress', data: e.target.value });
                    }} id='address'
                    value={state?.billingAddress}
                    />
                    {errorState === 'billingAddress' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            Please enter billing address</span>}
                    <br />
                    <TextInput labelText={t('email')} onChange={(e) => {
                        setFormData({ type: 'setEmail', data: e.target.value });
                    }} id='email'
                    value={state?.billingEmail}
                    />
                    {errorState === 'billingEmail' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            Please enter email address</span>}
                    {errorState === 'billingEmailInvalid' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            Please enter an email address</span>}
                </div>
            </Column>
            <Column className={'driver-billing-info-right'} lg={11} md={4} sm={8} xs={8}>
                <div className='em-card'>
                    <Heading className='sub-title'>
                        {t('sub-title2')}
                    </Heading>
                    <div className='grid-2'>
                        <div>
                            <TextInput labelText={t('bank')} onChange={(e) => {
                                setFormData({ type: 'setBankName', data: e.target.value });
                            }} id='bankName'
                            value={state?.bankName}
                            />
                            {errorState === 'bankName' &&
                                <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                    Please enter bank name</span>}
                            <br />
                            <TextInput labelText={t('account')} onChange={(e) => {
                                setFormData({ type: 'setAccountNumber', data: e.target.value });
                            }} id='accountNumber'
                            value={state?.accountNumber}
                            />
                            {errorState === 'accountNumber' &&
                                <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                    Please enter account number</span>}
                        </div>
                        <div>
                            <TextInput labelText={t('swift')} onChange={(e) => {
                                setFormData({ type: 'setSwiftNumber', data: e.target.value });
                            }} id='swiftNumber'
                            value={state?.swiftNumber}
                            />
                            {errorState === 'swiftNumber' &&
                                <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                    Please enter swift number</span>}
                            <br />
                            <TextInput labelText={t('country')} onChange={(e) => {
                                setFormData({ type: 'setCountry', data: e.target.value });
                            }} id='country'
                            value={state?.country}
                            />
                            {errorState === 'country' &&
                                <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                    Please enter country</span>}
                        </div>
                    </div>
                    <div>
                        <DropDownCustom
                            type='inline'
                            id='paymentCurrency'
                            items={[...currencyTypes]}
                            selectedItem={state?.paymentCurrency ? 
                                [...currencyTypes].find((itm) => itm?.value === state?.paymentCurrency) 
                                : undefined}
                            onChange = {(e) => {
                                setFormData({ type: 'setPaymentCurrency', data: e.selectedItem.value });
                            }}
                            label={t('paymentCurrency-label')}
                            titleText={t('paymentCurrency')}
                        />
                        {errorState === 'paymentCurrency' &&
                                <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                    Please enter payment currency</span>}
                    </div>
                </div>
            </Column>
        </>
    );
};

export default React.memo(CreateDriverBillingInformation);
