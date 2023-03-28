import { Column } from '@carbon/react';
import { useTranslation } from 'react-i18next';

// Components
import RetailerLayout from '../common/RetailerLayout';
import ButtonCustom from '../common/ButtonCustom';

// SCSS
import './../../scss/component/retailer/landing.page.scss';

// Images
import EmailIcon from '../../icons/email.svg';
import RetailerPartnership from './Partnership';
import EnvironmentHeader from '../common/environment/EnvironmentHeader';
import IconTextImg from '../common/environment/IconTextImg';
import IconImgText from '../common/environment/IconImgText';
import ImgTextIcon from '../common/environment/ImgTextIcon';
import TextImg from '../common/environment/TextImg';
import RetailerIntegration from './Integration';
import RetailerFAQs from './FAQs';
import RetailerLetsTalk from './LetsTalk';
import { useRef } from 'react';

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
                <ButtonCustom action={() => {}} text={t('button')} />
            </Column>
            <Column lg={16} md={8} sm={4} xs={4} className='buttons'>
            </Column>
            <Column id='integration-start' lg={16} md={8} sm={4} xs={4}>
                <RetailerIntegration />
            </Column>
            <Column id='faqs-start' lg={16} md={8} sm={4} xs={4}>
                <RetailerFAQs />
            </Column>

            <Column id='sustainability-start' lg={16} md={8} sm={4} xs={4} style={{ padding: 0 }}>
                <EnvironmentHeader />
                <IconTextImg />
                <IconImgText />
                <ImgTextIcon/>
                <TextImg/>
            </Column>

            <RetailerPartnership />

            <Column id='lets-talk-start' lg={16} md={8} sm={4} xs={4}>
                <RetailerLetsTalk />
            </Column>

        </RetailerLayout>
    );
};

export default RetailerLanding;
