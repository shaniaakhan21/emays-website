import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS
import '../../../../scss/component/dashboard/adminTools/createDriver.scss';
import { Button, Column, Grid, Heading, ProgressIndicator, ProgressStep, Row } from '@carbon/react';
import { Taxi, ArrowRight } from '@carbon/icons-react';
import CreateDriverBasicInfo from './BasicInfo.fragment';
import CreateDriverDocuments from './Documents.fragment';
import CreateDriverBillingInformation from './BillingInformation.fragment';

/*
 * Const CreateDriverBasicInfo = React.lazy(() => import('./BasicInfo.fragment'));
 * Const CreateDriverDocuments = React.lazy(() => import('./Documents.fragment'));
 */

const CreateDriver = () => {
    const [translate] = useTranslation();
    const [step, setStep] = useState(2);
    const [state, setState] = useState({});

    const handleNext = useCallback(() => {
        if (step < 5) {
            setStep((s) => s + 1);
        }
    }, [step, state]);

    const t = useCallback((key) => translate(`dashboard.adminTools.createDriver.${key}`), [translate]);

    return (
        <div className='createDriver'>
            <div className='banner'>
                <Taxi className='icon' />
                <div className='title'>{t('banner')}</div>
            </div>
            <ProgressIndicator>
                {[
                    'Basic Info',
                    'Documents',
                    'Billing Information',
                    'User & Password',
                    'Notes'
                ].map((item, index) => (<ProgressStep
                    key={index}
                    complete={step > index}
                    current={step === index}
                    label={item}
                />))}
            </ProgressIndicator>
            <Grid className='content'>
                {step === 0 ? <CreateDriverBasicInfo setState={setState} /> : null}
                {step === 1 ? <CreateDriverDocuments setState={setState} /> : null}
                {step === 2 ? <CreateDriverBillingInformation setState={setState} /> : null}
                <Button kind='tertiary' className='back' onClick={() => setStep(s => s - 1)}>Back</Button>
                <Button className='next' onClick={handleNext} renderIcon={() => <ArrowRight />}>Next</Button>
            </Grid>
        </div>
    );
};

export default React.memo(CreateDriver);
