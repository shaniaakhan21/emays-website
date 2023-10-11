import React, { useCallback, useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Column, FileUploaderDropContainer, Grid, Heading, TextInput } from '@carbon/react';
import GoogleMap from '../../../common/googleMap';

const CreateRetailerEmployeeInfo = ({ setState, errorState }) => {
    const [translate] = useTranslation();

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

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.employee.${key}`), [translate]);

    return (
        <>
            <Column lg={16} md={8} sm={8} xs={8}>
                <div className='grid-3'>
                    <div className='em-card'>
                        <Heading className='sub-title'>{t('sub-title')}</Heading>
                        <TextInput labelText={t('name')} onChange={(e) => {
                            setFormData({ type: 'setManagerName', data: e.target.value });
                        }} />
                        {errorState === 'managerName' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter name</span>}
                        <TextInput labelText={t('email')} onChange={(e) => {
                            setFormData({ type: 'setManagerEmail', data: e.target.value });
                        }} />
                        {errorState === 'managerEmail' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter email</span>}
                        <TextInput labelText={t('phone')} onChange={(e) => {
                            setFormData({ type: 'setManagerPhone', data: e.target.value });
                        }} />
                        {errorState === 'managerPhone' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter phone</span>}
                        <TextInput labelText={t('username')} onChange={(e) => {
                            setFormData({ type: 'setManagerUsername', data: e.target.value });
                        }} />
                        {errorState === 'managerUsername' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter username</span>}
                        {errorState === 'managerUsernameReserved' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                This username already reserved</span>}
                        <TextInput labelText={t('password')} onChange={(e) => {
                            setFormData({ type: 'setManagerPassword', data: e.target.value });
                        }} />
                        {errorState === 'managerPassword' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter password</span>}
                    </div>
                    <div className='em-card'>
                        <Heading className='sub-title'>{t('sub-title2')}</Heading>
                        <TextInput labelText={t('name')} onChange={(e) => {
                            setFormData({ type: 'setBusinessAdminName', data: e.target.value });
                        }} />
                        {errorState === 'adminName' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter name</span>}
                        <TextInput labelText={t('email')} onChange={(e) => {
                            setFormData({ type: 'setBusinessAdminEmail', data: e.target.value });
                        }} />
                        {errorState === 'adminEmail' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter email</span>}
                        <TextInput labelText={t('phone')} onChange={(e) => {
                            setFormData({ type: 'setBusinessAdminPhone', data: e.target.value });
                        }} />
                        {errorState === 'adminPhone' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter phone</span>}
                        <TextInput labelText={t('username')} onChange={(e) => {
                            setFormData({ type: 'setBusinessAdminUsername', data: e.target.value });
                        }} />
                        {errorState === 'adminUsername' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter username</span>}
                        {errorState === 'adminUsernameReserved' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                This username already reserved</span>}
                        <TextInput labelText={t('password')} onChange={(e) => {
                            setFormData({ type: 'setBusinessAdminPassword', data: e.target.value });
                        }} />
                        {errorState === 'adminPassword' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter password</span>}
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
