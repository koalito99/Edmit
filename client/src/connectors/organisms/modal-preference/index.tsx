import * as React from 'react';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import LoadingText, { ELoadingTextSize } from '@edmit/component-library/src/components/atoms/loading/text';
import Modal from '@edmit/component-library/src/components/molecules/modal';
import MultiSelectButtonGroup from '@edmit/component-library/src/components/molecules/multiselect-button-group';
import { EButtonSize } from '@edmit/component-library/src/components/atoms/button';
import FormFieldSelect from '@edmit/component-library/src/components/atoms/form/form-field-select';
import { uniq } from 'lodash-es';
import { useMajors, useProfile, useUpdateProfile } from '../../../components/pages/report/shared';
import FormSubmit, { ESubmitState } from '@edmit/component-library/src/components/atoms/form/form-submit';
import { featureIds } from "@edmit/component-library/src/shared/features";
import FormFieldNumber from '@edmit/component-library/src/components/atoms/form/form-field-number';
import FormFieldText from '@edmit/component-library/src/components/atoms/form/form-field-text';
import ConnectedSearchHighSchools from "../../../connectors/molecules/search-high-schools";
import {commonValidations} from "@edmit/component-library/src/lib/forms";
import {ISearchHighSchoolOption} from "@edmit/component-library/src/components/molecules/search-high-schools";

export interface IPreferenceModalViewModel {
  setPreferenceActive: boolean;
  studentId: string;
  loading: boolean;
}

export interface IPreferenceModalActions {
  onStopEditing: () => void;
}

type PreferenceModalModalProps = IPreferenceModalViewModel & IPreferenceModalActions;

const usePreferenceModal = (studentId: string) => {
  const updateProfileMutation = useUpdateProfile();
  const { data: studentData, loading: studentLoading } = useProfile(studentId);
  const { data: majorsData, loading: majorsLoading } = useMajors();

  const [selectedMajor, setSelectedMajor] = React.useState<string | null>(null);
  const [highSchoolQuery, setHighSchoolQuery] = React.useState<string>('');
  const [selectedHighSchool, setSelectedHighSchool] = React.useState<ISearchHighSchoolOption | null>(null);
  const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>([]);
  const [saving, setSaving] = React.useState(false);
  const [satScore, setSatScore] = React.useState<number | null>(null);
  const [actScore, setActScore] = React.useState<number | null>(null);
  const [psatScore, setPsatScore] = React.useState<number | null>(null);
  const [gpa, setGpa] = React.useState('');

  React.useEffect(() => {
    if (studentData && studentData.student) {
      const {
        major: initialMajor,
        preferences,
        highSchool: initialHighSchool,
        gradePointAverage: initialGpa,
        satScore: initialSatScore,
        actScore: initialActScore,
        psatScore: initialPsatScore
      } = studentData.student;

      const initialSelectedPreferences = preferences
        ? preferences.filter(p => p && p.value === 1).map(p => p && p.id)
        : [];

      setSelectedFeatures(initialSelectedPreferences);
      setSelectedMajor(initialMajor && initialMajor.id);
      setSelectedHighSchool(initialHighSchool && { ...initialHighSchool, zipCode: initialHighSchool.postalCode.postalCode });
      setGpa(initialGpa.value || '');
      setSatScore(initialSatScore.value);
      setPsatScore(initialPsatScore.value);
      setActScore(initialActScore.value)
    }
  }, [studentData]);

  const majors = majorsData ? majorsData.majors : [];
  const loading = majorsLoading || studentLoading;

  const save = async () => {
    setSaving(true);
    await updateProfileMutation.mutate({
      data: {
        highSchoolId: selectedHighSchool && selectedHighSchool.id,
        majorId: selectedMajor,
        preferences: Object.keys(featureIds).map(k => ({
          id: featureIds[k],
          value: featureSelected(featureIds[k]) ? 1 : 0
        })),
        actScore: {
          value: actScore
        },
        gradePointAverage: {
          value: gpa
        },
        satScore: {
          value: satScore
        },
        psatScore: {
          value: psatScore
        }
      }
    });
    setSaving(false);
  };

  const setFeatureSelected = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedFeatures(uniq([...selectedFeatures, id]));
    } else {
      setSelectedFeatures(selectedFeatures.filter(f => f !== id));
    }
  };

  const featureSelected = (id: string) => selectedFeatures.indexOf(id) > -1;

  const regions = [
    {
      id: featureIds.REGION_MIDWEST,
      label: 'Midwest'
    },
    {
      id: featureIds.REGION_NORTHEAST,
      label: 'Northeast'
    },
    {
      id: featureIds.REGION_SOUTH,
      label: 'South'
    },
    {
      id: featureIds.REGION_WEST,
      label: 'West'
    }
  ];

  const sizes = [
    {
      id: featureIds.SIZE_UNDER_1000,
      label: 'Under 1000 students'
    },
    {
      id: featureIds.SIZE_1000_TO_5000,
      label: '1,000 to 5,000'
    },
    {
      id: featureIds.SIZE_5000_TO_10000,
      label: '5,000 to 10,000'
    },
    {
      id: featureIds.SIZE_10000_TO_20000,
      label: '10,000 to 20,000'
    },
    {
      id: featureIds.SIZE_ABOVE_20000,
      label: 'Above 20,000 students'
    },
  ];

  const types = [
    {
      id: featureIds.TYPE_PUBLIC,
      label: 'Public'
    },
    {
      id: featureIds.TYPE_PRIVATE,
      label: 'Private'
    }
  ];

  const features = {
    regions,
    sizes,
    types
  };

  return {
    actScore,
    featureSelected,
    features,
    gpa,
    loading,
    majors,
    psatScore,
    satScore,
    save,
    saving,
    selectedMajor,
    selectedHighSchool,
    setActScore,
    setFeatureSelected,
    setGpa,
    setPsatScore,
    setSatScore,
    setSelectedMajor,
    setSelectedHighSchool,
    highSchoolQuery,
    setHighSchoolQuery
  };
};

const PreferenceModal = (props: PreferenceModalModalProps) => {
  const {
    features,
    featureSelected,
    loading,
    majors,
    gpa,
    actScore,
    satScore,
    psatScore,
    save,
    saving,
    setFeatureSelected,
    setSelectedMajor,
    selectedMajor,
    highSchoolQuery,
    selectedHighSchool,
    setGpa,
    setActScore,
    setSatScore,
    setPsatScore,
    setSelectedHighSchool,
    setHighSchoolQuery
  } = usePreferenceModal(props.studentId);

  const selectedButtonClassName =
    'bg-green-success hover-bg-green-success white hover-white b--green-success hover-b--green-success mr4';
  const buttonClassName = 'mr4';

  const saveAndClose = async () => {
    await save();
    props.onStopEditing();
    window.location.reload();
  };

  return (
    <div
      className="fixed dib w-80 w-60-l"
      style={{
        top: 0,
        transform: `translateY(${props.setPreferenceActive ? '96px' : 'calc(-100% - 1px)'})`,
        transition: 'transform 400ms ease-in-out 0s',
        zIndex: 997
      }}
    >
      {loading ? (
        <Modal
          maxWidth={760}
          onClose={props.onStopEditing}
          onClickOut={props.onStopEditing}
          isOpen={props.setPreferenceActive}
        >
          <div className="pa4">
            <div className="flex flex-column flex-row-ns">
              <div className="mb4 mb0-ns mr4-ns nt3 w-100 w-50-ns">
                <LoadingText size={ELoadingTextSize.H3} width={80} />
              </div>
              <div className="ml4-ns pt2 w-100 w-50-ns">
                <LoadingText width={50} />
                <div className="nb3">
                  <LoadingText size={ELoadingTextSize.H3} width={100} />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
          <Modal
            maxWidth={760}
            onClose={props.onStopEditing}
            onClickOut={props.onStopEditing}
            isOpen={props.setPreferenceActive}
          >
            <div>
              <div className="flex flex-column flex-row-ns white bg-green-success">
                <div className="w-50 ma-auto">
                  <Heading
                    size={EHeadingSize.H4}
                    text={'Update your college preferences'}
                    className="white mt0 mb3 pt3 tc"
                  />
                </div>
              </div>
              <div className="pt2 w-80 ma-auto">
                <Text className={'i t-medium tc'}>What regions are you considering?</Text>
              </div>

              <div className="pv3 b--light-gray tr ph3 tc bb b--light-gray">
                <MultiSelectButtonGroup>
                  {features.regions.map(region => ({
                    className: buttonClassName,
                    onClick: () => setFeatureSelected(region.id, !featureSelected(region.id)),
                    selected: featureSelected(region.id),
                    selectedClassName: selectedButtonClassName,
                    text: region.label
                  }))}
                </MultiSelectButtonGroup>
              </div>

              <div className="pv3 b--light-gray tr ph3 tc bb b--light-gray">
                <Text className={'t-medium tc mb2'}>
                  Do you want a small college or a larger one?
              </Text>
                <MultiSelectButtonGroup>
                  {features.sizes.map(size => ({
                    className: buttonClassName,
                    onClick: () => setFeatureSelected(size.id, !featureSelected(size.id)),
                    selected: featureSelected(size.id),
                    selectedClassName: selectedButtonClassName,
                    text: size.label
                  }))}
                </MultiSelectButtonGroup>
              </div>

              <div className="pv3 b--light-gray tr ph3 tc bb b--light-gray">
                <Text className={'t-medium tc mb2'}>
                  Do you have a preference for public or private?
              </Text>
                <MultiSelectButtonGroup>
                  {features.types.map(type => ({
                    className: buttonClassName,
                    onClick: () => setFeatureSelected(type.id, !featureSelected(type.id)),
                    selected: featureSelected(type.id),
                    selectedClassName: selectedButtonClassName,
                    text: type.label
                  }))}
                </MultiSelectButtonGroup>
              </div>

              {majors && (
                <div className="pv3 b--light-gray tr ph3 tc bb b--light-gray">
                  <Text className={'t-medium tc mb2 pb2 b--light-gray'}>
                    Do you know what you want to study?
                </Text>
                  <div className={'w-20 ma-auto'}>
                    <Text className={'t-medium i tc'}>
                      It's ok if you don't.
                </Text>
                    <FormFieldSelect
                      value={selectedMajor || undefined}
                      onSelect={(id: string) => setSelectedMajor(id)}
                      required={false}
                    >
                      {majors.map(m => {
                        return (
                          <option key={m.id} value={m.id}>
                            {m.name}
                          </option>
                        );
                      })}
                    </FormFieldSelect>
                  </div>
                </div>
              )}

              <div className="pv3 b--light-gray tr ph3 tc bb b--light-gray">
                <Text className={'t-medium tc mb2 pb2 b--light-gray'}>
                  Where did you go to High School?
                </Text>
                <div className={'w-100 ma-auto w-100-l flex flex-column items-center'}>
                  <Text className={'t-medium i tc'}>
                      Let's see if a college is popular at your high school
                  </Text>
                  <div className="form-field w-30-l">
                    <ConnectedSearchHighSchools inputValue={highSchoolQuery} onSearch={setHighSchoolQuery} selected={selectedHighSchool || undefined} onSelected={value => setSelectedHighSchool(value)} />
                  </div>
                </div>
              </div>

              <div className="pv3 ph3 ph5-l b--light-gray bb b--light-gray">
                <Text className={'t-medium tc mb2 pb2 b--light-gray'}>
                  Here's the GPA and test scores you entered when you signed up. Are these still accurate?
                </Text>
                <div className={'w-100 ma-auto'}>
                  <Text className={'t-medium i tc'}>
                      You can always update these in your profile later
                  </Text>
                        <div className="w-100-l">
                          <div className="flex flex-row flex-wrap nl3 nr3">
                            <div className="w-100 w-50-ns pa3">
                              <FormFieldText
                                name={'gpa-score'}
                                label={'GPA'}
                                value={gpa || ''}
                                required={false}
                                onChange={value => setGpa(value)}
                                // FIXME: onBlur={() => mainForm.setFieldTouched('gradePointAverage')}
                              />
                            </div>
                            <div className="w-100 w-50-ns pa3">
                              <FormFieldNumber
                                name={'act-score'}
                                label={'ACT'}
                                value={actScore || undefined}
                                required={false}
                                errorMessage={commonValidations.act('actScore')({ actScore }, {}).actScore}
                                onChange={value => setActScore(value)}
                                // FIXME: onBlur={() => mainForm.setFieldTouched('actScore')}
                              />
                            </div>
                            <div className="w-100 w-50-ns pa3">
                              <FormFieldNumber
                                name={'sat-score'}
                                label={'SAT'}
                                value={satScore || undefined}
                                required={false}
                                errorMessage={commonValidations.sat('satScore')({ satScore }, {}).satScore}
                                onChange={value => setSatScore(value)}
                                // FIXME: onBlur={() => mainForm.setFieldTouched('satScore')}
                              />
                            </div>
                            <div className="w-100 w-50-ns pa3">
                              <FormFieldNumber
                                name={'psat-score'}
                                label={'PSAT'}
                                value={psatScore || undefined}
                                required={false}
                                errorMessage={commonValidations.psat('psatScore')({ psatScore }, {}).psatScore}
                                onChange={value => setPsatScore(value)}
                                // FIXME: onBlur={() => mainForm.setFieldTouched('psatScore')}
                              />
                            </div>
                          </div>
                        </div>
                </div>
              </div>

              <div className="pv3 b--light-gray tr ph3 bb b--light-gray">
                <FormSubmit
                  submitState={saving ? ESubmitState.Submitted : ESubmitState.Default}
                  defaultText={'Save'}
                  onClick={() => saveAndClose()}
                  disabled={saving || loading}
                  submittedText={'Save'}
                  succeededText={'Save'}
                  failedText={'Save'}
                  buttonSize={EButtonSize.Large}
                />
              </div>
            </div>
          </Modal>
        )}
    </div>
  );
};

export default PreferenceModal;
