import { Column } from '@carbon/react';
import { useTranslation } from 'react-i18next';

// Components
import RetailerLayout from '../common/RetailerLayout';
import ButtonCustom from '../common/ButtonCustom';

// SCSS
import './../../scss/component/retailer/integration.page.scss';

// Images
import EmailIcon from '../../icons/email.svg';

const RetailerLanding = () => {
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
        </RetailerLayout>
    );
};

export default RetailerLanding;
