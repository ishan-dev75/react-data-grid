'use client';

import React from 'react';
import { DataGrid, ColumnRef } from '@/modules/shared/dataGrid';

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
      minWidth: 50
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      type: 'string',
      sortable: false // Example of a non-sortable column
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
      <h1 className="text-2xl font-bold mb-4">DataGrid Demo with Sorting</h1>
      <p className="mb-4 text-gray-600">Click on column headers to sort. Hover over sort icons for more information.</p>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
}
