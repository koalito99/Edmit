import * as React from 'react';
// import Header from '../../molecules/header';
// import { EHeadingSize } from '../../atoms/typography/heading';
// import Card from '../../atoms/card';
// import FormFieldSelect from '../../atoms/form/form-field-select';
import EarningsAnnualGraph from '../../molecules/graph/earnings-annual';

// import LoadingText, { ELoadingTextSize } from '../../atoms/loading/text';

export interface IEarningsAnnualChartViewModel {
  colleges: Array<{
    name: string;
    abbreviation: string;
    annualEarnings: Array<{
      amount: number;
      year: number;
      loanAmount?: number;
    }>;
  }>;

  showLoanAmount?: boolean;
  loading: boolean;
}

type EarningsAnnualChartProps = IEarningsAnnualChartViewModel;

const EarningsAnnualChart: React.SFC<EarningsAnnualChartProps> = props => (
  <div>
    {props.loading ? (
      <div>
        {/* <Header
          size={EHeadingSize.H4}
          text={'Annual Earnings Post-Graduation'}
          loading={props.loading}
        >
          <div className="dn db-l nt3 nb3" style={{ width: 200 }}>
            <LoadingText size={ELoadingTextSize.H1} width={100} />
          </div>
        </Header> */}
        <EarningsAnnualGraph colleges={props.colleges} loading={props.loading} showLoanAmount={props.showLoanAmount} />
      </div>
    ) : (
      <div>
        <EarningsAnnualGraph colleges={props.colleges} loading={props.loading} showLoanAmount={props.showLoanAmount} />
      </div>
    )}
  </div>
);

export default EarningsAnnualChart;
