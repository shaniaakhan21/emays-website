import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Heading, Tile } from '@carbon/react';
import { Add, Close } from '@carbon/icons-react';
import TextBoxCustom from '../../common/TextBoxCustom';
import { useHistory } from 'react-router-dom';

// SCSS
import '../../../scss/component/retailer/deliveryOrders.scss';
import ShoppingItem from '../../checkout/ShoppingItem';
import FallBack from '../../../icons/fallback.png';
import { useDispatch, useSelector } from 'react-redux';
import { newOrderPhaseOneSelectorMemoized } from '../redux/selector/newOrderSelector';
import { setNewOrderPhaseTwoData } from '../redux/thunk/newOrderThunk';

const DeliveryOrder = () => {
    const [translate] = useTranslation();
    const history = useHistory();
    const [showScanModal, setShowScanModal] = useState(true);

    const newOrderPhaseOneData = useSelector(newOrderPhaseOneSelectorMemoized);

    const t = useCallback((key) => translate(`dashboard.deliveryOrders.${key}`), [translate]);

    const [orderInfo, setOrderInfo] = useReducer((state, action) => {
        switch (action?.type) {
            case 'setItems':    
                return { ...state, items: [...state?.items, action?.data] }; 
            case 'setTotal':
                return { ...state, total: action?.data };
        }
    }, {
        items: [],
        total: 0
    });
    const [finalCost, setFinalCost] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (newOrderPhaseOneData.isLoading) {
            console.log('Found');
        }
        const getFinalCost = (serviceCharge = 0.00) => {
            const itemsTotal = orderInfo?.items?.reduce((acc, next) => {
                return +acc + +next?.price; }, 0.00);
            return +serviceCharge + +itemsTotal;
        };
        setOrderInfo({ type: 'setTotal', data: getFinalCost() });
    }, [newOrderPhaseOneData, orderInfo?.items, orderInfo?.total]);

    const submitData = () => {
        dispatch(setNewOrderPhaseTwoData(orderInfo));
        if (orderInfo?.items?.length > 0) {
            dispatch(setNewOrderPhaseTwoData(orderInfo));
            history.push('/dashboard/orders/created');
        }
    };

    return (
        <div className='deliveryOrders'>
            <div className='header'>
                <div className='header-left'>
                    <Heading className='title'>{t('title')}</Heading>
                    <Heading className='sub-title'>{t('sub-title')}</Heading>
                    <div className='search-bar'>
                        <div className='input'>
                            <TextBoxCustom size='lg' labelText={t('search.input.label')}
                                helperText={t('search.input.help-text')}/>
                            <Button iconDescription='Add' hasIconOnly renderIcon={() => <Add/>} 
                                onClick = { () => {
                                    const item = {
                                        itemName: 'Product Name',
                                        image: FallBack,
                                        color: 'Red',
                                        size: 'Large',
                                        price: 15
                                    };
                                    setOrderInfo({ type: 'setItems', data: item });
                                } 
                                }/>
                        </div>
                        <Button renderIcon={() => <Add/>}>{t('search.button')}</Button>
                    </div>
                </div>
                <div className='header-right'>
                    <Tile>
                        <h5>{t('header-left.title')}</h5>
                        <h2>{orderInfo?.total}</h2>
                    </Tile>
                </div>
                <div className='header-right'>
                    <Tile>
                        <h5>{t('header-right.title')}</h5>
                        <h2>{orderInfo?.items?.length}</h2>
                    </Tile>
                </div>
            </div>
            <div className='items'>
                {showScanModal ? <div className='passive-modal'>
                    <Close onClick={() => setShowScanModal(true)}/>
                    <h2>{t('scanModal.title')}</h2>
                    <h6>{t('scanModal.description')}</h6>
                </div> : null}
                {orderInfo?.items?.map((item, index) => <ShoppingItem
                    index={index}
                    itemName={item?.name}
                    image={item?.image}
                    color={item?.color}
                    size={item?.size}
                    onDelete={() => {
                    }}
                    quantity={1}
                    price={item?.price}
                />)}
            </div>
            <div className='buttons'>
                <Button onClick={() => { submitData(); }} size='2xl'>{t('submit')}</Button>
            </div>
        </div>
    );
};

export default React.memo(DeliveryOrder);
