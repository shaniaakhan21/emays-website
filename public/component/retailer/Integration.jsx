import { Column } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import AOS from 'aos';
import ReactPlayer from 'react-player';
import 'aos/dist/aos.css';

// Components
import RetailerLayout from '../common/RetailerLayout';
import ButtonCustom from '../common/ButtonCustom';

// SCSS
import './../../scss/component/retailer/integration.page.scss';

// Images
import IntegrationImageOne from '../../images/intergration-1.png';
import IntegrationImageTwo from '../../images/intergration-2.png';
import ShopifyLogo from '../../images/logo-shopify.svg';
import SalesForceLogo from '../../images/logo-salesforce.svg';
import BigcommerceLogo from '../../images/logo-bigcommerce.svg';
import CommercetoolsLogo from '../../images/logo-commercetools.svg';
import AdobeLogo from '../../images/logo-adobe.svg';

// Video
import IntegrationVideo from '../../videos/emays_animation_combined.webm';
import Footer from '../common/Footer';

const RetailerIntegration = () => {
    const [translate] = useTranslation();

    useEffect(() => {
        AOS.init({ once: true });
    }, []);

    const t = (key) => translate(`retailer.integration.${key}`);

    return (
        <>
            <RetailerLayout Nav className='integration'>
                <Column lg={8} md={8} sm={4} xs={4}>
                    <div className='title'
                        data-aos='fade-right' data-aos-easing='linear' data-aos-duration='1000'>
                        {t('title')}
                    </div>
                    <div className='description'
                        data-aos='fade-right' data-aos-easing='linear' data-aos-duration='1000'>
                        {t('description')}
                    </div>
                    <div className='see-more'
                        data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000'>
                        <a href='/#/letsTalk' className='btn'>
                            <ButtonCustom action={() => {}} text={t('button')} />
                        </a>
                    </div>
                </Column>
                <Column lg={8} md={8} sm={4} xs={4} className='video'>
                    <video style={{ filter: 'saturate(3.5) hue-rotate(410deg) contrast(75%)' }} width='300' height='300'
                        loop autoPlay muted>
                        <source src={IntegrationVideo} type='video/mp4'/>
                    </video>
                </Column>
                {[IntegrationImageOne, IntegrationImageTwo].map(
                    (image, index) => (<Column
                        lg={16}
                        md={8}
                        sm={4}
                        xs={4}
                        className='info-box'
                        data-aos-duration='1000'
                        data-aos-delay={`${index * 100}`}
                    >
                        <div data-aos-duration='1000' data-aos-delay='1000' data-aos='zoom-in' className='image'>
                            <div className='image-container'>
                                <img src={image} alt='Integration Sample Image'/>
                            </div>
                        </div>
                        <div className='details'>
                            <h2 data-aos-duration='1000' data-aos='fade-in'>
                                {t(`info-box.${index}.title`)}</h2>
                            <p data-aos-duration='1000' data-aos='fade-in'>
                                {t(`info-box.${index}.description`)}</p>
                        </div>
                    </Column>))}
                <Column lg={16} md={8} sm={4} xs={4} className='req-demo'
                    data-aos-duration='1000' data-aos='fade-in'>
                    <a href='/#/letsTalk' className='btn'>
                        <ButtonCustom action={() => {}} text={t('button')} />
                    </a>
                </Column>
                <Column lg={16} md={8} sm={4} xs={4} className='logos'>
                    <div className='marquee'>
                        <div className='marquee__group'
                            data-aos-duration='1000' data-aos='fade-in'>
                            <img src={ShopifyLogo} alt='Shopify Logo'/>
                            <img src={SalesForceLogo} alt='Salesforce Logo'/>
                            <img src={BigcommerceLogo} alt='Commercetools Logo'/>
                            <img src={CommercetoolsLogo} alt='Bigcommerce Logo'/>
                            <img src={AdobeLogo} alt='Adobe Logo' className='adobe'/>
                        </div>
                        <div className='marquee__group'
                            data-aos-duration='1000' data-aos='fade-in'>
                            <img src={ShopifyLogo} alt='Shopify Logo'/>
                            <img src={SalesForceLogo} alt='Salesforce Logo'/>
                            <img src={BigcommerceLogo} alt='Commercetools Logo'/>
                            <img src={CommercetoolsLogo} alt='Bigcommerce Logo'/>
                            <img src={AdobeLogo} alt='Adobe Logo' className='adobe'/>
                        </div>
                    </div>
                </Column>
                <Footer />
            </RetailerLayout>
        </>
    );
};

export default RetailerIntegration;
