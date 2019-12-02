import * as React from 'react'
import Icon, { EIconName } from '@edmit/component-library/src/components/atoms/icon'
import { featureIds, featureLabels } from '@edmit/component-library/src/shared/features'
import numeral from 'numeral'
import { EAidGenerosity } from '../../../shared'

export type Pair<T> = [T, T];

export interface ICollegeFeaturesViewModel {
  features: string[];
  selectedFeatures: string[];

  major: { id: string; name: string } | null;
  majors: Array<{ id: string; name: string }>;

  gpa: string | null;
  sat: number | null;
  act: number | null;
  meritAidGenerosityPreference: EAidGenerosity | null;
  needBasedAidGenerosityPreference: EAidGenerosity | null;
  popularInMyHighSchoolPreferenceEnabled: boolean;

  gpaRange: Pair<string> | null;
  satRange: Pair<number> | null;
  actRange: Pair<number> | null;
  firstYearEarnings?: number;
  popularInMyHighSchool: boolean | null;

  meritAidGenerosity?: EAidGenerosity;
  needBasedAidGenerosity?: EAidGenerosity;
  showAidGenerosity: boolean;
}

type CollegeFeaturesProps = ICollegeFeaturesViewModel;

const CollegeFeatures: React.SFC<CollegeFeaturesProps> = props => {
  const featureItems = {};
  let publicPrivate = '';
  let isPublicPrivate = null;
  let size = '';
  let isSize = null;
  let region = '';
  let isRegion = null;
  let matchingPreferences = 0;
  let totalPreferences = 0;
  let hasMajor = false;
  let isWithinGPARange = null;
  let isWithinSATRange = null;
  let isWithinACTRange = null;
  let isAboveMeritAidGenerosityPreference = null;
  let isAboveNeedBasedAidGenerosityPreference = null;

  props.selectedFeatures
    ? props.selectedFeatures.forEach(pref => {
        if (pref === featureIds.TYPE_PUBLIC || pref === featureIds.TYPE_PRIVATE) {
          isPublicPrivate = false;
        } else if (
          pref === featureIds.SIZE_10000_TO_20000 ||
          pref === featureIds.SIZE_5000_TO_10000 ||
          pref === featureIds.SIZE_1000_TO_5000 ||
          pref === featureIds.SIZE_UNDER_1000 ||
          pref === featureIds.SIZE_ABOVE_20000
        ) {
          isSize = false;
        } else if (
          pref === featureIds.REGION_WEST ||
          pref === featureIds.REGION_MIDWEST ||
          pref === featureIds.REGION_NORTHEAST ||
          pref === featureIds.REGION_SOUTH
        ) {
          isRegion = false
        }
      })
    : (totalPreferences = 0);

  if (isPublicPrivate != null) {
    totalPreferences++;
  }
  if (isSize != null) {
    totalPreferences++;
  }
  if (isRegion != null) {
    totalPreferences++;
  }

  props.features.forEach(f => {
    if (featureLabels[f]) {
      featureItems[f] = {
        id: f,
        isStudentPreference: props.selectedFeatures ? props.selectedFeatures.indexOf(f) > -1 : false
      };
      if (f === featureIds.TYPE_PUBLIC || f === featureIds.TYPE_PRIVATE) {
        publicPrivate = featureLabels[f];
        if (featureItems[f].isStudentPreference) {
          isPublicPrivate = true;
          matchingPreferences++;
        }
      } else if (
        f === featureIds.SIZE_10000_TO_20000 ||
        f === featureIds.SIZE_5000_TO_10000 ||
        f === featureIds.SIZE_1000_TO_5000 ||
        f === featureIds.SIZE_UNDER_1000 ||
        f === featureIds.SIZE_ABOVE_20000
      ) {
        size = featureLabels[f];
        if (featureItems[f].isStudentPreference) {
          isSize = true;
          matchingPreferences++;
        }
      }  else if (
        f === featureIds.REGION_SOUTH ||
        f === featureIds.REGION_NORTHEAST ||
        f === featureIds.REGION_MIDWEST ||
        f === featureIds.REGION_WEST
      ) {
        region = featureLabels[f];
        if (featureItems[f].isStudentPreference) {
          isRegion = true;
          matchingPreferences++;
        }
      }
    }
  });

  if (props.major) {
    totalPreferences++;
    featureItems[props.major.id] = {
      id: props.major.id,
      label: props.major.name
    };
    if (props.majors.find(major => major.id === (props.major && props.major.id)) !== undefined) {
      hasMajor = true;
      matchingPreferences++;
    }
  }

  if (props.sat && props.satRange) {
    isWithinSATRange = false;
    totalPreferences++;
    if (props.sat >= props.satRange[0] && props.sat <= props.satRange[1]) {
      isWithinSATRange = true;
      matchingPreferences++;
    }
  }

  if (props.act && props.actRange) {
    isWithinACTRange = false;
    totalPreferences++;
    if (props.act >= props.actRange[0] && props.act <= props.actRange[1]) {
      isWithinACTRange = true;
      matchingPreferences++;
    }
  }

  if (props.meritAidGenerosity && props.meritAidGenerosityPreference) {
    isAboveMeritAidGenerosityPreference = false;
    totalPreferences++;
    if (props.meritAidGenerosity >= props.meritAidGenerosityPreference) {
      isAboveMeritAidGenerosityPreference = true;
      matchingPreferences++;
    }
  }

  if (props.needBasedAidGenerosity && props.needBasedAidGenerosityPreference) {
    isAboveNeedBasedAidGenerosityPreference = false;
    totalPreferences++;
    if (props.needBasedAidGenerosity >= props.needBasedAidGenerosityPreference) {
      isAboveNeedBasedAidGenerosityPreference = true;
      matchingPreferences++;
    }
  }

  if (props.popularInMyHighSchoolPreferenceEnabled && props.popularInMyHighSchool !== null) {
    totalPreferences++;
    if (props.popularInMyHighSchool) {
      matchingPreferences++;
    }
  }

  const aidGenerosityText = (aidGenerosity: EAidGenerosity) => aidGenerosity === EAidGenerosity.HIGH ? 'high' : aidGenerosity === EAidGenerosity.MEDIUM ? 'medium' : 'low'

  return (
    <div>
      <div className={'flex flex-column flex-wrap'}>
        <div className={'pa1 f4'}>
          <span className={'mr1'}>
            <Icon name={EIconName.Household} className={'t-large lightest-green'} />
          </span>
          <span className={'t-medium'}>
            is
            {isPublicPrivate === true ? (
              <span className={'lightest-green i'}> {publicPrivate}</span>
            ) : isPublicPrivate === false ?(
              <span className={'crimson i'}> {publicPrivate}</span>
            ) : <span className={'b'}> {publicPrivate}</span>}
          </span>
          {isPublicPrivate && (
            <Icon
              name={EIconName.Check}
              className={'t-large fr lightest-green'}
            />
          )}
          {isPublicPrivate === false && (
            <Icon name={EIconName.Close} className={'t-large fr crimson'} />
          )}
        </div>
        <div className={'pa1 f4'}>
          <span className={'mr1'}>
            <Icon name={EIconName.Profile} className={'t-large lightest-green'} />
          </span>
          <span className={'t-medium'}>
            <span>has a </span>
            {isSize === true ? (
              <span className={'lightest-green i'}> {size}</span>
            ) : isSize === false ? (
              <span className={'crimson i'}> {size}</span>
            ) : <span className={'b'}> {size}</span>}
            <span> student population</span>
            {isSize && <Icon name={EIconName.Check} className={'fr lightest-green'} />}{ isSize === false && <Icon name={EIconName.Close} className={'fr crimson'} />}
          </span>
        </div>
        {}
        {props.majors.length > 0 && (
          <div className={'pa1 f4'}>
            <span className={'mr1'}>
              <Icon name={EIconName.Academic} className={'t-large lightest-green'} />
            </span>
            <span className={'t-medium'}>
              {props.major ? (
                <span>
                  {hasMajor ? (
                    <span>
                      has{' '}
                      <span className={'t-medium lightest-green i'}>
                        {featureItems[props.major.id].label}{' '}
                      </span>
                    </span>
                  ) : (
                    <span>
                      does not have{' '}
                      <span className={'crimson i'}>{featureItems[props.major.id].label}</span>
                    </span>
                  )}
                  {hasMajor ? (
                    <Icon
                      name={EIconName.Check}
                      className={'t-medium fr lightest-green lato'}
                    />
                  ) : (
                      <Icon name={EIconName.Close} className={'fr crimson'} />
                    )}
                  <span> major</span>
                </span>
              ) : (
                <span>
                  has <span className={'t-medium i'}>{props.majors.length}</span>{' '}
                  {props.majors.length === 1 ? 'major' : 'majors'}
                </span>
              )}
            </span>
          </div>
        )}
        {props.satRange && props.satRange[0] !== 0 && (
          <div className={'pa1 f4'}>
            <span className={'mr1'}>
              <Icon name={EIconName.Article} className={'t-large lightest-green'} />
            </span>
            <span className={'t-medium'}>
              <span>has an SAT Range of</span>
              {isWithinSATRange === true ? (
                <span className={'lightest-green i'}>
                  {' '}
                  {props.satRange[0]} - {props.satRange[1]}
                </span>
              ) : isWithinSATRange === false ?
                <span className={'crimson i'}>
                  {' '}
                  {props.satRange[0]} - {props.satRange[1]}
                </span>
                :
                (
                  <span className={'b'}>
                    {' '}
                    {props.satRange[0]} - {props.satRange[1]}
                  </span>
                )}
              {isWithinSATRange && (
                <Icon name={EIconName.Check} className={'fr lightest-green'} />
              )}
              {isWithinSATRange === false && (
                <Icon name={EIconName.Close} className={'fr crimson'} />
              )}
            </span>
          </div>
        )}
        {props.actRange && props.actRange[0] !== 0 && (
          <div className={'pa1 f4'}>
            <span className={'mr1'}>
              <Icon name={EIconName.Article} className={'t-large lightest-green'} />
            </span>
            <span className={'t-medium'}>
              <span>has an ACT Range of</span>
              {isWithinACTRange === true ? (
                <span className={'lightest-green i'}>
                  {' '}
                  {props.actRange[0]} - {props.actRange[1]}
                </span>
              ) : isWithinACTRange === false ? (
                  <span className={'crimson i'}>
                    {' '}
                    {props.actRange[0]} - {props.actRange[1]}
                  </span>
                ) : (
                <span className={'b'}>
                    {' '}
                  {props.actRange[0]} - {props.actRange[1]}
                  </span>
              )}
              {isWithinACTRange && (
                <Icon name={EIconName.Check} className={'fr lightest-green'} />
              )}
              {isWithinACTRange === false && (
                <Icon name={EIconName.Close} className={'fr crimson'} />
              )}
            </span>
          </div>
        )}
        {props.firstYearEarnings && props.firstYearEarnings > 0 && (
          <div className={'pa1 f4'}>
            <span className={'mr1'}>
              <Icon name={EIconName.Upgrade} className={'t-large lightest-green'} />
            </span>
            <span className={'t-medium'}>
              <span>has estimated first-year earnings of</span>

              <span className={'lightest-green i'}>
                {' '}
                {numeral(props.firstYearEarnings).format('$0,0')}
              </span>
            </span>
          </div>
        )}
        {props.showAidGenerosity && (props.meritAidGenerosity || props.needBasedAidGenerosity) && (
          <>
            {props.meritAidGenerosity && (
              <div className={'pa1 f4'}>
                <span className={'mr1'}>
                  <Icon name={EIconName.School} className={'t-large lightest-green'} />
                </span>
                <span className={'t-medium'}>
                  <span>
                    has {isAboveMeritAidGenerosityPreference === true ? (
                      <span className={'lightest-green i'}> {aidGenerosityText(props.meritAidGenerosity)}</span>
                    ) : isAboveMeritAidGenerosityPreference === false ? (
                      <span className={'crimson i'}> {aidGenerosityText(props.meritAidGenerosity)}</span>
                    ) : <span className={'b'}> {aidGenerosityText(props.meritAidGenerosity)}</span>} merit aid generosity
                  </span>
                  {isAboveMeritAidGenerosityPreference && <Icon name={EIconName.Check} className={'fr lightest-green'} />}
                  {isAboveMeritAidGenerosityPreference === false && (
                      <Icon name={EIconName.Close} className={'fr crimson'} />
                    )}
                </span>
              </div>
            )}
            {props.needBasedAidGenerosity && (
              <div className={'pa1 f4'}>
                <span className={'mr1'}>
                  <Icon name={EIconName.School} className={'t-large lightest-green'} />
                </span>
                <span className={'t-medium'}>
                  <span>
                    has {isAboveNeedBasedAidGenerosityPreference === true ? (
                    <span className={'lightest-green i'}> {aidGenerosityText(props.needBasedAidGenerosity)}</span>
                  ) : isAboveNeedBasedAidGenerosityPreference === false ?(
                    <span className={'crimson i'}> {aidGenerosityText(props.needBasedAidGenerosity)}</span>
                  ) : <span className={'b'}> {aidGenerosityText(props.needBasedAidGenerosity)}</span>} need-based aid generosity
                  </span>
                  {isAboveNeedBasedAidGenerosityPreference && <Icon name={EIconName.Check} className={'fr lightest-green'} />}
                  {isAboveNeedBasedAidGenerosityPreference === false && (
                      <Icon name={EIconName.Close} className={'fr crimson'} />
                    )}
                </span>
              </div>
            )}
            {props.popularInMyHighSchool !== null && (
              <div className={'pa1 f4'}>
                <span className={'mr1'}>
                  <Icon name={EIconName.Household} className={'t-large lightest-green'} />
                </span>
                <span className={'t-medium'}>
                  <span>
                    is <span className={`${(props.popularInMyHighSchoolPreferenceEnabled && props.popularInMyHighSchool === false) ? 'crimson i' : 'lightest-green i'}`}>{props.popularInMyHighSchool !== false ? (
                    "popular in my high school"
                  ) : (
                    "not popular in my high school"
                  )}</span>
                  </span>
                  {props.popularInMyHighSchoolPreferenceEnabled && (props.popularInMyHighSchool ? <Icon name={EIconName.Check} className={'fr lightest-green'} /> : (
                    <Icon name={EIconName.Close} className={'fr crimson'} />
                  ))}
                </span>
              </div>
            )}
          </>
        )}
      </div>
      <div className="cb" />
    </div>
  );
};

export default CollegeFeatures;
