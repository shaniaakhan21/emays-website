import { Column } from '@carbon/react';
import { useTranslation } from 'react-i18next';

// Components
import RetailerLayout from '../common/RetailerLayout';
import ButtonCustom from '../common/ButtonCustom';

// SCSS
import './../../scss/component/retailer/landing.page.scss';

// Images
import EmailIcon from '../../icons/email.svg';

const RetailerLanding = () => {
    const [translate] = useTranslation();

    const t = (key) => translate(`retailer.landing.${key}`);

    return (
        <RetailerLayout className='landing'>
            <Column lg={16} md={8} sm={4} xs={4} className='title'>
                {t('title')}
            </Column>
            <Column lg={16} md={8} sm={4} xs={4} className='sub-title'>
                {t('sub-header')}
            </Column>
            <Column lg={16} md={8} sm={4} xs={4} className='description'>
                {t('description')}
            </Column>
            <Column lg={16} md={8} sm={4} xs={4} className='see-more'>
                <ButtonCustom action={() => {}} text={t('button')} />
            </Column>
            <Column lg={16} md={8} sm={4} xs={4} className='buttons'>
            </Column>
        </RetailerLayout>
    );
};

export default RetailerLanding;
