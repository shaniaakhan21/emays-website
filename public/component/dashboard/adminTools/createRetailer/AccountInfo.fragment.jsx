import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Column, Heading, TextInput } from '@carbon/react';
import GeneratePassword from '../../../common/GeneratePassword';
import { newStoreSelectorMemoized } from '../../redux/selector/newStorSelector';
import { useSelector } from 'react-redux';
import TextBoxPassword from '../../../common/TextBoxPassword';

const CreateRetailerAccountInfo = ({ setState, errorState }) => {

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
        setFormData({ type: 'setUsername', data: selector?.phaseTwoData?.username });
        setFormData({ type: 'setEmail', data: selector?.phaseTwoData?.email });
        setFormData({ type: 'setPassword', data: selector?.phaseTwoData?.password });
        setFormData({ type: 'setGeneratedPassword', data: selector?.phaseTwoData?.generatedPassword });
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
        <Column lg={16} md={16} sm={8} xs={8}>
            <div className='grid-3'>
                <div className='em-card'>
                    <Heading className='sub-title'>{t('sub-title')}</Heading>
                    <TextInput labelText={t('username')} onChange={(e) => {
                        setFormData({ type: 'setUsername', data: e.target.value });
                    }}
                    value = {state?.username}
                    />
                    {errorState === 'username' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter username</span>}
                    {errorState === 'usernameReserved' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                This username already reserved</span>}
                    <TextInput labelText={t('email')} onChange={(e) => {
                        setFormData({ type: 'setEmail', data: e.target.value });
                    }} 
                    value = {state?.email}
                    />
                    {errorState === 'email' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter email</span>}
                    {errorState === 'emailInvalid' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter a valid email</span>}            
                    {/* <TextInput labelText={t('password')} onChange={(e) => {
                        setFormData({ type: 'setPassword', data: e.target.value });
                    }}
                    value = {state?.password}
                    /> */}
                    <TextBoxPassword
                        onChange={(e) => {
                            setFormData({ type: 'setPassword', data: e.target.value });
                        }}
                        labelText='Password'
                        hidePasswordLabel='Hide password'
                        customStyle={{ width: '100%' }}
                    />
                    {errorState === 'password' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter password</span>}
                    {errorState === 'passwordInvalid' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            The password must consist of only uppercase letters, lowercase letters, digits,
                             the specified special characters (@, $, !, %, *, ?) and must be at least 8 
                             characters in length </span>}
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
