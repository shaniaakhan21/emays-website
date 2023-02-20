/* eslint-disable max-len */
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

const Confirm = ({ date, hour, selectedExperience, deliveryAddress }) => {

    return (
        <Grid className='landing-page'>
            <Column lg={16} md={16} sm={16} className='logo'>
                <img src={Emays} alt='The Emays logo' />
            </Column>
            <Column lg={8} md={8} sm={16} className='your-appointment'>
                <div className='edit-appointment'>
                    <div className='text'>
                        <p>YOUR APPOINTMENT</p>
                    </div>
                    <div className='edit-button'>
                        <div>
                            <img src={EditIcon} alt='edit icon' />
                        </div>
                        <div>
                            <a onClick={() => {}}>EDIT</a>
                        </div>
                    </div>
                </div>
                <div className='user-appointment-info'>
                    <div className='date-time'>
                        <div className='date'>
                            <p><strong>Date</strong></p>
                            <div className='value'>
                                <p>12/12/23</p>
                            </div>
                        </div>
                        <div className='hour'>
                            <p><strong>Hour</strong></p>
                            <div className='value'>
                                <p>14:00 to 15:00</p>
                            </div>
                        </div>
                    </div>
                    <div className='selected-experience'>
                        <p><strong>Experience Selected</strong></p>
                        <div className='value'>
                            <p>Asist me, Tailoring, Inspire me.</p>
                        </div>
                    </div>
                    <div className='delivery-address'>
                        <p><strong>Delivery Address</strong></p>
                        <div className='value'>
                            <p>Sample Address, Milano, Italia 06830</p>
                        </div>
                    </div>
                </div>
                <div className='contact-details'>
                    <div className='text'>
                        <p>CONTACT DETAILS</p>
                    </div>
                    <div className='info-text'>
                        <p><u><strong>Important:</strong></u> We will call or message you the day before, as well at the moment we’re arriving to ensure the quality of experience.</p>
                    </div>
                    <div className='user-contact-name'>
                        <div>
                            <p>First Name</p>
                            <TextBoxCustom customStyle={{ backgroundColor: 'white' }}/>
                        </div>
                        <div>
                            <p>Last Name</p>
                            <TextBoxCustom customStyle={{ backgroundColor: 'white' }}/>
                        </div>
                    </div>
                    <div className='user-contact-email-number'>
                        <div>
                            <p>Phone Number</p>
                            <TextBoxCustom customStyle={{ backgroundColor: 'white' }}/>
                        </div>
                        <div>
                            <p>Email</p>
                            <TextBoxCustom customStyle={{ backgroundColor: 'white' }}/>
                        </div>
                    </div>
                </div>
                <div className='submit-button'>
                    <ButtonCustom text={'CONFIRM APPOINTMENT'} action={() => { history.push('/confirm'); }} type={'secondary'} 
                        customStyle={{ minWidth: '100%', marginTop: '25px', marginBottom: '15px', alignContent: 'center', justifyContent: 'center' }} />
                </div>
            </Column>
            <Column lg={8} md={8} sm={16} className='shopping-bag'>
                <ShoppingBag productList={productList}/>
            </Column>
        </Grid>
    );

};

export default Confirm;
