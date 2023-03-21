import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useRef } from 'react';
import Fade from 'react-reveal/Fade';

// SCSS
import './../../scss/component/retailer/chart.scss';
// Components

// Images
import Slice1 from '../../images/Slice1.svg';
import Slice2 from '../../images/Slice2.svg';
import Slice3 from '../../images/Slice3.svg';
import Slice4 from '../../images/Slice4.svg';
import Line1 from '../../images/line-15.svg';
import Line2 from '../../images/line-16.svg';
import Line3 from '../../images/line-29.svg';
import Line4 from '../../images/line-40.svg';
import ChartXS from '../../images/chart-xs.svg';
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
                    {xs ? (<img src={ChartXS} className='chart-xs' />) : <>
                        <div className='chart-wrapper'>
                            <div className='chart'>
                                <img src={Slice1}/>
                                <img src={Slice2}/>
                                <img src={Slice3}/>
                                <img src={Slice4}/>
                            </div>
                        </div>
                        <div className='legs-wrapper'>
                            <div className='legs'>
                                <img src={Line1}/>
                                <img src={Line2}/>
                                <img src={Line3}/>
                                <img src={Line4}/>
                            </div>
                        </div>
                    </>}
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
