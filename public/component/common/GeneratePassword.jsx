import React, { useMemo, useState } from 'react';
import { Button, PasswordInput, TextInput } from '@carbon/react';
import { Add } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';

const GeneratePassword = ({ onChange }) => {
    const [t] = useTranslation();
    const [password, setPassword] = useState('');

    const component = useMemo(() => (
        password === ''
            ? <Button
                onClick={() => setPassword(Math.random().toString(36).slice(-8))}
                renderIcon={() => <Add />}
            >{t('common.generate-password')}</Button>
            : <PasswordInput value={password} autoComplete={false} hideLabel />
    ), [password, setPassword, t]);

    return (
        <div className='cds--form-item cds--text-input-wrapper'>
            <label className='cds--label'>{t('common.password')}</label>
            {component}
        </div>
    );
};

export default React.memo(GeneratePassword);
