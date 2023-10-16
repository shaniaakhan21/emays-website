import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OverviewHeader from './component/Header';

// SCSS
import './../../../scss/component/retailer/overview.scss';

const Overview = ({ overviewData, updateData }) => {

    const [translate] = useTranslation();
    const t = useCallback((str) => translate(`dashboard.overview.${str}`), [translate]);

    return (
        <>
            <OverviewHeader />
        </>
    );
};

export default React.memo(Overview);
