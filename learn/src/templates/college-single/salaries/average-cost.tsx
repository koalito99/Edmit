import * as React from "react";
import ReactTable from 'react-table';
import withSizes from 'react-sizes';

export interface IAverageCostTableViewModel {
	data: Array<{
		name: string;
		amount: string;
	}>;
}

type AverageCostTableProps = IAverageCostTableViewModel;

const AverageCostTable: React.FC<AverageCostTableProps> = props => {
	const tableColumns = [
		{
			Cell: (cellProps: any) => {
				return (
					<span className="w-100 flex flex-row items-center">
						<div className={'w-100'}>
							<div className="ml1 flex-auto merriweather black t-medium tc">
								{cellProps.original.name}
							</div>
						</div>
					</span>
				);
			},
			Header: '',
			accessor: 'name',
			resizable: false
		},
		{
			Cell: (cellProps: any) => {
				return (
					<span className="w-100 flex flex-row items-center">
						<div className={'w-100'}>
							<div className="ml1 flex-auto lato b green t-medium tc">
								{cellProps.original.amount}
							</div>
						</div>
					</span>
				);
			},
			Header: '',
			accessor: 'amount',
			resizable: false
		}
	];

	return (
		<ReactTable
			className="ReactTable-report-cost"
			data={props.data}
			columns={tableColumns}
			showPagination={false}
			showPaginationTop={false}
			showPaginationBottom={false}
			showPageSizeOptions={false}
			pageSize={props.data.length}
		/>
	);

};
const mapSizesToProps = (sizes: any) => ({
	isMobile: sizes.width < 640
});

export default withSizes(mapSizesToProps)(AverageCostTable) as typeof AverageCostTable;