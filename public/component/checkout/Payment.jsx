import { Column, ComposedModal, Grid, ModalBody, ModalHeader } from '@carbon/react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';

// Images
import Emays from '../../logo/emays-logo-white.png';
import Amazon from '../../images/pg-amazon.svg';
import Master from '../../images/pg-master.svg';
import Visa from '../../images/pg-visa.svg';

// SCSS
import '../../scss/component/checkout/payment.scss';

// Custom components
import ButtonCustom from '../common/ButtonCustom';
import useAPI from '../../js/util/useAPI';
import { makeCheckout, submitCheckout } from '../../services/stripe';
import { useMessage } from '../common/messageCtx';
import { publishableKey } from '../../js/const/stripe';
import { apiBase } from '../../js/util/httpUtil';

const stripePromise = loadStripe(publishableKey);

const StripeProvider = ({ open, setOpen }) => {

    const [data, setData] = useState(undefined);

    const initialRender = useCallback(async () => {
        if (open) {
            const res = await makeCheckout(open.uid);
            setData(res);
        }
    }, [open]);

    useEffect(() => {
        initialRender();
    }, [initialRender]);

    if (!data?.client_secret) { return null; }

    return (
        <Elements stripe={stripePromise} options={{
            clientSecret: data?.client_secret
        }}>
            <Payment open={open} setOpen={setOpen} />
        </Elements>);

};

const Payment = ({ open, setOpen }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [translate] = useTranslation();
    const pushAlert = useMessage();

    const { state: checkoutData, loading, callAPI } = useAPI(makeCheckout);

    const t = (key) => translate(`common.payment-form.${key}`);

    const submit = useCallback(async () => {
        try {
            if (!stripe || !elements) {
                return;
            }
            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    // eslint-disable-next-line camelcase
                    return_url: `${apiBase}/stripe/checkout/complete?userId=${open.uid}`
                }
            });
            if (result.error) {
                pushAlert({
                    statusIconDescription: t('common.error'),
                    title: t('common.error'),
                    subtitle: result.error.message
                });
            }
            await submitCheckout(open.uid);
        } catch (e) {
            pushAlert({ statusIconDescription: t('common.error'), title: t('common.error'), subtitle: e.message });
        }
    }, [pushAlert, t]);

    return <>
        {createPortal(
            <ComposedModal className='payment-form' size='xs' open={!!open} onClose={() => setOpen(undefined)}>
                <ModalHeader />
                <ModalBody>
                    <Grid className='payment-model'>
                        <Column lg={8} md={8} sm={4} xs={4} className='title'>
                            <h1>{t('title')}</h1>
                        </Column>
                        {/* <Column lg={16} md={16} sm={8} xs={8} className='input'> */}
                        {/*     <TextBoxCustom */}
                        {/*         LabelText={t('name')} */}
                        {/*         Autocomplete='cc-name' */}
                        {/*         Name='name' */}
                        {/*         OnChange={setValue} */}
                        {/*     /> */}
                        {/* </Column> */}
                        {/* <Column lg={16} md={16} sm={8} xs={8} className='input'> */}
                        {/*     <TextBoxCustom */}
                        {/*         LabelText={t('number')} */}
                        {/*         Autocomplete='cc-number' */}
                        {/*         Name='number' */}
                        {/*         OnChange={setValue} */}
                        {/*         Type='number' */}
                        {/*     /> */}
                        {/* </Column> */}
                        {/* <Column lg={8} md={8} sm={4} xs={4} className='input'> */}
                        {/*     <TextBoxCustom */}
                        {/*         LabelText={t('exp-month')} */}
                        {/*         Autocomplete='cc-exp-month' */}
                        {/*         Name='exp-month' */}
                        {/*         OnChange={setValue} */}
                        {/*         Type='number' */}
                        {/*         Max={2} */}
                        {/*     /> */}
                        {/* </Column> */}
                        {/* <Column lg={8} md={8} sm={4} xs={4} className='input'> */}
                        {/*     <TextBoxCustom */}
                        {/*         LabelText={t('exp-year')} */}
                        {/*         Autocomplete='cc-exp-year' */}
                        {/*         Name='exp-year' */}
                        {/*         OnChange={setValue} */}
                        {/*         Type='number' */}
                        {/*         Max={2} */}
                        {/*     /> */}
                        {/* </Column> */}
                        {/* <Column lg={16} md={16} sm={8} xs={8} className='input'> */}
                        {/*     <TextBoxCustom */}
                        {/*         LabelText={t('cvv')} */}
                        {/*         Autocomplete='cc-csc' */}
                        {/*         Name='cvv' */}
                        {/*         OnChange={setValue} */}
                        {/*         Type='number' */}
                        {/*     /> */}
                        {/* </Column> */}
                        {/* <Column lg={16} md={8} sm={4} xs={4} className='logos'> */}
                        {/*     <img src={Master} alt='Master logo' /> */}
                        {/*     <img src={Visa} alt='Visa logo' /> */}
                        {/*     <img src={Amazon} alt='Amazon logo' /> */}
                        {/* </Column> */}
                        <Column lg={16} md={16} sm={8} xs={8}>
                            <PaymentElement/>
                        </Column>
                        <Column lg={16} md={8} sm={4} xs={4} className='buttons'>
                            <ButtonCustom type='secondary' action={submit} text={t('button')} />
                        </Column>
                    </Grid>
                </ModalBody>
            </ComposedModal>, document.body
        )}
    </>;
};

Payment.prototype = {
    open: PropTypes.any,
    setOpen: PropTypes.func
};

export default StripeProvider;
