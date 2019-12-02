import * as React from 'react';
import { PrimaryValue, Section, ValueLabel } from '../shared'
import numeral from 'numeral';

interface ICollegeApplyingBodyProps {
  acceptancePercentage: number;
  applicationFee: number | null;
  applicationDeadline: Date | null;

  valueColor: string;
}

export const CollegeApplyingBody: React.SFC<ICollegeApplyingBodyProps> = props => {
  return (
    <div>
      <Section>
        <ValueLabel>Acceptance Rate</ValueLabel>
        <PrimaryValue color={props.valueColor}>
          {numeral(props.acceptancePercentage / 100).format('0[.]0%')}
        </PrimaryValue>
        {props.applicationFee && (
          <>
            <ValueLabel>Application Fee</ValueLabel>
            <PrimaryValue color={props.valueColor}>
              {numeral(props.applicationFee).format('$0[.]0')}
            </PrimaryValue>
          </>
        )}
        {props.applicationDeadline && (
          <>
            <ValueLabel>Application Deadline</ValueLabel>
            <PrimaryValue color={props.valueColor}>
              {props.applicationDeadline.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </PrimaryValue>
          </>
        )}
      </Section>
    </div>
  );
};
