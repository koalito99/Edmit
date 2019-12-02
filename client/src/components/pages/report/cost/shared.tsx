import * as React from "react";
import Heading, { EHeadingSize } from "@edmit/component-library/src/components/atoms/typography/heading";
import { hexBlueMuted, hexBlue, hexGreen, hexTeal, conceptColor } from "@edmit/component-library/src/components/atoms/colors";
import Text from "@edmit/component-library/src/components/atoms/typography/text";
import { ISingleCollegeReportProps, MultiReportProps } from "../shared";
import GenericHorizontalBarGraph from "@edmit/component-library/src/components/molecules/graph/generic-horizontal-bar";
import { formatDollars } from "@edmit/component-library/src/shared";
import ReportCostTable from "@edmit/component-library/src/components/molecules/table-report-cost";
import { useMultiReportSorts } from "..";
import { effectivePriceCopy, effectivePriceIfDifferentThanEdstimate } from '@edmit/component-library/src/lib/price'

export const CostEducationModule: React.SFC = () => (
  <div className={"pv3 ph4 tc"} style={{ backgroundColor: hexBlueMuted, color: hexBlue }}>
    <Heading size={EHeadingSize.H4} text={"Just so you know:"} noColor />
    <div className={"flex justify-center flex-wrap"}>
      <div className="w-third-ns w-100-m ph3-ns">
        <Heading size={EHeadingSize.H4} text={"PUBLISHED COST"} noColor />
        <Text>
          (Including room &amp; board and fees)
          <br />
          is the “sticker price” for college.
          You probably won’t pay this amount.
        </Text>
      </div>
      <span />
      <div className="w-third-ns w-100-m ph3-ns">
        <Heading size={EHeadingSize.H4} text={"AVERAGE COST"} noColor />
        <Text>
          (Including room &amp; board and fees)
          <br />
          is the average price people pay after subtracting merit
          scholarships and financial aid. You probably won’t pay
          this amount either.
        </Text>
      </div>
      <span />
      <div className="w-third-ns w-100-m ph3-ns ba b--white b--dotted bw2">
        <Heading size={EHeadingSize.H4} text={"EDSTIMATE®"} noColor />
        <Text>
          The Edstimate® is specific to you - concentrate on this.
        </Text>
      </div>
    </div>
  </div>
);

export const CostSectionHeader: React.SFC = () => {
  return (
    <Text className={'black t-large tc'}>Your Cost</Text>
  )
}

export const SingleCollegeCostComparisonGraph: React.FC<ISingleCollegeReportProps> = (props) => {
  const { college } = props;

  return (
    <GenericHorizontalBarGraph data={[
      {
        color: hexGreen,
        label: effectivePriceCopy(college),
        value: college.effectiveCost,
      },
      {
        color: hexTeal,
        label: "Average Cost",
        value: college.averageCostOfAttendance,
      },
      {
        color: hexBlue,
        label: "Published Cost",
        value: college.costOfAttendance,
      }
    ]} />
  )
}

export const MultipleCostComparisonTable: React.FC<MultiReportProps> = (props) => {
  const sorts = useMultiReportSorts(props)

  const collegesTableData = sorts.collegesSortedByEffectiveCost.map(
    (college) => ({
      calculationsUseAidAward: college.calculationsUseAidAward,
      college: college.name,
      costAttendance: formatDollars(college.costOfAttendance),
      discount: formatDollars(Math.min(0, college.costOfAttendance - college.effectiveCost)),
      edstimate: college.edstimate,
      effectiveCost: college.effectiveCost,
      effectivePriceIfDifferentThanEdstimate: effectivePriceIfDifferentThanEdstimate(college),
      financialAidAward: null,
      id: college.id
    })
  )

  return (
    <ReportCostTable
      data={collegesTableData}
      loading={false}
    />
  )
}

export const MultipleCostComparisonGraph: React.FC<MultiReportProps> = (props) => {
  const sorts = useMultiReportSorts(props)

  return (
    <GenericHorizontalBarGraph
      data={
        sorts.collegesSortedByEffectiveCost.map(
          (college) => ({
            color: conceptColor.edstimate,
            label: college.name,
            value: college.effectiveCost
          })
        )
      }
    />
  )
}