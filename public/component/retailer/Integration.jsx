import { Column } from '@carbon/react';
import { useTranslation } from 'react-i18next';

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

const RetailerIntegration = () => {
    const [translate] = useTranslation();

    const t = (key) => translate(`retailer.integration.${key}`);

    return (
        <RetailerLayout className='integration'>
            <Column lg={16} md={8} sm={4} xs={4} className='title'>
                {t('title')}
            </Column>
            <Column lg={16} md={8} sm={4} xs={4} className='description'>
                {t('description')}
            </Column>
            <Column lg={16} md={8} sm={4} xs={4} className='see-more'>
                <ButtonCustom action={() => {}} text={t('button')} />
            </Column>
            {[IntegrationImageOne, IntegrationImageTwo].map(
                (image, index) => (<Column lg={16} md={8} sm={4} xs={4} className='info-box'>
                    <div className='image'>
                        <div className='image-container'>
                            <img src={image} alt='Integration Sample Image' />
                        </div>
                    </div>
                    <div className='details'>
                        <h2>{t(`info-box.${index}.title`)}</h2>
                        <p>{t(`info-box.${index}.description`)}</p>
                    </div>
                </Column>))}
            <Column lg={16} md={8} sm={4} xs={4} className='req-demo'>
                <ButtonCustom action={() => {}} text={t('button')} />
            </Column>
            <Column lg={16} md={8} sm={4} xs={4} className='logos'>
                <div className='marquee'>
                    <div className='marquee__group'>
                        <img src={ShopifyLogo} alt='Shopify Logo' />
                        <img src={SalesForceLogo} alt='Salesforce Logo' />
                        <img src={BigcommerceLogo} alt='Commercetools Logo' />
                        <img src={CommercetoolsLogo} alt='Bigcommerce Logo' />
                        <img src={AdobeLogo} alt='Adobe Logo' style='width: 140px;' />
                    </div>
                </div>
            </Column>
        </RetailerLayout>
    );
};

export default RetailerIntegration;
