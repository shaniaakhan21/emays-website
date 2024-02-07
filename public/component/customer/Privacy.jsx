import Nav from '../common/Nav';
import Footer from '../common/Footer';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// SCSS
import '../../scss/component/customer/privacy.scss';
import ButtonCustom from '../common/ButtonCustom';

// Images
import BackArrow from '../../images/back-arrow.png';

const Privacy = ({
    withoutNav,
    ...props
}) => {

    const [translate] = useTranslation();

    const t = useCallback((str) => translate(`privacy.${str}`), [translate]);

    const history = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Nav refs={props.refs}/>
            <div className='privacy-page'>
                <h1>{t('title')}</h1>
                <div className='content' dangerouslySetInnerHTML={{ __html: t('content') }} />
                <div className='buttons'>
                    <ButtonCustom
                        className='back-button'
                        action={() => history?.goBack?.()}
                        text='Go back'
                        renderIcon={() => <img src={BackArrow} />}
                    />
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Privacy;
