import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { driverSelectedOrderSelectorMemoized } from '../redux/selector/driverSelectedOrderSelector';
import { useDispatch, useSelector } from 'react-redux';

// SCSS
import '../../../scss/component/dashboard/selectedItem.scss';

const DriverSelectItems = () => {

    return (
        <p>Select Items</p>
    );
};

export default DriverSelectItems;
