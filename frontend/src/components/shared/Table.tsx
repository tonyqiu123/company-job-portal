import React, { useState, useEffect } from 'react';
import Button from 'src/components/shared/Button';
import { formatDate, isValidISODateTime } from 'src/util/util';
import "src/css/admin/jobManagement.css";
import 'src/css/shared/table.css';

interface TableProps {
    data: any[]
    showDelete?: boolean
}

const Table: React.FC<TableProps> = ({ data, showDelete = false }) => {
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [sortCriteria, setSortCriteria] = useState<string>(''); // Current sort criteria
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Current sort order

    const handleRowSelect = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
        if (e.target.checked) {
            setSelectedRows([...selectedRows, index]);
        } else {
            const updatedSelectedRows = [...selectedRows];
            updatedSelectedRows.splice(updatedSelectedRows.indexOf(index), 1);
            setSelectedRows(updatedSelectedRows);
        }
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.checked) {
            const indices: number[] = data.map((_, index) => index);
            setSelectedRows(indices);
            setSelectAll(true);
        } else {
            setSelectedRows([]);
            setSelectAll(false);
        }
    };

    const handleSort = (criteria: string): void => {
        if (sortCriteria === criteria) {
            // If same criteria, toggle the sort order
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // If different criteria, set new sort criteria and default to ascending order
            setSortCriteria(criteria);
            setSortOrder('asc');
        }
    };

    const sortedData = [...data];
    if (sortCriteria) {
        sortedData.sort((a, b) => {
            const valueA = (a[sortCriteria] || "").toString().toLowerCase();
            const valueB = (b[sortCriteria] || "").toString().toLowerCase();
            if (valueA < valueB) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }

    return (

        <>
            {showDelete && (
                <div className='jobManagement-deleteActivated row'>
                    <h6>{selectedRows.length} selected</h6>
                    <Button destructive={true} text="Delete" handleClick={() => { return new Promise((resolve, reject) => resolve()) }} />
                </div>
            )}
            <table>
                <thead>
                    <tr>
                        {showDelete &&
                            <th>
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectAll}
                                />
                            </th>
                        }
                        {Object.keys(data[0])
                            .filter(key => typeof data[0][key] === 'string' || typeof data[0][key] === 'number')
                            .map((key) => (
                                <th key={key}>
                                    <p onClick={() => handleSort(key)}>
                                        {key}&nbsp;&nbsp;
                                        {sortCriteria === key && sortOrder === 'asc' ? '↑' : '↓'}
                                    </p>
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item: any, index: number) => (
                        <tr key={index}>
                            {showDelete &&
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => handleRowSelect(e, index)}
                                        checked={selectedRows.includes(index)}
                                    />
                                </td>
                            }
                            {Object.values(item)
                                .filter(value => typeof value === 'string' || typeof value === 'number')
                                .map((value: any, index: number) => (
                                    <td key={index}><p>{isValidISODateTime(value) ? formatDate(value) : value}</p></td>
                                ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Table;
