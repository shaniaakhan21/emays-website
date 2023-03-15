import { Grid, Column } from '@carbon/react';
import { useHistory } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
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
import timeframes from '../../../app/const/timeframes';

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
    
    const selectedTimeframe = useMemo(() => {
        if (!state?.startTime) {
            return undefined;
        }
        const id = timeframes.findIndex(tf => tf.start === state?.startTime);
        const text = timeframes[id];
        return { id, text };
    }, [state?.startTime]);

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
                                handleDateChange={e => setState(cs => ({ ...cs, date: e.target.value }))}
                                selectedDate={state?.date}
                            />
                        </div>
                        <div className='time-window'>
                            <p>{t('checkout.book-appointment.choose-time')}</p>
                            <DropDownCustom
                                onChange={(e) => {
                                    const tf = timeframes[e.selectedItem?.id];
                                    setState(cs => ({ ...cs, startTime: tf.start, endTime: tf.end }));
                                }}
                                items={timeframes.map((tf, k) => ({ id: k, text: `${tf.start} to ${tf.end}` }))}
                            />
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
                                value={state?.address?.addOne ?? ''}
                                onChange={
                                    (e) => setState(
                                        cs => ({ ...cs, address: { ...cs.address, addOne: e.target.value } })
                                    )
                                }
                                required />
                        </div>
                        <div>
                            <TextBoxCustom
                                customStyle={{ backgroundColor: 'white' }}
                                value={state?.address?.addTwo}
                                onChange={
                                    (e) => setState(
                                        cs => ({ ...cs, address: { ...cs.address, addTwo: e.target.value } })
                                    )
                                }
                                required />
                        </div>
                        <div>
                            <TextBoxCustom
                                customStyle={{ backgroundColor: 'white' }}
                                value={state?.address?.addThree}
                                onChange={
                                    (e) => setState(
                                        cs => ({ ...cs, address: { ...cs.address, addThree: e.target.value } })
                                    )
                                }
                                required />
                        </div>
                        <div>
                            <TextBoxCustom
                                customStyle={{ backgroundColor: 'white' }}
                                value={state?.address?.addFour}
                                onChange={
                                    (e) => setState(
                                        cs => ({ ...cs, address: { ...cs.address, addFour: e.target.value } })
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
