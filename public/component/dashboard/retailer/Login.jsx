import '../../../scss/component/dashboard/retailer/login.scss';
import { Grid, Row, Column } from '@carbon/react';
import LOGO from '../../../images/Dashboard/EMAYS-LOGO.svg'; 
import TextBoxCustom from '../../common/TextBoxCustom';
import TextBoxPassword from '../../common/TextBoxPassword';
import ButtonCustom from '../../common/ButtonCustom';
import { useTranslation } from 'react-i18next';

const RetailerLogin = () => {

    const [t] = useTranslation();
    
    return (

        <div class='cds--grid login-container'>
            <div class='cds--row'>
                <div class='cds--col'>
                    <div class='image-container'>
                        <img src={LOGO} height={'100px'} width={'130px'} alt='EMAYS' />
                    </div>
                </div>
                <div class='cds--col'>
                    <div className='retailer-head'>
                        <h3>{t('retailer.login.heading')}</h3>
                    </div>
                </div>
            </div>
            <div class='cds--row'>
                <div class='cds--col text-container'>
                    <div>
                        <TextBoxCustom
                            labelText='Account Email'
                            placeholderText='email@example.com'
                            autocomplete='given-email'
                            name='account-email'
                            customStyle={{ width: '313px' }}
                        />
                    </div>
                </div>
            </div>

            <div class='cds--row'>
                <div class='cds--col text-container'>
                    <div>
                        <TextBoxPassword
                            labelText='Password'
                            hidePasswordLabel='Hide password'
                            customStyle={{ width: '313px' }}
                        />
                    </div>
                </div>
            </div>

            <div class='cds--row'>
                <div class='cds--col button-container'>
                    <div>
                        <ButtonCustom action={() => onSubmit(data)} className='submit'
                            text={t('retailer.login.button-text')}
                            customStyle={ { width: '313px', background: '#525252' }}
                        />
                    </div>
                </div>
            </div>
        </div>
        
    /*
     * <Grid fullWidth className='Retailer_login'>
     *     <div>
     *         <Row lg={16} md={16}>
     *             <Column lg={8} md={8}>Column 1</Column>
     *             <Column lg={8} md={8}>Column 2</Column>
     *         </Row>
     *         <Row lg={16}>Row 2</Row>
     *         <Row lg={16}>Row 3</Row>
     *     </div>
     *     <Column lg={16} md={8} sm={4} xs={4}>
     *         <Grid fullWidth className='first-row'>
     *             <Column lg={8} md={4} sm={4} xs={4}>
     *                 <img src={LOGO} height={'100px'} width={'130px'} alt='EMAYS' />
     *             </Column>
     *             <Column lg={8} md={4} sm={4} xs={4} className='col-text-head'>
     *                 <div className='retailer-head-box'>
     *                     <h1>{t('retailer.login.heading')}</h1>
     *                 </div>
     *             </Column>
     *         </Grid>
     *         <Column lg={16} md={8} sm={4} xs={4} className='first-box'>
     *             <TextBoxCustom
     *                 labelText='Account Email'
     *                 placeholderText='email@email.com'
     *                 autocomplete='given-email'
     *                 name='Account Email'
     *             />
     *         </Column>
     *         <Column lg={16} md={8} sm={4} xs={4} className='first-box'>
     *             <TextBoxPassword
     *                 labelText='Password'
     *                 hidePasswordLabel='Hide password'
     *             />
     *         </Column>
     *         <Column lg={16} md={8} sm={4} xs={4} className='login-button'>
     *             <ButtonCustom action={() => onSubmit(data)} className='submit'
     *                 text={t('retailer.login.button-text')} />
     * 
     * 
     * 
     * 
     *         </Column>
     *     </Column>
     * </Grid>
     */
    );
};

export default RetailerLogin;
