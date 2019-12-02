import * as React from "react";
import Truncate from 'react-truncate';
import ReactTable from 'react-table';
import withSizes from 'react-sizes';
import LoadingText from '../../atoms/loading/text';
import {edstimateCopy, formatDollarsWhole} from "../../../shared";
import {anyCollegesUsingAidAward} from "../../../lib/price";

export interface IReportCostTableViewModel {
	data: Array<{
		id: string;
		calculationsUseAidAward: boolean;
		college: string;
		costAttendance: string | null;
		effectiveCost: number;
		financialAidAward: number | null;
		discount: string | null;
		edstimate: number;
		effectivePriceIfDifferentThanEdstimate: number | null;
	}>;

	isMobile?: boolean;
	loading: boolean;
}

type ReportCostTableProps = IReportCostTableViewModel;

const ReportCostTable: React.FC<ReportCostTableProps> = props => {
	const tableColumns = [
		{
			Cell: (cellProps: any) => {
				return (
					<span className="w-100 flex flex-row items-center">
						{props.loading ? (
							<div className="ml1 flex-auto">
								<LoadingText width={70} />
							</div>
						) : (
							<div className={'w-100'}>
								<div className="ml1 flex-auto merriweather black t-medium">
									<Truncate>{cellProps.value}</Truncate>
								</div>
							</div>
						)}
					</span>
				);
			},
			Header: props.loading ? '' : <span className="pv2 inline-flex">College</span>,
			accessor: 'college',
			minWidth: props.isMobile ? 30 : 140,
			resizable: false
		},
		{
			Header: props.loading ? '' : <span className="pv2 inline-flex">Cost of Attendance</span>,
			accessor: 'costAttendance',
			minWidth: props.isMobile ? 0 : 80,
			resizable: false
		},
		{
			Cell: (cellProps: any) => formatDollarsWhole(cellProps.value),
			Header: props.loading ? '' : <span className="pv2 inline-flex">{edstimateCopy}</span>,
			accessor: 'edstimate',
			minWidth: props.isMobile ? 22 : 80,
			resizable: false
		},
		{
			Cell: (cellProps: any) => cellProps.value && formatDollarsWhole(cellProps.value),
			Header: props.loading ? '' : <span className="pv2 inline-flex">Actual Cost</span>,
			accessor: 'effectivePriceIfDifferentThanEdstimate',
			minWidth: props.isMobile ? 22 : 80,
			resizable: false,
			show: anyCollegesUsingAidAward(props.data)
		}
	];

	return (
		<div className="gray-dim w-100">
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
		</div>
	);

};
const mapSizesToProps = (sizes: any) => ({
	isMobile: sizes.width < 640
});

export default withSizes(mapSizesToProps)(ReportCostTable) as typeof ReportCostTable;