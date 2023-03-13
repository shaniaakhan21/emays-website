import { Grid, Column } from '@carbon/react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

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

// Util
import { getProductList, saveSelectedOptions } from '../../js/util/SessionStorageUtil';
import { ADDRESS, CHECKOUT_INFO } from '../../js/const/SessionStorageConst';
import { useTranslation } from 'react-i18next';
import useSessionState from '../../js/util/useSessionState';

// TODO: Remove mock data and map to proper state when data binding

const items = [
    { id: 'option-0', text: 'Option 0' },
    { id: 'option-1', text: 'Option 1' },
    { id: 'option-2', text: 'Option 2' }
];

const Checkout = () => {

    const [t] = useTranslation();

    const [state, setState] = useSessionState(CHECKOUT_INFO, { address: {}, options: {} });

    // Handler function for option change
    const handleOptionChange = (option) => {
        setState(cs => ({ ...cs, options: { ...cs.options, [option]: !cs.options[option] } }));
    };

    // State for product data
    const [productData, setProductData] = useState([]);

    // Get product data from session storage and update product data state
    useEffect(() => {
        const productData = getProductList();
        setProductData(productData);
    }, []);

    const history = useHistory();

    const submit = () => {
        setState(cs => ({ ...cs, locked: true }));
        history.push('/confirm');
    };

    return (
        <Grid className='landing-page'>
            <Column lg={16} md={16} sm={16} xs={16} className='logo'>
                <img src={Emays} alt='The Emays logo' />
            </Column>
            <Column lg={8} md={8} sm={4} xs={4} className='book-appointment'>
                <p>{t('checkout.book-appointment.header')}</p>
                <div className='next-date-picker'>
                    <ContentSwitcherCustom
                        disabled={state?.locked}
                        nextDateOne='Today Sat, Nov 2nd'
                        nextDateTwo='Sat, Nov 2nd'
                        nextDateThree='Sat, Nov 2nd'/>
                </div>
                <div className='date-time-pick'>
                    <p>{t('checkout.book-appointment.custom-date')}</p>
                    <div className='items'>
                        <div className='date'>
                            <p>{t('checkout.book-appointment.choose-date')}</p>
                            <DatePickerCustom
                                disabled={state?.locked}
                                handleDateChange={date => setState(cs => ({ ...cs, date }))}
                                selectedDate={state?.date ? new Date(state?.date) : undefined}
                            />
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
                                action={() => handleOptionChange('inspire')}
                                checked={state?.options?.inspire}
                            />
                        </div>
                        <div className='checkbox-assist'>
                            <CheckBoxCustom
                                labelText={t('checkout.customize-experience.checkbox-assist-label')}
                                id={'op2'}
                                action={() => handleOptionChange('assist')}
                                checked={state?.options?.assist}
                            />
                        </div>
                        <div className='checkbox-basic'>
                            <CheckBoxCustom
                                labelText={t('checkout.customize-experience.checkbox-basic-label')}
                                id={'op3'}
                                action={() => handleOptionChange('tailoring')}
                                checked={state?.options?.tailoring}
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
                            <TextBoxCustom
                                customStyle={{ backgroundColor: 'white' }}
                                value={state?.address?.street ?? ''}
                                onChange={
                                    (e) => setState(
                                        cs => ({ ...cs, address: { ...cs.address, street: e.target.value } })
                                    )
                                }
                                required />
                        </div>
                        <div>
                            <TextBoxCustom
                                customStyle={{ backgroundColor: 'white' }}
                                value={state?.address?.city}
                                onChange={
                                    (e) => setState(
                                        cs => ({ ...cs, address: { ...cs.address, city: e.target.value } })
                                    )
                                }
                                required />
                        </div>
                        <div>
                            <TextBoxCustom
                                customStyle={{ backgroundColor: 'white' }}
                                value={state?.address?.postalCode}
                                onChange={
                                    (e) => setState(
                                        cs => ({ ...cs, address: { ...cs.address, postalCode: e.target.value } })
                                    )
                                }
                                required />
                        </div>
                        <div>
                            <TextBoxCustom
                                customStyle={{ backgroundColor: 'white' }}
                                value={state?.address?.country}
                                onChange={
                                    (e) => setState(
                                        cs => ({ ...cs, address: { ...cs.address, country: e.target.value } })
                                    )
                                }
                                required />
                        </div>
                    </div>
                </div>
                <div className='submit-button'>
                    <ButtonCustom
                        text={t('checkout.submit-button')}
                        action={submit}
                        type={'secondary'}
                        customStyle={{
                            minWidth: '100%',
                            marginTop: '25px',
                            marginBottom: '15px',
                            alignContent: 'center',
                            justifyContent: 'center',
                            padding: '1%'
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

Checkout.propTypes = {
    address: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    selectedOptions: PropTypes.shape({
        assist: PropTypes.bool.isRequired,
        tailoring: PropTypes.bool.isRequired,
        inspire: PropTypes.bool.isRequired
    }).isRequired,
    handleDateChange: PropTypes.func.isRequired,
    handleAddressChange: PropTypes.func.isRequired,
    handleOptionChange: PropTypes.func.isRequired
};

export default Checkout;
