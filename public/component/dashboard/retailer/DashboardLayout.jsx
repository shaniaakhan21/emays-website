import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../../../scss/component/dashboard/retailer/dashboardlayout.scss';
import React, { useState } from 'react';
import { Grid, Row, Column } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

import LOGO from '../../../images/Dashboard/EMAYS-BLACK.svg'; 
import Overview from './Overview';

const RetailerDashboardLayout = () => {
    const [verticalActive, setVerticalActive] = useState('tab-1');
    const { t } = useTranslation();
    const handleVerticalClick = (tabId) => {
        if (tabId === verticalActive) {
            return;
        }
  
        setVerticalActive(tabId);
    };

    return (
        <div className='main-section-container'>
            <Grid fullWidth className='grid-custom-style'>
                <Column lg={16}>
                    <Grid fullWidth className='row-one-style'>
                        <Column lg={2} className='black-logo'>
                            <img src={LOGO} alt='EMAYS' />
                        </Column>
                        <Column lg={4}>
                            <div className='heading-style'>
                                <h1>{t('dashboard.dashboard-layout.title')}</h1>
                            </div>
                        </Column>
                    </Grid>
                </Column>
            </Grid>
            <MDBRow>
                <MDBCol size='2'>
                    <MDBTabs className='flex-column bg-override'>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleVerticalClick('tab-1')} 
                                active={verticalActive === 'tab-1'} tabId='tab-1'>
                                {t('dashboard.dashboard-layout.tabs-text-1')}
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleVerticalClick('tab-2')} 
                                active={verticalActive === 'tab-2'} tabId='tab-2'>
                                {t('dashboard.dashboard-layout.tabs-text-2')}
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleVerticalClick('tab-3')} 
                                active={verticalActive === 'tab-3'} tabId='tab-3'>
                                {t('dashboard.dashboard-layout.tabs-text-3')}
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleVerticalClick('tab-4')} 
                                active={verticalActive === 'tab-4'} tabId='tab-4'>
                                {t('dashboard.dashboard-layout.tabs-text-4')}
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleVerticalClick('tab-5')} 
                                active={verticalActive === 'tab-5'} tabId='tab-5'>
                                {t('dashboard.dashboard-layout.tabs-text-5')}
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>
                </MDBCol>
                <MDBCol size='10'>
                    <MDBTabsContent>
                        <MDBTabsPane show={verticalActive === 'tab-1'} tabId='tab-1'><Overview/></MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'tab-2'} tabId='tab-2'>Profile content</MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'tab-3'} tabId='tab-3'>Messages content</MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'tab-4'} tabId='tab-4'>History</MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'tab-5'} tabId='tab-5'>New Orders</MDBTabsPane>
                    </MDBTabsContent>
                </MDBCol>
            </MDBRow>
        </div>
    );
};
export default RetailerDashboardLayout;
