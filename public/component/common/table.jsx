import {
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    DataTable,
    Table as CarbonTable
} from '@carbon/react';
import React, { useState } from 'react';
// SCSS
import './../../scss/component/retailer/status-box.scss';
  
const Table = ({ rows, headers, onRowClick, ...props }) => {
    const [selectedRow, setSelectedRow] = useState(null);
  
    const handleRowClick = (row) => {
        setSelectedRow(row);
        onRowClick(row); 
    };
  
    return (
        <div className='main-table'>
            <CarbonTable {...props}>
                <TableHead>
                    <TableRow>
                        {headers?.map((header, index) => (
                            <TableHeader key={index}>{header.header}</TableHeader>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) => (
                        <TableRow
                            style={{ backgroundColor: row?.isGreenHighlighted ? '#c6dfcd' : '' }}
                            key={row.id}
                            onClick={() => handleRowClick(row)}
                            className={selectedRow === row ? 'selected-row' : ''}
                        >
                            {headers.map((header) => (
                                <TableCell key={header.key}>{row[header.key]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </CarbonTable>
        </div>
    );
};
  
export default Table;
  
