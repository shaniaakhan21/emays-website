import { Grid, Column } from '@carbon/react';
import Emays from '../../logo/emays-logo-white.png';
import '../../scss/component/checkout/checkout.scss';
import ContentSwitcherCustom from '../common/ContentSwitcherCustom';
import DatePickerCustom from '../common/DatePicker';
import DropDownCustom from '../common/DropdownCustom';

const items = [
    { id: 'option-0', text: 'Option 0' },
    { id: 'option-1', text: 'Option 1' },
    { id: 'option-2', text: 'Option 2' }
];

const Checkout = ({}) => {
    return (
        <Grid className='landing-page' fullWidth>
            <Column lg={16} md={16} sm={16} className='logo'>
                <img src={Emays} alt='The Emays logo' />
            </Column>
            <Column lg={8} md={8} sm={16} className='book-appointment'>
                <p>BOOK YOUR APPOINTMENT</p>
                <div className='next-date-picker'>
                    <ContentSwitcherCustom nextDateOne='Today Sat, Nov 2nd'
                        nextDateTwo='Sat, Nov 2nd'
                        nextDateThree='Sat, Nov 2nd'/>
                </div>
                <div className='date-time-pick'>
                    <p>Custom Date</p>
                    <div className='items'>
                        <div className='date'>
                            <p>Choose Date</p>
                            <DatePickerCustom />
                        </div>
                        <div className='time-window'>
                            <p>Choose Time Window</p>
                            <DropDownCustom items={items}/>
                        </div>
                    </div>
                </div>
            </Column>
            <Column lg={8} md={8} sm={16} className='shopping-bag'>
                1
            </Column>
        </Grid>
    );
      
};

export default Checkout;
