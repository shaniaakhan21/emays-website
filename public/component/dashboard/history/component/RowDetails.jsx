import React from 'react';
import {
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    DataTable,
    Table as CarbonTable
} from '@carbon/react';
import '../../../../scss/component/dashboard/history.scss';
import ShoppingItem from '../../../checkout/ShoppingItem';
import { Button } from '@carbon/react';
import FallBack from '../../../../icons/fallback.png';
import TextAreaCustom from '../../../common/TextAreaCustom';
const RowDetails = ({ row, headers }) => {
    if (!row) {
        return null;
    }

    return (
        <div>
            <CarbonTable>
                <TableHead>
                    <TableRow>
                        {headers?.map((header, index) => (
                            <TableHeader key={index}>{header.header}</TableHeader>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell key={header.key}>{row[header.key]}</TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </CarbonTable>
            <section className='content-details'>
                <div className='row row-flex'>
                    <div className='col-lg-6'>
                        <br></br>
                        <div>
                            <h2>Appointment</h2>
                            <br />
                            <div className='row row-flex'>
                                <div className='col-lg-6 col-side'>
                                    <h4><b>Date</b></h4>
                                    <h5>Wed 27, feb 2023</h5>
                                </div>
                                <div className='col-lg-6 col-side'>
                                    <h4><b>Hour</b></h4>
                                    <h5>14:00 to 15:00</h5>
                                </div>
                            </div>
                            <br />
                            <div className='row'>
                                <h4><b>Delivery Address </b></h4>
                                <h5>Sample Address, Milano, Italia 06830</h5>
                            </div>
                            <br />
                            <div className='row'>
                                <h4><b>Full Name</b></h4>
                                <h5>Sample Name Coll iabichino</h5>
                            </div>
                            <br />
                            <div className='row'>
                                <h4><b>Email</b></h4>
                                <h5>Sample@email.com</h5>
                            </div>
                            <br />
                            <div className='row'>
                                <h4><b>Tel.</b></h4>
                                <h5>+39 000 000 00</h5>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3'>
                        <div>
                            <br />
                            <h2>Delivered</h2>
                            <br />
                            {Array.of(1, 2, 3, 4, 5, 6).map((item, index) => <ShoppingItem
                                index={1}
                                itemName={'productName'}
                                image={FallBack}
                                color={'Red'}
                                size={'40'}
                                onDelete={() => {
                                }}
                                quantity={index}
                                price={'$10'}
                            />)}
                        </div>
                    </div>
                    <div className='col-lg-3'>
                        <br></br>
                        <div className='sub-main-layout-02'>
                            <div className='box-it'>
                                <p>Comments</p>
                                <br></br>
                                <TextAreaCustom />
                                <p className='sub-title margin-2'>Helper Text</p>
                                <Button >Submit</Button>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default RowDetails;
