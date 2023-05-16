import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Heading, TextArea } from '@carbon/react';
import { Printer } from '@carbon/icons-react';

// SCSS
import '../../../scss/component/retailer/orderCreated.scss';
import ButtonCustom from '../../common/ButtonCustom';
import ShoppingItem from '../../checkout/ShoppingItem';
import FallBack from '../../../icons/fallback.png';
import { Link } from 'react-router-dom';

const AdminTools = () => {
    const [translate] = useTranslation();

    const t = useCallback((key) => translate(`dashboard.adminTools.${key}`), [translate]);

    return (
        <div className='adminTools'>
            <Link to='/dashboard/adminTools/createRetailer'>
                Create Retailer
            </Link>
            <br />
            <Link to='/dashboard/adminTools/createDriver'>
                Create Driver
            </Link>
        </div>
    );
};

export default React.memo(AdminTools);
