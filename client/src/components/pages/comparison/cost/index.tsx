import * as React from 'react';
import numeral from "numeral";
import CostBreakdownTable from './cost-breakdown';
import { ICost } from '../index'
import { PrimaryValue, Section, UnlockWithEdmitButton, ValueLabel } from '../shared'

interface ICollegeCostBodyProps {
  totalCostOfAttendance: number;
  averageNetPrice: number | null;
  percentageOfFreshmenReceivingFinancialAid: number | null;
  costs: ICost[];

  valueColor: string;
}

export const CollegeCostBody: React.SFC<ICollegeCostBodyProps> = props => {
  return (
    <div>
      <Section>
          <ValueLabel>Total Cost</ValueLabel>
          <PrimaryValue color={props.valueColor}>{numeral(props.totalCostOfAttendance).format("$0,0")}</PrimaryValue>
      </Section>
      <Section className="bg-white dn db-ns">
          <CostBreakdownTable valueColor={props.valueColor} data={
            props.costs.map(cost => ({ name: cost.type, amount: numeral(cost.amount).format("$0,0")}))}/>
      </Section>
      <Section>
        { props.averageNetPrice && <><ValueLabel>Average Student Pays (per year)</ValueLabel>
        <PrimaryValue color={props.valueColor}>{numeral(props.averageNetPrice).format("$0,0")}</PrimaryValue></>}
        {props.percentageOfFreshmenReceivingFinancialAid && <><ValueLabel>Average freshman receives some form of Financial Aid</ValueLabel>
        <PrimaryValue color={props.valueColor}>{numeral(props.percentageOfFreshmenReceivingFinancialAid/100).format("0.0%")}</PrimaryValue></> }
        <ValueLabel>Your cost</ValueLabel>
        <UnlockWithEdmitButton color={props.valueColor}/>
      </Section>
    </div>
  );
};