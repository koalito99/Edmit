import * as React from 'react';
import withSizes from "react-sizes";
import {
  IRecommendationGridProps,
  RecommendationCollege
} from '../../../components/organisms/recommendation-grid';
import { CollegeId, Nullable } from '@edmit/component-library/src/lib/models';
import FilterMenu from '@edmit/component-library/src/components/molecules/filter-menu';
import ToggleButton from '@edmit/component-library/src/components/atoms/toggle-button';
import { featureIds, featureLabels } from '@edmit/component-library/src/shared/features'
import FormFieldSlider from '@edmit/component-library/src/components/atoms/form/form-field-slider';
import { hexGrayLight, hexGreen } from '@edmit/component-library/src/components/atoms/colors';
import SmartSATField from '../../molecules/smart-fields/field-sat';
import SmartMajorField from '../../molecules/smart-fields/field-major';
import SmartHighSchoolField from '../../molecules/smart-fields/field-highschool';
import FormFieldCheckbox from '@edmit/component-library/src/components/atoms/form/form-field-checkbox';
import { EAidGenerosity, edstimateCopy } from '@edmit/component-library/src/shared'
import SmartACTField from '../../molecules/smart-fields/field-act';
import Button, {
  EButtonSize,
  EButtonType
} from '@edmit/component-library/src/components/atoms/button';
import numeral from 'numeral';
import FormFieldCurrency from '@edmit/component-library/src/components/atoms/form/form-field-currency';
import { startCase } from 'lodash-es'
import Text from '@edmit/component-library/src/components/atoms/typography/text'
import SmartGPAField from '../../molecules/smart-fields/field-gpa'

// interface IArrowProps {
//   onClick?: () => void; currentSlide?: number; slideCount?: number; slidesToShow?: number;
// }

// const PrevArrow: React.SFC<IArrowProps> = props => {
//   const { onClick, currentSlide } = props;

//   if (currentSlide !== 0) {
//     return (
//       <div
//         className="flex absolute flex-column items-center justify-center"
//         style={{ top: 0, bottom: 0, left: -15, width: 45, zIndex: 10 }}
//         onClick={onClick}
//       >
//         <span className="icon-carousel gray-muted dim">
//           <Icon name={EIconName.ChevronLeft} />
//         </span>
//       </div>
//     );
//   } else {
//     return null;
//   }
// };

// const NextArrow: React.SFC<IArrowProps> = props => {
//   const { onClick, currentSlide, slideCount, slidesToShow } = props;

//   if (currentSlide! + slidesToShow! < slideCount!) {
//     return (
//       <div
//         className="flex absolute flex-column items-center justify-center"
//         style={{ top: 0, bottom: 0, right: -15, width: 45, zIndex: 10 }}
//         onClick={onClick}
//       >
//         <span className="icon-carousel gray-muted dim">
//           <Icon name={EIconName.ChevronRight} />
//         </span>
//       </div>
//     );
//   } else {
//     return null;
//   }
// };

export interface ICollegeCompareGridViewModel {
  colleges: Array<
    RecommendationCollege
  >;
  loading?: boolean;
  student: {
    major: {
      id: string;
      name: string;
    } | null;
    preferences?: string[];

    gpa: string | null;
    satScore: number | null;
    actScore: number | null;

    highSchool: {
      popularColleges: string[];
    } | null;
  };

  ableToLoadMore: boolean;
  onLoadMore(): void;

  isEdmitPlus?: boolean;
  setCollegeAdding: (id: Nullable<CollegeId>) => void;

  isMobile?: boolean;
}

const CollegeCompareGrid: React.SFC<
  ICollegeCompareGridViewModel & IRecommendationGridProps
> = props => {
  const prefs = props.student.preferences || [];

  const sizeFeatureIds = prefs.filter(e =>
    [
      featureIds.SIZE_UNDER_1000,
      featureIds.SIZE_1000_TO_5000,
      featureIds.SIZE_5000_TO_10000,
      featureIds.SIZE_10000_TO_20000,
      featureIds.SIZE_ABOVE_20000
    ].includes(e)
  );

  const publicPrivateFeatureId = prefs.find(e =>
    [featureIds.TYPE_PUBLIC, featureIds.TYPE_PRIVATE].includes(e)
  );

  const regionFeatureIds = prefs.filter(e =>
    [
      featureIds.REGION_SOUTH,
      featureIds.REGION_NORTHEAST,
      featureIds.REGION_MIDWEST,
      featureIds.REGION_WEST
    ].includes(e)
  );

  const preferencesWithout = (preferences: string[], ...removedPrefs: string[]) => {
    return preferences.filter(p => !removedPrefs.includes(p));
  };

  const preferencesWith = (preferences: string[], ...addedPrefs: string[]) => {
    return addedPrefs.reduce((acc, curr) => {
      const index = acc.indexOf(curr);

      return index > -1 ? acc : [...acc, curr];
    }, preferences);
  };

  const [
    meritAidGenerosityPreference,
    setMeritAidGenerosityPreference
  ] = React.useState<EAidGenerosity | null>(null);
  const [
    needBasedAidGenerosityPreference,
    setNeedBasedAidGenerosityPreference
  ] = React.useState<EAidGenerosity | null>(null);
  const [edstimatePreference, setEdstimatePreference] = React.useState<number | null>(null);

  const gpaPreferenceEnabled = props.student.gpa !== null
  const satPreferenceEnabled = props.student.satScore !== null
  const actPreferenceEnabled = props.student.actScore !== null
  // // @ts-ignore
  // const [gpaPreferenceEnabled, setGPAPreferenceEnabled] = React.useState(false);
  // const [satPreferenceEnabled, setSATPreferenceEnabled] = React.useState(false);
  // const [actPreferenceEnabled, setACTPreferenceEnabled] = React.useState(false);


  const majorPreferenceEnabled = props.student.major !== null;
  const popularInMyHighschoolPreferenceEnabled = props.student.highSchool !== null;
  // const [majorPreferenceEnabled, setMajorPreferenceEnabled] = React.useState(false);
  // const [
  //   popularInMyHighschoolPreferenceEnabled,
  //   setPopularInMyHighschoolPreferenceEnabled
  // ] = React.useState(false);

  const activeAidGenerosityPreferences =
    (meritAidGenerosityPreference === EAidGenerosity.HIGH ? 1 : 0) +
    (needBasedAidGenerosityPreference === EAidGenerosity.HIGH ? 1 : 0);

  const activeTestPreferences =
    (gpaPreferenceEnabled ? 1 : 0) +
    (satPreferenceEnabled ? 1 : 0) +
    (actPreferenceEnabled ? 1 : 0);

  const maxEdstimate = props.colleges.reduce(
    (acc, curr) => (curr.edstimate.value > acc ? curr.edstimate.value : acc),
    0
  );

  return (
    <div>
      <div className={'flex flex-wrap mb3'}>
        <FilterMenu
          feature={`Size`}
          active={Boolean(sizeFeatureIds.length > 0)}
          onApply={() => { }}
          onUpgradeToEdmitPlus={() => { }}
        >
          <ToggleButton
            className={'ma1'}
            selected={sizeFeatureIds.includes(featureIds.SIZE_UNDER_1000)}
            onToggle={selected => {
              props.updatePreferences(
                selected
                  ? preferencesWith(prefs, featureIds.SIZE_UNDER_1000)
                  : preferencesWithout(prefs, featureIds.SIZE_UNDER_1000)
              );
            }}
          >
            {startCase(featureLabels[featureIds.SIZE_UNDER_1000])}
          </ToggleButton>
          <ToggleButton
            className={'ma1'}
            selected={sizeFeatureIds.includes(featureIds.SIZE_1000_TO_5000)}
            onToggle={selected => {
              props.updatePreferences(
                selected
                  ? preferencesWith(prefs, featureIds.SIZE_1000_TO_5000)
                  : preferencesWithout(prefs, featureIds.SIZE_1000_TO_5000)
              );
            }}
          >
            {startCase(featureLabels[featureIds.SIZE_1000_TO_5000])}
          </ToggleButton>
          <ToggleButton
            className={'ma1'}
            selected={sizeFeatureIds.includes(featureIds.SIZE_5000_TO_10000)}
            onToggle={selected => {
              props.updatePreferences(
                selected
                  ? preferencesWith(prefs, featureIds.SIZE_5000_TO_10000)
                  : preferencesWithout(prefs, featureIds.SIZE_5000_TO_10000)
              );
            }}
          >
            {startCase(featureLabels[featureIds.SIZE_5000_TO_10000])}
          </ToggleButton>
          <ToggleButton
            className={'ma1'}
            selected={sizeFeatureIds.includes(featureIds.SIZE_10000_TO_20000)}
            onToggle={selected => {
              props.updatePreferences(
                selected
                  ? preferencesWith(prefs, featureIds.SIZE_10000_TO_20000)
                  : preferencesWithout(prefs, featureIds.SIZE_10000_TO_20000)
              );
            }}
          >
            {startCase(featureLabels[featureIds.SIZE_10000_TO_20000])}
          </ToggleButton>
          <ToggleButton
            className={'ma1'}
            selected={sizeFeatureIds.includes(featureIds.SIZE_ABOVE_20000)}
            onToggle={selected => {
              props.updatePreferences(
                selected
                  ? preferencesWith(prefs, featureIds.SIZE_ABOVE_20000)
                  : preferencesWithout(prefs, featureIds.SIZE_ABOVE_20000)
              );
            }}
          >
            {startCase(featureLabels[featureIds.SIZE_ABOVE_20000])}
          </ToggleButton>
        </FilterMenu>
        <FilterMenu
          feature={`Region`}
          active={Boolean(regionFeatureIds.length > 0)}
          onApply={() => { }}
          onUpgradeToEdmitPlus={() => { }}
        >
          <ToggleButton
            className={'ma1'}
            selected={regionFeatureIds.includes(featureIds.REGION_SOUTH)}
            onToggle={selected => {
              props.updatePreferences(
                selected
                  ? preferencesWith(prefs, featureIds.REGION_SOUTH)
                  : preferencesWithout(prefs, featureIds.REGION_SOUTH)
              );
            }}
          >
            {startCase(featureLabels[featureIds.REGION_SOUTH])}
          </ToggleButton>
          <ToggleButton
            className={'ma1'}
            selected={regionFeatureIds.includes(featureIds.REGION_NORTHEAST)}
            onToggle={selected => {
              props.updatePreferences(
                selected
                  ? preferencesWith(prefs, featureIds.REGION_NORTHEAST)
                  : preferencesWithout(prefs, featureIds.REGION_NORTHEAST)
              );
            }}
          >
            {startCase(featureLabels[featureIds.REGION_NORTHEAST])}
          </ToggleButton>
          <br />
          <ToggleButton
            className={'ma1'}
            selected={regionFeatureIds.includes(featureIds.REGION_MIDWEST)}
            onToggle={selected => {
              props.updatePreferences(
                selected
                  ? preferencesWith(prefs, featureIds.REGION_MIDWEST)
                  : preferencesWithout(prefs, featureIds.REGION_MIDWEST)
              );
            }}
          >
            {startCase(featureLabels[featureIds.REGION_MIDWEST])}
          </ToggleButton>
          <ToggleButton
            className={'ma1'}
            selected={regionFeatureIds.includes(featureIds.REGION_WEST)}
            onToggle={selected => {
              props.updatePreferences(
                selected
                  ? preferencesWith(prefs, featureIds.REGION_WEST)
                  : preferencesWithout(prefs, featureIds.REGION_WEST)
              );
            }}
          >
            {startCase(featureLabels[featureIds.REGION_WEST])}
          </ToggleButton>
        </FilterMenu>
        <FilterMenu
          feature={
            !Boolean(publicPrivateFeatureId)
              ? 'Public/Private'
              : publicPrivateFeatureId === featureIds.TYPE_PUBLIC
                ? 'Public'
                : 'Private'
          }
          active={Boolean(publicPrivateFeatureId)}
          onApply={() => { }}
          onUpgradeToEdmitPlus={() => { }}
        >
          <ToggleButton
            selected={publicPrivateFeatureId === featureIds.TYPE_PUBLIC}
            onToggle={selected => {
              props.updatePreferences(
                selected
                  ? preferencesWith(
                    preferencesWithout(prefs, featureIds.TYPE_PRIVATE),
                    featureIds.TYPE_PUBLIC
                  )
                  : preferencesWithout(prefs, featureIds.TYPE_PUBLIC)
              );
            }}
            className={'mr1'}
          >
            {startCase(featureLabels[featureIds.TYPE_PUBLIC])}
          </ToggleButton>
          <ToggleButton
            selected={publicPrivateFeatureId === featureIds.TYPE_PRIVATE}
            onToggle={selected => {
              props.updatePreferences(
                selected
                  ? preferencesWith(
                    preferencesWithout(prefs, featureIds.TYPE_PUBLIC),
                    featureIds.TYPE_PRIVATE
                  )
                  : preferencesWithout(prefs, featureIds.TYPE_PRIVATE)
              );
            }}
          >
            {startCase(featureLabels[featureIds.TYPE_PRIVATE])}
          </ToggleButton>
        </FilterMenu>
        <FilterMenu feature={'Major'} active={majorPreferenceEnabled} onApply={() => { }} onUpgradeToEdmitPlus={() => { }}>
          <SmartMajorField />
          {/*<div className={'mt1'}>
            <FormFieldCheckbox
              color={hexGreen}
              checked={majorPreferenceEnabled}
              onChange={setMajorPreferenceEnabled}
              required={false}
              disabled={!Boolean(props.student.major)}
              label={'Enabled'}
            />
          </div>*/}
        </FilterMenu>
        <FilterMenu
          feature={'Popular at My High School'}
          active={popularInMyHighschoolPreferenceEnabled}
          onApply={() => { }}
          onUpgradeToEdmitPlus={() => { }}
        >
          <SmartHighSchoolField />
          {/*<div className={'mt1'}>
            <FormFieldCheckbox
              color={hexGreen}
              checked={popularInMyHighschoolPreferenceEnabled}
              onChange={setPopularInMyHighschoolPreferenceEnabled}
              required={false}
              disabled={!Boolean(props.student.highSchool)}
              label={'Enabled'}
            />
          </div>*/}
        </FilterMenu>
        <FilterMenu
          feature={`Test Scores`}
          active={activeTestPreferences > 0}
          onApply={() => { }}
          onUpgradeToEdmitPlus={() => { }}
        >
          <div className={'flex flex-wrap'}>
            <div className={'w-100 w-33-ns ph2 mb4 mb2-ns tc'}>
              <SmartGPAField className={'mb2'} />
              {/*<div>
                <FormFieldCheckbox
                  color={hexGreen}
                  checked={gpaPreferenceEnabled}
                  onChange={setGPAPreferenceEnabled}
                  required={false}
                  disabled={!props.student.gpa}
                  label={''}
                />
              </div>*/}
            </div>
            <div className={'w-100 w-33-ns ph2 mb4 mb2-ns tc'}>
              <SmartSATField className={'mb2'} />
              {/*<div>
                <FormFieldCheckbox
                  color={hexGreen}
                  checked={satPreferenceEnabled}
                  onChange={setSATPreferenceEnabled}
                  required={false}
                  disabled={!props.student.satScore}
                  label={''}
                />
              </div>*/}
            </div>
            <div className={'w-100 w-33-ns ph2 mb2 tc'}>
              <SmartACTField className={'mb2'} />
              {/*<div>
                <FormFieldCheckbox
                  color={hexGreen}
                  checked={actPreferenceEnabled}
                  onChange={setACTPreferenceEnabled}
                  required={false}
                  disabled={!props.student.actScore}
                  label={''}
                />
              </div>*/}
            </div>
          </div>
          <Text>Your test scores are used to sort for schools where you would be competitive.</Text>
        </FilterMenu>
        <FilterMenu
          feature={`Scholarships & Aid`}
          active={activeAidGenerosityPreferences > 0}
          onApply={() => { }}
          locked={!props.isEdmitPlus}
          onUpgradeToEdmitPlus={props.onUpgradeToEdmitPlus}
        >
          <div>
            <div className={'tl dib center'}>
              <div className={'mb2'}>
                <FormFieldCheckbox
                  color={hexGreen}
                  checked={meritAidGenerosityPreference === EAidGenerosity.HIGH}
                  required={false}
                  label={'High Merit Aid'}
                  onChange={checked => {
                    setMeritAidGenerosityPreference(checked ? EAidGenerosity.HIGH : null);
                  }}
                />
              </div>
              <div>
                <FormFieldCheckbox
                  color={hexGreen}
                  checked={needBasedAidGenerosityPreference === EAidGenerosity.HIGH}
                  required={false}
                  label={'High Need-based Aid'}
                  onChange={checked => {
                    setNeedBasedAidGenerosityPreference(checked ? EAidGenerosity.HIGH : null);
                  }}
                />
              </div>
            </div>
          </div>
        </FilterMenu>
        <FilterMenu
          feature={edstimateCopy}
          active={edstimatePreference !== null}
          onApply={() => { }}
          locked={!props.isEdmitPlus}
          onUpgradeToEdmitPlus={props.onUpgradeToEdmitPlus}
        >
          <FormFieldSlider
            value={edstimatePreference || maxEdstimate}
            min={0}
            max={maxEdstimate}
            marks={{
              0: '$0',
              [maxEdstimate / 3]: numeral(maxEdstimate / 3).format('$0a'),
              [(maxEdstimate * 2) / 3]: numeral((maxEdstimate * 2) / 3).format('$0a'),
              [maxEdstimate]: numeral(maxEdstimate).format('$0a')
            }}
            color={edstimatePreference ? hexGreen : hexGrayLight}
            onChange={setEdstimatePreference}
          />
          <div className={'mt4 flex justify-center items-end flex-wrap'}>
            <FormFieldCurrency
              label={''}
              required={false}
              value={edstimatePreference || undefined}
              onChange={setEdstimatePreference}
              className={'w4 mb2'}
            />
            <Button
              text={'Clear'}
              size={EButtonSize.Medium}
              type={EButtonType.Secondary}
              onClick={() => setEdstimatePreference(null)}
              className={'mh2'}
            />
          </div>
        </FilterMenu>
      </div>
    </div>
  );
};

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width < 640
});
export default withSizes(mapSizesToProps)(CollegeCompareGrid) as typeof CollegeCompareGrid;
