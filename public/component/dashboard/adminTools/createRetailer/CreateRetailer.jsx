import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Store, ArrowRight } from '@carbon/icons-react';
import { Button, Grid, ProgressIndicator, ProgressStep } from '@carbon/react';

// SCSS
import '../../../../scss/component/dashboard/adminTools/createRetailer.scss';
import CreateRetailerBasicInfo from './BasicInfo.fragment';
import CreateRetailerBankInfo from './BankInfo.fragment';
import CreateRetailerEmployeeInfo from './EmployeeInfo.fragment';
import CreateRetailerAccountInfo from './AccountInfo.fragment';
import CreateRetailerNotes from './Notes.fragment';

const CreateRetailer = () => {
    const [translate] = useTranslation();
    const [step, setStep] = useState(0);
    const [state, setState] = useState({});

    const handleNext = useCallback(() => {
        if (step < 5) {
            setStep((s) => s + 1);
        }
    }, [step, state]);

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.${key}`), [translate]);

    return (
        <div className='createRetailer'>
            <div className='banner'>
                <Store className='icon' />
                <div className='title'>{t('banner')}</div>
            </div>
            <ProgressIndicator>
                {[
                    'Basic Info',
                    'Directory',
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
                {step === 0 ? <CreateRetailerBasicInfo setState={setState} /> : null}
                {step === 1 ? <CreateRetailerEmployeeInfo setState={setState} /> : null}
                {step === 2 ? <CreateRetailerAccountInfo setState={setState} /> : null}
                {step === 3 ? <CreateRetailerNotes setState={setState} /> : null}
                <Button kind='tertiary' className='back' onClick={() => setStep(s => s - 1)}>Back</Button>
                <Button className='next' onClick={handleNext} renderIcon={() => <ArrowRight />}>Next</Button>
            </Grid>
        </div>
    );
};

export default React.memo(CreateRetailer);
