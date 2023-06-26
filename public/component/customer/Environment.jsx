import EnvironmentHeader from '../common/environment/EnvironmentHeader';
import IconImgText from '../common/environment/IconImgText';
import IconTextImg from '../common/environment/IconTextImg';
import ImgTextIcon from '../common/environment/ImgTextIcon';
import TextImg from '../common/environment/TextImg';
import Nav from '../common/Nav';
import Footer from '../common/Footer';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Environment = () => {

    const [t] = useTranslation();

    return (
        <HelmetProvider>
            <Helmet>
                <meta name='description' content={t('heads.common.environment.description')}/>
                <title>{t('heads.common.environment.title')}</title>
                <link rel='canonical' href='/environment' />
            </Helmet>

            <div className='center'>
                <Nav />
                <EnvironmentHeader />
                <IconTextImg />
                <IconImgText />
                <ImgTextIcon/>
                <TextImg/>
                <Footer />
            </div>
        </HelmetProvider>
    );
};

export default Environment;
