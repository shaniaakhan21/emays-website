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
import { ADDRESS } from '../../js/const/SessionStorageConst';
import { useTranslation } from 'react-i18next';

// TODO: Remove mock data and map to proper state when data binding

const items = [
    { id: 'option-0', text: 'Option 0' },
    { id: 'option-1', text: 'Option 1' },
    { id: 'option-2', text: 'Option 2' }
];

const Checkout = () => {

    const [t] = useTranslation();

    // State for selected date
    const [selectedDate, setSelectedDate] = useState(null);

    // Handler function for date change
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    // State for delivery address
    const [address, setAddress] = useState({});

    // Remove address from session storage and reset address state
    useEffect(() => {
        sessionStorage.removeItem(ADDRESS);
        setAddress({});
    }, []);

    // Get address from session storage and update address state
    useEffect(() => {
        const storedAddress = JSON.parse(sessionStorage.getItem(ADDRESS));
        if (storedAddress) {
            setAddress(storedAddress || {} );
        }
    }, []);

    // Save address to session storage on address state change
    useEffect(() => {
        sessionStorage.setItem(ADDRESS, JSON.stringify(address));
    }, [address]);
    
    const handleAddressChange = (event, field) => {
        const { value } = event.target;
        setAddress({ ...address, [field]: value });
    };

    // State for selected options
    const [selectedOptions, setSelectedOptions] = useState({
        assist: false,
        tailoring: false,
        inspire: false
    });

    // Handler function for option change
    const handleOptionChange = (option) => {
        setSelectedOptions({ ...selectedOptions, [option]: !selectedOptions[option] });
    };

    // Get selected options from session storage and update selected options state
    useEffect(() => {
        saveSelectedOptions(selectedOptions);
    }, [selectedOptions]);

    // State for product data
    const [productData, setProductData] = useState([]);

    // Get product data from session storage and update product data state
    useEffect(() => {
        const productData = getProductList();
        setProductData(productData);
    }, []);

    const history = useHistory();

    return (
        <Grid className='landing-page'>
            <Column lg={16} md={16} sm={16} xs={16} className='logo'>
                <img src={Emays} alt='The Emays logo' />
            </Column>
            <Column lg={8} md={8} sm={4} xs={4} className='book-appointment'>
                <p>{t('checkout.book-appointment.header')}</p>
                <div className='next-date-picker'>
                    <ContentSwitcherCustom nextDateOne='Today Sat, Nov 2nd'
                        nextDateTwo='Sat, Nov 2nd'
                        nextDateThree='Sat, Nov 2nd'/>
                </div>
                <div className='date-time-pick'>
                    <p>{t('checkout.book-appointment.custom-date')}</p>
                    <div className='items'>
                        <div className='date'>
                            <p>{t('checkout.book-appointment.choose-date')}</p>
                            <DatePickerCustom handleDateChange={handleDateChange} selectedDate={selectedDate} />
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
                                checked={selectedOptions.inspire}
                            />
                        </div>
                        <div className='checkbox-assist'>
                            <CheckBoxCustom
                                labelText={t('checkout.customize-experience.checkbox-assist-label')}
                                id={'op2'}
                                action={() => handleOptionChange('assist')}
                                checked={selectedOptions.assist}
                            />
                        </div>
                        <div className='checkbox-basic'>
                            <CheckBoxCustom
                                labelText={t('checkout.customize-experience.checkbox-basic-label')}
                                id={'op3'}
                                action={() => handleOptionChange('tailoring')}
                                checked={selectedOptions.tailoring}
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
                                value={address.street}
                                onChange={(e) => handleAddressChange(e, 'street')}
                                required />
                        </div>
                        <div>
                            <TextBoxCustom
                                customStyle={{ backgroundColor: 'white' }}
                                value={address.city}
                                onChange={(e) => handleAddressChange(e, 'city')}
                                required />
                        </div>
                        <div>
                            <TextBoxCustom
                                customStyle={{ backgroundColor: 'white' }}
                                value={address.postalCode}
                                onChange={(e) => handleAddressChange(e, 'postalCode')}
                                required />
                        </div>
                        <div>
                            <TextBoxCustom
                                customStyle={{ backgroundColor: 'white' }}
                                value={address.country}
                                onChange={(e) => handleAddressChange(e, 'country')}
                                required />
                        </div>
                    </div>
                </div>
                <div className='submit-button'>
                    <ButtonCustom
                        text={t('checkout.submit-button')}
                        action={() => { history.push('/confirm', { selectedDate }); }}
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
