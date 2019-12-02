import * as React from "react";
import Heading, { EHeadingSize } from "@edmit/component-library/src/components/atoms/typography/heading";
import { hexGreenMuted, hexGreenDark, hexBlue, hexBlueMuted, conceptColor, hexTeal, hexRedMuted } from "@edmit/component-library/src/components/atoms/colors";
import Icon, { EIconName } from "@edmit/component-library/src/components/atoms/icon";
import { LoadedReportProps, ISingleCollegeReportProps, OffWhiteSection } from "../shared";
import EarningsAnnualGraph from "@edmit/component-library/src/components/molecules/graph/earnings-annual";
import { betterWorseSame, EValueDetermination, formatDollarsWhole } from '@edmit/component-library/src/shared'
import MetricCard from "@edmit/component-library/src/components/organisms/card-metric";
import Text from "@edmit/component-library/src/components/atoms/typography/text";
import FormFieldSelect from "@edmit/component-library/src/components/atoms/form/form-field-select";
import GenericHorizontalBarGraph from "@edmit/component-library/src/components/molecules/graph/generic-horizontal-bar";
import { sortBy } from "lodash-es"

export const useReportValueState = (props: LoadedReportProps) => {
  const [selectedMajor, setMajor] = React.useState<string | null>(props.student.majorId)

  const setSelectedMajor = (major: string) => {
    setMajor(major);
    props.updateProfile({ majorId: major })
  };

  return {
    selectedMajor,
    setSelectedMajor
  }
}

export const SingleCollegeEarningsGraph: React.SFC<ISingleCollegeReportProps & { showLoanAmount?: boolean }> = (props) => {
  const annualEarnings = props.college.annualEarnings.map(
    (earnings) => ({
      amount: earnings.medianEarnings,
      loanAmount: props.college.annualLoanPaymentAmount,
      year: earnings.year
    })
  )

  return (
    <EarningsAnnualGraph
      loading={false}
      colleges={
        [
          {
            abbreviation: props.college.abbreviation,
            annualEarnings
          }
        ]
      }
      showLoanAmount={props.showLoanAmount}
    />
  )
}

export const ValueDeltaHero: React.SFC<ISingleCollegeReportProps> = ({ college }) => {
  const descriptor = `${betterWorseSame(college.valueDelta)} value per year`

  return (
    <OffWhiteSection>
      <MetricCard
        title={`${college.name} is`}
        footer="than similar colleges"
        value={formatDollarsWhole(Math.abs(college.valueDelta))}
        yearValue={descriptor}
        className={'pa3 w-100 w-50-m'}
      />
    </OffWhiteSection>
  )
}

export const ValueSectionHeader: React.SFC = () => {
  return (
    <Text className={'black t-large pt-3 tc'}>Your Value</Text>
  )
}

export const MajorSelectionHero: React.SFC<LoadedReportProps> = (props) => {
  const state = useReportValueState(props)

  return (
    <div className={"pv3 ph4 tc"} style={{ backgroundColor: hexBlueMuted, color: hexBlue }}>
      <Heading
        size={EHeadingSize.H4}
        text={
          <span>
            Now let’s take a look at your estimated earnings post-graduation.
          </span>
        }
        noColor
      />
      <Text>
        To get a more accurate estimate update your major below. You can change this later in your profile.
      </Text>
      <div className={"center"}>
        <FormFieldSelect
          value={state.selectedMajor || undefined}
          onSelect={(majorId: string) => state.setSelectedMajor(majorId)}
          required={false}
          className={"mw5"}
          barStyle
        >
          <option selected={true} key={-1} value={""}>
            Select a major
          </option>
          {sortBy(props.majors, m => m.name).map((m: { id: string, name: string }) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </FormFieldSelect>
      </div>
    </div>
  )
}

export const ValueDeltaGraph: React.SFC<ISingleCollegeReportProps> = (props) => {
  return (
    <GenericHorizontalBarGraph
      data={[
        {
          color: hexTeal,
          label: 'Average Earnings (minus loans) for similar schools',
          value: props.college.valueBenchmark,
        },
        {
          color: conceptColor.earnings,
          label: 'Your Earnings (minus loans)',
          value: props.college.averageAnnualEarningsAmount - props.college.annualLoanPaymentAmount
        }
      ]}
    />
  )
}

export const ValueDeterminationHero: React.SFC<ISingleCollegeReportProps> = (props) => {
  const {
    valueDetermination,
    name
  } = props.college

  let affordabilityText: JSX.Element | null = null

  switch (valueDetermination) {
    case EValueDetermination.GoodValue:
      affordabilityText = <p>a better value for you <Icon name={EIconName.Check} className={'t-large'} /></p>
      break;
    case EValueDetermination.NotGoodValue:
      affordabilityText = <p>a worse value for you <Icon name={EIconName.Error} className={'t-large'} /></p>
      break;
    default:
      throw Error("unexpected - an affordability determination should be set")
  }

  const backgroundColor = (valueDetermination === EValueDetermination.GoodValue)
    ? hexGreenMuted : hexRedMuted

  return (
    <div className={"tc pv3"} style={{ backgroundColor, color: hexGreenDark }}>
      <Heading
        size={EHeadingSize.H4}
        text={`${name} is`}
        noColor
      />
      <Heading
        size={EHeadingSize.H4}
        text={affordabilityText}
        noColor
      />
    </div>
  )
}