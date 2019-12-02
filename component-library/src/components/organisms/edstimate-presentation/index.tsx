import * as React from 'react'
import Text, { ETextType } from '../../atoms/typography/text'
import Accordion from '../../molecules/accordion'
import Heading, { EHeadingSize } from '../../atoms/typography/heading'
import TextLink from '../../atoms/link-text'
import NeedMeritGraph from '../../molecules/graph/need-merit'
import numeral from 'numeral'
import { hexGrayDim, hexGrayLight, hexGreen, hexRed, hexYellow } from '../../atoms/colors'
import { EAidGenerosity, EAidMeasurement, edstimateCopy } from '../../../shared'
import Banner from '../../atoms/banner'
import Card from '../../atoms/card'
import LoadingSpinner from '../../atoms/loading/spinner'

interface IFinancialAidCardViewModel {
  name: React.ReactNode;
  impact: number;
  color: string;

  assessment?: React.ReactNode;

  style?: React.CSSProperties;
  className?: string;
}

interface IFinancialAidCardActions { }

type FinancialAidCardProps = IFinancialAidCardViewModel & IFinancialAidCardActions;

const FinancialAidCard: React.FC<FinancialAidCardProps> = props => {
  return (
    <Card style={{ ...props.style, width: 350, maxWidth: '95%' }} className={'h-100 ' + props.className}>
      <div style={{ height: 10, backgroundColor: props.color }} />
      <div className={'ph3 pv4'}>
        <div>
          <Heading size={EHeadingSize.H3} text={props.name} className={'mt1 mb2 tc'} />
          {/*<div className={'flex flex-wrap justify-center items-center'}>
            <div>
              <span
                className="fa fa-circle f7 mr1"
                style={{ color: props.impact >= 1 ? props.color : hexGrayLight }}
              />
              <span
                className="fa fa-circle f7 mr1"
                style={{ color: props.impact >= 2 ? props.color : hexGrayLight }}
              />
              <span
                className="fa fa-circle f7 mr1"
                style={{ color: props.impact >= 3 ? props.color : hexGrayLight }}
              />
            </div>
            <Text type={ETextType.Label} className={'mb0 mt1 ml1'}>
              {props.impact > 0
                ? `${props.impact == 1 ? 'Low' : props.impact == 2 ? 'Medium' : 'High'} Impact`
                : ''}
            </Text>
          </div>*/}
        </div>
        <div className={'ph3 mt4 tc'}>
          <Text>{props.children}</Text>
          {props.assessment && (
            <div className={'mt4 ba pa3'} style={{ borderRadius: 5, borderColor: props.color }}>
              <Text className={'mv0'}>{props.assessment}</Text>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

interface IEdstimatePresentationLoading {
  loading: true;
}

export enum EAidResult {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

interface IEdstimatePresentationLoaded {
  college: {
    name: string;
    edstimate: number;

    meritAidGenerosity: EAidGenerosity | null;
    needBasedAidGenerosity: EAidGenerosity | null;
    studentMerit: EAidMeasurement;
    studentNeed: EAidMeasurement;
  };

  trends: {
    value: number;
  } | null;

  otherStudents: {
    value: number;
    data: Array<{
      efc: number;
      actScore?: number;
      satScore?: number;
      gpa?: string;
      edstimate: number;
    }>;
  } | null;

  publishedScholarships: {
    value: number;
    scholarships: Array<{
      name: string;
      amount: number;
    }>;
  } | null;

  student: {
    efc: number;
    actScore?: number;
    satScore?: number;
    gpa?: string;
  };

  loading: false;
}

export type IEdstimatePresentationData =
  | IEdstimatePresentationLoading
  | IEdstimatePresentationLoaded;

export type EdstimatePresentationProps = IEdstimatePresentationData & {
  singleOptionOpen: boolean;
  defaultOpenOptions?: string[];

  style?: React.CSSProperties;
  className?: string;
};

const EdstimatePresentation: React.FC<EdstimatePresentationProps> = props => {
  if (props.loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const aidGenerosityElement = (
    aidGenerosity: EAidGenerosity
  ): { color: string; element: React.ReactNode } => {
    let color = '';
    let text = '';

    switch (aidGenerosity) {
      case EAidGenerosity.HIGH:
        color = hexGreen;
        text = 'high';
        break;
      case EAidGenerosity.MEDIUM:
        color = hexYellow;
        text = 'medium';
        break;
      case EAidGenerosity.LOW:
        color = hexRed;
        text = 'low';
        break;
    }

    return { color, element: <strong style={{ color: color }}>{text}</strong> };
  };

  const aidMeasurementElement = (
    aidMeasurement: EAidMeasurement
  ): { color: string; element: React.ReactNode } => {
    let color = '';
    let text = '';

    switch (aidMeasurement) {
      case EAidMeasurement.HIGH:
        color = hexGreen;
        text = 'high';
        break;
      case EAidMeasurement.MEDIUM:
        color = hexYellow;
        text = 'medium';
        break;
      case EAidMeasurement.LOW:
        color = hexRed;
        text = 'low';
        break;
    }

    return { color, element: <strong style={{ color: color }}>{text}</strong> };
  };

  const aidResult = (generosity: EAidGenerosity, measurement: EAidMeasurement): EAidResult => {
    if (generosity === EAidGenerosity.HIGH && measurement === EAidMeasurement.HIGH) {
      return EAidResult.HIGH;
    } else if (
      (generosity === EAidGenerosity.MEDIUM && measurement === EAidMeasurement.MEDIUM) ||
      (generosity === EAidGenerosity.MEDIUM && measurement === EAidMeasurement.HIGH) ||
      (generosity === EAidGenerosity.HIGH && measurement === EAidMeasurement.MEDIUM)
    ) {
      return EAidResult.MEDIUM;
    } else {
      return EAidResult.LOW;
    }
  };

  const aidResultElement = (aidResult: EAidResult) => {
    let color = '';
    let text = '';
    let rating = -1;

    switch (aidResult) {
      case EAidResult.HIGH:
        color = hexGreen;
        text = 'high';
        rating = 3;
        break;
      case EAidResult.MEDIUM:
        color = hexYellow;
        text = 'medium';
        rating = 2;
        break;
      case EAidResult.LOW:
        color = hexRed;
        text = 'low (or no)';
        rating = 1;
        break;
    }

    return { color, element: <strong style={{ color: color }}>{text}</strong>, rating };
  };

  const needBasedAidResultElement =
    props.college.needBasedAidGenerosity &&
    aidResultElement(aidResult(props.college.needBasedAidGenerosity, props.college.studentNeed));
  const meritAidResultElement =
    props.college.meritAidGenerosity &&
    aidResultElement(aidResult(props.college.meritAidGenerosity, props.college.studentMerit));

  const components = [
    !props.trends
      ? null
      : {
        id: 'trends',
        title: (
          <div className={'flex justify-between items-center'}>
            <span>Historical College Data</span>
            <span>{numeral(props.trends.value).format('$0a')}</span>
          </div>
        ),
        content: (
          <div>
            <Text className={'f5 lh-copy'}>
              Edmit uses data reported by colleges to the federal government and in surveys to
              understand how generous colleges are with financial aid. Financial aid can be based
              on your ‘need’ (based on your financial situation and ability to pay) or
              “merit-based” (based on your academic or other strengths.)
                <br />
              <br />
              This estimate looks at your financial need and your academic performance and
              compares those with what we know about the college’s financial aid.
              </Text>
            <div style={{ overflowX: 'hidden' }} className={'mt4 mb4 flex flex-wrap justify-center items-stretch'}>
              <div className={'mr2 mr4-l'}>
                {needBasedAidResultElement && props.college.needBasedAidGenerosity ? (
                  <FinancialAidCard
                    name={'Need-Based Aid'}
                    color={needBasedAidResultElement.color}
                    impact={needBasedAidResultElement.rating}
                    assessment={
                      <span>
                        Therefore, we think you will get {needBasedAidResultElement.element}{' '}
                        need-based aid.
                        </span>
                    }
                  >
                    Your financial need (measured using your income or EFC) is{' '}
                    {aidMeasurementElement(props.college.studentNeed).element}.<br />
                    <br />
                    This college’s generosity with need-based aid is{' '}
                    {aidGenerosityElement(props.college.needBasedAidGenerosity).element}.
                    </FinancialAidCard>
                ) : (
                    <FinancialAidCard name={<span className={"gray-muted"}>Need-Based Aid</span>} impact={0} color={hexGrayLight}>
                      <span className={"gray-muted"}>Need-based aid data for this college is unavailable.</span>
                    </FinancialAidCard>
                  )}
              </div>
              <div className={'mr2 mr4-l'}>
                {meritAidResultElement && props.college.meritAidGenerosity ? (
                  <FinancialAidCard
                    name={'Merit Aid'}
                    color={meritAidResultElement.color}
                    impact={meritAidResultElement.rating}
                    assessment={
                      <span>
                        Therefore, we think you will get {meritAidResultElement.element} merit
                        aid.
                        </span>
                    }
                  >
                    Your merit (GPA and test scores) are{' '}
                    {aidMeasurementElement(props.college.studentMerit).element} compared to
                    others.
                      <br />
                    <br />
                    This college’s merit aid generosity is{' '}
                    {aidGenerosityElement(props.college.meritAidGenerosity).element}.
                    </FinancialAidCard>
                ) : (
                    <FinancialAidCard name={<span className={"gray-muted"}>Merit Aid</span>} impact={0} color={hexGrayLight}>
                      <span className={"gray-muted"}>Merit aid data for this college is unavailable.</span>
                    </FinancialAidCard>
                  )}
              </div>
            </div>
          </div>
        )
      },
    !props.otherStudents
      ? null
      : {
        id: 'other_students',
        title: (
          <div className={'flex justify-between items-center'}>
            <span>Other students like you</span>
            <span>{numeral(props.otherStudents.value).format('$0a')}</span>
          </div>
        ),
        content: (
          <div>
            <Text className={'f5 lh-copy'}>
              Edmit has thousands of data points on what other students received in financial aid.
              This estimate looks at students that are similar to you at this college or similar
              colleges. {props.otherStudents.data.length > 0 ? "Here is a sample:" : null}
            </Text>
            {props.otherStudents.data.length > 0 ? (<div className={'mb3'}>
              <NeedMeritGraph
                otherStudents={props.otherStudents.data}
                student={{
                  ...props.student,
                  edstimate: props.otherStudents.value
                }}
              />
            </div>) : <span />}
          </div>
        )
      },
    {
      id: 'published_scholarships',
      title: (
        <div className={'flex justify-between items-center'}>
          <span>Published scholarships</span>
          <span>
            {props.publishedScholarships ?
              numeral(props.publishedScholarships.value).format('$0a') : "None"}
          </span>
        </div>
      ),
      content: (
        <div>
          <Text className={'f5 lh-copy'}>
            This estimate is based on what scholarships the college posts publicly on its website. It also takes into account tuition reciprocity agreements and state scholarships.
            <br />
            <br />
            {!props.publishedScholarships ||
              props.publishedScholarships.scholarships.length === 0 ? (
                'We don’t know of any scholarships you will automatically qualify for at this college.'
              ) : props.publishedScholarships.scholarships.length === 1 ? (
                `You are eligible for the ${
                props.publishedScholarships.scholarships[0].name
                }, which provides ${numeral(
                  props.publishedScholarships.scholarships[0].amount
                ).format('$0,0')} per year.`
              ) : (
                  <ul>
                    {props.publishedScholarships.scholarships.map(scholarship => (
                      <li>
                        You are eligible for the {scholarship.name}, which provides{' '}
                        {numeral(scholarship.amount).format('$0,0')} per year.
                  </li>
                    ))}
                  </ul>
                )}
          </Text>
        </div>
      )
    }
  ].filter(m => m !== null);

  return (
    <div className={props.className} style={props.style}>
      <Heading
        size={EHeadingSize.H3}
        text={`Your ${edstimateCopy} for ${props.college.name}: ${numeral(
          props.college.edstimate
        ).format('$0,0')} per year`}
        className={'mt0'}
      />
      <Text className={'black'}>Inside the {edstimateCopy}</Text>
      <Text className="mt0 mb4">
        The {edstimateCopy} is Edmit’s best estimate of the price you’ll pay. It is based on a blend
        of methods, each of which may produce a different estimate depending on the available data.
      </Text>
      <Text type={ETextType.Label} className="mt0 mb2 mh3">
        {edstimateCopy} based on
      </Text>
      <Accordion
        single={props.singleOptionOpen}
        initialExpandedIds={props.defaultOpenOptions}
        optionMaxHeight={null}
        options={components}
      />
      <div className={'mt4 mb2'}>
        <Banner
          messageText={
            <Text className={'mv0 f6 lh-copy'}>
              We love hearing from families about how to improve our Edstimates.
              <br />
              <TextLink to={''} nonRouter={true} onClickOverride={() => {
                Appcues.show("-Lh6FFL3874WNRfQCT6w")
              }}>
                Use this form to report an issue, missing data, or a discrepancy with your figures.
              </TextLink>
            </Text>
          }
          rounded
          backgroundColor={hexGrayLight}
          foregroundColor={hexGrayDim}
          closeButtonColor={hexGrayDim}
          className={'tc'}
        />
      </div>
    </div>
  );
};

export default EdstimatePresentation;
