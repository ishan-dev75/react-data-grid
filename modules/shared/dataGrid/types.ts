export interface ColumnRef {
  field: string;
  headerName: string;
  width?: number;
  type?: 'string' | 'number' | 'date';
  minWidth?: number;
}

export type Row = Record<string, any>;
