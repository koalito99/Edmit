import * as React from 'react';
import { MetricRange, Section, ValueLabel } from '../shared'

interface ICollegeAcademicsBodyProps {
  sat: {
    average: number | null;
    range: MetricRange | null;
  };
  act: {
    average: number | null;
    range: MetricRange | null;
  };
  gpa: {
    average: number | null;
    range: MetricRange | null;
  };

  valueColor: string;
}

export const CollegeAcademicsBody: React.SFC<ICollegeAcademicsBodyProps> = props => {
  return (
    <div>
      <Section>
        {(props.sat.average || props.sat.range) && (
          <>
            <ValueLabel>SAT</ValueLabel>
            <MetricRange
              valueColor={props.valueColor}
              average={props.sat.average}
              currentRange={props.sat.range}
              withinRange={[400, 1600] as MetricRange}
            />
          </>
        )}
        {(props.act.average || props.act.range) && (
          <>
            <ValueLabel>ACT</ValueLabel>
            <MetricRange
              valueColor={props.valueColor}
              average={props.act.average}
              currentRange={props.act.range}
              withinRange={[1, 36] as MetricRange}
            />
          </>
        )}
        {(props.gpa.average || props.gpa.range) && (
          <>
            <ValueLabel>GPA</ValueLabel>
            <MetricRange
              valueColor={props.valueColor}
              average={props.gpa.average}
              currentRange={props.gpa.range}
              withinRange={[0, 4] as MetricRange}
            />
          </>
        )}
      </Section>
    </div>
  );
};
