import { useEffect, useState } from 'react';
import { Grid, Column } from '@carbon/react';
import TextBoxCustom from '../common/TextBoxCustom';
import ShoppingBag from './ShoppingBag';
import ButtonCustom from '../common/ButtonCustom';

// SCSS
import '../../scss/component/checkout/confirm.scss';

// Images
import Emays from '../../logo/emays-logo-white.png';
import EditIcon from '../../icons/edit.svg';
import Blazer from '../../temp/coat.png';
import Watch from '../../temp/watch.png';

// Util
import { getProductList } from '../../js/util/SessionStorageUtil';
import { useTranslation } from 'react-i18next';

// TODO: get these items from the session storage. These items should be written to the SS by prev component.
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

const Confirm = () => {

    const [t] = useTranslation();

    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const productData = getProductList();
        setProductData(productData);
    }, []);

    return (
        <Grid className='landing-page'>
            <Column lg={16} md={16} sm={16} className='logo'>
                <img src={Emays} alt='The Emays logo' />
            </Column>
            <Column lg={8} md={8} sm={16} className='your-appointment'>
                <div className='edit-appointment'>
                    <div className='text'>
                        <p>{t('confirm.edit-appointment.header')}</p>
                    </div>
                    <div className='edit-button'>
                        <div>
                            <img src={EditIcon} alt='edit icon' />
                        </div>
                        <div>
                            <a onClick={() => {}}>{t('confirm.edit-appointment.edit-button')}</a>
                        </div>
                    </div>
                </div>
                <div className='user-appointment-info'>
                    <div className='date-time'>
                        <div className='date'>
                            <p><strong>{t('confirm.user-appointment-info.date')}</strong></p>
                            <div className='value'>
                                <p>12/12/23</p>
                            </div>
                        </div>
                        <div className='hour'>
                            <p><strong>{t('confirm.user-appointment-info.hour')}</strong></p>
                            <div className='value'>
                                <p>14:00 to 15:00</p>
                            </div>
                        </div>
                    </div>
                    <div className='selected-experience'>
                        <p><strong>{t('confirm.user-appointment-info.selected-experience')}</strong></p>
                        <div className='value'>
                            <p>Asist me, Tailoring, Inspire me.</p>
                        </div>
                    </div>
                    <div className='delivery-address'>
                        <p><strong>{t('confirm.user-appointment-info.delivery-address')}</strong></p>
                        <div className='value'>
                            <p>Sample Address, Milano, Italia 06830</p>
                        </div>
                    </div>
                </div>
                <div className='contact-details'>
                    <div className='text'>
                        <p>{t('confirm.contact-details.header')}</p>
                    </div>
                    <div className='info-text'>
                        <p>
                            <u><strong>{t('confirm.contact-details.info-text-important')}</strong></u>
                            {t('confirm.contact-details.info-text')}
                        </p>
                    </div>
                    <div className='user-contact-name'>
                        <div>
                            <p>{t('confirm.contact-details.first-name')}</p>
                            <TextBoxCustom customStyle={{ backgroundColor: 'white' }}/>
                        </div>
                        <div>
                            <p>{t('confirm.contact-details.last-name')}</p>
                            <TextBoxCustom customStyle={{ backgroundColor: 'white' }}/>
                        </div>
                    </div>
                    <div className='user-contact-email-number'>
                        <div>
                            <p>{t('confirm.contact-details.phone-number')}</p>
                            <TextBoxCustom customStyle={{ backgroundColor: 'white' }}/>
                        </div>
                        <div>
                            <p>{t('confirm.contact-details.email')}</p>
                            <TextBoxCustom customStyle={{ backgroundColor: 'white' }}/>
                        </div>
                    </div>
                </div>
                <div className='submit-button'>
                    <ButtonCustom
                        text={t('confirm.contact-details.submit-button')}
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

export default Confirm;
