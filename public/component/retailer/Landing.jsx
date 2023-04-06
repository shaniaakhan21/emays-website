import { Column } from '@carbon/react';
import { useTranslation } from 'react-i18next';

// Components
import RetailerLayout from '../common/RetailerLayout';
import ButtonCustom from '../common/ButtonCustom';
import Footer from '../common/Footer';

// SCSS
import './../../scss/component/retailer/landing.page.scss';

// Images
import RetailerPartnership from './Partnership';
import MailIcon from '../../images/HomeCustomerSection/email-icon.svg';

const RetailerLanding = () => {
    const [translate] = useTranslation();

    const t = (key) => translate(`retailer.landing.${key}`);

    return (
        <RetailerLayout className='landing'>
            <Column id='landing-start' lg={16} md={8} sm={4} xs={4} className='title'>
                {t('title')}
            </Column>
            <Column lg={16} md={8} sm={4} xs={4} className='sub-title'>
                {t('sub-header')}
            </Column>
            <Column lg={16} md={8} sm={4} xs={4} className='description'>
                {t('description')}
            </Column>
            <Column lg={16} md={8} sm={4} xs={4} className='see-more'>
                <div data-aos='fade-in' data-aos-easing='linear' 
                    data-aos-duration='1000' className='shipping-section__right buttons'>
                    <ButtonCustom action={() => {}} text={t('button')} />
                    <ButtonCustom
                        action={() => {}}
                        iconDescription='E-Mail'
                        hasIconOnly
                        renderIcon={() => <img src={MailIcon} alt='E-Mail' />}
                    />
                </div>
            </Column>
            <Column lg={16} md={8} sm={4} xs={4} className='buttons'>
            </Column>

            <RetailerPartnership />
            <Footer/>
        </RetailerLayout>
    );
};

export default RetailerLanding;
