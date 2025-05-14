'use client';

import React from 'react';
import { DataGrid, ColumnRef, Row } from '@/modules/shared/dataGrid';

export default function DataGridDemo() {
  const columns: ColumnRef[] = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 50,
      type: 'number',
      align: 'left'
    },
    {
      field: 'firstName',
      headerName: 'First name',
      type: 'string'
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      type: 'string',
      align: 'center'
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      minWidth: 50,
      // Example of custom cell rendering with conditional styling
      renderCell: (value) => (
        <div className={`px-4 py-2 text-center ${value < 18 ? 'text-red-500 font-bold' : value > 60 ? 'text-blue-500 font-bold' : ''}`}>
          {value !== null && value !== undefined ? value : ''}
        </div>
      )
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      sortable: false,
      // Example of a custom cell that combines multiple fields
      renderCell: (_, row) => (
        <div className="px-4 py-2 flex items-center">
          <span className="font-medium">{row.firstName || ''} {row.lastName || ''}</span>
          {row.age && <span className="ml-2 text-xs text-gray-500">({row.age} years old)</span>}
        </div>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      align: 'center',
      // Example of a custom cell with a computed value
      valueGetter: (row: Row) => {
        if (row.age === null) return 'Unknown';
        return row.age < 18 ? 'Minor' : row.age > 60 ? 'Senior' : 'Adult';
      },
      renderCell: (value) => {
        let bgColor = 'bg-gray-200';
        let textColor = 'text-gray-800';

        if (value === 'Minor') {
          bgColor = 'bg-yellow-100';
          textColor = 'text-yellow-800';
        } else if (value === 'Adult') {
          bgColor = 'bg-green-100';
          textColor = 'text-green-800';
        } else if (value === 'Senior') {
          bgColor = 'bg-blue-100';
          textColor = 'text-blue-800';
        }

        return (
          <div className="px-4 py-2 flex justify-center">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
              {value}
            </span>
          </div>
        );
      }
    },
    {
      field: 'birthDate',
      headerName: 'Birth Date',
      type: 'date',
      align: 'right'
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14, birthDate: '1990-01-15', fullName: 'Jon Snow' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31, birthDate: '1980-06-23', fullName: 'Cersei Lannister' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31, birthDate: '1980-06-23', fullName: 'Jaime Lannister' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11, birthDate: '1995-03-10', fullName: 'Arya Stark' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, birthDate: '1992-05-12', fullName: 'Daenerys Targaryen' },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150, birthDate: '1870-01-01', fullName: 'Melisandre' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, birthDate: '1978-04-19', fullName: 'Ferrara Clifford' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, birthDate: '1986-07-12', fullName: 'Frances Rossini' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, birthDate: '1957-12-25', fullName: 'Roxie Harvey' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">DataGrid Demo with Sorting and Custom Cells</h1>
      <p className="mb-4 text-gray-600">Click on column headers to sort. Hover over sort icons for more information.</p>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
}
