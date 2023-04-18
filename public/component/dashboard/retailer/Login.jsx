import '../../../scss/component/dashboard/retailer/login.scss';
import { Grid, Row, Column } from '@carbon/react';
import LOGO from '../../../images/Dashboard/EMAYS-LOGO.svg'; 
import TextBoxCustom from '../../common/TextBoxCustom';
import TextBoxPassword from '../../common/TextBoxPassword';
import ButtonCustom from '../../common/ButtonCustom';

const RetailerLogin = () => {
    return (
        
        <Grid fullWidth className='Retailer_login'>
            <Column lg={16} md={8} sm={4} xs={4}>
                <Grid fullWidth className='first-row'>
                    <Column lg={8} md={4} sm={4} xs={4}>
                        <img src={LOGO} alt='EMAYS' />
                    </Column>
                    <Column lg={8} md={4} sm={4} xs={4} className='col-text-head'>
                        <div className='retailer-head-box'>
                            <h1>Retailer</h1>
                        </div>
                    </Column>
                </Grid>
                <Column lg={16} md={8} sm={4} xs={4} className='first-box'>
                    <TextBoxCustom
                        labelText='Account Email'
                        placeholderText='email@email.com'
                        autocomplete='given-email'
                        name='Account Email'
                    />
                </Column>
                <Column lg={16} md={8} sm={4} xs={4} className='first-box'>
                    <TextBoxPassword
                        labelText='Password'
                        hidePasswordLabel='Hide password'
                    />
                </Column>
                <Column lg={16} md={8} sm={4} xs={4} className='login-button'>
                    <ButtonCustom action={() => onSubmit(data)} className='submit' text='Log In' />
                </Column>
            </Column>
        </Grid>
    );
};

export default RetailerLogin;
