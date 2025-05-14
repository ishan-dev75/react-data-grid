/**
 * Sort direction for a column
 */
export type SortDirection = 'asc' | 'desc' | null;

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
