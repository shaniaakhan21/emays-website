import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Column, Heading, TextInput } from '@carbon/react';
import GeneratePassword from '../../../common/GeneratePassword';
import { newStoreSelectorMemoized } from '../../redux/selector/newStorSelector';
import { useSelector } from 'react-redux';
import TextBoxPassword from '../../../common/TextBoxPassword';

const CreateRetailerAccountInfo = ({ setState, errorState = [] }) => {

    const [translate] = useTranslation();
    const selector = useSelector(newStoreSelectorMemoized);

    const [state, setFormData] = useReducer((state, action) => {
        switch (action?.type) {
            case 'setUsername':
                return { ...state, username: action?.data };
            case 'setEmail':
                return { ...state, email: action?.data };
            case 'setPassword':
                return { ...state, password: action?.data };
            case 'setGeneratedPassword':
                return { ...state, generatedPassword: action?.data };
            default:
                return { ...state };
        }
    }, {
        username: '',
        email: '',
        password: '',
        generatedPassword: ''
    });

    // Load the state from Redux
    useState(() => {
        setFormData({ type: 'setUsername', data: selector?.phaseOneData?.username || '' });
        setFormData({ type: 'setEmail', data: selector?.phaseOneData?.email || '' });
        setFormData({ type: 'setPassword', data: selector?.phaseOneData?.password || '' });
        setFormData({ type: 'setGeneratedPassword', data: selector?.phaseTwoData?.generatedPassword || '' });
    }, []);

    useEffect(() => {
        if (selector?.phaseOneData?.isLoading && !selector?.phaseOneData?.email) {
            setTimeout(() => {
                document.querySelector('.emailInput input').value = '';
            }, 1000);
            
        }
        if (selector?.phaseOneData?.isLoading && !selector?.phaseOneData?.password) {
            setTimeout(() => {
                document.querySelector('.passwordInput').value = '';
            }, 1000);
            
        }
    }, []);

    // When changing the state, update the parent state 
    useEffect(() => {
        setState((currentState) => { return { ...currentState, ...state }; } );
    }, [state]);

    const onChangePasswordGeneration = (value) => {
        setFormData({ 'type': 'setGeneratedPassword', data: value });
    };

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.account.${key}`), [translate]);

    return (
        <Column className={'retailer-account-info-left'} lg={16} md={16} sm={16} xs={16}>
            <div className='grid-3'>
                <div className='em-card'>
                    <Heading className='sub-title'>{t('sub-title')}</Heading>
                    <TextInput labelText={t('username')} onChange={(e) => {
                        setFormData({ type: 'setUsername', data: e.target.value });
                    }}
                    value = {state?.username}
                    />
                    {errorState?.includes('username') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter username</span>}
                    {errorState?.includes('Username already reserved') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                This username already reserved</span>}
                    {errorState?.includes('Some error occurred') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Some error occurred</span>}
                    <br />
                    <TextInput labelText={t('email')} onChange={(e) => {
                        setFormData({ type: 'setEmail', data: e.target.value });
                    }} 
                    className = {'emailInput'}
                    value = {state?.email}
                    />
                    {errorState?.includes('email') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter email</span>}
                    {errorState?.includes('emailInvalid') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter a valid email</span>}            
                    {/* <TextInput labelText={t('password')} onChange={(e) => {
                        setFormData({ type: 'setPassword', data: e.target.value });
                    }}
                    value = {state?.password}
                    /> */}
                    <br />
                    <TextBoxPassword
                        onChange={(e) => {
                            setFormData({ type: 'setPassword', data: e.target.value });
                        }}
                        labelText='Password'
                        hidePasswordLabel='Hide password'
                        customStyle={{ width: '100%' }}
                        value = {state?.password}
                        className={'passwordInput'}
                    />
                    {errorState?.includes('password') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter password</span>}
                    {errorState?.includes('passwordInvalid') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            The password must consist of only uppercase letters, lowercase letters, digits,
                             the specified special characters (@, $, !, %, *, ?) and must be at least 8 
                             characters in length </span>}
                    <br />
                    <TextBoxPassword
                        onChange={(e) => {
                            setFormData({ type: 'setGeneratedPassword', data: e.target.value });
                        }}
                        labelText='Re-enter Password'
                        hidePasswordLabel='Hide password'
                        customStyle={{ width: '100%' }}
                    />
                    { state?.password !== state?.generatedPassword && 
                    <span style={{ 'color': 'red', 'font-size': '12px' }}>
                    Both password fields should be similar</span> }
                </div>
            </div>
        </Column>
    );
};

export default React.memo(CreateRetailerAccountInfo);
