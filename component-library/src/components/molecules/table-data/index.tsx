import * as React from 'react';
import ReactTable from 'react-table';

export interface IDataTableConfiguration {
  data: any[];
  columns: any[];
  defaultSorted?: any[];
}

type DataTableViewModel = IDataTableConfiguration;

const DataTable: React.SFC<DataTableViewModel> = props => (
  <div className="gray-dim">
    <ReactTable
      data={props.data}
      columns={props.columns}
      showPagination={false}
      showPaginationTop={false}
      showPaginationBottom={false}
      showPageSizeOptions={false}
      pageSize={props.data.length}
      defaultSorted={props.defaultSorted}
    />
  </div>
);

export default DataTable;
