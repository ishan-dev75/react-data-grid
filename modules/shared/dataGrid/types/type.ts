/**
 * Sort direction for a column
 */
export type SortDirection = 'asc' | 'desc' | null;

/**
 * Type for custom cell renderer function
 * Receives the cell value, the entire row data, and the column definition
 */
export type CellRenderer = (value: any, row: Row, column: ColumnRef) => React.ReactNode;

/**
 * Type for custom sort comparator function
 * Receives two rows, the field to sort by, and whether sorting is ascending
 * Returns negative if a should come before b, positive if b should come before a, 0 if equal
 */
export type SortComparator = (a: Row, b: Row, field: string, isAscending: boolean) => number;

/**
 * Parameters for the CellEditor function
 */
export interface CellEditorParams {
  value: any;
  row: Row;
  column: ColumnRef;
  onSave: (newValue: any) => void;
  onCancel: () => void;
}

/**
 * Type for custom cell editor function
 * Receives an object with the current value, row data, column definition, and callbacks
 * Returns a React component for editing the cell value
 */
export type CellEditor = (params: CellEditorParams) => React.ReactNode;

/**
 * Type for value validator function
 * Receives the new value and returns true if valid, false if invalid
 */
export type ValueValidator = (value: any) => boolean;

/**
 * Configuration for a column in the DataGrid
 */
export interface ColumnRef {
  /** Unique identifier for the column, matches the field name in the row data */
  field: string;

  /** Display name for the column header */
  headerName: string;

  /** Width of the column in pixels (optional) */
  width?: number;

  /** Minimum width of the column in pixels (defaults to 200px) */
  minWidth?: number;

  /** Data type of the column content (defaults to 'string' if not specified) */
  type?: 'string' | 'number' | 'date';

  /** Text alignment for the column (defaults to 'left' for string and date, 'center' for number) */
  align?: 'left' | 'center' | 'right';

  /** Whether the column is sortable (defaults to true) */
  sortable?: boolean;

  /** Custom renderer function for the cell */
  renderCell?: CellRenderer;

  /**
   * Custom value getter function to derive or transform the cell value from the row data.
   * Can be used to:
   * - Compute values based on multiple fields
   * - Transform values (e.g., formatting)
   * - Provide conditional values based on row data
   * - Set default values for null/undefined fields
   */
  valueGetter?: (row: Row) => any;

  /**
   * Custom sort comparator function for this column.
   * Allows complete control over the sorting logic for this column.
   * If provided, this overrides the default sorting logic based on column type.
   *
   * Example usage:
   * ```
   * sortComparator: (a, b, field, isAscending) => {
   *   // Custom comparison logic
   *   const valueA = a[field].toLowerCase();
   *   const valueB = b[field].toLowerCase();
   *   return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
   * }
   * ```
   */
  sortComparator?: SortComparator;

  /** Whether the column is editable (defaults to false) */
  editable?: boolean;

  /**
   * Custom editor function for the cell.
   * If provided, this overrides the default editor based on column type.
   *
   * Example usage:
   * ```
   * editableCell: ({ value, row, column, onSave, onCancel }) => (
   *   <CustomEditor
   *     initialValue={value}
   *     onSave={onSave}
   *     onCancel={onCancel}
   *   />
   * )
   * ```
   */
  editableCell?: CellEditor;

  /**
   * Validator function for the cell value.
   * If provided, this is used to validate the value before saving.
   *
   * Example usage:
   * ```
   * valueValidator: (value) => {
   *   // Custom validation logic
   *   return value !== null && value !== '';
   * }
   * ```
   */
  valueValidator?: ValueValidator;
}

/**
 * Sort model for the DataGrid
 */
export interface SortModel {
  /** Field to sort by */
  field: string;

  /** Sort direction */
  direction: SortDirection;
}

/**
 * Represents a row of data in the DataGrid
 * Keys should match the 'field' properties in the columns
 */
export type Row = Record<string, any>;
