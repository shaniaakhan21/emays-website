import { useEffect, useState } from 'react';
import { Grid, Column } from '@carbon/react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TextBoxCustom from '../common/TextBoxCustom';
import ShoppingBag from './ShoppingBag';
import ButtonCustom from '../common/ButtonCustom';

// SCSS
import '../../scss/component/checkout/confirm.scss';

// Images
import Emays from '../../logo/emays-logo-white.png';
import EditIcon from '../../icons/edit.svg';

// Util
import { getAddress, getProductList, getSelectedOptions } from '../../js/util/SessionStorageUtil';
import { useTranslation } from 'react-i18next';
import useSessionState from '../../js/util/useSessionState';
import { CHECKOUT_INFO } from '../../js/const/SessionStorageConst';

const Confirm = () => {

    const [t] = useTranslation();

    const history = useHistory();

    const [productData, setProductData] = useState([]);

    const [state, setState] = useSessionState(CHECKOUT_INFO);

    // Fetch product data from session storage
    useEffect(() => {
        const productData = getProductList();
        setProductData(productData);
    }, []);

    return (
        <Grid className='landing-page'>
            <Column lg={16} md={16} sm={16} xs={16} className='logo'>
                <img src={Emays} alt='The Emays logo' />
            </Column>
            <Column lg={8} md={8} sm={4} xs={4} className='your-appointment'>
                <div className='edit-appointment'>
                    <div className='text'>
                        <p>{t('confirm.edit-appointment.header')}</p>
                    </div>
                    <div className='edit-button'>
                        <div>
                            <img src={EditIcon} alt='edit icon' />
                        </div>
                        <div>
                            <a onClick={() => history.go(-1)}>{t('confirm.edit-appointment.edit-button')}</a>
                        </div>
                    </div>
                </div>
                <div className='user-appointment-info'>
                    <div className='date-time'>
                        <div className='date'>
                            <p><strong>{t('confirm.user-appointment-info.date')}</strong></p>
                            <div className='value'>
                                <p>{new Date(state?.date)?.toLocaleDateString()}</p>
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
                            {Object.entries(state?.options ?? {}).map(([key, value]) => {
                                if (value) {
                                    return <span key={key}>{key.replace(/^\w/, c => c.toUpperCase())}, </span>;
                                }
                                return null;
                            })}
                        </div>
                    </div>
                    <div className='delivery-address'>
                        <p><strong>{t('confirm.user-appointment-info.delivery-address')}</strong></p>
                        <div className='value'>
                            <p>{[
                                state?.address?.street,
                                state?.address?.city,
                                state?.address?.postalCode,
                                state?.address?.country
                            ]?.filter(e => !!e).join(', ')}</p>
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
                        text={t('confirm.submit-button')}
                        action={() => { history.push('/confirm'); }}
                        type={'secondary'}
                        customStyle={{
                            minWidth: '100%',
                            marginTop: '25px',
                            marginBottom: '15px',
                            alignContent: 'center',
                            justifyContent: 'center',
                            paddingLeft: '40px'
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
