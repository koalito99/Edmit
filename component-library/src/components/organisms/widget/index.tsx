import * as React from 'react';
import Header from '../../molecules/header';
import { EHeadingSize } from '../../atoms/typography/heading';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';
import Card from '../../atoms/card';
import WidgetContainer from '../../molecules/widget-container';
import NetPriceGraph from '../../molecules/graph/net-price';
import Text, { ETextType } from '../../atoms/typography/text';
import FormFieldText from '../../atoms/form/form-field-text';
import FormFieldNumber from '../../atoms/form/form-field-number';
import { Formik } from 'formik';
import FormSubmit, { ESubmitState } from '../../atoms/form/form-submit';
import { commonValidations, composeValidators, FieldValidator } from '../../../lib/forms';
import { dataLoadingNetPriceGraph } from '../../atoms/loading/data';
import { ConnectedSearchZipCodesProps, ISearchZipCodesOption } from '../../molecules/search-zip-codes'
import { EPersonType } from '../../../shared'

const yearsInCollege = 1;

export interface IWidgetViewModel {
  college: {
    abbreviation: string;
    name: string;
    costOfAttendance: number;
    edstimate: number;
  } | null;

  values: IWidgetFormFields;

  searchCollegesComponent: JSX.Element;
  searchZipCodesComponent: React.ComponentType<ConnectedSearchZipCodesProps>;
  width: string;
  height: string;
  loading: boolean;
}

export interface IWidgetActions {
  onPersonalizeEdstimate: (values: IWidgetViewModel['values']) => Promise<void>;
  onGetStarted: () => void;
}

type WidgetProps = IWidgetViewModel & IWidgetActions;

interface IWidgetFormFields {
  gradePointAverage: string | null;
  satScore: number | null;
  actScore: number | null;

  hasSelectedCollege?: boolean;
  selectedZipCode: ISearchZipCodesOption | null;
}

const Widget: React.SFC<WidgetProps> = props => {
  const validateCollege: FieldValidator<IWidgetFormFields> = (values, errors) => {
    if (props.college === null) {
      errors.hasSelectedCollege = 'You must select a college.';
    }

    return errors;
  };

  return (
    <Formik<
      IWidgetFormFields & {
        searchZipCodesQuery: string;
      }
    >
      initialValues={{
        ...props.values,
        searchZipCodesQuery: ''
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await props.onPersonalizeEdstimate(values);
        setSubmitting(false);
      }}
      validate={values =>
        composeValidators(
          values,
          {},
          commonValidations.sat('satScore'),
          commonValidations.act('actScore'),
          commonValidations.psat('psatScore'),
          validateCollege
        )
      }
      render={({
        values,
        errors,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        submitForm,
        validateForm
      }) => {
        const widgetGraph = (
          <div className="mb4">
            <NetPriceGraph
              colleges={
                props.college
                  ? [
                    {
                      abbreviation: props.college.abbreviation,
                      name: props.college.name,
                      netPrice: {
                        actualCostOfAttendance: null,
                        costOfAttendance: props.college.edstimate * yearsInCollege,
                        stickerPrice: props.college.costOfAttendance * yearsInCollege
                      }
                    }
                  ]
                  : [dataLoadingNetPriceGraph[0]]
              }
              personType={EPersonType.STUDENT}
              loading={props.college ? props.loading : true}
            />
          </div>
        );

        const personalizeHeader = (
          <div className="mv3">
            <Card className="pv2 ph3 shadow-none db right-0 top-0">
              <Text type={ETextType.Label}>Personalize your Edstimate®:</Text>
              <div className="">
                <div className="flex flex-row nl3 nr3 mv1 mv3-ns">
                  <div className="w-third mh3">
                    <FormFieldNumber
                      name={'act-score'}
                      label={'ACT'}
                      required={false}
                      value={values.actScore || undefined}
                      errorMessage={errors.actScore}
                      onBlur={() => setFieldTouched('actScore')}
                      onChange={value => setFieldValue('actScore', value)}
                      errorInTooltip
                    />
                  </div>
                  <div className="w-third mh3">
                    <FormFieldNumber
                      name={'sat-score'}
                      label={'SAT'}
                      required={false}
                      value={values.satScore || undefined}
                      errorMessage={errors.satScore}
                      onBlur={() => setFieldTouched('satScore')}
                      onChange={value => setFieldValue('satScore', value)}
                      errorInTooltip
                    />
                  </div>
                </div>
                <div className="mv3">
                  <FormFieldText
                    name={'gpa'}
                    label={'GPA:'}
                    value={values.gradePointAverage || ''}
                    placeholder={''}
                    required={false}
                    onChange={value => setFieldValue('gradePointAverage', value)}
                    onBlur={() => setFieldTouched('gradePointAverage')}
                  />
                </div>
                <div className="mv3">
                  <Text className="mv0 fw7 t-medium black">Home Zip Code</Text>
                  <div className="form-field" style={{ minWidth: 170 }}>
                    <props.searchZipCodesComponent
                      inputValue={values.searchZipCodesQuery}
                      selected={values.selectedZipCode || undefined}
                      onSearch={searchQuery => setFieldValue('searchZipCodesQuery', searchQuery)}
                      onSelected={zipCode => setFieldValue('selectedZipCode', zipCode)}
                    />
                  </div>
                </div>
                <div className="mb2 tc">
                  <FormSubmit
                    defaultText={'Save'}
                    submittedText={''}
                    succeededText={''}
                    failedText={''}
                    onClick={() => submitForm()}
                    buttonSize={EButtonSize.Large}
                    submitState={isSubmitting ? ESubmitState.Submitted : ESubmitState.Default}
                  />
                </div>
              </div>
            </Card>
          </div>
        );

        const callToAction = (
          <div className="flex flex-column items-center pv3">
            <Header
              size={EHeadingSize.H3}
              text={'Get a more accurate estimate'}
              className="mv0 tc"
            />
            <Text className="tc mt0 mb3">
              Create a free Edmit account to see more detail and an even more accurate estimate of
              your costs.
            </Text>
            <Button
              type={EButtonType.Primary}
              size={EButtonSize.Large}
              text={'Sign up free'}
              onClick={props.onGetStarted}
            />
          </div>
        );

        return (
          <WidgetContainer width={props.width} height={props.height}>
            <div className="flex flex-column items-center mv3">
              <Header
                size={EHeadingSize.H3}
                text={'What you’ll pay for college'}
                className="tc mt0 mb2"
              />
              <Text className="tc mv0">
                Use our college cost calculator to estimate your price for a given school, including
                financial aid and merit scholarships. Edmit’s Edstimate® is based on college data
                and information on what other students like you paid.
              </Text>
            </div>
            <div className="flex-l flex-row-l">
              <div className="w-50-l">
                <div className="mt4 mt3-l mb3">
                  <Header size={EHeadingSize.H4} text={'Select a college'} className="mt0 mb1" />
                  {props.searchCollegesComponent}
                  {!props.college &&
                    errors.hasSelectedCollege && (
                      <Text type={ETextType.Error}>{errors.hasSelectedCollege}</Text>
                    )}
                </div>
                <div className="mt4 mb3">{widgetGraph}</div>
              </div>
              <div className="w-50-l pl5-l">
                <div className="mv3">{personalizeHeader}</div>
                <div className="mt4 mt3-l mb3">{callToAction}</div>
              </div>
            </div>
          </WidgetContainer>
        );
      }}
    />
  );
};

export default Widget;
