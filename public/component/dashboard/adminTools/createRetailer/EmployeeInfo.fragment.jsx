import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Column, FileUploaderDropContainer, Grid, Heading, TextInput } from '@carbon/react';
import GoogleMap from '../../../common/googleMap';
import { useSelector } from 'react-redux';
import { newStoreSelectorMemoized } from '../../redux/selector/newStorSelector';
import ContactNumberInput from '../../../common/ContactNumberInput';
import TextBoxPassword from '../../../common/TextBoxPassword';

const CreateRetailerEmployeeInfo = ({ setState, errorState }) => {

    const [translate] = useTranslation();
    const selector = useSelector(newStoreSelectorMemoized);

    const [state, setFormData] = useReducer((state, action) => {
        switch (action?.type) {
            case 'setManagerName':
                return { ...state, manager: { ...state?.manager, managerName: action?.data } };
            case 'setManagerEmail':
                return { ...state, manager: { ...state?.manager, managerEmail: action?.data } };
            case 'setManagerPhone':
                return { ...state, manager: { ...state?.manager, managerPhone: action?.data } };
            case 'setManagerUsername':
                return { ...state, manager: { ...state?.manager, managerUsername: action?.data } };
            case 'setManagerPassword':
                return { ...state, manager: { ...state?.manager, managerPassword: action?.data } };
            case 'setBusinessAdminName':
                return { ...state, businessAdmin: { ...state?.businessAdmin, adminName: action?.data } };
            case 'setBusinessAdminEmail':
                return { ...state, businessAdmin: { ...state?.businessAdmin, adminEmail: action?.data } };
            case 'setBusinessAdminPhone':
                return { ...state, businessAdmin: { ...state?.businessAdmin, adminPhone: action?.data } };
            case 'setBusinessAdminUsername':
                return { ...state, businessAdmin: { ...state?.businessAdmin, adminUsername: action?.data } };
            case 'setBusinessAdminPassword':
                return { ...state, businessAdmin: { ...state?.businessAdmin, adminPassword: action?.data } };
            default:
                return { ...state };
        }
    }, {
        manager: {
            managerName: '',
            managerEmail: '',
            managerPhone: '',
            managerUsername: '',
            managerPassword: ''
        },
        businessAdmin: {
            adminName: '',
            adminEmail: '',
            adminPhone: '',
            adminUsername: '',
            adminPassword: ''
        }
    });

    useEffect(() => {
        setState((currentState) => { return { ...currentState, ...state }; } );
    }, [state]);

    // Load the state from Redux
    useState(() => {
        setFormData({ type: 'setManagerName', data: selector?.phaseThreeData?.manager?.managerName });
        setFormData({ type: 'setManagerEmail', data: selector?.phaseThreeData?.manager?.managerEmail });
        setFormData({ type: 'setManagerPhone', data: selector?.phaseThreeData?.manager?.managerPhone });
        setFormData({ type: 'setManagerUsername', data: selector?.phaseThreeData?.manager?.managerUsername });
        setFormData({ type: 'setManagerPassword', data: selector?.phaseThreeData?.manager?.managerPassword });

        setFormData({ type: 'setBusinessAdminName', data: selector?.phaseThreeData?.businessAdmin?.adminName });
        setFormData({ type: 'setBusinessAdminEmail', data: selector?.phaseThreeData?.businessAdmin?.adminEmail });
        setFormData({ type: 'setBusinessAdminPhone', data: selector?.phaseThreeData?.businessAdmin?.adminPhone });
        setFormData({ type: 'setBusinessAdminUsername', data: selector?.phaseThreeData?.businessAdmin?.adminUsername });
        setFormData({ type: 'setBusinessAdminPassword', data: selector?.phaseThreeData?.businessAdmin?.adminPassword });
    }, []);

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.employee.${key}`), [translate]);

    return (
        <>
            <Column lg={16} md={8} sm={8} xs={8}>
                <div className='grid-3'>
                    <div className='em-card'>
                        <Heading className='sub-title'>{t('sub-title')}</Heading>
                        <TextInput labelText={t('name')} onChange={(e) => {
                            setFormData({ type: 'setManagerName', data: e.target.value });
                        }} 
                        value = {state?.manager?.managerName}
                        />
                        {errorState === 'managerName' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter name</span>}
                        <TextInput labelText={t('email')} onChange={(e) => {
                            setFormData({ type: 'setManagerEmail', data: e.target.value });
                        }} 
                        value = {state?.manager?.managerEmail}
                        />
                        {errorState === 'managerEmail' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter email</span>}
                        {errorState === 'emailInvalidManager' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter a valid email</span>}
                        <br></br>
                        <ContactNumberInput 
                            actionFunc= {(value) => { setFormData({ type: 'setManagerPhone', data: value }); }}
                            data = {state?.manager?.managerPhone || ''}
                        />
                        {/* <TextInput labelText={t('phone')} onChange={(e) => {
                            setFormData({ type: 'setManagerPhone', data: e.target.value });
                        }} 
                        value = {state?.manager?.managerPhone}
                        /> */}
                        {errorState === 'managerPhone' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter phone</span>}
                        <TextInput labelText={t('username')} onChange={(e) => {
                            setFormData({ type: 'setManagerUsername', data: e.target.value });
                        }} 
                        value = {state?.manager?.managerUsername}
                        />
                        {errorState === 'managerUsername' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter username</span>}
                        {errorState === 'managerUsernameReserved' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                This username already reserved</span>}
                        <TextBoxPassword
                            onChange={(e) => {
                                setFormData({ type: 'setManagerPassword', data: e.target.value });
                            }}
                            labelText={t('password')}
                            hidePasswordLabel='Hide password'
                            customStyle={{ width: '100%' }}
                        />
                        {errorState === 'managerPassword' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter password</span>}
                        {errorState === 'passwordInvalidManager' && 
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            The password must consist of only uppercase letters, lowercase letters, digits,
                             the specified special characters (@, $, !, %, *, ?) and must be at least 8 
                             characters in length </span>}
                    </div>
                    <div className='em-card'>
                        <Heading className='sub-title'>{t('sub-title2')}</Heading>
                        <TextInput labelText={t('name')} onChange={(e) => {
                            setFormData({ type: 'setBusinessAdminName', data: e.target.value });
                        }} 
                        value = {state?.businessAdmin?.adminName}
                        />
                        {errorState === 'adminName' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter name</span>}
                        <TextInput labelText={t('email')} onChange={(e) => {
                            setFormData({ type: 'setBusinessAdminEmail', data: e.target.value });
                        }} 
                        value = {state?.businessAdmin?.adminEmail}
                        />
                        {errorState === 'adminEmail' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter email</span>}
                        {errorState === 'emailInvalidAdmin' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter a valid email</span>}       
                        {/* <TextInput labelText={t('phone')} onChange={(e) => {
                            setFormData({ type: 'setBusinessAdminPhone', data: e.target.value });
                        }} 
                        value = {stat
                            e?.businessAdmin?.adminPhone}
                        /> */}
                        <br></br>
                        <ContactNumberInput 
                            actionFunc= {(value) => { setFormData({ type: 'setBusinessAdminPhone', data: value }); }}
                            data = {state?.businessAdmin?.adminPhone || ''}
                        />
                        {errorState === 'adminPhone' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter phone</span>}
                        <TextInput labelText={t('username')} onChange={(e) => {
                            setFormData({ type: 'setBusinessAdminUsername', data: e.target.value });
                        }} 
                        value = {state?.businessAdmin?.adminUsername}
                        />
                        {errorState === 'adminUsername' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter username</span>}
                        {errorState === 'adminUsernameReserved' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                This username already reserved</span>}
                        <TextBoxPassword
                            onChange={(e) => {
                                setFormData({ type: 'setBusinessAdminPassword', data: e.target.value });
                            }}
                            labelText={t('password')}
                            hidePasswordLabel='Hide password'
                            customStyle={{ width: '100%' }}
                        />
                        {errorState === 'adminPassword' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter password</span>}
                        {errorState === 'passwordInvalidAdmin' && <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            The password must consist of only uppercase letters, lowercase letters, digits,
                             the specified special characters (@, $, !, %, *, ?) and must be at least 8 
                             characters in length </span>}
                    </div>
                    {/* <div className='em-card'>
                        <Heading className='sub-title'>{t('sub-title3')}</Heading>
                        {[
                            'name',
                            'email',
                            'phone'
                        ].map((item, idx) => (
                            <TextInput key={idx} labelText={t(item)} onChange={onChange} id={item} />
                        ))}
                    </div> */}
                </div>
            </Column>
        </>
    );
};

export default React.memo(CreateRetailerEmployeeInfo);
