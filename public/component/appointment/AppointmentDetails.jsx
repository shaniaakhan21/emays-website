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
import { getProductList, getUserData } from '../../js/util/SessionStorageUtil';
import ShoppingItem from '../checkout/ShoppingItem';
import FallBack from '../../icons/fallback.png';
import Emays from '../../logo/emays-logo-white.png';
import moment from 'moment';

const Appointment = () => {

    const [t] = useTranslation();

    const [data, setProductData] = useState({ orderData: {}, userData: {}, selectedDate: '', selectedTime: '' });

    useEffect(() => {

        const productData = getProductList();
        const userData = getUserData();

        setProductData({ ...data, orderData: productData });
        
        setProductData({ ...data, userData: userData });

        const selectedDate = prepareDate(userData.date);
        setProductData({ ...data, selectedDate: selectedDate });

        const selectedTime = prepareTime(userData.startTime, userData.endTime);
        setProductData({ ...data, selectedTime: selectedTime });
        console.log('State', data);
    }, []);

    const prepareDate = (date) => {
        // Prepare full date
        const dayExt = moment(date, 'YYYY-MM-DD').format('ddd');
        const monthExt = moment(date, 'YYYY-MM-DD').format('MMMM');
        const dateExt = moment(date, 'YYYY-MM-DD').format('D');
        const yearExt = moment(date, 'YYYY-MM-DD').format('YYYY');
        const fullDate = `${dayExt} ${dateExt}, ${monthExt} ${yearExt}`;
        return fullDate;
    };

    const prepareTime = (startTime, endTime) => {
        const hour = `${startTime} to ${endTime}`;
        return hour;
    };

    return (<div className='appointment-page'>
        
        <div className='logo'>
            <img src={Emays} alt='The Emays logo' />
        </div>
        <div className='header'>
            <p>CHANEL</p>
            <p>APPOINTMENT BOOKED</p>
        </div>
        
        <div className='text-info'>
            <p>{data?.userData?.firstName}</p>
            <p>Thank you for booking your <strong>Chanel</strong> appointment.</p>

            <p className='highlighted'>(Your 40 minute appointment will begin when your Emays Stylist arrives).</p>

            <p>We’re looking forward to seeing you on:</p>
        </div>

        <div className='time-box'>
            <div className='date'>
                <span>Date</span>
                <span>{data?.selectedDate}</span>
            </div>
            <div className='separator' />
            <div className='hour'>
                <span>Hour</span>
                <span>{data?.selectedTime}</span>
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

        {data.productData?.map(({ productName, productImage, productColor, productSize, productQuantity }) => (
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
