import * as React from 'react';
import { scrollSpy } from 'react-scroll';
import { Formik } from 'formik';

import PageContainer from '@edmit/component-library/src/components/atoms/page-container';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import Text, { ETextType } from '@edmit/component-library/src/components/atoms/typography/text';
import Card from '@edmit/component-library/src/components/atoms/card';
import Avatar, { EAvatarSize, EAvatarTheme, EAvatarType } from '@edmit/component-library/src/components/atoms/avatar';
import Button, { EButtonSize, EButtonType } from '@edmit/component-library/src/components/atoms/button';
import FormFieldText from '@edmit/component-library/src/components/atoms/form/form-field-text';
import FormFieldCurrency from '@edmit/component-library/src/components/atoms/form/form-field-currency';
import FormFieldToggle from '@edmit/component-library/src/components/atoms/form/form-field-toggle';
import FormSubmit, { ESubmitState } from '@edmit/component-library/src/components/atoms/form/form-submit';
import LoadingText, { ELoadingTextSize, ELoadingTextTheme } from '@edmit/component-library/src/components/atoms/loading/text';
import FormFieldNumber from '@edmit/component-library/src/components/atoms/form/form-field-number';
import FormFieldSelect from '@edmit/component-library/src/components/atoms/form/form-field-select';
import { StickyContainer } from 'react-sticky';
import Icon, { EIconName } from '@edmit/component-library/src/components/atoms/icon';
import { ISearchHighSchoolOption } from '@edmit/component-library/src/components/molecules/search-high-schools';
import { ISearchZipCodesOption } from '@edmit/component-library/src/components/molecules/search-zip-codes';
import TextLink from "@edmit/component-library/src/components/atoms/link-text";
import { EPersonType } from '@edmit/component-library/src/shared'
import { ProfileACCField, ProfileGPAToggle, ProfileGPAFieldW, ProfileACTField, ProfileSaveButton, ProfileSATField, ProfilePSATField, ProfileHHIField, ProfileSavingsField, ProfileEFCField, ProfileASWField, ProfileScholarshipsField, ProfileGPAFieldUW } from '../../../testIds/ids';

export interface IProfilePageViewModel {
  selectedHighSchool: ISearchHighSchoolOption | null;
  selectedZipCode: ISearchZipCodesOption | null;

  personType: EPersonType;
  majors: Array<{ name: string; id: string }>;
  values: {
    firstName: string;
    lastName: string;
    gradePointAverage: string | null;
    actScore: number | null;
    satScore: number | null;
    psatScore: number | null;
    householdIncome: number | null;
    efc: number | null;

    collegeSavingsPlanAmount: number | null;
    cashContributionAmount: number | null;
    otherScholarshipsAmount: number | null;
    workStudyAmount: number | null;

    majorId: string | null;
    postalCodeId: string | null;
    highSchoolId: string | null;
    graduationYear: number | null;
    weightedMaximum: string | null;
    isWeighted: boolean;
  };
  savePasswordState: ESubmitState;

  searchHighSchoolsComponent: JSX.Element;
  searchZipCodesComponent: JSX.Element;

  edmitPlusUser: boolean;
  loading: boolean;
}

export interface IProfilePageActions {
  onUpdateProfile: (values: IProfilePageViewModel['values']) => void;
  onSavePassword: (password: string) => void;
  onUpgrade: () => void;
}

type ProfilePageProps = IProfilePageViewModel & IProfilePageActions;

class ProfilePage extends React.Component<ProfilePageProps> {
  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    const graduationYears = [2019, 2020]
    return (
      <PageContainer>
        <div className="bg-crimson white br2 w-100 pa3 mb4">
          <div className="pv3 tc">
            <Avatar
              type={EAvatarType.User}
              theme={EAvatarTheme.CrimsonDark}
              size={EAvatarSize.Medium}
              initials={`${this.props.values.firstName.charAt(
                0
              )}${this.props.values.lastName.charAt(0)}`}
              loading={this.props.loading}
            />
            {this.props.loading ? (
              <div className="w-40 center nb3">
                <LoadingText
                  theme={ELoadingTextTheme.Dark}
                  size={ELoadingTextSize.H2}
                  width={100}
                />
              </div>
            ) : (
                <>
                  <Heading
                    size={EHeadingSize.H3}
                    text={this.props.values.firstName + ' ' + this.props.values.lastName}
                    className="white mt3 mb0"
                  />
                </>
              )}
          </div>
        </div>
        {/* <div>
        {this.props.loading === false &&
          this.props.profileCompletion &&
          !this.props.profileCompleteStepsAreDismissed && (
            <CompleteProfileCard
              profileProgress={this.props.profileProgress}
              values={this.props.profileCompletion}
              activeFieldIndex={this.props.activeProfileCompleteFieldIndex}
              onContinue={this.props.onProfileCompleteContinue}
              onDismiss={this.props.onProfileCompleteDismiss}
              onSkip={this.props.onProfileCompleteSkip}
            />
          )}
      </div> */}
        {this.props.loading ? (
          <span className="w-100 flex flex-row">
            <div className="w-100">
              <div className="pt5 nt5" id="profile">
                <Card className="pa3 pa4-l">
                  <LoadingText size={ELoadingTextSize.H3} width={20} />
                  <div className="mv4">
                    <div className="flex flex-row flex-wrap nl3 nr3">
                      <div className="w-100 w-50-ns pa3">
                        <LoadingText width={30} />
                        <LoadingText size={ELoadingTextSize.H3} width={100} />
                      </div>
                      <div className="w-100 w-50-ns pa3">
                        <LoadingText width={30} />
                        <LoadingText size={ELoadingTextSize.H3} width={100} />
                      </div>
                      <div className="w-100 w-50-ns pa3">
                        <div className="form-field">
                          <LoadingText width={60} />
                          <LoadingText size={ELoadingTextSize.H3} width={100} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mv5">
                    <LoadingText width={20} />
                    <div className="flex flex-row flex-wrap nl3 nr3">
                      <div className="w-100 w-50-ns pa3">
                        <LoadingText width={10} />
                        <LoadingText size={ELoadingTextSize.H3} width={100} />
                        <LoadingText width={90} />
                      </div>
                      <div className="w-100 w-50-ns pa3">
                        <LoadingText width={10} />
                        <LoadingText size={ELoadingTextSize.H3} width={100} />
                      </div>
                      <div className="w-100 w-50-ns pa3">
                        <LoadingText width={10} />
                        <LoadingText size={ELoadingTextSize.H3} width={100} />
                      </div>
                      <div className="w-100 w-50-ns pa3">
                        <LoadingText width={10} />
                        <LoadingText size={ELoadingTextSize.H3} width={100} />
                      </div>
                    </div>
                  </div>
                  <div className="mv5">
                    <LoadingText width={20} />
                    <div className="flex flex-row flex-wrap nl3 nr3">
                      <div className="w-100 w-50-ns pa3">
                        <LoadingText width={10} />
                        <LoadingText size={ELoadingTextSize.H3} width={100} />
                        <LoadingText width={60} />
                      </div>
                      <div className="w-100 w-50-ns pa3">
                        <LoadingText width={10} />
                        <LoadingText size={ELoadingTextSize.H3} width={100} />
                      </div>
                      <div className="w-100 w-50-ns pa3">
                        <LoadingText width={10} />
                        <LoadingText size={ELoadingTextSize.H3} width={100} />
                        <LoadingText width={90} />
                      </div>
                    </div>
                  </div>
                  <div className="mv4">
                    <LoadingText width={20} />
                    <div className="flex flex-row flex-wrap nl3 nr3">
                      <div className="w-100 w-50-ns pa3">
                        <LoadingText width={10} />
                        <LoadingText size={ELoadingTextSize.H3} width={100} />
                      </div>
                      <div className="w-100 w-50-ns pa3">
                        <LoadingText width={10} />
                        <LoadingText size={ELoadingTextSize.H3} width={100} />
                      </div>
                    </div>
                  </div>
                  <LoadingText size={ELoadingTextSize.H3} width={30} />
                </Card>
              </div>
              <div className="pt5" id="account">
                <Card className="pa3 pa4-l">
                  <LoadingText size={ELoadingTextSize.H3} width={20} />
                  <div className="mv4">
                    <LoadingText width={10} />
                    <LoadingText size={ELoadingTextSize.H3} width={100} />
                  </div>
                  <LoadingText size={ELoadingTextSize.H3} width={30} />
                </Card>
              </div>
            </div>
          </span>
        ) : (
            <Formik<{
              collegeSavingsPlanAmount: number | null;
              cashContributionAmount: number | null;
              workStudyAmount: number | null;
              otherScholarshipsAmount: number | null;
              efc: number | null;
              firstName: string;
              lastName: string;
              gradePointAverage: string | null;
              actScore: number | null;
              satScore: number | null;
              psatScore: number | null;
              householdIncome: number | null;
              majorId: string | null;
              highSchoolId: string | null;
              postalCodeId: string | null;
              graduationYear: number | null;
              weightedMaximum: string | null;
              isWeighted: boolean;
            }>
              validate={values => {
                const errors: { [P in keyof typeof values]?: string } = {};
                if (values.satScore != null) {
                  if (values.satScore % 10 !== 0) {
                    errors.satScore = 'SAT score must be a multiple of 10';
                  }
                  if (values.satScore > 1600) {
                    errors.satScore = 'SAT Score cannot exceed 1600.';
                  }

                  if (values.satScore < 400) {
                    errors.satScore = 'SAT Score cannot be below 400.';
                  }
                }

                if (values.psatScore != null) {
                  if (values.psatScore % 10 !== 0) {
                    errors.psatScore = 'PSAT score must be a multiple of 10';
                  }
                  if (values.psatScore > 1520) {
                    errors.psatScore = 'PSAT Score cannot exceed 1520.';
                  }

                  if (values.psatScore < 320) {
                    errors.psatScore = 'PSAT Score cannot be below 320.';
                  }
                }

                if (values.actScore != null) {
                  if (values.actScore < 10) {
                    errors.actScore = 'ACT Score cannot be below 10.';
                  }

                  if (values.actScore > 36) {
                    errors.actScore = 'ACT Score cannot exceed 36.';
                  }
                }

                if (!values.firstName.match(/^[a-zA-Z\s'.-]+$/)) {
                  errors.firstName = 'First name can only consist of text.';
                }

                if (!values.lastName.match(/^[a-zA-Z\s'.-]+$/)) {
                  errors.lastName = 'Last name can only consist of text.';
                }

                if (values.majorId === '-1') {
                  values.majorId = null
                }

                return errors;
              }}
              enableReinitialize
              initialValues={this.props.values}
              onSubmit={async (submitValues, { setSubmitting }) => {
                setSubmitting(true);
                await this.props.onUpdateProfile({
                  ...submitValues,
                  highSchoolId: this.props.selectedHighSchool
                    ? this.props.selectedHighSchool.id || null
                    : null,
                  postalCodeId: this.props.selectedZipCode
                    ? this.props.selectedZipCode.id || null
                    : null,
                });
                setSubmitting(false);
              }}
              render={mainForm => {
                return (
                  <StickyContainer className="flex flex-row">
                    <div className="w-100">
                      <div className="pt5 nt5" id="profile">
                        <Card className="pa3 pa4-l">
                          <Heading size={EHeadingSize.H3} text={'Profile'} className="mv0" />
                          <div className="mv4">
                            <div className="mb3 flex flex-row flex-wrap nl3 nr3">
                              <div className="w-100 w-50-ns pa3">
                                <FormFieldText
                                  name={'first-name'}
                                  label={'First Name'}
                                  value={mainForm.values.firstName}
                                  required={false}
                                  errorMessage={mainForm.errors.firstName}
                                  onChange={value => mainForm.setFieldValue('firstName', value)}
                                  onBlur={() => mainForm.setFieldTouched('firstName')}
                                  clearDisabled
                                />
                              </div>
                              <div className="w-100 w-50-ns pa3">
                                <FormFieldText
                                  name={'last-name'}
                                  label={'Last Name'}
                                  value={mainForm.values.lastName}
                                  required={false}
                                  errorMessage={mainForm.errors.lastName}
                                  onChange={value => mainForm.setFieldValue('lastName', value)}
                                  onBlur={() => mainForm.setFieldTouched('lastName')}
                                  clearDisabled
                                />
                              </div>
                            </div>
                            {!this.props.edmitPlusUser && (
                              <div className="flex justify-center justify-start-ns">
                                <Button
                                  size={EButtonSize.Large}
                                  type={EButtonType.Primary}
                                  text={'Upgrade to Edmit Plus'}
                                  onClick={this.props.onUpgrade}
                                />
                              </div>
                            )}
                          </div>
                          <div className="mv5">
                            <Text type={ETextType.Label} className="mv0">
                              Academic
                          </Text>
                            <div className="flex flex-row flex-wrap nl3 nr3">
                              <div className="w-100 w-50-ns pa3">
                                <div className="form-field">
                                  <FormFieldSelect
                                    name={'major-id'}
                                    label={`${
                                      this.props.personType === EPersonType.STUDENT
                                        ? ''
                                        : "Your Student's "
                                      }Major or Field of Study:`}
                                    value={mainForm.values.majorId || undefined}
                                    required={false}
                                    onSelect={value => mainForm.setFieldValue('majorId', value)}
                                  >
                                    <option value="-1">All majors</option>
                                    {this.props.majors.map(major => (
                                      <option
                                        selected={major.id === mainForm.values.majorId}
                                        key={major.id}
                                        value={major.id}
                                      >
                                        {major.name}
                                      </option>
                                    ))}
                                  </FormFieldSelect>
                                </div>
                              </div>
                              <div className="w-0 w-50-ns pa3" />
                              <div className="w-100 w-50-ns pa3">
                                <FormFieldText
                                  testId={ProfileGPAFieldUW}
                                  name={'gpa-score'}
                                  label={'GPA'}
                                  value={mainForm.values.gradePointAverage || ''}
                                  required={false}
                                  errorMessage={mainForm.errors.gradePointAverage}
                                  onChange={value =>
                                    mainForm.setFieldValue('gradePointAverage', value)
                                  }
                                  onBlur={() => mainForm.setFieldTouched('gradePointAverage')}
                                />
                                <div className="w-100 mb4">
                                  <FormFieldToggle
                                    testId={ProfileGPAToggle}
                                    name={'gpa-weighted'}
                                    label={'Is your GPA weighted or unweighted?'}
                                    checked={!mainForm.values.isWeighted}
                                    optionLeftLabel={'Weighted'}
                                    optionRightLabel={'Unweighted'}
                                    onClick={() => mainForm.setFieldValue('isWeighted', !mainForm.values.isWeighted)}
                                  />
                                </div>
                                {mainForm.values.isWeighted && (
                                  <div className="w-100 mb4">
                                    <FormFieldText
                                      testId={ProfileGPAFieldW}
                                      name={'gpa-score-weighted-total'}
                                      label={'Out of how much?'}
                                      value={mainForm.values.weightedMaximum || ''}
                                      required={true}
                                      errorMessage={(mainForm.touched.weightedMaximum && mainForm.errors.weightedMaximum) || undefined}
                                      onChange={value => {
                                        mainForm.setFieldValue('weightedMaximum', value);
                                        mainForm.setFieldTouched('weightedMaximum');
                                      }}
                                      onBlur={() => mainForm.setFieldTouched('weightedMaximum')}
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="w-100 w-50-ns pa3">
                                <FormFieldNumber
                                  testId={ProfileACTField}
                                  name={'act-score'}
                                  label={'ACT'}
                                  value={mainForm.values.actScore || undefined}
                                  required={false}
                                  errorMessage={mainForm.errors.actScore}
                                  onChange={value => mainForm.setFieldValue('actScore', value)}
                                  onBlur={() => mainForm.setFieldTouched('actScore')}
                                />
                              </div>
                              <div className="w-100 w-50-ns pa3">
                                <FormFieldNumber
                                  testId={ProfileSATField}
                                  name={'sat-score'}
                                  label={'SAT'}
                                  value={mainForm.values.satScore || undefined}
                                  required={false}
                                  errorMessage={mainForm.errors.satScore}
                                  onChange={value => mainForm.setFieldValue('satScore', value)}
                                  onBlur={() => mainForm.setFieldTouched('satScore')}
                                />
                              </div>
                              <div className="w-100 w-50-ns pa3">
                                <FormFieldNumber
                                  testId={ProfilePSATField}
                                  name={'psat-score'}
                                  label={'PSAT'}
                                  value={mainForm.values.psatScore || undefined}
                                  required={false}
                                  errorMessage={mainForm.errors.psatScore}
                                  onChange={value => mainForm.setFieldValue('psatScore', value)}
                                  onBlur={() => mainForm.setFieldTouched('psatScore')}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mv5">
                            <Text type={ETextType.Label} className="mv0">
                              Household
                          </Text>
                            <div className="flex flex-row flex-wrap nl3 nr3">
                              <div className="w-100 w-50-ns pa3">
                                <FormFieldCurrency
                                  testId={ProfileHHIField}
                                  name={'household-income'}
                                  label={'Household Income'}
                                  value={
                                    mainForm.values.householdIncome !== null
                                      ? mainForm.values.householdIncome
                                      : undefined
                                  }
                                  required={false}
                                  errorMessage={mainForm.errors.householdIncome}
                                  onChange={value => mainForm.setFieldValue('householdIncome', value)}
                                  onBlur={() => mainForm.setFieldTouched('householdIncome')}
                                />
                                <Text className="t-small i mt2 mb0">
                                  {this.props.personType !== EPersonType.OTHER
                                    ? 'Your'
                                    : "Your student's"}{' '}
                                  family's take-home income
                              </Text>
                              </div>
                              <div className="w-100 w-50-ns pa3">
                                <FormFieldCurrency
                                  testId={ProfileSavingsField}
                                  name={'college-savings-amount'}
                                  label={'College Savings Amount'}
                                  value={
                                    mainForm.values.collegeSavingsPlanAmount !== null
                                      ? mainForm.values.collegeSavingsPlanAmount
                                      : undefined
                                  }
                                  required={false}
                                  errorMessage={mainForm.errors.collegeSavingsPlanAmount}
                                  onChange={value =>
                                    mainForm.setFieldValue('collegeSavingsPlanAmount', value)
                                  }
                                  onBlur={() => mainForm.setFieldTouched('collegeSavingsPlanAmount')}
                                />
                                <Text className="t-small i mt2 mb0">
                                  Money set aside for college, including 529 plan.
                              </Text>
                              </div>
                              <div className="w-100 w-50-ns pa3">
                                <FormFieldCurrency
                                  testId={ProfileEFCField}
                                  name={'efc'}
                                  label={'EFC'}
                                  value={
                                    mainForm.values.efc !== null ? mainForm.values.efc : undefined
                                  }
                                  required={false}
                                  errorMessage={mainForm.errors.efc}
                                  onChange={value => mainForm.setFieldValue('efc', value)}
                                  onBlur={() => mainForm.setFieldTouched('efc')}
                                />
                                <Text className="t-small i mt2 mb0">
                                  {this.props.personType !== EPersonType.OTHER
                                    ? 'Your'
                                    : "Your student's"}{' '}
                                  Expected Family Contribution, as calculated by the FAFSA
                              </Text>
                              </div>
                              <div className="w-100 w-50-ns pa3">
                                <FormFieldCurrency
                                  testId={ProfileACCField}
                                  name={'cashContributionAmount'}
                                  label={'Annual Cash Contribution'}
                                  value={
                                    mainForm.values.cashContributionAmount !== null
                                      ? mainForm.values.cashContributionAmount
                                      : undefined
                                  }
                                  required={false}
                                  errorMessage={mainForm.errors.cashContributionAmount}
                                  onChange={value =>
                                    mainForm.setFieldValue('cashContributionAmount', value)
                                  }
                                  onBlur={() => mainForm.setFieldTouched('cashContributionAmount')}
                                />
                                <Text className="t-small i mt2 mb0">
                                  What you pay out of pocket each year, excluding savings. Default is 10% of income.
                              </Text>
                              </div>
                              <div className="w-100 w-50-ns pa3">
                                <FormFieldCurrency
                                  testId={ProfileASWField}
                                  name={'workStudyAmount'}
                                  label={'Annual Student Wages'}
                                  value={
                                    mainForm.values.workStudyAmount !== null
                                      ? mainForm.values.workStudyAmount
                                      : undefined
                                  }
                                  required={false}
                                  errorMessage={mainForm.errors.workStudyAmount}
                                  onChange={value => mainForm.setFieldValue('workStudyAmount', value)}
                                  onBlur={() => mainForm.setFieldTouched('workStudyAmount')}
                                />
                                <Text className="t-small i mt2 mb0">
                                  The amount earned by working during school, either through Work
                                  Study or other jobs. The default is 10 hours/week at $15/hour.
                              </Text>
                              </div>
                              <div className="w-100 w-50-ns pa3">
                                <FormFieldCurrency
                                  testId={ProfileScholarshipsField}
                                  name={'otherScholarshipsAmount'}
                                  label={'Other Scholarships'}
                                  value={
                                    mainForm.values.otherScholarshipsAmount !== null
                                      ? mainForm.values.otherScholarshipsAmount
                                      : undefined
                                  }
                                  required={false}
                                  errorMessage={mainForm.errors.otherScholarshipsAmount}
                                  onChange={value => mainForm.setFieldValue('otherScholarshipsAmount', value)}
                                  onBlur={() => mainForm.setFieldTouched('otherScholarshipsAmount')}
                                />
                                <Text className="t-small i mt2 mb0">
                                  Any private scholarships or grants that are not college-specific.
                              </Text>
                              </div>
                            </div>
                          </div>
                          <div className="mv4">
                            <Text type={ETextType.Label} className="mv0">
                              High School
                          </Text>
                            <div className="flex flex-row flex-wrap nl3 nr3">
                              <div className="w-100 w-50-ns pa3">
                                <Text className="mv0 fw7 t-medium black">Home Zip Code</Text>
                                <div className="form-field">{this.props.searchZipCodesComponent}</div>
                              </div>
                              <div className="w-100 w-50-ns pa3">
                                <Text className="mv0 fw7 t-medium black">High School</Text>
                                <div className="form-field">
                                  {this.props.searchHighSchoolsComponent}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-row flex-wrap nl3 nr3">
                              <div className="w-100 w-50-ns pa3">
                                <div className="form-field">
                                  <FormFieldSelect
                                    name={'grad-year-hs'}
                                    label={`High School Graduation Year`}
                                    value={(mainForm.values.graduationYear && mainForm.values.graduationYear.toString()) || 'default'}
                                    required={false}
                                    onSelect={value =>
                                      mainForm.setFieldValue(
                                        'graduationYear',
                                        value === 'default' ? null : parseInt(value, undefined)
                                      )
                                    }
                                  >
                                    <option selected={true} key={-1} value={'default'}>
                                      Not Set
                                  </option>
                                    {graduationYears.map(gradYear => (
                                      <option selected={false} key={gradYear} value={'' + gradYear}>
                                        {gradYear}
                                      </option>
                                    ))}
                                  </FormFieldSelect>
                                </div>
                              </div>
                              <div className="w-100 w-50-ns pa3" />
                              <div className="flex justify-center justify-start-ns">
                                <FormSubmit
                                  testId={ProfileSaveButton}
                                  buttonSize={EButtonSize.Large}
                                  submitState={
                                    mainForm.isSubmitting ? ESubmitState.Submitted : ESubmitState.Default
                                  }
                                  defaultText={'Save Profile'}
                                  submittedText={'Saving...'}
                                  succeededText={'Saved!'}
                                  failedText={'Failed to save'}
                                  onClick={() => { if (mainForm.validateForm) mainForm.submitForm() }}
                                />
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                      <div className="pt5" id="account">
                        <Card className="pa3 pa4-l">
                          <Heading size={EHeadingSize.H3} text={'Account'} className="mv0" />
                          <div className="mv4">
                            <Text className="mv0 fw7 t-medium black">Account Type</Text>
                            {this.props.edmitPlusUser ? (
                              <Text className="t-medium mv1">
                                Edmit Plus{' '}
                                <Icon name={EIconName.EdmitPlus} className="icon-large crimson" />
                              </Text>
                            ) : (
                                <Text className="t-medium mv1">Edmit Free</Text>
                              )}
                          </div>
                          {!this.props.edmitPlusUser && (
                            <div className="flex justify-center justify-start-ns">
                              <Button
                                size={EButtonSize.Large}
                                type={EButtonType.Primary}
                                text={'Upgrade to Edmit Plus'}
                                onClick={this.props.onUpgrade}
                              />
                            </div>
                          )}
                        </Card>
                      </div>
                      <div className="mb4 ph3 ph4-l">
                        <Text>If you have any questions about your account, please email <TextLink nonRouter to={"mailto:support@edmit.me"}>support@edmit.me</TextLink></Text>
                      </div>
                    </div>
                  </StickyContainer>
                );
              }}
            />
          )}
      </PageContainer>
    );
  }
}

export default ProfilePage;