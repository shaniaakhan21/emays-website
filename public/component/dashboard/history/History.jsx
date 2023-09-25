import React, { useState, useMemo, useCallback } from 'react';
import HistoryHeader from './component/header'
import Table from '../../common/table';
import StatusBox from '../../common/statusBox';
import { useTranslation } from 'react-i18next';
import RowDetails from './component/RowDetails';
import '../../../scss/component/dashboard/history.scss'

const History = () => {
    const [translate] = useTranslation();
    const t = useCallback((str) => translate(`dashboard.overview.${str}`), [translate]);
    const [tableRow, setTableRow] = useState([{
        id: 'CH0001',
        client: 'Gertrude Pest',
        amount: '€ 50,00',
        date: '07-02.2023',
        time: '10:00 am',
        status: <StatusBox status={'Pending to pickup'} />
    }, {
        id: 'CH0002',
        client: 'Gertrude Pest',
        amount: '€ 50,00',
        date: '07-02.2023',
        time: '10:00 am',
        status: <StatusBox status={'Pending to pickup'} />
    },
    {
        id: 'CH0003',
        client: 'Gertrude Pest',
        amount: '€ 50,00',
        date: '07-02.2023',
        time: '10:00 am',
        status: <StatusBox status={'Pending to pickup'} />
    },
    {
        id: 'CH0004',
        client: 'Gertrude Pest',
        amount: '€ 50,00',
        date: '07-02.2023',
        time: '10:00 am',
        status: <StatusBox status={'Pending to pickup'} />
    }
    ]);

    const headers = useMemo(
        () => ['id', 'client', 'amount', 'date', 'time', 'status'].map(key => ({ key, header: t(`table.${key}`) })
        ), [t]);
    
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (row) => {
        setSelectedRow(row);
        onRowClick(row);
    };
      
        return (
          <>
            <HistoryHeader />
            <br></br>
            <div className='table'>
            
              {selectedRow ? (
                <div>
                  <RowDetails row={selectedRow} headers={headers} /> 
                  
                </div>
              ) : (
                <Table rows={tableRow} headers={headers} onRowClick={handleRowClick} />
              )}
            </div>
          </>
        );
      };

export default React.memo(History);
