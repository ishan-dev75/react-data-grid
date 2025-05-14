# DataGrid Component Examples

This document provides comprehensive examples of how to use the DataGrid component in various scenarios. Each example includes code snippets and explanations to help you understand how to configure and customize the component.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Column Configuration](#column-configuration)
  - [Column Properties](#column-properties)
  - [Column Types](#column-types)
  - [Column Alignment](#column-alignment)
- [Custom Cell Rendering](#custom-cell-rendering)
  - [Simple Custom Rendering](#simple-custom-rendering)
  - [Conditional Formatting](#conditional-formatting)
  - [Complex Cell Content](#complex-cell-content)
- [Value Transformation](#value-transformation)
  - [Using valueGetter](#using-valuegetter)
  - [Computed Fields](#computed-fields)
- [Editable Cells](#editable-cells)
  - [Basic Editing](#basic-editing)
  - [Custom Editors](#custom-editors)
  - [Value Validation](#value-validation)
- [Sorting](#sorting)
  - [Default Sorting](#default-sorting)
  - [Custom Sorting](#custom-sorting)
  - [Multi-Criteria Sorting](#multi-criteria-sorting)

## Basic Usage

Here's a simple example of how to use the DataGrid component:

```jsx
import React from 'react';
import { DataGrid } from '@/modules/shared/dataGrid';

const columns = [
  { field: 'id', headerName: 'ID', type: 'number' },
  { field: 'firstName', headerName: 'First Name', editable: true },
  { field: 'lastName', headerName: 'Last Name', editable: true },
  { field: 'age', headerName: 'Age', type: 'number', editable: true },
];

const rows = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 35 },
  { id: 2, firstName: 'Jane', lastName: 'Smith', age: 28 },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 42 },
];

export default function MyComponent() {
  const handleCellValueChange = (rowId, field, value) => {
    console.log(`Cell value changed: rowId=${rowId}, field=${field}, value=${value}`);
    // Update your data source here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Users</h1>
      <DataGrid
        columns={columns}
        rows={rows}
        onCellValueChange={handleCellValueChange}
      />
    </div>
  );
}
```

## Column Configuration

### Column Properties

The `ColumnRef` interface supports the following properties:

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| field | string | Yes | - | Unique identifier for the column, matches the field name in the row data |
| headerName | string | Yes | - | Display name for the column header |
| width | number | No | auto | Width of the column in pixels |
| minWidth | number | No | 200 | Minimum width of the column in pixels |
| type | 'string' \| 'number' \| 'date' | No | 'string' | Data type of the column content |
| align | 'left' \| 'center' \| 'right' | No | Based on type | Text alignment for the column |
| sortable | boolean | No | true | Whether the column is sortable |
| editable | boolean | No | false | Whether the column is editable |
| renderCell | function | No | - | Custom renderer function for the cell |
| editableCell | function | No | - | Custom editor function for the cell |
| valueGetter | function | No | - | Function to derive the cell value from the row data |
| valueValidator | function | No | - | Function to validate edited values before saving |
| sortComparator | function | No | - | Custom sort comparator function for this column |

### Column Types

The DataGrid supports different column types with appropriate formatting and sorting:

```jsx
const columns = [
  // String column (default)
  { field: 'name', headerName: 'Name' },

  // Number column
  { field: 'age', headerName: 'Age', type: 'number' },

  // Date column
  { field: 'birthDate', headerName: 'Birth Date', type: 'date' },
];
```

### Column Alignment

You can control the alignment of column content:

```jsx
const columns = [
  // Left alignment (default for string and date)
  { field: 'name', headerName: 'Name', align: 'left' },

  // Center alignment (default for number)
  { field: 'age', headerName: 'Age', type: 'number', align: 'center' },

  // Right alignment
  { field: 'price', headerName: 'Price', type: 'number', align: 'right' },
];
```

## Custom Cell Rendering

### Simple Custom Rendering

You can customize how a cell is rendered using the `renderCell` property:

```jsx
const columns = [
  {
    field: 'status',
    headerName: 'Status',
    renderCell: (value) => (
      <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        {value}
      </div>
    ),
  },
];
```

### Conditional Formatting

You can apply conditional formatting based on the cell value:

```jsx
const columns = [
  {
    field: 'score',
    headerName: 'Score',
    type: 'number',
    renderCell: (value) => {
      let color = 'text-gray-800';
      if (value > 80) color = 'text-green-600 font-bold';
      else if (value < 40) color = 'text-red-600 font-bold';

      return <div className={`px-4 py-2 ${color}`}>{value}</div>;
    },
  },
];
```

### Complex Cell Content

You can access the entire row data to create complex cell content:

```jsx
const columns = [
  {
    field: 'user',
    headerName: 'User',
    renderCell: (_, row) => (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          {row.firstName.charAt(0)}{row.lastName.charAt(0)}
        </div>
        <div>
          <div className="font-medium">{row.firstName} {row.lastName}</div>
          <div className="text-xs text-gray-500">{row.email}</div>
        </div>
      </div>
    ),
  },
];
```

## Value Transformation

### Using valueGetter

The `valueGetter` property allows you to transform or derive values from the row data:

```jsx
const columns = [
  {
    field: 'fullName',
    headerName: 'Full Name',
    valueGetter: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    field: 'ageGroup',
    headerName: 'Age Group',
    valueGetter: (row) => {
      if (row.age < 18) return 'Minor';
      if (row.age >= 65) return 'Senior';
      return 'Adult';
    },
  },
];
```

### Computed Fields

You can combine `valueGetter` with `renderCell` for complex computed fields:

```jsx
const columns = [
  {
    field: 'progress',
    headerName: 'Progress',
    valueGetter: (row) => (row.completed / row.total) * 100,
    renderCell: (value) => (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    ),
  },
];
```

## Editable Cells

The DataGrid supports in-place editing of cell values. Users can double-click on editable cells to enter edit mode, then press Enter to save or Escape to cancel.

### Basic Editing

To make a column editable, set the `editable` property to `true`:

```jsx
const columns = [
  { field: 'name', headerName: 'Name', editable: true },
  { field: 'age', headerName: 'Age', type: 'number', editable: true },
  { field: 'birthDate', headerName: 'Birth Date', type: 'date', editable: true },
];

// Handle cell value changes
const handleCellValueChange = (rowId, field, value) => {
  console.log(`Row ${rowId}, field ${field} changed to ${value}`);
  // Update your data source here
};

<DataGrid
  columns={columns}
  rows={rows}
  onCellValueChange={handleCellValueChange}
/>
```

The DataGrid provides type-specific editors:
- String cells: Text input
- Number cells: Number input with validation
- Date cells: Date picker

### Custom Editors

You can create custom editors using the `editableCell` property. For reusable custom editors, it's recommended to create them in a separate module (e.g., `dataGridExtensions`):

```jsx
// Import custom components from the extensions module
import { StarRatingCell, StarRatingEditor } from '@/modules/shared/dataGridExtensions/cells';

const columns = [
  {
    field: 'rating',
    headerName: 'Rating',
    editable: true,
    // Custom renderer for display mode
    renderCell: (value) => (
      <StarRatingCell value={value || 0} maxRating={5} />
    ),
    // Custom editor for edit mode
    editableCell: (value, row, column, onSave) => (
      <StarRatingEditor
        value={value || 0}
        maxRating={5}
        onSave={onSave}
        onCancel={() => {}} // We don't need to do anything on cancel
      />
    ),
    // Validate that the rating is between 0 and 5
    valueValidator: (value) => value >= 0 && value <= 5
  },
];
```

### Value Validation

You can validate edited values before saving using the `valueValidator` property:

```jsx
const columns = [
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    editable: true,
    // Validate that age is between 0 and 120
    valueValidator: (value) => value >= 0 && value <= 120,
  },
  {
    field: 'email',
    headerName: 'Email',
    editable: true,
    // Validate email format
    valueValidator: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
  },
];
```

If validation fails, the cell will display an error state and prevent saving.

## Sorting

### Default Sorting

By default, columns are sortable and use type-specific sorting algorithms:

- String columns: Case-insensitive alphabetical sorting
- Number columns: Numerical sorting
- Date columns: Chronological sorting

```jsx
const columns = [
  { field: 'name', headerName: 'Name' }, // Alphabetical sorting
  { field: 'age', headerName: 'Age', type: 'number' }, // Numerical sorting
  { field: 'birthDate', headerName: 'Birth Date', type: 'date' }, // Chronological sorting
];
```

### Custom Sorting

You can customize the sorting logic using the `sortComparator` property:

```jsx
const columns = [
  {
    field: 'name',
    headerName: 'Name',
    // Sort by last name first, then first name
    sortComparator: (a, b, field, isAscending) => {
      const nameA = a[field].split(' ');
      const nameB = b[field].split(' ');

      const lastNameA = nameA[nameA.length - 1].toLowerCase();
      const lastNameB = nameB[nameB.length - 1].toLowerCase();

      const lastNameCompare = isAscending
        ? lastNameA.localeCompare(lastNameB)
        : lastNameB.localeCompare(lastNameA);

      if (lastNameCompare !== 0) return lastNameCompare;

      const firstNameA = nameA[0].toLowerCase();
      const firstNameB = nameB[0].toLowerCase();

      return isAscending
        ? firstNameA.localeCompare(firstNameB)
        : firstNameB.localeCompare(firstNameA);
    },
  },
];
```

### Multi-Criteria Sorting

You can implement multi-criteria sorting to sort by multiple fields:

```jsx
const columns = [
  {
    field: 'department',
    headerName: 'Department & Name',
    // Sort by department first, then by name
    sortComparator: (a, b, field, isAscending) => {
      // First compare departments
      const deptCompare = isAscending
        ? a.department.localeCompare(b.department)
        : b.department.localeCompare(a.department);

      // If departments are the same, compare names
      if (deptCompare === 0) {
        return isAscending
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      return deptCompare;
    },
    // Custom rendering to show both department and name
    renderCell: (_, row) => (
      <div>
        <div className="font-medium">{row.name}</div>
        <div className="text-xs text-gray-500">{row.department}</div>
      </div>
    ),
  },
];
```

Here's a more complex example that sorts by age groups and then alphabetically within each group:

```jsx
const columns = [
  {
    field: 'profile',
    headerName: 'User Profile',
    sortComparator: (a, b, field, isAscending) => {
      // Define age groups
      const getAgeGroup = (age) => {
        if (age === null) return 3; // Special case
        if (age < 18) return 0; // Minor
        if (age >= 65) return 2; // Senior
        return 1; // Adult
      };

      const groupA = getAgeGroup(a.age);
      const groupB = getAgeGroup(b.age);

      // First sort by age group
      if (groupA !== groupB) {
        return isAscending ? groupA - groupB : groupB - groupA;
      }

      // Then sort alphabetically by name within each group
      return isAscending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    },
    renderCell: (_, row) => (
      <div className="flex items-center">
        <span className="font-medium">{row.name}</span>
        <span className="ml-2 text-xs text-gray-500">({row.age} years)</span>
      </div>
    ),
  },
];
```

This example demonstrates how to implement complex sorting logic that first groups records by one criterion (age group) and then sorts them by another criterion (name) within each group.
