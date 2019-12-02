import * as React from 'react'
import Text from '@edmit/component-library/src/components/atoms/typography/text'
import CollegeFeatures, { Pair } from '../college-features'
import Button, { EButtonSize, EButtonType } from '@edmit/component-library/src/components/atoms/button'
import Card from '@edmit/component-library/src/components/atoms/card'
import classNames from 'classnames'
import { FitChip } from '../graph/fit'
import Icon, { EIconName } from '../../atoms/icon'
import Heading, { EHeadingSize } from '../../atoms/typography/heading'
import numeral from 'numeral'
import { featureIds, featureLabels } from '../../../shared/features'
import { startCase } from 'lodash-es'
import { EAidGenerosity, EFinancialGrade, edstimateCopy } from '../../../shared'
import { hexCrimson, hexGrayLight, hexGreen } from '../../atoms/colors'
import { RecommendationsShowHideButton, RecommendationsAddButton, RecommendationsDismissButton } from '../../../../../client/src/testIds/ids';

interface ICollegeValueViewModel {
  label: string;
  color?: string;

  style?: React.CSSProperties;
  className?: string;
}

interface ICollegeValueActions { }

type CollegeValueProps = ICollegeValueViewModel & ICollegeValueActions;

const CollegeValue: React.FC<CollegeValueProps> = props => {
  return (
    <div style={props.style} className={'mh2 flex flex-column ' + props.className}>
      <Text className="t-medium black tc pv1 mv1">{props.label}</Text>
      <div className={'flex-grow-1'} />
      <div className={'flex justify-center items-center'}>
        <Heading
          size={EHeadingSize.H2}
          className={'tc mt0 mb2'}
          text={<span className={'lato f2'} style={{ color: props.color }}>{props.children}</span>}
        />
      </div>
    </div>
  );
};

interface ICollegeComparisonCardViewModel {
  name: string;
  location: string;
  financialGrade: EFinancialGrade;
  edstimate: number;
  averageMeritAid?: number;
  imageUrl: string | null;

  features: string[];
  selectedFeatures: string[];

  majors: Array<{ id: string; name: string }>;
  major: { id: string; name: string } | null;

  gpa: string | null;
  sat: number | null;
  act: number | null;
  edstimatePreference: number | null;
  meritAidGenerosityPreference: EAidGenerosity | null;
  needBasedAidGenerosityPreference: EAidGenerosity | null;
  popularInMyHighSchoolPreferenceEnabled: boolean;

  gpaRange: Pair<string> | null;
  satRange: Pair<number> | null;
  actRange: Pair<number> | null;
  meritAidGenerosity?: EAidGenerosity;
  needBasedAidGenerosity?: EAidGenerosity;
  popularInMyHighSchool: boolean | null;

  hideDismiss?: boolean;
  dismissText?: string;
  hideCompare?: boolean;
  compareText?: string;
  style?: React.CSSProperties;
  className?: string;
  firstYearEarnings?: number | null;
}

interface ICollegeComparisonCardActions {
  onDismiss(): void;
  onCompare(): void;
}

type CollegeComparisonCardProps = ICollegeComparisonCardViewModel & ICollegeComparisonCardActions;

const CollegeComparisonCard: React.FC<CollegeComparisonCardProps> = props => {
  const [showInfo, setShowInfo] = React.useState(false);

  const publicPrivateFeatureId = props.features.find(
    e => e === featureIds.TYPE_PUBLIC || e === featureIds.TYPE_PRIVATE
  );

  const selectedPublicPrivateFeatureId = props.selectedFeatures.find(
    e => e === featureIds.TYPE_PUBLIC || e === featureIds.TYPE_PRIVATE
  );

  const publicPrivateText = publicPrivateFeatureId ? startCase(featureLabels[publicPrivateFeatureId]) : null;

  return (
    <Card style={props.style} className={classNames('mb3 w-100 flex flex-column', props.className)}>
      <div
        style={props.imageUrl ? { backgroundImage: `url("${props.imageUrl}")` } : { backgroundColor: hexGrayLight }}
        className={'cover bg-center h4'}
      />
      <div className={'pa3'}>
        <Text className={'mv0 f4 lh-copy tl b'}>
          <span className={'black'}>{props.name}</span>
        </Text>
        <Text className={'mt1 mb0 tl'}>
          {[
            publicPrivateText && <span className={`${(selectedPublicPrivateFeatureId && (selectedPublicPrivateFeatureId === publicPrivateFeatureId ? 'lightest-green' : 'crimson'))}`}>{publicPrivateText}</span>,
            // TODO: <span className={"bb bw2 b--red"}>4 year</span>,
            <span>{props.location}</span>
          ]
            .filter(e => !!e)
            .map((el, i, arr) => {
              return <span>{el}{i !== arr.length - 1 && <span className={"mh1"}>|</span>}
              </span>
            })
          }
        </Text>
        <div className={'bg-offwhite ph3 pv2 flex justify-center mt4'}>
          <CollegeValue label={'Financial Grade'}>
            <FitChip
              admissionUnlikely={false}
              financialGrade={props.financialGrade}
              loading={false}
              size={50}
              className={'pb2 mb3'}
            />
          </CollegeValue>
          <CollegeValue label={edstimateCopy} color={props.edstimatePreference !== null ? (props.edstimate <= props.edstimatePreference ? hexGreen : hexCrimson) : undefined}>
            {numeral(props.edstimate).format('$0a')}
            <br />
            <Text className={'mv0'}>(1 year)</Text>
          </CollegeValue>
        </div>
        <div>
          <div className={'flex justify-end'}>
            <span
              className={'pointer'}
              onClick={() => setShowInfo(currentlyOpen => !currentlyOpen)}
            >
              <Text className="tr">
                <span data-testid={RecommendationsShowHideButton}>{!showInfo ? 'Show information' : 'Hide information'}</span>
                <Icon name={showInfo ? EIconName.ChevronDown : EIconName.ChevronRight} />
              </Text>
            </span>
          </div>
          {showInfo && (
            <CollegeFeatures
              features={props.features}
              selectedFeatures={props.selectedFeatures}
              majors={props.majors}
              major={props.major}
              gpa={props.gpa}
              sat={props.sat}
              act={props.act}
              meritAidGenerosityPreference={props.meritAidGenerosityPreference}
              needBasedAidGenerosityPreference={props.needBasedAidGenerosityPreference}
              popularInMyHighSchoolPreferenceEnabled={props.popularInMyHighSchoolPreferenceEnabled}

              gpaRange={props.gpaRange}
              satRange={props.satRange}
              actRange={props.actRange}
              firstYearEarnings={props.firstYearEarnings || undefined}
              meritAidGenerosity={props.meritAidGenerosity}
              needBasedAidGenerosity={props.needBasedAidGenerosity}
              showAidGenerosity={true}
              popularInMyHighSchool={props.popularInMyHighSchool}
            />
          )}
        </div>
      </div>
      <div className="tr mt3 pa3 bt b--moon-gray">
        <div className={'flex justify-end'}>
          {!props.hideDismiss && <Button
            testId={RecommendationsDismissButton}
            text={props.dismissText || 'Dismiss'}
            onClick={() => props.onDismiss()}
            size={EButtonSize.Medium}
            type={EButtonType.Secondary}
            className={'mr1'}
          />}
          {!props.hideCompare && <Button
            testId={RecommendationsAddButton}
            text={props.compareText || 'Add to List'}
            onClick={() => props.onCompare()}
            size={EButtonSize.Medium}
            type={EButtonType.Primary}
          />}
        </div>
      </div>
    </Card>
  );
};

export default CollegeComparisonCard;
