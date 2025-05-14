# DataGrid Component

A flexible, responsive, and feature-rich data grid component for React applications. This component provides powerful data display and manipulation capabilities including sorting, custom cell rendering, and optimized performance.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Component Structure](#component-structure)
- [Code Flow](#code-flow)
- [Key Design Decisions](#key-design-decisions)
- [Getting Started](#getting-started)

## Architecture Overview

The DataGrid component follows a modular architecture with clear separation of concerns:

1. **Core Component**: The main DataGrid component orchestrates the rendering of headers and rows.
2. **Cell Components**: Specialized components for different data types (string, number, date).
3. **Utility Functions**: Helper functions for sorting and value retrieval.
4. **Type Definitions**: TypeScript interfaces and types for strong typing.

This architecture allows for:
- **Extensibility**: Easy to add new features or cell types
- **Maintainability**: Each component has a single responsibility
- **Performance**: Optimized rendering with React.memo
- **Type Safety**: Comprehensive TypeScript definitions

## Component Structure

```
dataGrid/
├── DataGrid.tsx           # Main component
├── HeaderCell.tsx         # Header cell component with sorting UI
├── DataRow.tsx            # Row component
├── CellRenderer.tsx       # Cell type selector
├── cells/                 # Cell type implementations
│   ├── StringCell.tsx     # String cell component
│   ├── NumberCell.tsx     # Number cell component
│   ├── DateCell.tsx       # Date cell component
│   └── DefaultCell.tsx    # Fallback cell component
├── utils/                 # Utility functions
│   └── sortUtils.ts       # Sorting utilities
└── types/                 # Type definitions
    └── type.ts            # TypeScript interfaces and types
```

### File Purposes

- **DataGrid.tsx**: The main component that renders the table structure and manages the sorting state.
- **HeaderCell.tsx**: Renders column headers with sorting indicators and handles sort interactions.
- **DataRow.tsx**: Renders a row of data with optimized re-rendering.
- **CellRenderer.tsx**: Selects the appropriate cell component based on column type or custom renderer.
- **cells/*.tsx**: Type-specific cell components with appropriate formatting and styling.
- **sortUtils.ts**: Contains sorting algorithms and helper functions for different data types.
- **type.ts**: Contains TypeScript interfaces and types for the component.

## Code Flow

1. **Initialization**:
   - DataGrid receives `columns` and `rows` props
   - Initial sorting state is set to null (unsorted)

2. **Rendering**:
   - DataGrid renders a table structure
   - HeaderCell components are rendered for each column
   - DataRow components are rendered for each row (sorted if applicable)
   - CellRenderer selects the appropriate cell component for each cell

3. **Sorting**:
   - User clicks on a column header
   - HeaderCell triggers the sort handler in DataGrid
   - DataGrid updates the sort model (field and direction)
   - Rows are sorted using the appropriate sort function
   - Component re-renders with the sorted rows

4. **Custom Cell Rendering**:
   - If a column has a `renderCell` function, it's used to render the cell
   - Otherwise, the appropriate cell component is selected based on column type
   - Cell components receive the cell value and alignment

## Key Design Decisions

### 1. Component Separation

We've separated the DataGrid into multiple components (DataGrid, HeaderCell, DataRow, CellRenderer) to:
- Improve code organization and maintainability
- Enable more granular optimization with React.memo
- Make it easier to extend or modify specific parts

### 2. Cell Type System

The cell type system allows for:
- Type-specific formatting and styling
- Type-specific sorting algorithms
- Fallback to a default cell when no type is specified

### 3. Custom Rendering and Sorting

We provide two powerful customization mechanisms:
- `renderCell`: For custom cell UI rendering
- `sortComparator`: For custom sorting logic

These allow for complete flexibility while maintaining a clean API.

### 4. Performance Optimizations

- React.memo for cell and row components to prevent unnecessary re-renders
- Efficient sorting with memoization
- Centralized value retrieval logic

### 5. TypeScript Integration

Comprehensive TypeScript definitions provide:
- Better developer experience with autocomplete
- Type safety to prevent runtime errors
- Self-documenting code

## Getting Started

See the [EXAMPLES.md](./EXAMPLES.md) file for detailed usage examples and code snippets.

```jsx
import { DataGrid } from '@/modules/shared/dataGrid';

const columns = [
  { field: 'id', headerName: 'ID', type: 'number' },
  { field: 'name', headerName: 'Name', type: 'string' },
  { field: 'birthDate', headerName: 'Birth Date', type: 'date' },
];

const rows = [
  { id: 1, name: 'John Doe', birthDate: '1990-01-15' },
  { id: 2, name: 'Jane Smith', birthDate: '1985-06-20' },
];

function MyComponent() {
  return <DataGrid columns={columns} rows={rows} />;
}
```
