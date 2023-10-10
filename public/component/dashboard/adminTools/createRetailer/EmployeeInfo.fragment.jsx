import React, { useCallback, useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Column, FileUploaderDropContainer, Grid, Heading, TextInput } from '@carbon/react';
import GoogleMap from '../../../common/googleMap';

const CreateRetailerEmployeeInfo = ({ setState }) => {
    const [translate] = useTranslation();

    const [state, setFormData] = useReducer((state, action) => {
        switch (action?.type) {
            case 'setManagerName':
                return { ...state, manager: { ...state?.manager, name: action?.data } };
            case 'setManagerEmail':
                return { ...state, manager: { ...state?.manager, email: action?.data } };
            case 'setManagerPhone':
                return { ...state, manager: { ...state?.manager, phone: action?.data } };
            case 'setManagerUsername':
                return { ...state, manager: { ...state?.manager, username: action?.data } };
            case 'setManagerPassword':
                return { ...state, manager: { ...state?.manager, password: action?.data } };
            case 'setBusinessAdminName':
                return { ...state, businessAdmin: { ...state?.businessAdmin, name: action?.data } };
            case 'setBusinessAdminEmail':
                return { ...state, businessAdmin: { ...state?.businessAdmin, email: action?.data } };
            case 'setBusinessAdminPhone':
                return { ...state, businessAdmin: { ...state?.businessAdmin, phone: action?.data } };
            case 'setBusinessAdminUsername':
                return { ...state, businessAdmin: { ...state?.businessAdmin, username: action?.data } };
            case 'setBusinessAdminPassword':
                return { ...state, businessAdmin: { ...state?.businessAdmin, password: action?.data } };
            default:
                return { ...state };
        }
    }, {
        manager: {
            name: '',
            email: '',
            phone: '',
            username: '',
            password: ''
        },
        businessAdmin: {
            name: '',
            email: '',
            phone: '',
            username: '',
            password: ''
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
                        <TextInput labelText={t('email')} onChange={(e) => {
                            setFormData({ type: 'setManagerEmail', data: e.target.value });
                        }} />
                        <TextInput labelText={t('phone')} onChange={(e) => {
                            setFormData({ type: 'setManagerPhone', data: e.target.value });
                        }} />
                        <TextInput labelText={t('username')} onChange={(e) => {
                            setFormData({ type: 'setManagerUsername', data: e.target.value });
                        }} />
                        <TextInput labelText={t('password')} onChange={(e) => {
                            setFormData({ type: 'setManagerPassword', data: e.target.value });
                        }} />
                    </div>
                    <div className='em-card'>
                        <Heading className='sub-title'>{t('sub-title2')}</Heading>
                        <TextInput labelText={t('name')} onChange={(e) => {
                            setFormData({ type: 'setBusinessAdminName', data: e.target.value });
                        }} />
                        <TextInput labelText={t('email')} onChange={(e) => {
                            setFormData({ type: 'setBusinessAdminEmail', data: e.target.value });
                        }} />
                        <TextInput labelText={t('phone')} onChange={(e) => {
                            setFormData({ type: 'setBusinessAdminPhone', data: e.target.value });
                        }} />
                        <TextInput labelText={t('username')} onChange={(e) => {
                            setFormData({ type: 'setBusinessAdminUsername', data: e.target.value });
                        }} />
                        <TextInput labelText={t('password')} onChange={(e) => {
                            setFormData({ type: 'setBusinessAdminPassword', data: e.target.value });
                        }} />
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
