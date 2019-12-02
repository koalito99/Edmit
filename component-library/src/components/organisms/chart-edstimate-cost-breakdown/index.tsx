import * as React from 'react';
import numeral from 'numeral'
import Header from '../../molecules/header';
import { EHeadingSize } from '../../atoms/typography/heading';
import Card from '../../atoms/card';
import EdstimateCostBreakdownGraph from '../../molecules/graph/edstimate-cost-breakdown';
import DataTable from '../../molecules/table-data';
import LoadingText, { ELoadingTextSize } from '../../atoms/loading/text';
import { Formik } from 'formik';
import FormFieldToggle from '../../../components/atoms/form/form-field-toggle';
import EdmitTooltip, { ETooltipType } from 'src/components/molecules/tooltip';
import { edstimateCopy } from '../../../shared';

const tableColumns = [
  {
    Cell: (props: any) => <span className="fw7">{props.value}</span>,
    Header: 'Cost',
    accessor: 'label',
    minWidth: 160,
    resizable: false,
    sortable: false
  },
  {
    Cell: (props: any) => <span>{props.value}</span>,
    Header: 'Amount',
    accessor: 'value',
    resizable: false,
    sortable: false
  }
];

export interface IEdstimateCostBreakdownChartConfiguration {
  grossCosts: Array<{
    label: string;
    value: number;
  }>;
  edstimatedCosts: Array<{
    label: string;
    value: number;
  }>;
  actualCost: number | null;
  loading: boolean;
  collegeName: string;
  scholarship: string | null;
}

type EdstimateCostBreakdownChartViewModel = IEdstimateCostBreakdownChartConfiguration;

const EdstimateCostBreakdownChart: React.SFC<EdstimateCostBreakdownChartViewModel> = props => {
  const grossCost = props.grossCosts.reduce((arr, curr) => arr + curr.value, 0);

  const edstimate = props.edstimatedCosts.reduce((arr, curr) => arr + curr.value, 0);

  return (
    <div>
      {props.loading ? (
        <div>
          <Header
            size={EHeadingSize.H3}
            text={`Cost Breakdown for ${props.collegeName}`}
            loading={props.loading}
          >
            <div className="dn db-l nt3 nb3" style={{ width: 300 }}>
              <LoadingText size={ELoadingTextSize.H1} width={100} />
            </div>
          </Header>
          <div className="flex-l flex-row-l items-center-l justify-around-l">
            <EdstimateCostBreakdownGraph data={props.grossCosts} loading={props.loading} />
            <div className="flex-shrink-0-l ml4-l" style={{ minWidth: 420 }}>
              <div className="nt3 nb3 w-100">
                <LoadingText size={ELoadingTextSize.H1} width={100} />
              </div>
              <div className="nt3 nb3 w-100">
                <LoadingText size={ELoadingTextSize.H1} width={100} />
              </div>
              <div className="nt3 nb3 w-100">
                <LoadingText size={ELoadingTextSize.H1} width={100} />
              </div>
            </div>
          </div>
        </div>
      ) : (
          <div>
            <Header size={EHeadingSize.H3} text={`Cost Breakdown for ${props.collegeName}`} />
            <Formik<{ edstimate: boolean }>
              initialValues={{ edstimate: true }}
              onSubmit={() => null}
              render={({ values, setFieldValue }) => (
                <div className="flex-l flex-row-l items-center-l justify-around-l">
                  <EdstimateCostBreakdownGraph
                    data={
                      values.edstimate && !props.actualCost
                        ? props.edstimatedCosts /*.sort((a, b) => a.label.localeCompare(b.label))*/
                        : props.grossCosts /* .sort((a, b) => a.label.localeCompare(b.label)) */
                    }
                    loading={props.loading}
                  />
                  <Card className="flex-shrink-0-l ml4-l pv2 ph3">
                    <DataTable
                      columns={tableColumns}
                      data={(values.edstimate && !props.actualCost
                        ? props.edstimatedCosts
                        : props.grossCosts
                      )
                        .map(cost => ({
                          label: cost.label,
                          value: numeral(cost.value).format('$0,0')
                        }))
                        .filter(cost => cost.label !== 'Discount')
                        .sort((a, b) => (a.value > b.value ? 1 : b.value > a.value ? -1 : 0))
                        .reverse()}
                    />

                    <DataTable
                      columns={tableColumns.map(column => ({
                        ...column,
                        Header: () => <span />
                      }))}
                      data={[
                        ...(values.edstimate
                          ? [
                            {
                              label: 'Discount ($)',
                              // TODO: Add scholarship info to props and show in tooltip
                              value: (
                                <span>
                                  <span>
                                    {numeral(
                                      grossCost - (!props.actualCost ? edstimate : props.actualCost)
                                    ).format('$0[,]0')}
                                  </span>
                                  {props.scholarship &&
                                    !props.actualCost && (
                                      <span className={'ml1'}>
                                        <EdmitTooltip
                                          text={props.scholarship}
                                          type={ETooltipType.Help}
                                          position={'top'}
                                        />
                                      </span>
                                    )}
                                  {props.actualCost &&
                                    props.actualCost > edstimate && (
                                      <span className={'ml1'}>
                                        <EdmitTooltip
                                          text={
                                            'Notice that your actual costs are greater than our Edstimate based on your financial and academic data.  You may be able to appeal your financial aid decision.'
                                          }
                                          type={ETooltipType.Warn}
                                          position={'top'}
                                        />
                                      </span>
                                    )}
                                </span>
                              )
                            },
                            {
                              label: 'Discount (%)',
                              value: numeral(
                                (grossCost - (!props.actualCost ? edstimate : props.actualCost)) /
                                grossCost
                              ).format('0%')
                            }
                          ]
                          : []),
                        {
                          label: 'Total',
                          value: numeral(
                            values.edstimate
                              ? !props.actualCost
                                ? edstimate
                                : props.actualCost
                              : grossCost
                          ).format('$0,0')
                        }
                      ]}
                      defaultSorted={[
                        {
                          desc: false,
                          id: 'label'
                        }
                      ]}
                    />
                    <div className={'flex justify-center'}>
                      <FormFieldToggle
                        name=""
                        label=""
                        checked={values.edstimate}
                        optionLeftLabel="Published"
                        optionRightLabel={!props.actualCost ? edstimateCopy : 'Actual'}
                        onClick={() => setFieldValue('edstimate', !values.edstimate)}
                      />
                    </div>
                  </Card>
                </div>
              )}
            />
          </div>
        )}
    </div>
  );
};

export default EdstimateCostBreakdownChart;
