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
import { getProductList } from '../../js/util/SessionStorageUtil';
import { CHECKOUT_INFO } from '../../js/const/SessionStorageConst';
import { useTranslation } from 'react-i18next';
import useSessionState from '../../js/util/useSessionState';
import timeframes from '../../../app/const/timeframes';
import LoadingIndicator from '../LoadingIndicator';

const Checkout = () => {

    const [t] = useTranslation();
    const history = useHistory();

    const [state, setState] = useSessionState(CHECKOUT_INFO, { address: {}, options: {} });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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

    const submit = () => {
        const errors = ['addOne', 'addTwo', 'addThree', 'addFour'].reduce(
            (acc, k) => (
                state?.address?.[k] && state?.address?.[k] !== '' ? acc : { ...acc, [k]: true }
            ), {}
        );
        console.log(errors);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setState(cs => ({ ...cs, locked: true }));
            setLoading(false);
            history.push('/confirm');
        }, 1000);
    };

    return (
        <Grid className='landing-page'>
            <Column lg={16} md={16} sm={16} xs={16} className='logo'>
                <img src={Emays} alt='The Emays logo' />
            </Column>
            {loading ? <Column lg={8} md={8} sm={4} xs={4} className='loading-indicator'>
                <LoadingIndicator description='Saving changes' />
            </Column>
                : <Column lg={8} md={8} sm={4} xs={4} className='book-appointment'>
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
                                {state?.date ? <DatePickerCustom
                                    key={1}
                                    disabled={state?.locked}
                                    handleDateChange={e => setState(cs => ({ ...cs, date: e.target.value }))}
                                    selectedDate={state?.date}
                                /> : <DatePickerCustom
                                    key={2}
                                    disabled={state?.locked}
                                    handleDateChange={e => setState(cs => ({ ...cs, date: e.target.value }))}
                                />}
                            </div>
                            <div className='time-window'>
                                <p>{t('checkout.book-appointment.choose-time')}</p>
                                <DropDownCustom
                                    key={1}
                                    onChange={(e) => {
                                        const tf = timeframes[e.selectedItem?.id];
                                        setState(cs => ({ ...cs, startTime: tf.start, endTime: tf.end }));
                                    }}
                                    items={timeframes?.map((tf, k) => ({ id: k, text: `${tf.start} to ${tf.end}` }))}
                                    selectedItem={
                                        state?.startTime ? {
                                            id: timeframes?.findIndex(tf => tf.start === state?.startTime),
                                            text: `${state.startTime} to ${state.endTime}`
                                        }
                                            : undefined}
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
                                    invalid={errors?.addOne} />
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
                                    invalid={errors?.addTwo} />
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
                                    invalid={errors?.addThree} />
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
                                    invalid={errors?.addFour} />
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
                </Column>}
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
