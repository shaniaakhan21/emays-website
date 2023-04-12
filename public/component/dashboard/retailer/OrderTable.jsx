import React, { useState } from 'react';
import '../../../scss/component/dashboard/retailer/ordertable.scss';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';

const OrderTable = ({ data }) => {
    const { t } = useTranslation();
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 4;
    const pagesVisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Payment completed':
                return 'primary';
            case 'Pending to pick up':
                return 'info';
            case 'Items to be returned':
                return 'danger';
            case 'On Delivery':
                return 'secondary';
            default:
                return 'secondary';
        }
    };

    const displayData = data
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map((item, index) => (
            <tr key={index}>
                <td>
                    <p className='fw-normal mb-1'>{item.order}</p>
                </td>
                <td>
                    <p className='fw-normal mb-1'>{item.client}</p>
                </td>
                <td>
                    <p className='fw-normal mb-1'>{item.purchasedamount}</p>
                </td>
                <td>
                    <p className='fw-normal mb-1'>{item.date}</p>
                </td>
                <td>
                    <p className='fw-normal mb-1'>{item.time}</p>
                </td>
                <td>
                    <MDBBadge color={getStatusColor(item.status)} pill>
                        {item.status}
                    </MDBBadge>
                </td>
            </tr>
        ));

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>
                            <b>{t('dashboard.ordertable.first-col')}</b>
                        </th>
                        <th scope='col'>
                            <b>{t('dashboard.ordertable.second-col')}</b>
                        </th>
                        <th scope='col'>
                            <b>{t('dashboard.ordertable.third-col')}</b>
                        </th>
                        <th scope='col'>
                            <b>{t('dashboard.ordertable.fourth-col')}</b>
                        </th>
                        <th scope='col'>
                            <b>{t('dashboard.ordertable.fifth-col')}</b>
                        </th>
                        <th scope='col'>
                            <b>{t('dashboard.ordertable.sixth-col')}</b>
                        </th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>{displayData}</MDBTableBody>
            </MDBTable>
            <ReactPaginate
                previousLabel={'<<'}
                nextLabel={'>>'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination__link'}
                nextLinkClassName={'pagination__link'}
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination__link--active'}
            />
        </div>
    );
};

export default OrderTable;
