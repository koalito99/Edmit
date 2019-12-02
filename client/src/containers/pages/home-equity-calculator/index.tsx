import * as React from 'react';
import { homeEquityCalculatorViewModel, IHomeEquityCalculatorViewModel } from './selector';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { homeEquityCalculatorActions } from './actions';
import WidgetContainer from '@edmit/component-library/src/components/molecules/widget-container';
import FormFieldCurrency from '@edmit/component-library/src/components/atoms/form/form-field-currency';
import numeral from 'numeral';

type Actions = typeof homeEquityCalculatorActions & {};
type IHomeEquityCalculatorProps = IHomeEquityCalculatorViewModel & Actions & {};

class HomeEquityCalculatorPage extends React.Component<IHomeEquityCalculatorProps, {}> {
  render() {
    return (
      <WidgetContainer height={'400'} width={'400'}>
        <span>
          <div>
            <FormFieldCurrency
              required={true}
              label={'Home Equity'}
              name={'homeEquity'}
              onChange={value => this.props.setHomeEquityValue(value || 0)}
              value={this.props.homeEquityValue || undefined}
            />
          </div>
          <div className={'pt3'}>
            <FormFieldCurrency
              required={true}
              label={'Household Income'}
              name={'householdIncome'}
              onChange={value => this.props.setHouseholdIncome(value || 0)}
              value={this.props.householdIncome || undefined}
            />
          </div>
          <div className={'pt3'}>
            <select
              value={this.props.college || undefined}
              onChange={e => this.props.setCollege(e.target.value)}
            >
              <option key={''} value={''}>
                Select a college
              </option>
              {this.props.colleges.map(college => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </select>
          </div>
          <div className={'pt3'}>
            {this.props.determinedHomeEquityAmountToIncludeInAssets !== null ? (
              <p>
                <strong>
                  {numeral(this.props.determinedHomeEquityAmountToIncludeInAssets).format('$0,0')}
                </strong>{' '}
                of your home equity value will be counted towards financial aid calculations. We
                estimate that this could reduce your financial aid package by about{' '}
                <strong>
                  {numeral(this.props.determinedReductionInFinancialAid).format('$0,0')}
                </strong>
                .
              </p>
            ) : (
              <p>Enter information above.</p>
            )}
          </div>
        </span>
      </WidgetContainer>
    );
  }
}

export default connect(
  homeEquityCalculatorViewModel,
  dispatch => bindActionCreators(homeEquityCalculatorActions, dispatch)
)(HomeEquityCalculatorPage);
