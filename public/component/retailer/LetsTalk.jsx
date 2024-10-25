import { Column } from '@carbon/react';

// Components
import RetailerLayout from '../common/RetailerLayout';
import LetsTalkForm from '../common/LetsTalkForm';
import { useTranslation } from 'react-i18next';
import { useMessage } from '../common/messageCtx';
import { createAppointment } from '../../services/letsTalk';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Footer from '../common/Footer';

const RetailerLetsTalk = () => {
    const [t] = useTranslation();
    const pushAlert = useMessage();

    const onSubmit = async (d) => {
        try {
            if (!d['privacy-policy']) { throw new Error(t('common.confirm-privacy-policy')); }
            const resp = await createAppointment(d);
            pushAlert({
                statusIconDescription: t('common.success'),
                title: t('common.success'),
                subtitle: t('common.success-message'),
                kind: 'success'
            });
        } catch (e) {
            pushAlert({ statusIconDescription: t('common.error'), title: t('common.error'), subtitle: e.message });
        }
    };

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta name='description' content={t('heads.common.letstalk.description')}/>
                    <title>{t('heads.common.letstalk.title')}</title>
                    <link rel='canonical' href='/' />
                </Helmet>
                <RetailerLayout Nav>
                    <Column lg={16} md={8} sm={4} xs={4} id='lets-talk-start'>
                        <LetsTalkForm onSubmit={onSubmit} />
                    </Column>
                    <Footer />
                </RetailerLayout>
            </HelmetProvider>
        </>
    );
};

export default RetailerLetsTalk;
