import { Grid, Column } from '@carbon/react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Components
import ContentSwitcherCustom from '../common/ContentSwitcherCustom';
import DatePickerCustom from '../common/DatePickerCustom';
import DropDownCustom from '../common/DropdownCustom';
import CheckBoxCustom from '../common/CheckBoxCustom';
import TextBoxCustom from '../common/TextBoxCustom';
import ButtonCustom from '../common/ButtonCustom';
import ShoppingBag from './ShoppingBag';

// SCSS
import '../../scss/component/checkout/checkout.scss';

// Images
import Emays from '../../logo/emays-logo-white.png';
import Blazer from '../../temp/coat.png';
import Watch from '../../temp/watch.png';

// Util
import { getProductList } from '../../js/util/SessionStorageUtil';

// TODO: Remove mock data and map to proper state when data binding

const items = [
    { id: 'option-0', text: 'Option 0' },
    { id: 'option-1', text: 'Option 1' },
    { id: 'option-2', text: 'Option 2' }
];

const productList = [{
    name: 'GANCINI WATCH',
    color: 'IP yellow Gold',
    quantity: 1,
    price: '€ 1,100.00',
    image: Watch },
{
    name: 'BLAZER',
    size: 40,
    color: 'Red',
    quantity: 1,
    price: '€ 1,100.00',
    image: Blazer
}
];

const Checkout = ({}) => {

    const [t] = useTranslation();

    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const productData = getProductList();
        setProductData(productData);
    }, []);

    const history = useHistory();

    return (
        <Grid className='landing-page'>
            <Column lg={16} md={16} sm={16} className='logo'>
                <img src={Emays} alt='The Emays logo' />
            </Column>
            <Column lg={8} md={8} sm={16} className='book-appointment'>
                <p>{t('checkout.book-appointment.header')}</p>
                <div className='next-date-picker'>
                    <ContentSwitcherCustom nextDateOne='Today Sat, Nov 2nd'
                        nextDateTwo='Sat, Nov 2nd'
                        nextDateThree='Sat, Nov 2nd'/>
                </div>
                <div className='date-time-pick'>
                    <p>Custom Date</p>
                    <div className='items'>
                        <div className='date'>
                            <p>{t('checkout.book-appointment.choose-date')}</p>
                            <DatePickerCustom customStyle={{ backgroundColor: 'white' }} />
                        </div>
                        <div className='time-window'>
                            <p>{t('checkout.book-appointment.choose-time')}</p>
                            <DropDownCustom items={items}/>
                        </div>
                    </div>
                </div>
                <div className='customize-experience'>
                    <div className='header'>
                        <p>{t('checkout.customize-experience.header')}</p>
                    </div>
                    <div className='options'>
                        <div className='checkbox-wait'>
                            <CheckBoxCustom
                                labelText={t('checkout.customize-experience.checkbox-wait-label')}
                                id={'op1'}
                                action={() => {}}
                            />
                        </div>
                        <div className='checkbox-assist'>
                            <CheckBoxCustom
                                labelText={t('checkout.customize-experience.checkbox-assist-label')}
                                id={'op2'}
                                action={() => {}}
                            />
                        </div>
                        <div className='checkbox-basic'>
                            <CheckBoxCustom
                                labelText={t('checkout.customize-experience.checkbox-basic-label')}
                                id={'op3'}
                                action={() => {}}
                            />
                        </div>
                    </div>
                </div>
                <div className='delivery-address'>
                    <div className='header'>
                        <p>{t('checkout.delivery-address.header')}</p>
                    </div>
                    <div className='address'>
                        <p>{t('checkout.delivery-address.address')}</p>
                    </div>
                    <div className='address-info'>
                        <div>
                            <TextBoxCustom customStyle={{ backgroundColor: 'white' }}/>
                        </div>
                        <div>
                            <TextBoxCustom customStyle={{ backgroundColor: 'white' }}/>
                        </div>
                        <div>
                            <TextBoxCustom customStyle={{ backgroundColor: 'white' }}/>
                        </div>
                        <div>
                            <TextBoxCustom customStyle={{ backgroundColor: 'white' }}/>
                        </div>
                    </div>
                </div>
                <div className='submit-button'>
                    <ButtonCustom
                        text={t('checkout.submit-button')}
                        action={() => { history.push('/confirm'); }}
                        type={'secondary'}
                        customStyle={{
                            minWidth: '100%',
                            marginTop: '25px',
                            marginBottom: '15px',
                            alignContent: 'center',
                            justifyContent: 'center'
                        }}
                    />
                </div>
            </Column>
            <Column lg={8} md={8} sm={16} className='shopping-bag'>
                <ShoppingBag productList={productData}/>
            </Column>
        </Grid>
    );

};

export default Checkout;
