import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useMessage } from '../../../common/messageCtx'; 
import { Column, FileUploaderDropContainer, Grid, Heading, TextInput } from '@carbon/react';
import { getStoreImage, 
    getStoreImageURL, setBufferStoreImage, setStoreImageURL, 
    setStoreLogo } from '../../../../js/util/SessionStorageUtil';
import { newStoreSelectorMemoized } from '../../redux/selector/newStorSelector';
import { getAppInfo } from '../../../../services/geo';
import GoogleMapWithSearchBar from '../../../common/googleMapWithSearchComponent';

const CreateRetailerBasicInfo = ({ setState, errorState }) => {
    const [translate] = useTranslation();
    
    const [selectedImageURL, setSelectedImageURL] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const selector = useSelector(newStoreSelectorMemoized);
    const pushAlert = useMessage();

    const [mapAPIKey, setMapAPIKey] = useState('');
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
                return { ...state, address: { ...state?.address, addSix: action?.data } };
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
        setFormData({ type: 'setStoreName', data: selector?.phaseTwoData?.storeName });
        setFormData({ type: 'setAddressLineOne', data: selector?.phaseTwoData?.address?.addOne });
        setFormData({ type: 'setAddressLineTwo', data: selector?.phaseTwoData?.address?.addTwo });
        setFormData({ type: 'setAddressLineThree', data: selector?.phaseTwoData?.address?.addThree });
        setFormData({ type: 'setAddressLineFour', data: selector?.phaseTwoData?.address?.addFour });
        setFormData({ type: 'setAddressLineFive', data: selector?.phaseTwoData?.address?.addFive });
        // SetFormData({ type: 'setLogo', data: selector?.phaseTwoData?.storeLogo });
        setSelectedImageURL(selector?.phaseTwoData?.storeLogo);
        setFormData({ type: 'setLogo', data: selector?.phaseTwoData?.storeLogo });
    }, []);

    // When changing the state, update the parent state 
    useEffect(() => {
        setState((currentState) => { return state; } );
        (async () => {
            const appInfo = await getAppInfo();
            setMapAPIKey(appInfo?.googleMapAPIKey);
        })();
        
    }, [state]);

    const handleFileChange = (event) => {
        const file = event?.dataTransfer?.files[0] || event?.target?.files[0];
        if (file) {
            const maxSize = 200 * 1024;
            if (file.size > maxSize) {
                console.log('Image size exceeds 200KB. Please choose a smaller image.');
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
            const reader = new FileReader();

            reader.onload = function (event) {
                const base64String = event.target.result;
                setSelectedFile(base64String);
                // For blob conversion if need
                setStoreLogo(base64String);

            };
            reader.readAsDataURL(file);
            setBufferStoreImage(file);
            setSelectedImageURL(imageUrl);
            setFormData({ type: 'setLogo', data: imageUrl });
            setStoreImageURL(imageUrl);
        }         
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        setState((currentState) => { return state; } );
    }, [state, errorState]);

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.basic.${key}`), [translate]);

    return (
        <>
            <Column className={'retailer-basic-info-left'} lg={5} md={4} sm={4} xs={4}>
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
                    <br />
                    <Heading className='sub-title'>{t('sub-title2')}</Heading>
                    <TextInput labelText={t('street')} onChange={(e) => {
                        setFormData({ type: 'setAddressLineOne', data: e.target.value });
                    }} 
                    value = {state?.address?.addOne}
                    />
                    {errorState === 'addOne' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter street</span>}
                    <br />
                    <TextInput labelText={t('number')} onChange={(e) => {
                        setFormData({ type: 'setAddressLineTwo', data: e.target.value });
                    }} 
                    value = {state?.address?.addTwo}
                    />
                    {errorState === 'addTwo' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter number</span>}
                    <br />
                    <TextInput labelText={t('city')} onChange={(e) => {
                        setFormData({ type: 'setAddressLineThree', data: e.target.value });
                    }} 
                    value = {state?.address?.addThree}
                    />
                    {errorState === 'addThree' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter city</span>}
                    <br />
                    <TextInput labelText={t('country')} onChange={(e) => {
                        setFormData({ type: 'setAddressLineFour', data: e.target.value });
                    }} 
                    value = {state?.address?.addFour}
                    />
                    {errorState === 'addFour' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please enter country</span>}
                    <br />
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
            <Column className={'retailer-basic-info-right'} lg={11} md={4} sm={4} xs={4}>
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
                                style = {{ width: '300px' }}
                            />
                        </div>
                        <div className='preview'>
                            <Heading className='sub-title'>{t('sub-title4')}</Heading>
                            <img src={selectedImageURL}/>
                            {errorState === 'storeLogo' &&
                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                Please add your logo</span>}
                            <br />
                        </div>
                    </div>
                    <div className='map'>
                        <a onClick={() => {
                            window.open('https://www.google.com/maps/place/45.464664,9.188540');
                        }}><Heading className='sub-title'>{t('sub-title5')}</Heading></a>
                        {
                            <GoogleMapWithSearchBar googleMapAPIKey={mapAPIKey} />
                        }
                    </div>
                </div>
            </Column>
        </>
    );
};

export default React.memo(CreateRetailerBasicInfo);
