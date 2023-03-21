import { Column as Col, Column, Grid } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import Fade from 'react-reveal/Fade';

// Components
import RetailerLayout from '../common/RetailerLayout';
import { Link } from 'react-router-dom';

// SCSS
import '../../scss/component/retailer/partnership.page.scss';
import Chart from '../common/Chart';
import ButtonCustom from '../common/ButtonCustom';
import EmailIcon from '../../icons/email.svg';
import LouisVuittonLogo from '../../images/logo-louisVuitton.svg';
import YSLLogo from '../../images/logo-ysl.svg';
import ChanelPradaLogo from '../../images/logo-chanel-prada.svg';
import PartnersFooterImage from '../../images/partners_footer.png';

const RetailerPartnership = () => {
    const [translate] = useTranslation();

    const t = (key) => translate(`retailer.partnership.${key}`);

    return (
        <>
            <RetailerLayout className='partnership'>
                <Col lg={16} md={8} sm={4} xs={4}>
                    <h1 className='header'>{t('title')}</h1>
                </Col>
                <Col lg={8} md={5} sm={4} xs={4} className='infos'>
                    {[0, 1, 2, 3, 4, 5].map((idx) => (<div className='item'>
                        <Fade left>
                            <h2>{t(`infos.${idx}.title`)}</h2>
                            <p>{t(`infos.${idx}.description`)}</p>
                        </Fade>
                    </div>))}
                </Col>
                <Col lg={8} md={3} sm={4} xs={4} />
                <Col lg={16} md={8} sm={4} xs={4}>
                    <h2 className='chart-title'>{t('chart-title')}</h2>
                </Col>
                <Col lg={16} md={8} sm={4} xs={4} className='chart-row'>
                    <div className='chart-info'>
                        <p>{t('chart-info')}</p>
                    </div>
                    <div className='chart'>
                        <Chart />
                    </div>
                    <div className='chart-xs'>
                        <Chart xs />
                    </div>
                </Col>
                <Col lg={16} md={8} sm={4} xs={4} className='data'>
                    {[0, 1, 2, 3].map((idx) => (<div className='item'>
                        <Fade top>
                            <p>{t(`data.${idx}.title`)}</p>
                            <p>{t(`data.${idx}.value`)}</p>
                        </Fade>
                    </div>))}
                </Col>
                <Column lg={16} md={8} sm={4} xs={4} className='buttons'>
                    <ButtonCustom action={() => {}} text={t('button')} />
                    <ButtonCustom
                        action={() => {}}
                        iconDescription='E-Mail'
                        hasIconOnly
                        renderIcon={() => <img src={EmailIcon} alt='E-Mail' />}
                    />
                </Column>
                <Column lg={16} md={8} sm={4} xs={4} className='logos'>
                    <div className='marquee'>
                        <div className='marquee__group'>
                            <img src={LouisVuittonLogo} alt='Louis Vuitton Logo' />
                            <img src={YSLLogo} alt='YSL Logo' />
                            <img src={ChanelPradaLogo} alt='Chanel Prada Logo' />
                            <img src={LouisVuittonLogo} alt='Louis Vuitton Logo' />
                            <img src={YSLLogo} alt='YSL Logo' />
                            <img src={ChanelPradaLogo} alt='Chanel Prada Logo' />
                        </div>
                    </div>
                </Column>
            </RetailerLayout>
            <img src={PartnersFooterImage} alt='Partners Footer' className='partners-footer' />
        </>
    );
};

export default RetailerPartnership;
