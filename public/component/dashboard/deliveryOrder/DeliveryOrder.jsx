import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Heading, Modal, Tile } from '@carbon/react';
import { Add, Close } from '@carbon/icons-react';
import TextBoxCustom from '../../common/TextBoxCustom';
import { useHistory } from 'react-router-dom';

// SCSS
import '../../../scss/component/retailer/deliveryOrders.scss';
import ButtonCustom from '../../common/ButtonCustom';
import ShoppingItem from '../../checkout/ShoppingItem';
import FallBack from '../../../icons/fallback.png';

const DeliveryOrder = () => {
    const [translate] = useTranslation();
    const history = useHistory();
    const [showScanModal, setShowScanModal] = useState(true);

    const t = useCallback((key) => translate(`dashboard.deliveryOrders.${key}`), [translate]);

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
                            <Button iconDescription='Add' hasIconOnly renderIcon={() => <Add/>}/>
                        </div>
                        <Button renderIcon={() => <Add/>}>{t('search.button')}</Button>
                    </div>
                </div>
                <div className='header-right'>
                    <Tile>
                        <h5>{t('header-right.title')}</h5>
                        <h2>6</h2>
                    </Tile>
                </div>
            </div>
            <div className='items'>
                {showScanModal ? <div className='passive-modal'>
                    <Close onClick={() => setShowScanModal(false)}/>
                    <h2>{t('scanModal.title')}</h2>
                    <h6>{t('scanModal.description')}</h6>
                </div> : null}
                {Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9).map((item, index) => <ShoppingItem
                    index={1}
                    itemName={'productName'}
                    image={FallBack}
                    color={'Red'}
                    size={'40'}
                    onDelete={() => {
                    }}
                    quantity={index}
                    price={'$10'}
                />)}
            </div>
            <div className='buttons'>
                <Button onClick={() => { history.push('/dashboard/orders/created'); }} size='2xl'>{t('submit')}</Button>
            </div>
        </div>
    );
};

export default React.memo(DeliveryOrder);
