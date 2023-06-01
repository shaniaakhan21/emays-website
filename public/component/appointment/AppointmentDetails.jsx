import { useEffect, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';

// SCSS
import '../../scss/component/appointment/appoimtnent.scss';

// Images
import Email1 from '../../images/email-1.png';
import Email2 from '../../images/email-2.png';
import Email3 from '../../images/email-3.png';
import Facebook from '../../images/facebookicon.png';
import Instagram from '../../images/instagramicon.png';
import Twitter from '../../images/twittericon.png';
import FallBack from '../../icons/fallback.png';
import Emays from '../../logo/emays-logo-white.png';

// Components
import ShoppingItem from '../checkout/ShoppingItem';
import ButtonCustom from '../common/ButtonCustom';

// Util
import { getAuthToken, getUserData } from '../../js/util/SessionStorageUtil';
import moment from 'moment';

// Const
import { EMAIL_LAUNCH } from '../../js/const/URLMapper';
import useSessionState from '../../js/util/useSessionState';
import { PRODUCT_LIST, USER_DATA } from '../../js/const/SessionStorageConst';

const Appointment = () => {

    const [t] = useTranslation();

    const [data, setProductData] = useState({ orderData: {}, userData: {}, selectedDate: '', selectedTime: '' });

    const [productData] = useSessionState(PRODUCT_LIST);
    const [userDataState] = useSessionState(USER_DATA);

    useEffect(() => {
        if (!productData) {
            return;
        }
        setProductData({ ...data, productData });
    }, [productData]);

    useEffect(() => {
        if (!userDataState) {
            return;
        }
        const cleaned = userDataState.replace(/&#34;/g, '"');
        const userData = JSON.parse(cleaned);
        setProductData({ ...data, userData });
    }, [userDataState]);

    useEffect(() => {
        const selectedTime = prepareTime(userData.startTime, userData.endTime);
        const selectedDate = prepareDate(userData.date);

        setProductData({ ...data, selectedTime, selectedDate });
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
            <p>{t('email-launch.header-one.left')}</p>
            <p>{t('email-launch.header-one.right')}</p>
        </div>
        <div className='text-info'>
            <p>{data?.userData?.firstName}</p>
            <Trans>
                <p>{t('email-launch.thank')}</p>
            </Trans>

            <p className='highlighted'>{t('email-launch.info')}</p>

            <p>{t('email-launch.time-info.message')}</p>
        </div>

        <div className='time-box'>
            <div className='date'>
                <span>{t('email-launch.time-info.date')}</span>
                <span>{data?.selectedDate}</span>
            </div>
            <div className='separator' />
            <div className='hour'>
                <span>{t('email-launch.time-info.hour')}</span>
                <span>{data?.selectedTime}</span>
            </div>
        </div>

        {[
            [t('email-launch.full-name'), `${data.userData.firstName} ${data.userData.lastName}`],
            [t('email-launch.exp-selected'), data.userData.experience],
            [t('email-launch.del-address')
                , `${data?.userData?.address?.addOne}, 
                ${data?.userData?.address?.addTwo}, 
                ${data?.userData?.address?.addThree}, ${data?.userData?.address?.addFour}`]
        ].map(([l, v]) => <div className='dl'>
            <div className='label'>{l}</div>
            <div className='value'>{v}</div>
        </div>)}

        <h6 className='header'>{t('email-launch.items-to--be-deliver')}</h6>
        <div className='products'>
            {

                data?.productData?.map((item) => <ShoppingItem
                    itemName={item.productName}
                    image={item.productImage || FallBack}
                    color={item.productColor}
                    size={item.productSize}
                    quantity={item.productQuantity} />)
            }
        </div>

        <div className='button-set'>
            <ButtonCustom
                text={t('email-launch.button.edit-appointment')}
                action={() => { console.log('Not built yet'); }}
                type={'secondary'}
                customStyle={{
                    minWidth: '24vw',
                    marginTop: '25px',
                    marginBottom: '15px',
                    alignContent: 'center',
                    justifyContent: 'center',
                    padding: '1%'
                }}
            />
            <ButtonCustom
                text={t('email-launch.button.add-to-calendar')}
                action={() => {
                    // eslint-disable-next-line max-len
                    window.open(`${EMAIL_LAUNCH}?uuid=${getUserData().uid}&authToken=${getAuthToken()}`);
                }}
                type={'secondary'}
                customStyle={{
                    minWidth: '24vw',
                    marginTop: '25px',
                    marginLeft: 'auto',
                    marginBottom: '15px',
                    alignContent: 'center',
                    justifyContent: 'center',
                    padding: '1%'
                }}
            />
        </div>

        <div className='delivery-steps'>
            <div className='icon active'>
                <img src={Email1} alt='ORDER PLACED' />
                <div className='text'>{t('email-launch.order-placed')}</div>
            </div>
            <div className='line highlighted'>
                <div className='circle' />
            </div>
            <div className='icon'>
                <img src={Email2} alt='DELIVERY IN PROGRESS' />
                <div className='text'>{t('email-launch.in-progress')}</div>
            </div>
            <div className='line'>
                <div className='circle' />
            </div>
            <div className='icon'>
                <img src={Email3} alt='DELIVERED' />
                <div className='text'>{t('email-launch.delivered')}</div>
            </div>
        </div>

        <div className='note'>
            <div className='exclamation'>!</div>
            <div>
                <p><span className='ub'>{t('email-launch.remember')}</span>
                    {' '}{t('email-launch.contact-message')}</p>
            </div>
        </div>

        <div className='text-info2'>
            <p>{t('email-launch.special-info.line-one')}</p>
            <p>{t('email-launch.special-info.line-two')}</p>
        </div>

        <div className='social'>
            <a href='https://facebook.com' target='_blank'>
                <img src={Facebook} alt='Facebook link' /></a>
            <a href='https://instagram.com' target='_blank'>
                <img src={Instagram} alt='Instagram link' /></a>
            <a href='https://twitter.com' target='_blank'>
                <img src={Twitter} alt='Twitter link' /></a>
        </div>

        <div className='footer'>
            <span className='help'>{t('email-launch.need-help')} {' '}
                <a href='http://emays.com/contact-us' target='_blank' >
                    {t('email-launch.contact-us')}
                </a>
            </span>
            <div className='email'>{t('email-launch.mail.part-one')} {' '}
                <a href='mailto:support@emays.com'>{t('email-launch.mail.link-text')}</a>
                &nbsp;<b>EMAYS</b> {t('email-launch.mail.part-two')}
            </div>
            <div className='copyright'>
                {t('email-launch.copy-right')}
            </div>
        </div>

    </div>);
};

export default Appointment;
