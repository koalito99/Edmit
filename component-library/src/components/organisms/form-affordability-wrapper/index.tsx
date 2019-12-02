import * as React from 'react';
import Card from '../../atoms/card';
import LoadingText, { ELoadingTextSize } from '../../atoms/loading/text';
import FormSubmit, { ESubmitState } from '../../atoms/form/form-submit';
import { EButtonSize } from '../../atoms/button';
import { Formik } from 'formik';
import FormFieldCurrency from '../../atoms/form/form-field-currency';

export interface IAffordabilityFormWrapperViewModel {
  values: {
    householdIncome: number | null;
    collegeSavings: number | null;
  };

  children: (
    form: JSX.Element,
    values: { householdIncome: number | null; collegeSavings: number | null }
  ) => JSX.Element;

  loading: boolean;
}

export interface IAffordabilityFormWrapperActions {
  updateProfile: (
    values: {
      householdIncome: number | null;
      collegeSavings: number | null;
    }
  ) => Promise<void>;
}

type AffordabilityFormWrapperProps = IAffordabilityFormWrapperViewModel &
  IAffordabilityFormWrapperActions;

const AffordabilityFormWrapper: React.SFC<AffordabilityFormWrapperProps> = props => (
  <div>
    {props.loading ? (
      <>
        {props.children(
          <div className="dn db-l nt3 nb3" style={{ width: 300 }}>
            <LoadingText size={ELoadingTextSize.H1} width={100} />
          </div>,
          { householdIncome: null, collegeSavings: null }
        )}
      </>
    ) : (
      <Formik<{
        householdIncome: number | null;
        collegeSavings: number | null;
      }>
        enableReinitialize
        initialValues={props.values}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await props.updateProfile(values);
          setSubmitting(false);
        }}
        render={({ values, errors, setFieldTouched, setFieldValue, submitForm, isSubmitting }) => {
          return (
            <>
              {props.children(
                <Card className="pa3">
                  <div className="nl3 nr3 flex flex-row justify-between">
                    <span className="mh3">
                      <FormFieldCurrency
                        name={'household-income'}
                        label={'Household income:'}
                        value={values.householdIncome || undefined}
                        errorMessage={errors.householdIncome}
                        required={false}
                        onBlur={() => setFieldTouched('householdIncome')}
                        onChange={value => setFieldValue('householdIncome', value)}
                        errorInTooltip
                      />
                    </span>
                    <span className="mh3">
                      <FormFieldCurrency
                        name={'college-savings'}
                        label={'College savings:'}
                        value={values.collegeSavings || undefined}
                        errorMessage={errors.collegeSavings}
                        required={false}
                        onBlur={() => setFieldTouched('collegeSavings')}
                        onChange={value => setFieldValue('collegeSavings', value)}
                        errorInTooltip
                      />
                    </span>
                    <span className="mh3">
                      <FormSubmit
                        defaultText={'Save'}
                        submittedText={''}
                        succeededText={''}
                        failedText={''}
                        onClick={() => submitForm()}
                        buttonSize={EButtonSize.Small}
                        submitState={isSubmitting ? ESubmitState.Submitted : ESubmitState.Default}
                      />
                    </span>
                  </div>
                </Card>,
                values
              )}
            </>
          );
        }}
      />
    )}
  </div>
);

export default AffordabilityFormWrapper;
