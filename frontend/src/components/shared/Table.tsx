import React, { useState, useEffect, useRef } from 'react';
import Button from 'src/components/shared/Button';
import { formatDate, isValidISODateTime } from 'src/util/util';
import "src/css/admin/jobManagement.css";
import 'src/css/shared/table.css';
import dotdotdot from "src/assets/images/dotdotdot.svg";

interface TableProps {
    data: any[];
    handleDelete?: (data: any) => Promise<void>;
    actions?: { [key: string]: (data: number) => Promise<void> };
}

const Table: React.FC<TableProps> = ({ data, handleDelete, actions }) => {
    const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [sortCriteria, setSortCriteria] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
    const [tableColumns, setTableColumns] = useState<string[]>();

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownIndex(null);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (data && data.length > 0) {
            const keys = Object.keys(data[0]).filter(
                (key) => typeof data[0][key] === 'string' || typeof data[0][key] === 'number' || typeof data[0][key] === 'boolean'
            );
            setTableColumns(keys);
        }
    }, [data]);


    const handleDeleteData = async () => {
        try {
            if (handleDelete) {
                await handleDelete(selectedRows);
            }
            setSelectedRows(new Set());
            setIsAllSelected(false);
        } catch (err) {
            throw err;
        }
    };

    const handleRowClick = (id: string): void => {
        const isSelected = selectedRows.has(id);

        if (isSelected) {
            const updatedSelectedRows = new Set(selectedRows);
            updatedSelectedRows.delete(id);
            setSelectedRows(updatedSelectedRows);
        } else {
            setSelectedRows(new Set(selectedRows).add(id));
        }
    };


    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const isChecked = e.target.checked;
        const ids: string[] = data.map((item) => item._id);

        if (isChecked) {
            setSelectedRows(new Set(ids));
        } else {
            setSelectedRows(new Set());
        }

        setIsAllSelected(isChecked);
    };


    const handleSort = (criteria: string): void => {
        if (sortCriteria === criteria) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortCriteria(criteria);
            setSortOrder('asc');
        }
    };

    const ActionsComponent = (selectedIndex: number) => {
        if (actions) {
            return (
                <div className='table-actionsComponent' ref={dropdownRef}>
                    <img
                        src={dotdotdot}
                        onClick={(e) => {
                            e.stopPropagation();
                            setDropdownIndex(selectedIndex === dropdownIndex ? null : selectedIndex);
                        }}
                    />
                    {selectedIndex === dropdownIndex && (
                        <div className='table-actionsComponent-dropdown column'>
                            {Object.keys(actions).map((action, index) => (
                                <p
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        actions[action](selectedIndex);
                                    }}
                                >
                                    {action}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
    };

    if (data) {
        data.sort((a, b) => {
            const valueA = a[sortCriteria];
            const valueB = b[sortCriteria];

            // Check if values are numeric and sort numerically if they are
            if (!isNaN(valueA) && !isNaN(valueB)) {
                return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
            }

            // If values are not numeric, convert them to strings and sort
            const strA = valueA !== undefined ? valueA.toString().toLowerCase() : '';
            const strB = valueB !== undefined ? valueB.toString().toLowerCase() : '';

            if (strA < strB) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (strA > strB) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }


    return (
        <>
            {handleDelete &&

                <div className='table-deleteActivated row'>
                    <h4>{selectedRows.size} selected</h4>
                    <Button destructive={true} text='Delete' handleClick={handleDeleteData} />
                </div>
            }
            {data && <h4>{data.length} Results</h4>}
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            {handleDelete &&
                                <th>
                                    <input type='checkbox' onChange={handleSelectAll} checked={isAllSelected} />
                                </th>
                            }
                            {tableColumns &&
                                tableColumns.map((key) => (
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
                        {data.map((item: any, index: number) => (
                            <tr key={index} onClick={() => handleRowClick(item._id)}>
                                {handleDelete &&
                                    <td>
                                        <input
                                            type='checkbox'
                                            checked={selectedRows.has(item._id)}
                                            onChange={() => handleRowClick(item._id)}
                                        />
                                    </td>
                                }
                                {tableColumns &&
                                    tableColumns.map((columnKey) => (
                                        <td key={columnKey}>
                                            <p>
                                                {isValidISODateTime(item[columnKey])
                                                    ? formatDate(item[columnKey])
                                                    : String(item[columnKey])}
                                            </p>
                                        </td>
                                    ))}
                                <td>{ActionsComponent(index)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;
