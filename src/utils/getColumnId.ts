// Utils
import md5 from 'md5';

export const getColumnId = (column: any) => {
  if (typeof column.field === 'string') {
    if (column.headerName) {
      return `${column.field}:${md5(column.headerName).substring(0, 8)}`;
    }
    return column.field;
  }

  return md5(JSON.stringify(column));
};

export default getColumnId;
