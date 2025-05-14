import { ColumnRef, Row, SortModel, SortComparator } from '../types/type';

/**
 * Sort number values
 */
export const sortNumber = (valueA: any, valueB: any, isAscending: boolean): number => {
  // Handle null/undefined values
  if (valueA == null && valueB == null) return 0;
  if (valueA == null) return isAscending ? -1 : 1;
  if (valueB == null) return isAscending ? 1 : -1;

  return isAscending
    ? Number(valueA) - Number(valueB)
    : Number(valueB) - Number(valueA);
};

/**
 * Sort date values
 */
export const sortDate = (valueA: any, valueB: any, isAscending: boolean): number => {
  // Handle null/undefined values
  if (valueA == null && valueB == null) return 0;
  if (valueA == null) return isAscending ? -1 : 1;
  if (valueB == null) return isAscending ? 1 : -1;

  const dateA = valueA instanceof Date ? valueA : new Date(valueA);
  const dateB = valueB instanceof Date ? valueB : new Date(valueB);

  return isAscending
    ? dateA.getTime() - dateB.getTime()
    : dateB.getTime() - dateA.getTime();
};

/**
 * Sort string values
 */
export const sortString = (valueA: any, valueB: any, isAscending: boolean): number => {
  // Handle null/undefined values
  if (valueA == null && valueB == null) return 0;
  if (valueA == null) return isAscending ? -1 : 1;
  if (valueB == null) return isAscending ? 1 : -1;

  const strA = String(valueA).toLowerCase();
  const strB = String(valueB).toLowerCase();

  return isAscending
    ? strA.localeCompare(strB)
    : strB.localeCompare(strA);
};

/**
 * Get the cell value, considering valueGetter if provided
 */
export const getCellValue = (row: Row, column: ColumnRef): any => {
  if (column.valueGetter) {
    return column.valueGetter(row);
  }
  return row[column.field];
};

/**
 * Sort rows based on sort model
 */
export const sortRows = (rows: Row[], sortModel: SortModel | null, columns: ColumnRef[]): Row[] => {
  if (!sortModel) return rows;

  const { field, direction } = sortModel;
  if (!direction) return rows;

  const column = columns.find(col => col.field === field);
  if (!column) return rows;

  const isAscending = direction === 'asc';

  return [...rows].sort((a, b) => {
    // If a custom sort comparator is provided, use it
    if (column.sortComparator) {
      return column.sortComparator(a, b, field, isAscending);
    }

    // Get values using valueGetter if provided
    const valueA = getCellValue(a, column);
    const valueB = getCellValue(b, column);

    // Sort based on column type
    switch (column.type) {
      case 'number':
        return sortNumber(valueA, valueB, isAscending);

      case 'date':
        return sortDate(valueA, valueB, isAscending);

      default: // string or any other type
        return sortString(valueA, valueB, isAscending);
    }
  });
};
