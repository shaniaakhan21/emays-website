import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Grid, Column } from '@carbon/react';
import PropTypes from 'prop-types';
import '../../../scss/component/customer/shoptextsection.scss';

const ShopTextBox = (props) => {
    const {
        headingText,
        icon,
        subheadingText,
        bodyText,
        customStyle
    } = props;

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <Grid className={`custom-component ${customStyle}`}>
            <Column lg={7} md={6} sm={4} xs={4} className='head-text'>
                <h2 data-aos='fade-in' data-aos-easing='linear' 
                    data-aos-duration='1000' data-aos-delay='300' className='heading'>{headingText}</h2>
            </Column>
            <Column lg={9} md={6} sm={4} xs={4} className='second-section'>
                <div className='icon-container'>
                    <img data-aos='zoom-in' data-aos-easing='linear' 
                        data-aos-duration='1000' data-aos-delay='600' src={icon} alt='icon' className='icon' />
                </div>
                <div className='text-container'>
                    <h3 data-aos='fade-left' data-aos-easing='linear' 
                        data-aos-duration='1000' data-aos-delay='600' className='subheading'>{subheadingText}</h3>
                    <p data-aos='fade-left' data-aos-easing='linear' 
                        data-aos-duration='1000' data-aos-delay='600' className='body-text'>{bodyText}</p>
                </div>
            </Column>
        </Grid>
    );
};

ShopTextBox.propTypes = {
    headingText: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    subheadingText: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    customStyle: PropTypes.string
};

ShopTextBox.defaultProps = {
    customStyle: ''
};

export default ShopTextBox;
