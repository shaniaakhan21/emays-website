import {
    TableHead,
    TableRow,
    TableHeader, TableBody, TableCell, DataTable, Table as CarbonTable
} from '@carbon/react';
import React from 'react';

// SCSS

// Components

// Images

const Table = ({ rows, headers, ...props }) => {
    return (
        <DataTable {...props} rows={rows} headers={headers}>
            {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                <CarbonTable {...getTableProps()}>
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableHeader {...getHeaderProps({ header })}>
                                    {header.header}
                                </TableHeader>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow {...getRowProps({ row })}>
                                {row.cells.map((cell) => (
                                    <TableCell key={cell.id}>{cell.value}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </CarbonTable>
            )}
        </DataTable>
    );
};

Table.propTypes = {};

export default Table;
