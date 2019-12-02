import * as React from "react";
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import { OffWhiteSection } from '../../../atoms/sections';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';

import EarningsAnnualGraph from "@edmit/component-library/src/components/molecules/graph/earnings-annual";
import { Bar, BarChart, Label, Legend, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { hexBlue, hexGrayDim, hexGrayLight, hexRed } from '@edmit/component-library/src/components/atoms/colors'
import * as numeral from "numeral"

interface IAverageCostProps {
	averageCosts: Array<{
		incomeRange: string;
		amount: number;
	}>;
  className?: string;
}

export const AverageCost: React.FC<IAverageCostProps> = props => {
	const data = props.averageCosts.map((dataPoint, i) => ({ ...dataPoint, index: i }));

	return (		
		<div className={props.className}>
			<Heading size={EHeadingSize.H4} text={'Average Cost'} className="tc"/>
			<OffWhiteSection className="bg-white">
				<Text className="t-medium black ma-auto pv1">Very few students pay the full price. Here's the average cost for students in different income brackets:</Text>
			</OffWhiteSection>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 16, right: 0, bottom: 0, left: -20 }}>
          <ReferenceLine y={0} stroke={hexGrayLight} strokeWidth={2} />
          <XAxis
            dataKey="index"
            height={72}
            axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
            tickLine={false}
            tickFormatter={
							(value: any) => data[value].incomeRange
            }
          >
              <Label
                value="Income Range"
                offset={20}
                position="insideBottom"
                fill={hexGrayDim}
              />
          </XAxis>
          <YAxis
            type="number"
            width={72}
            padding={{ top: 8, bottom: 0 }}
            axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
            tickLine={false}
            tickSize={4}
            tickFormatter={
              (value: any) => {
                  if (value === 0) {
                    return '';
                  }
                  return numeral(value).format('$0a');
                }
            }
          />


          <Bar
            dataKey={"amount"}
            fill={hexBlue}
          />

        </BarChart>
      </ResponsiveContainer>
		</div>
	);
};

export const SingleCollegeEarningsGraph: React.SFC<{ showLoanAmount?: boolean; annualEarnings: Array<{amount: number; loanAmount?: number; year: number;}> }> = (props) => {

  	return (
	    <EarningsAnnualGraph
	      loading={false}
	      colleges={
	        [
	          {
	            abbreviation: "UNB",
	            annualEarnings: props.annualEarnings
	          }
	        ]
	      }
	      showLoanAmount={false}
	    />
  	)
}