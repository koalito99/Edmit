import * as React from 'react'
import LoadingSpinner from '@edmit/component-library/src/components/atoms/loading/spinner'
import PageContainer from '@edmit/component-library/src/components/atoms/page-container'
import { StickyContainer } from 'react-sticky'
import { EReportType, MultiReportProps, PageSection, ReportProps, SingleReportProps } from './shared'
import ReportNav from '@edmit/component-library/src/components/organisms/nav-report'
import { SingleCostReport } from './cost/single'
import Card from '@edmit/component-library/src/components/atoms/card'
import { CostSectionHeader } from './cost/shared'
import { AffordabilitySectionHeader } from './affordability/shared'
import { SingleAffordabilityReport } from './affordability/single'
import { SingleValueReport } from './value/single'
import { SingleFinancialGradeReport } from './financial-grade/single'
import { FinancialGradeHeader } from './financial-grade/shared'
import { MultiCostReport } from './cost/multi'
import { MultiAffordabilityReport } from './affordability/multi'
import { MultiValueReport } from './value/multi'
import { MultiFinancialGradeReport } from './financial-grade/multi'
import { ValueSectionHeader } from './value/shared'
import { first, last, sortBy } from 'lodash-es'
import Text from '@edmit/component-library/src/components/atoms/typography/text'
import { IPlanSelectionModalProps } from '../../../hooks/paywall'
import { IEdmitPlusStatusProps } from '@edmit/component-library/src/shared'
import KeyTakeaways from './key-takeaways'
import { LoanPaymentsSectionHeader } from './loan-payments/shared'
import { SingleLoanPaymentsReport } from './loan-payments/single'
import { Element as ScrollElement } from "react-scroll";
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';

export interface IReportPageOwnProps {
  onOpenSearchOverlay: () => void;
  onOpenPreferenceModal: () => void;
}

interface IPreferenceModalOpener {
  onOpenPreferenceModal: () => void;
}

type Props = ReportProps &
  IReportPageOwnProps &
  IPreferenceModalOpener &
  IPlanSelectionModalProps &
  IEdmitPlusStatusProps;

const ReportLoading: React.SFC<{}> = () => (
  <div>
    <div
      className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center"
      style={{ opacity: 1, transition: 'opacity 200ms' }}
    >
      <LoadingSpinner />
    </div>
    <div style={{ marginTop: 600 }} />
  </div>
);

const getColleges = (props: ReportProps) => {
  if (props.loading) {
    return [];
  } else {
    if (props.type === EReportType.Single) {
      window.analytics.track('view_initial_report', {
        collegeId: props.college.id,
        studentId: props.student.id
      });
      return [props.college];
    } else if (props.type === EReportType.Multi) {
      window.analytics.track('view_multi_report', {
        collegeId: props.colleges[0].id,
        studentId: props.student.id
      });
      return props.colleges;
    } else {
      return [];
    }
  }
};

export const ReportPage: React.SFC<Props> = props => {
  const { loading } = props;
  return (
    <div style={{ paddingTop: '48px' }}>
      {!loading && (
        <ReportNav
          onOpenCollegeSearchOverlay={props.onOpenSearchOverlay}
          colleges={getColleges(props)}
        />
      )}
      <StickyContainer>
        {/* {!loading && <ReportSectionNavigation type={!props.loading ? props.type : EReportType.Empty} {...props} />} */}
        <PageContainer>
          <ReportBody {...props} />
        </PageContainer>
      </StickyContainer>
    </div>
  );
};

type SingleReportComponentProps = SingleReportProps &
  IPreferenceModalOpener &
  IEdmitPlusStatusProps &
  IPlanSelectionModalProps;

const SingleReport: React.SFC<SingleReportComponentProps> = props => {
  return (
    <>
      <div id="report_scroll_container">
        <Heading
          size={EHeadingSize.H3}
          text={"Financial Grade Report"}
          className={"tc mb0"}
        />
        <Heading
          size={EHeadingSize.H4}
          text={props.college ? `for ${props.college.name}` : ''}
          className={'tc mt2 mb5'}
        />
        <ScrollElement name="key_takeaways">
          <span id="key_takeaways">
            <Card className={"mt5"}>
              <div className="pa3">
                <Text className={'black t-large tc'}>Key Takeaways</Text>
                <KeyTakeaways colleges={[props.college]} opened={false} />
              </div>
            </Card>
          </span>

        </ScrollElement>
        <ScrollElement name="cost">
          <span id="cost">
            <PageSection>
              <Card>
                <CostSectionHeader />
                <div className="pa3">
                  <SingleCostReport {...props} />
                </div>
              </Card>
            </PageSection>
          </span>
        </ScrollElement>
        <ScrollElement name="affordability">
          <span id="affordability">
            <PageSection>
              <Card>
                <AffordabilitySectionHeader />
                <div className="pa3">
                  <SingleAffordabilityReport {...props} />
                </div>
              </Card>
            </PageSection>
          </span>
        </ScrollElement>

        <span id="value">
          <PageSection>
            <Card>
              <ValueSectionHeader />
              <div className="pa3">
                <SingleValueReport {...props} />
              </div>
            </Card>
          </PageSection>
        </span>
        <span id={"loan-payments"}>
          <PageSection>
            <Card>
              <LoanPaymentsSectionHeader />
              <div className={"pa3"}>
                <SingleLoanPaymentsReport {...props} />
              </div>
            </Card>
          </PageSection>
        </span>
        <span id="grade">
          <PageSection>
            <Card>
              <FinancialGradeHeader />
              <div className="pa3">
                <SingleFinancialGradeReport {...props} />
              </div>
            </Card>
          </PageSection>
        </span>
      </div>
    </>
  );
};

export const useMultiReportSorts = (props: MultiReportProps) => {
  const collegesSortedByAlpha = sortBy(props.colleges, college => college.name);
  const collegesSortedByAffordabilityDelta = sortBy(
    props.colleges,
    college => college.affordabilityDelta
  );
  const collegesSortedByValueDelta = sortBy(props.colleges, college => college.valueDelta);
  const collegesSortedByEffectiveCost = sortBy(props.colleges, college => college.effectiveCost);
  const mostAffordableCollege = last(collegesSortedByAffordabilityDelta);
  const leastAffordableCollege = first(collegesSortedByAffordabilityDelta);
  const highestValueCollege = last(collegesSortedByValueDelta);
  const lowestValueCollege = first(collegesSortedByValueDelta);
  const leastExpensiveCollege = first(collegesSortedByEffectiveCost);

  if (!mostAffordableCollege) {
    throw Error('unexpected - most affordable college is missing');
  }

  if (!leastAffordableCollege) {
    throw Error('unexpected - least affordable college is missing');
  }

  if (!highestValueCollege) {
    throw Error('unexpected - highest value college is missing');
  }

  if (!lowestValueCollege) {
    throw Error('unexpected - lowest value college is missing');
  }

  if (!leastExpensiveCollege) {
    throw Error('unexpected - least expensive college is missing');
  }

  return {
    collegesSortedByAffordabilityDelta,
    collegesSortedByAlpha,
    collegesSortedByEffectiveCost,
    highestValueCollege,
    leastAffordableCollege,
    leastExpensiveCollege,
    lowestValueCollege,
    mostAffordableCollege
  };
};

type MultiReportComponentProps = MultiReportProps &
  IPreferenceModalOpener &
  IEdmitPlusStatusProps &
  IPlanSelectionModalProps;

const MultiReport: React.SFC<MultiReportComponentProps> = props => {
  const [keyTakeawaysOpened, setKeyTakeawaysOpened] = React.useState(false);

  return (
    <>
      <span id="key_takeaways">
        <Heading
          size={EHeadingSize.H2}
          text={"Financial Grade Report"}
          className={"tc mb0"}
        />
        <Card className={"mt5"}>
          <div className="pa3">
            <Text className={'black t-large tc'}>Key Takeaways</Text>
            <KeyTakeaways colleges={props.colleges} opened={keyTakeawaysOpened} onOpen={setKeyTakeawaysOpened} />
          </div>
        </Card>
      </span>
      <span id="cost">
        <PageSection top>
          <Card>
            <CostSectionHeader />
            <div className="pa3">
              <MultiCostReport {...props} />
            </div>
          </Card>
        </PageSection>
      </span>
      <span id="affordability">
        <PageSection>
          <Card>
            <AffordabilitySectionHeader />
            <div className="pa3">
              <MultiAffordabilityReport {...props} />
            </div>
          </Card>
        </PageSection>
      </span>
      <span id="value">
        <PageSection>
          <Card>
            <ValueSectionHeader />
            <div className="pa3">
              <MultiValueReport {...props} />
            </div>
          </Card>
        </PageSection>
      </span>
      <span id="grade">
        <PageSection>
          <Card>
            <FinancialGradeHeader />
            <div className="pa3">
              <MultiFinancialGradeReport {...props} />
            </div>
          </Card>
        </PageSection>
      </span>
    </>
  );
};

const ReportBody: React.SFC<Props> = props => {
  if (props.loading) {
    return <ReportLoading />;
  } else if (!props.loading) {
    switch (props.type) {
      case EReportType.Empty:
        return <></>;
      case EReportType.Single:
        return <SingleReport {...props} />;
      case EReportType.Multi:
        return <MultiReport {...props} />;
    }
  }

  throw Error('unexpected - invalid state for report');
};      
