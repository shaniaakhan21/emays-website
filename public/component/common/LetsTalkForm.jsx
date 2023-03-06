import { Grid, Row, Column as Col } from '@carbon/react';
import PropTypes from 'prop-types';

// SCSS
import './../../scss/component/ratailer/letsTalkForm.scss';
// Components
import TextBoxCustom from './TextBoxCustom';
// Images
import Logo from '../../logo/emays-logo-black.png';

const LetsTalkForm = ({}) => {
    return (
        <Grid fullWidth className='letsTalk'>
            <Col lg={10} className='left'>
                <Grid fullWidth className='form'>
                    <Col lg={8} md={8} sm={16}>
                        <h1 className='title'>Are you curious about something? Let’s talk</h1>
                    </Col>
                    <Col lg={16}>
                        <TextBoxCustom labelText={'Name'} />
                    </Col>
                </Grid>
            </Col>
            <Col lg={6} className='right'>
                <img src={Logo} alt='Emays Logo' />
            </Col>
        </Grid>
    );
};

LetsTalkForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default LetsTalkForm;
