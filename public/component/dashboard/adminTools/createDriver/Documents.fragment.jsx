import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Column, FileUploaderDropContainer, Heading, TextInput } from '@carbon/react';
import { useMessage } from '../../../common/messageCtx';
import { setLicenseDocument } from '../../../../js/util/SessionStorageUtil';

const CreateDriverDocuments = ({ setState, errorState }) => {
    const [translate] = useTranslation();
    const pushAlert = useMessage();
    const [selectedImageURL, setSelectedImageURL] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [state, setFormData] = useReducer((state, action) => {
        switch (action?.type) {
            case 'setLicenseNumber':
                return { ...state, licenseNumber: action?.data };
            case 'setCarModel':
                return { ...state, carModel: action?.data };
            case 'setCarPlate':
                return { ...state, carPlate: action?.data };
            case 'setLicenseDoc':
                return { ...state, licenseDoc: action?.data };
            default:
                return { ...state };
        }
    }, {
        licenseNumber: '',
        carModel: '',
        carPlate: '',
        licenseDoc: ''
    });

    useEffect(() => {
        setState((currentState) => { return { ...currentState, ...state }; } );
    }, [state]);

    const handleFileChange = (event) => {
        const file = event?.dataTransfer?.files[0] || event?.target?.files[0];
        if (file) {
            const maxSize = 200 * 1024;
            if (file.size > maxSize) {
                pushAlert({
                    kind: 'error',
                    title: 'Selected image is too large.',
                    subtitle: 'The image size should less than 400KB.'
                });
                event.target.value = '';
                setSelectedFile(null);
                return;
            }
            const imageUrl = URL.createObjectURL(file);
            setSelectedFile(file);
            setSelectedImageURL(imageUrl);
            setFormData({ type: 'setLicenseDoc', data: imageUrl });
            setLicenseDocument(file);

        }         
    };

    const t = useCallback((key) => translate(`dashboard.adminTools.createDriver.documents.${key}`), [translate]);

    return (
        <>
            <Column lg={5} md={4} sm={8} xs={8}>
                <TextInput labelText={t('number')} onChange={(e) => {
                    setFormData({ type: 'setLicenseNumber', data: e.target.value });
                }} id='licenseNumber' 
                value = {state?.licenseNumber}
                />
                {errorState === 'licenseNumber' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            Please enter number</span>}

                <TextInput labelText={t('carModel')} onChange={(e) => {
                    setFormData({ type: 'setCarModel', data: e.target.value });
                }} id='carModel' 
                value = {state?.carModel}
                />
                {errorState === 'carModel' &&
                    <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            Please enter car model</span>}

                <TextInput labelText={t('carPlate')} onChange={(e) => {
                    setFormData({ type: 'setCarPlate', data: e.target.value });
                }} id='carPlate' 
                value = {state?.carPlate}
                />
                {errorState === 'carPlate' &&
                    <span style={{ 'color': 'red', 'font-size': '12px' }}>
                            Please enter car plate</span>}
            </Column>
            <Column lg={11} md={4} sm={8} xs={8}>
                <div className='em-card'>
                    <div>
                        <Heading className='sub-title'>
                            {t('sub-title2')}
                            &nbsp;
                            <span className='info'>{t('sub-title2-info')}</span>
                        </Heading>
                        <FileUploaderDropContainer
                            accept={[
                                'image/jpeg',
                                'image/png'
                            ]}
                            innerRef={{
                                current: '[Circular]'
                            }}
                            labelText={t('upload')}
                            multiple
                            name=''
                            onAddFiles={(e) => { handleFileChange(e); }}
                            onChange={e => { console.log('onChange', e); } }
                            tabIndex={0}
                            style = {{ width: '300px' }}
                        />
                    </div>
                    <div className='preview'>
                        <Heading className='sub-title'>{t('sub-title3')}</Heading><br />
                        <img height={'150px'} width={'200px'} src={selectedImageURL} alt='preview' />
                        <br />
                        {errorState === 'licenseDoc' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please add license document</span>}
                    </div>
                </div>
            </Column>
        </>
    );
};

export default React.memo(CreateDriverDocuments);
