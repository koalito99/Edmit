import * as React from 'react';
import Modal from '../../molecules/modal';
import ProgressBar, { ESquareCorners } from '../../atoms/progress-bar';
import { hexCrimson, hexGreen, hexOrange, hexWhite } from '../../atoms/colors';
import { EIconName } from '../../atoms/icon';
import Text from '../../atoms/typography/text';
import FormFieldText from '../../atoms/form/form-field-text';
import FormFieldSelect from '../../atoms/form/form-field-select';
import FormFieldCurrency from '../../atoms/form/form-field-currency';
import FinancialGoalDimension from '../../organisms/dimension-financial-goal';
import SteppedWizardWrapper, { ESteppedWizardStepVisibleState } from '../wrapper-stepped-wizard-registration';
import FormFieldToggle from '../../atoms/form/form-field-toggle';
import { ProfileCompletionCard } from './card';
import Button, { EButtonSize, EButtonType, EButtonIconPosition } from '../../atoms/button';
import { ConnectedSearchHighSchoolsProps, ISearchHighSchoolOption } from '../../molecules/search-high-schools'
import ProgressNav from "../../molecules/progress-nav";
import { EPersonType } from '../../../shared'

export enum EProfileStep {
  HighSchool,
  Academic,
  Household,
  Major
}

export interface IProfileCompletionModalViewModel {
  isOpen: boolean;
  profileStep: EProfileStep;
  highSchoolSearchComponent: (props: Partial<ConnectedSearchHighSchoolsProps>) => JSX.Element;
  majors: Array<{ id: string; name: string }>;
  graduationYears: number[];
  initialValues: AllValues;
  accountType: EPersonType;
}

type AllValues = IHighSchoolFormFields &
  IAcademicFormFields &
  IHouseholdFormFields &
  IMajorFormFields;

export interface IProfileCompletionModalActions {
  onContinue: () => void;
  onPrevious: () => void;
  onJumpToStep: (profileStep: EProfileStep) => void;
  onSubmit: (values: Partial<AllValues>, initialValues: Partial<AllValues>) => Promise<void>;
  onClose: () => void;
}

type ProfileCompletionModalProps = IProfileCompletionModalViewModel &
  IProfileCompletionModalActions;

interface IHighSchoolFormFields {
  graduationYear: number | null;
  highSchool: ISearchHighSchoolOption | null;
}

interface IAcademicFormFields {
  gpaScore: string | null;
  isWeighted: boolean;
  weightedMaximum: string | null;
}

interface IHouseholdFormFields {
  householdIncome: number | null;
  savings: number | null;
  annualCashContribution: number | null;
}

interface IMajorFormFields {
  majorId: string | null;
}

const ProfileCompletionModal = (props: ProfileCompletionModalProps) => {
  let continueText = '';
  let progressAmount = 0;

  switch (props.profileStep) {
    case EProfileStep.HighSchool:
      progressAmount = 25;
      continueText = 'Next: Academic';
      break;
    case EProfileStep.Academic:
      progressAmount = 50;
      continueText = 'Next: Household';
      break;
    case EProfileStep.Household:
      progressAmount = 75;
      continueText = 'Next: Major';
      break;
    case EProfileStep.Major:
      progressAmount = 100;
      continueText = 'Complete';
      break;
    default:
      break;
  }

  const highSchoolCard = (visibleState: ESteppedWizardStepVisibleState) => (
    <ProfileCompletionCard<IHighSchoolFormFields & { highSchoolSearchQuery: string }>
      visibleState={visibleState}
      initialValues={{
        graduationYear: props.initialValues.graduationYear,
        highSchool: props.initialValues.highSchool,
        highSchoolSearchQuery: ''
      }}
      onSave={props.onSubmit}
    >
      {({ values, setFieldValue }) => (
        <>
          <div className="w-100 mb4">
            <FormFieldSelect
              name={'grad-year-hs'}
              label={`High School Graduation Year`}
              value={(values.graduationYear && values.graduationYear.toString()) || 'default'}
              required={false}
              onSelect={value =>
                setFieldValue(
                  'graduationYear',
                  value === 'default' ? null : parseInt(value, undefined)
                )
              }
            >
              <option selected={true} key={-1} value={'default'}>
                Not Set
              </option>
              {props.graduationYears.map(gradYear => (
                <option selected={false} key={gradYear} value={'' + gradYear}>
                  {gradYear}
                </option>
              ))}
            </FormFieldSelect>
          </div>
          <div className="w-100 mb4">
            <Text className="mv0 fw7 t-medium black">High School</Text>
            <div className="form-field">
              {
                <props.highSchoolSearchComponent
                  inputValue={values.highSchoolSearchQuery}
                  onSearch={inputValue => setFieldValue('highSchoolSearchQuery', inputValue)}
                  onSelected={highSchool => setFieldValue('highSchool', highSchool)}
                  selected={values.highSchool || undefined}
                />
              }
            </div>
          </div>
        </>
      )}
    </ProfileCompletionCard>
  );

  const academicCard = (visibleState: ESteppedWizardStepVisibleState) => (
    <ProfileCompletionCard<IAcademicFormFields>
      visibleState={visibleState}
      initialValues={{
        gpaScore: props.initialValues.gpaScore,
        isWeighted: props.initialValues.isWeighted,
        weightedMaximum: props.initialValues.weightedMaximum
      }}
      onSave={props.onSubmit}
    >
      {({ values, setFieldValue, setFieldTouched, errors, touched }) => (
        <>
          <div className="w-100 mb4">
            <FormFieldText
              name={'gpa-score'}
              label={'GPA'}
              // value={mainForm.values.gradePointAverage || ''}
              value={values.gpaScore || ''}
              required={false}
              errorMessage={(touched.gpaScore && errors.gpaScore) || undefined}
              onChange={value => {
                setFieldValue('gpaScore', value);
                setFieldTouched('gpaScore');
              }}
              onBlur={() => setFieldTouched('gpaScore')}
            />
          </div>
          <div className="w-100 mb4">
            <FormFieldToggle
              name={'gpa-weighted'}
              label={'Is your GPA weighted or unweighted?'}
              checked={!values.isWeighted}
              optionLeftLabel={'Weighted'}
              optionRightLabel={'Unweighted'}
              onClick={() => setFieldValue('isWeighted', !values.isWeighted)}
            />
          </div>
          {values.isWeighted && (
            <div className="w-100 mb4">
              <FormFieldText
                name={'gpa-score-weighted-total'}
                label={'Out of how much?'}
                value={values.weightedMaximum || ''}
                required={true}
                errorMessage={(touched.weightedMaximum && errors.weightedMaximum) || undefined}
                onChange={value => {
                  setFieldValue('weightedMaximum', value);
                  setFieldTouched('weightedMaximum');
                }}
                onBlur={() => setFieldTouched('weightedMaximum')}
              />
            </div>
          )}
        </>
      )}
    </ProfileCompletionCard>
  );

  const householdCard = (visibleState: ESteppedWizardStepVisibleState) => {
    const yearsInCollege = 4;
    const arbitraryCostOfAttendance = 50000;

    const maxAnnualCash = arbitraryCostOfAttendance;
    const maxSavings = arbitraryCostOfAttendance * yearsInCollege;

    return (
      <ProfileCompletionCard<IHouseholdFormFields>
        visibleState={visibleState}
        initialValues={{
          annualCashContribution: props.initialValues.annualCashContribution,
          householdIncome: props.initialValues.householdIncome,
          savings: props.initialValues.savings
        }}
        onSave={props.onSubmit}
      >
        {({ values, setFieldValue, setFieldTouched, errors, touched }) => (
          <>
            <Text className="tc t-medium">
              We assume HHI based on zip code. Feel free to change it below to get a more accurate
              measurement.
            </Text>
            <div className="w-100 mb4">
              <FormFieldCurrency
                name={'household-income'}
                label={'Household Income'}
                value={values.householdIncome || undefined}
                required={false}
                errorMessage={(touched.householdIncome && errors.householdIncome) || undefined}
                onChange={value => {
                  setFieldValue('householdIncome', value);
                  setFieldTouched('householdIncome');
                }}
                onBlur={() => setFieldTouched('householdIncome')}
              />
            </div>
            <Text className="tc t-medium">
              {props.accountType === EPersonType.PARENT
                ? `Do you plan to contribute? And if so, how much?`
                : `Do your parents plan to contribute? And if so, how much?`}
            </Text>
            <div className="w-100 mb4">
              <FinancialGoalDimension
                color={hexOrange}
                title={`Savings`}
                description={`This includes your savings to date plus the estimated savings increase during the student's studies.`}
                value={values.savings || 0}
                sliderValue={((values.savings || 0) / maxSavings) * 100}
                onChange={value => {
                  setFieldValue('savings', value);
                  setFieldTouched('savings');
                }}
                onChangeSlider={value => {
                  setFieldValue('savings', (value / 100) * maxSavings);
                }}
                onBlur={() => setFieldTouched('savings')}
                onBlurSlider={() => setFieldTouched('savings')}
                loading={false}
              />
            </div>
            <div className="w-100 mb4">
              <FinancialGoalDimension
                color={hexGreen}
                title={`Annual Cash Contribution`}
                description={`Additional cash contributions.`}
                value={values.annualCashContribution || 0}
                sliderValue={((values.annualCashContribution || 0) / maxAnnualCash) * 100}
                onChange={value => {
                  setFieldValue('annualCashContribution', value);
                  setFieldTouched('annualCashContribution');
                }}
                onChangeSlider={value => {
                  setFieldValue('annualCashContribution', (value / 100) * maxAnnualCash);
                }}
                onBlur={() => setFieldTouched('annualCashContribution')}
                onBlurSlider={() => setFieldTouched('annualCashContribution')}
                loading={false}
              />
            </div>
          </>
        )}
      </ProfileCompletionCard>
    );
  };

  const majorCard = (visibleState: ESteppedWizardStepVisibleState) => (
    <ProfileCompletionCard<IMajorFormFields>
      visibleState={visibleState}
      initialValues={{
        majorId: props.initialValues.majorId
      }}
      onSave={props.onSubmit}
      className="form-field mb4"
    >
      {({ values, setFieldValue }) => (
        <>
          <FormFieldSelect
            name={'major-id'}
            label={
              props.accountType === EPersonType.STUDENT
                ? `What’s your intended college major or field of study?`
                : `What’s your student’s intended college major or field of study?`
            }
            value={values.majorId || undefined}
            required={false}
            onSelect={value => setFieldValue('majorId', value)}
          >
            <option>All majors</option>
            {props.majors.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map(major => (
              <option selected={major.id === values.majorId} key={major.id} value={major.id}>
                {major.name}
              </option>
            ))}
          </FormFieldSelect>
        </>
      )}
    </ProfileCompletionCard>
  );

  return (
    <Modal maxWidth={560} onClose={props.onClose} onClickOut={props.onClose} isOpen={props.isOpen}>
      <ProgressBar
        height={8}
        progressAmount={progressAmount}
        barColor={hexCrimson}
        backgroundBarColor={hexWhite}
        squareCorners={ESquareCorners.Bottom}
      />
      <div className="bg-white tc">
        <div className={'mh3 mh3-ns mt4 mb4'}>
          <ProgressNav<EProfileStep> steps={[{
            iconName: EIconName.HighSchool,
            step: [EProfileStep.HighSchool]
          },
          {
            iconName: EIconName.Academic,
            step: [EProfileStep.Academic]
          },
          {
            iconName: EIconName.Household,
            step: [EProfileStep.Household]
          },
          {
            iconName: EIconName.Major,
            step: [EProfileStep.Major]
          }]} activeStep={props.profileStep} />
        </div>
        <SteppedWizardWrapper<EProfileStep>
          activeStep={props.profileStep}
          // order={[EProfileStep.HighSchool, EProfileStep.Academic, EProfileStep.Household, EProfileStep.Major]}
          steps={[
            {
              render: ({ visibleState }) => highSchoolCard(visibleState),
              step: EProfileStep.HighSchool
            },
            {
              render: ({ visibleState }) => academicCard(visibleState),
              step: EProfileStep.Academic
            },
            {
              render: ({ visibleState }) => householdCard(visibleState),
              step: EProfileStep.Household
            },
            {
              render: ({ visibleState }) => majorCard(visibleState),
              step: EProfileStep.Major
            }
          ]}
        >
          {({ wizardComponent, saveCurrentData }) => (
            <div style={{ overflow: 'hidden' }}>
              {wizardComponent}
              <div className="pa3 ph4-ns flex flex-row items-center justify-between bg-offwhite br1 br-bottom bt b--gray-light">
                {props.profileStep !== EProfileStep.HighSchool ? (
                  <Button
                    size={EButtonSize.Medium}
                    type={EButtonType.Secondary}
                    text={'Go Back'}
                    icon={{
                      name: EIconName.ChevronLeft,
                      position: EButtonIconPosition.Left
                    }}
                    onClick={props.onPrevious}
                  />
                ) : (
                    <div />
                  )}
                <Button
                  size={EButtonSize.Medium}
                  type={EButtonType.Primary}
                  text={continueText}
                  icon={{
                    name: EIconName.ChevronRight,
                    position: EButtonIconPosition.Right
                  }}
                  onClick={async () => {
                    await saveCurrentData();

                    if (props.profileStep !== EProfileStep.Major) {
                      props.onContinue();
                    } else {
                      props.onClose();
                    }
                  }}
                />
              </div>
            </div>
          )}
        </SteppedWizardWrapper>
      </div>
    </Modal>
  );
};

export default ProfileCompletionModal;
