import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useRef } from 'react';
import Fade from 'react-reveal/Fade';

// SCSS
import './../../scss/component/retailer/chart.scss';
// Components

// Images
import ChartXS from '../../images/chart-2.svg';
import ChartLG from '../../images/chart-1.svg';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

// Constants

const Chart = ({ xs }) => {

    const [translate] = useTranslation();

    const t = (key) => translate(`retailer.partnership.chart.${key}`);

    return (
        <div className={`chart-main${xs ? ' xs' : ''}`}>
            <div className='wrapper'>
                <Fade top cascade>
                    {xs ? (<img src={ChartXS} className='chart-xs' 
                        alt={t('chart-alt')} 
                        title={t('chart-title-img')}
                        loading='eager'/>) : <img src={ChartLG} className='chart-lg' 
                        alt={t('chart-alt')} 
                        title={t('chart-title-img')}
                        loading='eager' />}
                </Fade>
            </div>
            <div className='text-wrapper'>
                <Fade left>
                    <p><strong><CountUp end={40} enableScrollSpy scrollSpyDelay={500} />%</strong>{t('40')}</p>
                </Fade>
                <Fade right>
                    <p><strong><CountUp end={15} enableScrollSpy scrollSpyDelay={500} />%</strong>{t('15')}</p>
                </Fade>
                <Fade left>
                    <p><strong><CountUp end={16} enableScrollSpy scrollSpyDelay={500} />%</strong>{t('16')}</p>
                </Fade>
                <Fade right>
                    <p><strong><CountUp end={29} enableScrollSpy scrollSpyDelay={500} />%</strong>{t('29')}</p>
                </Fade>
            </div>
        </div>
    );
};

Chart.propTypes = {
    xs: PropTypes.bool
};

export default Chart;
