'use client';

import React, { useState } from 'react';
import { DataGrid, ColumnRef, Row } from '@/modules/shared/dataGrid';

export default function DataGridDemo() {
  const [demoRows, setDemoRows] = useState<Row[]>([]);

  // Handle cell value changes
  const handleCellValueChange = (rowId: any, field: string, value: any) => {
    console.log(`Cell value changed: rowId=${rowId}, field=${field}, value=${value}`);
    setDemoRows(prevRows =>
      prevRows.map(row =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

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
      type: 'string',
      editable: true, // Make this column editable
      valueValidator: (value) => value !== null && value !== '' // Validate that the value is not empty
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      type: 'string',
      align: 'center',
      editable: true
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      minWidth: 50,
      editable: true, // Make this column editable
      // Example of custom cell rendering with conditional styling
      renderCell: (value) => (
        <div className={`px-4 py-2 text-center ${value < 18 ? 'text-red-500 font-bold' : value > 60 ? 'text-blue-500 font-bold' : ''}`}>
          {value !== null && value !== undefined ? value : ''}
        </div>
      ),
      // Validate that the value is a positive number or null
      valueValidator: (value) => value === null || (typeof value === 'number' && value >= 0)
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      // Example of a custom cell that combines multiple fields
      renderCell: (_, row) => (
        <div className="px-4 py-2 flex items-center">
          <span className="font-medium">{row.firstName || ''} {row.lastName || ''}</span>
          {row.age && <span className="ml-2 text-xs text-gray-500">({row.age} years old)</span>}
        </div>
      ),
      // Example of a realistic multi-criteria sort: first by age, then by name
      sortComparator: (a: Row, b: Row, _field: string, isAscending: boolean) => {
        // First, handle special cases (null ages)
        if (a.age === null && b.age !== null) return isAscending ? 1 : -1;
        if (a.age !== null && b.age === null) return isAscending ? -1 : 1;
        if (a.age === null && b.age === null) {
          // If both ages are null, sort by name
          return isAscending
            ? a.fullName.localeCompare(b.fullName)
            : b.fullName.localeCompare(a.fullName);
        }

        // Sort by age first (group by age)
        const ageCompare = isAscending
          ? a.age - b.age
          : b.age - a.age;

        // If ages are different, return the age comparison result
        if (ageCompare !== 0) {
          return ageCompare;
        }

        // If ages are the same, sort by full name
        return isAscending
          ? a.fullName.localeCompare(b.fullName)
          : b.fullName.localeCompare(a.fullName);
      }
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
      // Custom sorting for status - we want a specific order: Minor, Adult, Senior, Unknown
      sortComparator: (a: Row, b: Row, _field: string, isAscending: boolean) => {
        // Get the status values using the same logic as valueGetter
        const getStatus = (row: Row) => {
          if (row.age === null) return 'Unknown';
          return row.age < 18 ? 'Minor' : row.age > 60 ? 'Senior' : 'Adult';
        };

        const statusA = getStatus(a);
        const statusB = getStatus(b);

        // Define the custom order
        const statusOrder = ['Minor', 'Adult', 'Senior', 'Unknown'];

        // Get the index of each status in our custom order
        const indexA = statusOrder.indexOf(statusA);
        const indexB = statusOrder.indexOf(statusB);

        // Sort by the index in our custom order
        return isAscending ? indexA - indexB : indexB - indexA;
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
      align: 'right',
      editable: true, // Make this column editable
      // Validate that the date is not in the future
      valueValidator: (value) => {
        if (!value) return true;
        const date = new Date(value);
        return !isNaN(date.getTime()) && date <= new Date();
      }
    },
  ];

  // Initialize the state with the demo data
  const initialRows = [
    // Random order of different ages and names
    { id: 8, lastName: 'Wayne', firstName: 'Bruce', age: 31, birthDate: '1980-02-19', fullName: 'Bruce Wayne' },
    { id: 3, lastName: 'Allen', firstName: 'Barry', age: 11, birthDate: '1995-01-20', fullName: 'Barry Allen' },
    { id: 11, lastName: 'Clifford', firstName: 'Ferrara', age: 44, birthDate: '1978-04-19', fullName: 'Ferrara Clifford' },
    { id: 5, lastName: 'Kent', firstName: 'Clark', age: 14, birthDate: '1990-06-18', fullName: 'Clark Kent' },
    { id: 14, lastName: 'Targaryen', firstName: 'Daenerys', age: null, birthDate: '1992-05-12', fullName: 'Daenerys Targaryen' },
    { id: 9, lastName: 'Frances', firstName: 'Rossini', age: 36, birthDate: '1986-07-12', fullName: 'Frances Rossini' },
    { id: 7, lastName: 'Lannister', firstName: 'Jaime', age: 31, birthDate: '1980-06-23', fullName: 'Jaime Lannister' },
    { id: 4, lastName: 'Snow', firstName: 'Jon', age: 14, birthDate: '1990-01-15', fullName: 'Jon Snow' },
    { id: 15, lastName: 'Melisandre', firstName: null, age: 150, birthDate: '1870-01-01', fullName: 'Melisandre' },
    { id: 2, lastName: 'Parker', firstName: 'Peter', age: 11, birthDate: '1995-05-15', fullName: 'Peter Parker' },
    { id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 65, birthDate: '1957-12-25', fullName: 'Roxie Harvey' },
    { id: 10, lastName: 'Rogers', firstName: 'Steve', age: 36, birthDate: '1986-07-04', fullName: 'Steve Rogers' },
    { id: 1, lastName: 'Stark', firstName: 'Arya', age: 11, birthDate: '1995-03-10', fullName: 'Arya Stark' },
    { id: 12, lastName: 'Stark', firstName: 'Tony', age: 44, birthDate: '1978-05-29', fullName: 'Tony Stark' },
    { id: 6, lastName: 'Lannister', firstName: 'Cersei', age: 31, birthDate: '1980-06-23', fullName: 'Cersei Lannister' },
  ];

  // Initialize the state with the demo data
  React.useEffect(() => {
    setDemoRows(initialRows);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">DataGrid Demo with Editable Cells</h1>
      <p className="mb-4 text-gray-600">Double-click on a cell to edit its value. Press Enter to save or Escape to cancel.</p>
      <div className='h-[calc(100vh-8rem)] overflow-auto'>
        <DataGrid
          columns={columns}
          rows={demoRows}
          onCellValueChange={handleCellValueChange}
        />
      </div>
    </div>
  );
}
