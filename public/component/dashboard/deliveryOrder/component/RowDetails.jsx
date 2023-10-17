import React, { useCallback } from 'react';
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
import { useTranslation } from 'react-i18next';
const RowDetails = ({ row, headers, tableRow }) => {
    if (!row || !tableRow) {
        return null;
    }
    const [translate] = useTranslation();
    const t = useCallback((str) => translate(`dashboard.overview.${str}`), [translate]);
    const selectedRowOrderItems = tableRow.find(item => item.id === row.id)?.orderItems || [];
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
            <div className='toBeDelivered'>
                <><h2 className='title'>{t('toBeDelivered-title')}</h2><div className='items'>
                    {selectedRowOrderItems.map((item, index) => (
                        <ShoppingItem
                            key={index}
                            itemName={item.productName}
                            image={item.productImage}
                            color={item.productColor}
                            size={item.productSize}
                            quantity={item.productQuantity}
                        />
                    ))}
                </div>
                <div className='driver-btn'>
                    <Button >Mark ready to pickup</Button>
                </div></>
            </div>
        </div>
    );
};

export default RowDetails;
