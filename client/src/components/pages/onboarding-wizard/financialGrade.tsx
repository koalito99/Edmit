import * as React from 'react'
import { FormikProps } from 'formik'

import { OnboardingFields } from './index'
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading'
import {
  hexGreen,
  hexGreenDark,
  hexGreenMuted,
  hexOffwhite,
  hexRed,
} from '@edmit/component-library/src/components/atoms/colors'
import Text from '@edmit/component-library/src/components/atoms/typography/text'
import FinancialGradeScatterplot
  from '@edmit/component-library/src/components/molecules/graph/financial-grade-scatterplot'
import { FitChip } from '@edmit/component-library/src/components/molecules/graph/fit'
import { EAffordabilityDetermination, EFinancialGrade, EValueDetermination } from '@edmit/component-library/src/shared'

interface IFinancialGradeSectionProps {
  college: {
    abbreviation: string;
    name: string;
    financialGrade: EFinancialGrade;

    isAffordable: EAffordabilityDetermination;
    isAGoodValue: EValueDetermination;
  };

  formikProps: FormikProps<OnboardingFields>;
}

const FinancialGradeSection: React.SFC<IFinancialGradeSectionProps> = props =>
  <div>
    <div>
      <div className={"pv3 ph4 tc"} style={{ backgroundColor: hexGreenMuted, color: hexGreenDark }}>
        <Heading size={EHeadingSize.H4}
          text={<p>Now let’s put it all together!<br />A college’s Financial Grade is a letter grade (A, B or C) which is personalized for you based on a
                   college’s affordability and value.</p>} noColor />
      </div>
    </div>
    <div>
      <div className={"tc mt3 pv2"} style={{ backgroundColor: hexOffwhite }}>
        <Text className={"mb1"}>
          {props.college.name} is
        </Text>
        <div className={"mb3"}>
          <Heading size={EHeadingSize.H4} text={
            <span>
              <span style={{ color: props.college.isAffordable === EAffordabilityDetermination.Affordable ? hexGreen : hexRed }}>
                {props.college.isAffordable === EAffordabilityDetermination.Affordable ? 'more affordable' : 'less affordable'}
              </span>,
            <span style={{ color: props.college.isAGoodValue === EValueDetermination.GoodValue ? hexGreen : hexRed }}>
                {props.college.isAGoodValue === EValueDetermination.GoodValue ? 'better value' : 'worse value'}
              </span>
              , and has a financial grade of an <FitChip
                admissionUnlikely={false}
                financialGrade={EFinancialGrade.C}
                loading={false}
                size={40}
                className={"dib ml1"}
                style={{ transform: 'translateY(12.5px)' }}
              />
            </span>
          } className={"mt0 mb0 dib mr2"} />
        </div>
      </div>
      <div>
        <FinancialGradeScatterplot collegeGroups={[{
          colleges: [{ abbreviation: props.college.abbreviation }],
          isAGoodValue: props.college.isAGoodValue === EValueDetermination.GoodValue,
          isAffordable: props.college.isAffordable === EAffordabilityDetermination.Affordable,
        }]} className={"db center"} />
      </div>
    </div>
  </div>;

export default FinancialGradeSection;