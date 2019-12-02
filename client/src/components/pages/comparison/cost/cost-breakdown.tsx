import * as React from "react";
import ReactTable from 'react-table';
import withSizes from 'react-sizes';

export interface ICostBreakdownTableViewModel {
	data: Array<{
		name: string;
		amount: string;
	}>;

	valueColor: string;
}

type CostBreakdownTableProps = ICostBreakdownTableViewModel;

const CostBreakdownTable: React.FC<CostBreakdownTableProps> = props => {
	const tableColumns = [
		{
			Cell: (cellProps: any) => {
				console.log(cellProps)
				return (
					<span className="w-100 flex flex-row items-center">
						<div className={'w-100'}>
							<div className="ml1 flex-auto merriweather black t-medium">
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
							<div className="ml1 flex-auto lato t-medium" style={{ color: props.valueColor }}>
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

export default withSizes(mapSizesToProps)(CostBreakdownTable) as typeof CostBreakdownTable;