import * as React from 'react';
import numeral from 'numeral';
import Header from '../../molecules/header';
import { EHeadingSize } from '../../atoms/typography/heading';
import Card from '../../atoms/card';
import EarningsMidCareerGraph from '../../molecules/graph/earnings-mid-career';
import DataTable from '../../molecules/table-data';
import LoadingText, { ELoadingTextSize } from '../../atoms/loading/text';
import { dataLoadingEarningsMidCareerGraph } from '../../atoms/loading/data';
import { EPersonType } from '../../../shared'

export interface IEarningsMidCareerChartConfiguration {
  colleges: Array<{
    abbreviation: string;
    name: string;
    midCareerEarnings: {
      totalActualPrice: number | null;
      totalEdstimatePrice: number;
      totalEarnings: number;
    };
    hasMyMajor: boolean;
  }>;
  personType: EPersonType;
  highSchoolEarnings: number;
  loading: boolean;
}

type EarningsMidCareerChartViewModel = IEarningsMidCareerChartConfiguration;

const EarningsMidCareerChart: React.SFC<EarningsMidCareerChartViewModel> = props => {
  const tableColumns = [
    {
      Cell: (cellProps: any) => <span className="fw7">{cellProps.value}</span>,
      Header: 'College',
      accessor: 'collegeNameFull',
      minWidth: 160,
      resizable: false
    },
    {
      Cell: (cellProps: any) => <span>{numeral(cellProps.value).format('($0,0)')}</span>,
      Header: 'Edstimate®',
      accessor: 'totalEdstimatePrice',
      resizable: false
    },
    {
      Cell: (cellProps: any) =>
        cellProps.value && <span>{numeral(cellProps.value).format('($0,0)')}</span>,
      Header: 'Actual Cost',
      accessor: 'totalActualPrice',
      resizable: false,
      show: props.colleges.some(college => college.midCareerEarnings.totalActualPrice !== null)
    },
    {
      Cell: (cellProps: any) => <span>{numeral(cellProps.value).format('$0,0')}</span>,
      Header: 'Cumulative Mid-Career Earnings',
      accessor: 'totalEarnings',
      resizable: false
    },
    {
      Cell: (cellProps: any) => <span>{numeral(cellProps.value).format('0%')}</span>,
      Header: 'Return on Investment',
      accessor: 'returnOnInvestment',
      resizable: false
    }
  ];

  return (
    <div>
      {props.loading ? (
        <div>
          <Header size={EHeadingSize.H4} text={'Mid-Career Earnings'} loading={props.loading}>
            <div className="dn db-l nt3 nb3" style={{ width: 200 }}>
              <LoadingText size={ELoadingTextSize.H1} width={100} />
            </div>
          </Header>
          <EarningsMidCareerGraph
            colleges={dataLoadingEarningsMidCareerGraph}
            personType={props.personType}
            highSchoolEarnings={props.highSchoolEarnings}
            loading={props.loading}
          />
          <div className="nt3 nb3 w-100">
            <LoadingText size={ELoadingTextSize.H1} width={100} />
          </div>
          <div className="nt3 nb3 w-100">
            <LoadingText size={ELoadingTextSize.H1} width={100} />
          </div>
        </div>
      ) : (
        <div>
          <EarningsMidCareerGraph
            colleges={props.colleges}
            personType={props.personType}
            highSchoolEarnings={props.highSchoolEarnings}
            loading={props.loading}
          />
          <Card className="pv2 ph3 mv3">
            <DataTable
              columns={tableColumns}
              data={props.colleges.map(college => ({
                bar: college.abbreviation,
                collegeNameFull: college.name,
                returnOnInvestment:
                  college.midCareerEarnings.totalEarnings /
                  college.midCareerEarnings.totalEdstimatePrice,
                ...college.midCareerEarnings
              }))}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default EarningsMidCareerChart;
