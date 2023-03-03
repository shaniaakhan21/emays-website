import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS
import '../../scss/component/appointment/appoimtnent.scss';

// Images
import Email1 from '../../images/email-1.png';
import Email2 from '../../images/email-2.png';
import Email3 from '../../images/email-3.png';

// Components

// Util
import { getProductList } from '../../js/util/SessionStorageUtil';
import ShoppingItem from '../checkout/ShoppingItem';
import FallBack from '../../icons/fallback.png';
import Emays from '../../logo/emays-logo-white.png';

// eslint-disable-next-line max-len
const url = 'http://localhost:8080/emays/api-dev/launchMail?authToken=tempToken&launchType=emailBooked&uuid=d24e3a05-1b45-4251-821f-38f7e915ad20';

const Appointment = () => {

    const [t] = useTranslation();

    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const productData = getProductList();
        setProductData(productData);
    }, []);

    return (<div className='appointment-page'>
        
        <a
            style={{ position: 'fixed', top: 10, right: 10 }}
            href={url}>
            <button>RELOAD</button>
        </a>
        
        <div className='logo'>
            <img src={Emays} alt='The Emays logo' />
        </div>
        <div className='header'>
            <p>CHANEL</p>
            <p>APPOINTMENT BOOKED</p>
        </div>
        
        <div className='text-info'>
            <p>[[FirstName]]</p>
            <p>Thank you for booking your <strong>Chanel</strong> appointment.</p>

            <p className='highlighted'>(Your 40 minute appointment will begin when your Emays Stylist arrives).</p>

            <p>We’re looking forward to seeing you on:</p>
        </div>

        <div className='time-box'>
            <div className='date'>
                <span>Date</span>
                <span>Wed 27, February 2023</span>
            </div>
            <div className='separator' />
            <div className='hour'>
                <span>Hour</span>
                <span>14:00 to 15:00</span>
            </div>
        </div>

        {[
            ['Full Name', 'Sample Name Coll iabichino'],
            ['Experience Selected', 'Assist me, Tailoring, Inspire me.'],
            ['Delivery Address ', 'Sample Address, Milano, Italia 06830']
        ].map(([l, v]) => <div className='dl'>
            <div className='label'>{l}</div>
            <div className='value'>{v}</div>
        </div>)}

        <h6 className='header'>ITEMS TO BE DELIVERED</h6>

        {productData?.map(({ productName, productImage, productColor, productSize, productQuantity }) => (
            <div className='item'>
                <img src={productImage || FallBack} alt='product' />
                <div className='info'>
                    <div className='name'>{productName}</div>
                    {productColor && <div className='value'>Color: {productColor}</div>}
                    {productSize && <div className='value'>Size: {productSize}</div>}
                    <div className='value end'>Quantity: {productQuantity}</div>
                </div>
            </div>
        ))}

        <div className='button-set'>
            <button className='btn'>EDIT APPOINTMENT</button>
            <button className='btn'>ADD TO MY CALENDER</button>
        </div>
        
        <div className='delivery-steps'>
            <div className='icon active'>
                <img src={Email1} alt='ORDER PLACED' />
                <div className='text'>ORDER PLACED</div>
            </div>
            <div className='line highlighted'>
                <div className='circle' />
            </div>
            <div className='icon'>
                <img src={Email2} alt='DELIVERY IN PROGRESS' />
                <div className='text'>DELIVERY IN PROGRESS</div>
            </div>
            <div className='line'>
                <div className='circle' />
            </div>
            <div className='icon'>
                <img src={Email3} alt='DELIVERED' />
                <div className='text'>DELIVERED</div>
            </div>
        </div>

        <div className='note'>
            <div className='exclamation'>!</div>
            <div>
                <p><span className='ub'>Please remember,</span>
                    {' '}we will contact you the day before your appointment, as well as a reminder on the day</p>
            </div>
        </div>

        <div className='text-info2'>
            <p>We look forward to seeing you, but should you be unable to attend then please note
                our cancellation policy below.</p>
            <p>We require at least 48 hours notice should you wish to make any changes or amendments to
                your scheduled appointment. Should you not inform us of any change within 48 notice
                you will be charged the service fee.</p>
        </div>

        <div className='social'>
            <a href='https://www.facebook.com/Emays-101110000000000' target='_blank' rel='noreferrer'>
                FB
            </a>
            <a href='https://www/instragram.com/emays' target='_blank' rel='noreferrer'>
                IN
            </a>
            <a href='https://www.twitter.com/emays' target='_blank' rel='noreferrer'>
                TW
            </a>
        </div>

        <div className='footer'>
            <span className='help'>Need Help?&nbsp;<span>Contact Us</span></span>
            <div className='email'>
                We are unable to receive responses to this email. If you need assistance,
                go to <a href='mailto:support@emays.com'>support@emays.com</a>
                &nbsp;<b>EMAYS</b> sent you this email.
                By using our services, you agree to our customer agreement.
            </div>
            <div className='copyright'>
                © Emays 2023. All rights reserved.
            </div>
        </div>

    </div>);
};

export default Appointment;
