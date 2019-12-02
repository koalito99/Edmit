import * as React from 'react'
import PageContainer from '@edmit/component-library/src/components/atoms/page-container'
import Card from '@edmit/component-library/src/components/atoms/card'
import { CollegeSectionHeader, CTABanner, SplitSection, MetricRange, PageSection } from './shared'
import { CollegeCostBody } from './cost'
import CompareHeader from '../../organisms/comparison-header'
import { CollegeAcademicsBody } from './academics'
import { CollegeValueFirstBody, CollegeValueSecondBody } from './value'
import { CollegeSalaryBody, CollegeSalaryGraph } from './salary'
import FormFieldSelect from '@edmit/component-library/src/components/atoms/form/form-field-select'
import { hexBlue, hexGrayLight, hexGreen } from '@edmit/component-library/src/components/atoms/colors'
import { CollegeApplyingBody } from './applying'
import { LoanEducationModule } from '../report/affordability/shared'
import { Link as ScrollLink } from 'react-scroll/modules'
import LoadingSpinner from '@edmit/component-library/src/components/atoms/loading/spinner'
import { usePrevious } from '@edmit/component-library/src/lib/react-helper'
import { isEqual } from 'lodash-es'
import { ConnectedSearchCollegesProps } from '@edmit/component-library/src/components/molecules/search-colleges'

export interface ICost {
  type: string;
  amount: number;
}

export interface ISalary {
  year: number;
  salary: number;
}

interface IComparingCollege {
  id: string;
  name: string;
  city: string;
  state: string;
  totalCostOfAttendance: number;
  averageNetPrice: number | null;
  percentageOfFreshmenReceivingFinancialAid: number | null
  costs: ICost[];
  salaries: ISalary[];
  averageLoanAmount: number | null;
  loanRepaymentPercentage: number;
  averageStartingSalary: number;
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
  acceptancePercentage: number;
  applicationFee: number | null;
  applicationDeadline: Date | null;
}

export interface IComparisonPageProps {
  colleges: IComparingCollege[];
  majors: Array<{ id: string; name: string; }>;
  currentMajorId: string | null;
  leftSearchCollegesComponent: React.ComponentType<Partial<ConnectedSearchCollegesProps>>;
  rightSearchCollegesComponent: React.ComponentType<Partial<ConnectedSearchCollegesProps>>;
  loading: boolean;

  onSelectedMajor: (majorId: string | null) => void;
}

const CompareLink: React.FC<{ to: string; }> = props => (
  <ScrollLink
    hashSpy={false}
    to={props.to}
    spy={true}
    smooth={true}
    duration={500}
    offset={-300}
    className={`pointer lato inline-flex self-stretch items-center pa2 ph3-ns no-underline fw7 t-medium gray-dim hover-crimson relative report-link-menu`}
  >
    {props.children}
  </ScrollLink>)

function useTraceUpdate<T>(props: T) {
  const prev = usePrevious(props);
  React.useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (isEqual(prev[k], v)) {
        ps[k] = [prev[k], v];
      }
      return ps;
    }, {});

    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
  });
}

const ComparisonPage: React.FC<IComparisonPageProps> = props => {
  useTraceUpdate(props);

  const leftCollege = props.colleges[0] || null;
  const rightCollege = props.colleges[1] || null;

  const leftCollegeColor = hexGreen;
  const rightCollegeColor = hexBlue;

  if (props.loading) {
    return <div
      className="absolute left-0 right-0 mt5 flex justify-center"
      style={{ opacity: 1, transition: 'opacity 200ms' }}
    >
      <LoadingSpinner />
    </div>;
  }

  return (
    <div style={{ paddingTop: '164px' }}>
      <CompareHeader leftCollege={leftCollege && {
        id: leftCollege.id,
        name: leftCollege.name,
        location: `${leftCollege.city}, ${leftCollege.state}`,
        color: leftCollegeColor
      }} rightCollege={rightCollege && {
        id: rightCollege.id,
        name: rightCollege.name,
        location: `${rightCollege.city}, ${rightCollege.state}`,
        color: rightCollegeColor
      }} leftSearchCollegesComponent={props.leftSearchCollegesComponent} rightSearchCollegesComponent={props.rightSearchCollegesComponent}>
        <div className={'nav-compare tc bg-white shadow-nav'}>
          <div className={'dib'}>
            <CompareLink to="cost">Cost</CompareLink>
            <CompareLink to="value">Value</CompareLink>
            <CompareLink to="salaries">Salaries</CompareLink>
            <CompareLink to="academics">Academics</CompareLink>
            <CompareLink to="applying">Applying</CompareLink>
          </div>
        </div>
      </CompareHeader>
      {leftCollege && (
        <PageContainer>
          <span id="cost">
            <PageSection>
              <Card>
                <CollegeSectionHeader name={`Cost`} />
                {/*<Text className="t-medium tc i">
          College graduates earn $1 million more in lifetime earnings that high school graduates.
        </Text>*/}
                <SplitSection>
                  {leftCollege && <CollegeCostBody
                    {...leftCollege} valueColor={leftCollegeColor}
                  />}
                  {rightCollege && <CollegeCostBody
                    {...rightCollege} valueColor={rightCollegeColor}
                  />}
                </SplitSection>
                <CTABanner ctaTo={'/signup'}>SIGN UP FOR MORE PERSONALIZED COSTS</CTABanner>
              </Card>
            </PageSection>
          </span>
          <span id="value">
            <PageSection>
              <Card>
                <CollegeSectionHeader name={`Value`} />
                <SplitSection>
                  {leftCollege && <CollegeValueFirstBody {...leftCollege} valueColor={leftCollegeColor} />}
                  {rightCollege && <CollegeValueFirstBody {...rightCollege} valueColor={rightCollegeColor} />}
                </SplitSection>
                <LoanEducationModule />
                <SplitSection>
                  {leftCollege && <CollegeValueSecondBody {...leftCollege} valueColor={leftCollegeColor} averageAnnualEarnings={leftCollege.salaries.reduce((acc, curr) => acc + curr.salary, 0) / leftCollege.salaries.length} />}
                  {rightCollege && <CollegeValueSecondBody {...rightCollege} valueColor={rightCollegeColor} averageAnnualEarnings={rightCollege.salaries.reduce((acc, curr) => acc + curr.salary, 0) / rightCollege.salaries.length} />}
                </SplitSection>
                <CTABanner ctaTo={'/signup'}>SEE WHICH SCHOOL IS A BETTER VALUE FOR YOU</CTABanner>
              </Card>
            </PageSection>
          </span>
          <span id="salaries">
            <PageSection>
              <Card>
                <CollegeSectionHeader name={`Graduate Salaries`} />
                <div className={'flex justify-center'}>

                  <FormFieldSelect
                    name={'major-id'}
                    value={props.currentMajorId || undefined}
                    required={false}
                    onSelect={props.onSelectedMajor}
                    barStyle={true}
                    style={{ backgroundColor: hexGrayLight, minWidth: 200, padding: "10px" }}
                  >
                    <option>All majors</option>
                    {props.majors.map(major => (
                      <option
                        selected={false}
                        key={major.id}
                        value={major.id}
                      >
                        {major.name}
                      </option>
                    ))}
                  </FormFieldSelect>
                </div>
                <SplitSection>
                  {leftCollege && <CollegeSalaryBody {...leftCollege} valueColor={leftCollegeColor} />}
                  {rightCollege && <CollegeSalaryBody {...rightCollege} valueColor={rightCollegeColor} />}
                </SplitSection>
                {leftCollege && <CollegeSalaryGraph colleges={[{ ...leftCollege, color: leftCollegeColor }, ...(rightCollege ? [{ ...rightCollege, color: rightCollegeColor }] : [])]} className={"mh1 mh5-ns"} />}
                <CTABanner ctaTo={'/signup'}>SEE EARNINGS BY MAJOR AT THESE SCHOOLS</CTABanner>
              </Card>
            </PageSection>
          </span>
          <span id="academics">
            <PageSection>
              <Card>
                <CollegeSectionHeader name={`Academics`} />
                <SplitSection>
                  {leftCollege && <CollegeAcademicsBody {...leftCollege} valueColor={leftCollegeColor} />}
                  {rightCollege && <CollegeAcademicsBody {...rightCollege} valueColor={rightCollegeColor} />}
                </SplitSection>
                <CTABanner ctaTo={'/signup'}>SEE IF YOU QUALIFY FOR A SCHOLARSHIP</CTABanner>
              </Card>
            </PageSection>
          </span>
          <span id="applying">
            <PageSection>
              <Card className={'pb4'}>
                <CollegeSectionHeader name={`Applying`} className={"mb3"} />
                <SplitSection>
                  {leftCollege && <CollegeApplyingBody {...leftCollege} valueColor={leftCollegeColor} />}
                  {rightCollege && <CollegeApplyingBody {...rightCollege} valueColor={rightCollegeColor} />}
                </SplitSection>
              </Card>
            </PageSection>
          </span>
        </PageContainer>
      )}
    </div>
  )
}

export default ComparisonPage
