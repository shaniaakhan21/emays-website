import { Column, ComposedModal, Grid, ModalBody, ModalHeader } from '@carbon/react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import TextBoxCustom from '../common/TextBoxCustom';
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
import { makeCheckout, submitCheckout } from '../../services/sumUp';
import { useMessage } from '../common/messageCtx';

const Payment = ({ open, setOpen }) => {
    const [translate] = useTranslation();
    const pushAlert = useMessage();
    
    const { state: checkoutData, loading, callAPI } = useAPI(makeCheckout);

    const [data, setData] = useState({});

    useEffect(() => {
        if (open) {
            callAPI(open?.uid);
        }
    }, [open]);

    const setValue = (e) => {
        setData(cd => ({ ...cd, [e.target.name]: e.target.value }));
    };

    const submit = useCallback(async () => {
        try {
            await submitCheckout('5a98fd50-a281-4f59-b116-86b961db0409', data);
        } catch (e) {
            pushAlert({ statusIconDescription: t('common.error'), title: t('common.error'), subtitle: e.message });
        }
    }, [data]);

    const t = (key) => translate(`common.payment-form.${key}`);

    if (loading) {
        return <></>;
    }
    
    return <>
        {createPortal(
            <ComposedModal className='payment-form' size='xs' open={!!open} onClose={() => setOpen(undefined)}>
                <ModalHeader />
                <ModalBody>
                    <Grid className='payment-model'>
                        <Column lg={8} md={8} sm={4} xs={4} className='logo'>
                            <img src={Emays} alt='The Emays logo' />
                        </Column>
                        <Column lg={8} md={8} sm={4} xs={4} className='title'>
                            <h1>{t('title')}</h1>
                        </Column>
                        <Column lg={16} md={16} sm={8} xs={8} className='input'>
                            <TextBoxCustom
                                labelText={t('name')}
                                autocomplete='cc-name'
                                name='name'
                                onChange={setValue}
                            />
                        </Column>
                        <Column lg={16} md={16} sm={8} xs={8} className='input'>
                            <TextBoxCustom
                                labelText={t('number')}
                                autocomplete='cc-number'
                                name='number'
                                onChange={setValue}
                                type='number'
                            />
                        </Column>
                        <Column lg={8} md={8} sm={4} xs={4} className='input'>
                            <TextBoxCustom
                                labelText={t('exp-month')}
                                autocomplete='cc-exp-month'
                                name='exp-month'
                                onChange={setValue}
                                type='number'
                                max={2}
                            />
                        </Column>
                        <Column lg={8} md={8} sm={4} xs={4} className='input'>
                            <TextBoxCustom
                                labelText={t('exp-year')}
                                autocomplete='cc-exp-year'
                                name='exp-year'
                                onChange={setValue}
                                type='number'
                                max={2}
                            />
                        </Column>
                        <Column lg={16} md={16} sm={8} xs={8} className='input'>
                            <TextBoxCustom
                                labelText={t('cvv')}
                                autocomplete='cc-csc'
                                name='cvv'
                                onChange={setValue}
                                type='number'
                            />
                        </Column>
                        <Column lg={16} md={8} sm={4} xs={4} className='logos'>
                            <img src={Master} alt='Master logo' />
                            <img src={Visa} alt='Visa logo' />
                            <img src={Amazon} alt='Amazon logo' />
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

export default Payment;
