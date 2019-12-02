import * as React from 'react'
import Text from '@edmit/component-library/src/components/atoms/typography/text'
import { OffWhiteSection } from '../../../atoms/sections'
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading'

import EarningsAnnualGraph from '@edmit/component-library/src/components/molecules/graph/earnings-annual'
import { Salary } from '..'
import { Label, LineChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis, Line } from 'recharts'
import { hexGrayDim, hexGrayLight } from '@edmit/component-library/src/components/atoms/colors'
import * as numeral from 'numeral'
import { hexGreen } from '@edmit/component-library/src/components/atoms/colors'

const CustomizedLabel: React.FC<any> = props => {
  const {
    x, y, value,
  } = props;

  return <text x={x} y={y} dy={-20} fill={hexGrayDim} fontSize="0.875rem" textAnchor="middle">{numeral(value).format("$0a")}</text>;
}

export const SalaryYears: React.FC<{ className?: string; name: string; salaries: Salary[] }> = props => {
  const data = props.salaries

  return (
    <div className={props.className}>
      <Heading size={EHeadingSize.H4} text={'Salary Years After Graduation'} className="tc" />
      <OffWhiteSection className="bg-white">
        <Text className="t-medium black ma-auto pv1">After graduation, here's how the average salary at {props.name} grows over time:</Text>
      </OffWhiteSection>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 16, right: 20, bottom: 0, left: -20 }}>
          <ReferenceLine y={0} stroke={hexGrayLight} strokeWidth={2} />
          <XAxis
            dataKey="year"
            height={72}
            axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
            tickLine={false}
          >
            <Label
              value="Years after Graduation"
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
                  return ''
                }
                return numeral(value).format('$0a')
              }
            }
          />


          <Line
            dataKey={'salary'}
            fill={hexGreen}
            stroke={hexGreen}
            strokeWidth={3}
            label={CustomizedLabel}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export const SingleCollegeEarningsGraph: React.SFC<any & { showLoanAmount?: boolean }> = (props) => {
  const annualEarnings = [{
    amount: 500,
    loanAmount: 1000,
    year: 2017,
  },
  {
    amount: 500,
    loanAmount: 1000,
    year: 2018,
  },
  {
    amount: 500,
    loanAmount: 1000,
    year: 2019,
  }]

  return (
    <EarningsAnnualGraph
      loading={false}
      colleges={
        [
          {
            abbreviation: 'UNB',
            annualEarnings,
          },
        ]
      }
      showLoanAmount={false}
    />
  )
}