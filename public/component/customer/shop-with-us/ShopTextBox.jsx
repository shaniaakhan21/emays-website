import React from 'react';
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

    return (
        <Grid className={`custom-component ${customStyle}`}>
            <Column lg={7} md={6} sm={4} xs={4} className='head-text'>
                <h2 className='heading'>{headingText}</h2>
            </Column>
            <Column lg={9} md={6} sm={4} xs={4} className='second-section'>
                <div className='icon-container'>
                    <img src={icon} alt='icon' className='icon' />
                </div>
                <div className='text-container'>
                    <h3 className='subheading'>{subheadingText}</h3>
                    <p className='body-text'>{bodyText}</p>
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
