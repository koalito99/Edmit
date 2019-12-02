import * as React from 'react'
import { Section, UnlockWithEdmitButton, PrimaryValue, ValueLabel } from '../shared'
import Text from '@edmit/component-library/src/components/atoms/typography/text'
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading'
import numeral from 'numeral'
import { hexGrayDim, hexGrayLight } from '@edmit/component-library/src/components/atoms/colors'
import { Label, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ISalary } from '../index'

interface ICollegeSalaryBodyProps {
  averageStartingSalary: number;

  valueColor: string;
}

export const CollegeSalaryBody: React.SFC<ICollegeSalaryBodyProps> = props => {
  return (
    <div>
      <Section>
        <ValueLabel>Average Starting Salary</ValueLabel>
        <PrimaryValue color={props.valueColor}>{numeral(props.averageStartingSalary).format('$0,0')}</PrimaryValue>
        <ValueLabel>Your Earnings Post Graduation</ValueLabel>
        <UnlockWithEdmitButton color={props.valueColor}/>
      </Section>
    </div>
  )
}

interface ICollegeSalaryGraphProps {
  className?:string;

  colleges: Array<{
    id: string;
    name: string;
    color: string;
    salaries: ISalary[];
  }>;
}

export const CollegeSalaryGraph: React.FC<ICollegeSalaryGraphProps> = props => {
  const data = props.colleges[0] && props.colleges[0].salaries.map(salaryData => ({
    ...(props.colleges.reduce((acc, college) => ({
      ...acc,
      [college.id]: college.salaries.find(salary => salary.year === salaryData.year)!.salary
    }), {})),
    year: salaryData.year
  })) || [];

  return (
    <div className={props.className}>
      <Heading size={EHeadingSize.H4} text={'Salary Years After Graduation'} className="tc"/>
      <Section>
        <Text className="t-medium black ma-auto pv1 tc">After graduation, here's how the average salaries at {props.colleges.map(college => college.name).join(", ")} grow over time:</Text>
      </Section>

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

          <Tooltip labelFormatter={value => `Year ${value} after Graduation`} formatter={value => numeral(value).format("$0a")}/>

          {props.colleges.map(college =>
            <Line
              key={college.id}
              name={college.name}
              dataKey={college.id}
              fill={college.color}
              stroke={college.color}
              strokeWidth={3}
            />
          )}

        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}