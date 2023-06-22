import { Column } from '@carbon/react';

// Components
import RetailerLayout from '../common/RetailerLayout';
import FAQForm from '../common/FAQForm';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Footer from '../common/Footer';

const RetailerFAQs = () => {
    const [t] = useTranslation();

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta name='description' content={t('heads.customers.faqs.description')}/>
                    <title>{t('heads.customers.faqs.title')}</title>
                    <link rel='canonical' href='/faq' />
                </Helmet>
                <RetailerLayout Nav>
                    <Column lg={16} md={8} sm={4} xs={4} id='faqs-start'>
                        <FAQForm />
                    </Column>
                    <Footer />
                </RetailerLayout>
            </HelmetProvider>
        </>
    );
};

export default RetailerFAQs;
