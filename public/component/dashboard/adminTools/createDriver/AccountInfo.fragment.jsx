import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Column, Heading, TextInput } from '@carbon/react';
import TextBoxPassword from '../../../common/TextBoxPassword';
import { newDriverSelectorMemoized } from '../../redux/selector/newDriverSelector';
import { useSelector } from 'react-redux';

const CreateDriverAccountInfo = ({ setState, errorState = [] }) => {

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

    const [translate] = useTranslation();
    const t = useCallback((key) => translate(`dashboard.adminTools.createDriver.credentials.${key}`), [translate]);

    // When changing the state, update the parent state 
    useEffect(() => {
        setState((currentState) => { return { ...currentState, ...state }; });
    }, [state]);

    const selector = useSelector(newDriverSelectorMemoized);
    // Load the state from Redux
    useState(() => {
        setFormData({ type: 'setUsername', data: selector?.phaseFourData?.username });
        setFormData({ type: 'setEmail', data: selector?.phaseFourData?.email });
        setFormData({ type: 'setPassword', data: selector?.phaseFourData?.password });
    }, []);

    return (
        <><Column className={'retailer-account-info-left'} lg={5} md={4} sm={8} xs={8}>
            <div className='grid-3'>
                <div className='em-card'>
                    <Heading className='sub-title'>{t('sub-title')}</Heading>
                    <TextInput labelText={t('username')} onChange={(e) => {
                        setFormData({ type: 'setUsername', data: e.target.value });
                    }}
                    value={state?.username} />
                    {errorState.includes('username') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            Please enter username</span>}
                    {errorState.includes('Username already reserved') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            This username already reserved</span>}
                    {errorState.includes('Some error occurred') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            Some error occurred</span>}
                    <br />
                    <TextInput labelText={t('email')} onChange={(e) => {
                        setFormData({ type: 'setEmail', data: e.target.value });
                    }}
                    value={state?.email} />
                    {errorState.includes('email') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            Please enter email</span>}
                    {errorState.includes('emailInvalid') &&
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
                        labelText={t('password')}
                        hidePasswordLabel='Hide password'
                        customStyle={{ width: '100%' }}
                        value={state?.password} />
                    {errorState.includes('password') &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            Please enter password</span>}
                    {errorState.includes('passwordInvalid') &&
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
                        customStyle={{ width: '100%' }} />
                    {state?.password !== state?.generatedPassword &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            Both password fields should be similar</span>}
                </div>
            </div>
        </Column><Column className={'retailer-account-info-left'} lg={8} md={8} sm={8} xs={8}></Column></>
    );
};

export default React.memo(CreateDriverAccountInfo);
