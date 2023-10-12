import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setStageOneCreateStore } from '../../redux/thunk/adminThunk';
import { useDispatch, useSelector } from 'react-redux';

// SCSS

import { Column, FileUploaderDropContainer, Grid, Heading, TextInput } from '@carbon/react';
import { setStoreLogo } from '../../../../js/util/SessionStorageUtil';
import { newStoreSelectorMemoized } from '../../redux/selector/newStorSelector';

const CreateRetailerBasicInfo = ({ setState, errorState }) => {
    const [translate] = useTranslation();
    
    const [selectedImageURL, setSelectedImageURL] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const selector = useSelector(newStoreSelectorMemoized);

    const [state, setFormData] = useReducer((state, action) => {
        switch (action?.type) {
            case 'setStoreName':
                return { ...state, storeName: action?.data };
            case 'setLogo':
                return { ...state, storeLogo: action?.data };
            case 'setAddressLineOne':
                return { ...state, address: { ...state?.address, addOne: action?.data } };
            case 'setAddressLineTwo':
                return { ...state, address: { ...state?.address, addTwo: action?.data } };
            case 'setAddressLineThree':
                return { ...state, address: { ...state?.address, addThree: action?.data } };
            case 'setAddressLineFour':
                return { ...state, address: { ...state?.address, addFour: action?.data } };
            case 'setAddressLineFive':
                return { ...state, address: { ...state?.address, addFive: action?.data } };
            case 'setAddressLineSix':
                return { ...state, address: { ...state?.address, addSix: action?.data } };;
            default:
                return { ...state };
        }
    }, {
        storeName: '',
        storeLogo: null,
        address: {
            addOne: '',
            addTwo: '',
            addThree: '',
            addFour: '',
            addFive: '',
            addSix: ''
        }
    });

    // Load the state from Redux
    useState(() => {
        setFormData({ type: 'setStoreName', data: selector?.phaseOneData?.storeName });
        setFormData({ type: 'setAddressLineOne', data: selector?.phaseOneData?.address?.addOne });
        setFormData({ type: 'setAddressLineTwo', data: selector?.phaseOneData?.address?.addTwo });
        setFormData({ type: 'setAddressLineThree', data: selector?.phaseOneData?.address?.addThree });
        setFormData({ type: 'setAddressLineFour', data: selector?.phaseOneData?.address?.addFour });
        setFormData({ type: 'setAddressLineFive', data: selector?.phaseOneData?.address?.addFive });
    }, []);

    // When changing the state, update the parent state 
    useEffect(() => {
        setState((currentState) => { return { ...currentState, ...state }; } );
    }, [state]);

    const handleFileChange = (event) => {
        const file = event?.dataTransfer?.files[0];
        if (file) {
            const maxSize = 200 * 1024;
            if (file.size > maxSize) {
                console.log('Image size exceeds 200KB. Please choose a smaller image.');
                event.target.value = '';
                setSelectedFile(null);
                return;
            }
            const imageUrl = URL.createObjectURL(file);
            setSelectedFile(file);
            setSelectedImageURL(imageUrl);
            setFormData({ type: 'setLogo', data: imageUrl });
            setStoreLogo(file);

        }         
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        setState((currentState) => { return { ...currentState, ...state }; } );
    }, [state, errorState]);

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.basic.${key}`), [translate]);

    return (
        <>
            <Column lg={5} md={4} sm={4} xs={4}>
                <div className='em-card'>
                    <Heading className='sub-title'>{t('sub-title')}</Heading>
                    <TextInput labelText={t('name')} onChange={(e) => {
                        setFormData({ type: 'setStoreName', data: e.target.value });
                    }} id='name' 
                    value = {state?.storeName}
                    />
                    {errorState === 'storeName' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter store name</span>}
                    <Heading className='sub-title'>{t('sub-title2')}</Heading>
                    <TextInput labelText={t('street')} onChange={(e) => {
                        setFormData({ type: 'setAddressLineOne', data: e.target.value });
                    }} 
                    value = {state?.address?.addOne}
                    />
                    {errorState === 'addOne' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter street</span>}
                    <TextInput labelText={t('number')} onChange={(e) => {
                        setFormData({ type: 'setAddressLineTwo', data: e.target.value });
                    }} 
                    value = {state?.address?.addTwo}
                    />
                    {errorState === 'addTwo' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter number</span>}
                    <TextInput labelText={t('city')} onChange={(e) => {
                        setFormData({ type: 'setAddressLineThree', data: e.target.value });
                    }} 
                    value = {state?.address?.addThree}
                    />
                    {errorState === 'addThree' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter city</span>}
                    <TextInput labelText={t('country')} onChange={(e) => {
                        setFormData({ type: 'setAddressLineFour', data: e.target.value });
                    }} 
                    value = {state?.address?.addFour}
                    />
                    {errorState === 'addFour' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter country</span>}
                    <TextInput labelText={t('zip')} onChange={(e) => {
                        setFormData({ type: 'setAddressLineFive', data: e.target.value });
                    }} 
                    value = {state?.address?.addFive}
                    />
                    {errorState === 'addFive' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter zip code</span>}
                </div>
            </Column>
            <Column lg={11} md={4} sm={4} xs={4}>
                <div className='em-card'>
                    <div className='grid-2'>
                        <div>
                            <Heading className='sub-title'>{t('sub-title3')}</Heading>
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
                            />
                        </div>
                        <div className='preview'>
                            <Heading className='sub-title'>{t('sub-title4')}</Heading>
                            <img height={'150px'} width={'200px'} src={selectedImageURL} alt='preview' />
                        </div>
                    </div>
                    <Heading className='sub-title'>{t('sub-title5')}</Heading>
                    <div className='map'>
                        {errorState === 'storeLogo' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please add your logo</span>}
                        {/* <GoogleMap /> */}
                        {/* <GeoContainer 
                            appData={googleMapAPIKey}
                            updateAddress={({ addOne }) => {
                                setFormData({ type: 'setAddressLineOne', data: addOne });
                            }}/> */}
                    </div>
                </div>
            </Column>
        </>
    );
};

export default React.memo(CreateRetailerBasicInfo);
