import * as React from 'react';
// import numeral from 'numeral';
import Card from '../../atoms/card';
// import DataTable from '../../molecules/table-data';
import LoadingText, { ELoadingTextSize } from '../../atoms/loading/text';
import FormFieldNumber from '../../atoms/form/form-field-number';
import FormFieldText from '../../atoms/form/form-field-text';
import FormSubmit, { ESubmitState } from '../../atoms/form/form-submit';
import { EButtonSize } from '../../atoms/button';
import { Formik } from 'formik';

export interface IEdstimateFormWrapperViewModel {
  values: {
    actScore: number | null;
    gpaScore: string | null;
    satScore: number | null;
    psatScore: number | null;
  };

  children: (
    form: JSX.Element,
    values: { actScore: number | null; gpaScore: string | null; satScore: number | null }
  ) => JSX.Element;

  loading: boolean;
}

export interface IEdstimateFormWrapperActions {
  updateProfile: (
    values: {
      actScore: number | null;
      gpaScore: string | null;
      satScore: number | null;
      psatScore: number | null;
    }
  ) => Promise<void>;
}

type EdstimateFormWrapperProps = IEdstimateFormWrapperViewModel & IEdstimateFormWrapperActions;

const EdstimateFormWrapper: React.SFC<EdstimateFormWrapperProps> = props => (
  <div>
    {props.loading ? (
      <>
        {props.children(
          <div className="dn db-l nt3 nb3" style={{ width: 300 }}>
            <LoadingText size={ELoadingTextSize.H1} width={100} />
          </div>,
          { actScore: null, gpaScore: null, satScore: null }
        )}
      </>
    ) : (
        <Formik<{
          actScore: number | null;
          gpaScore: string | null;
          satScore: number | null;
          psatScore: number | null;
        }>
          initialValues={props.values}
          enableReinitialize
          validate={values => {
            const errors: { [P in keyof typeof values]?: string } = {};

            if (values.satScore != null) {
              if (values.satScore > 1600) {
                errors.satScore = 'SAT score cannot exceed 1600.';
              }
              if (values.satScore % 10 !== 0) {
                errors.satScore = 'SAT score must be a multiple of 10';
              }
              if (values.satScore < 400) {
                errors.satScore = 'SAT score cannot be below 400.';
              }
            }

            if (values.actScore != null) {
              if (values.actScore < 1) {
                errors.actScore = 'ACT score cannot be below 1.';
              }

              if (values.actScore > 36) {
                errors.actScore = 'ACT score cannot exceed 36.';
              }
            }

            if (values.psatScore != null) {
              if (values.psatScore > 1520) {
                errors.psatScore = 'PSAT score cannot exceed 1520.';
              }
              if (values.psatScore % 10 !== 0) {
                errors.satScore = 'PSAT score must be a multiple of 10';
              }
              if (values.psatScore < 320) {
                errors.satScore = 'PSAT score cannot be below 320.';
              }
            }

            return errors;
          }}
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
                    <div className="nl3 nr3 flex flex-row justify-around">
                      <span className="mh3" style={{ maxWidth: '100px' }}>
                        <FormFieldText
                          name={'gpa'}
                          label={'GPA:'}
                          required={false}
                          value={values.gpaScore || ''}
                          errorMessage={errors.gpaScore}
                          onBlur={() => setFieldTouched('gpaScore')}
                          onChange={value => setFieldValue('gpaScore', value || null)}
                          errorInTooltip
                        />
                      </span>
                      <span className="mh3" style={{ maxWidth: '100px' }}>
                        <FormFieldNumber
                          name={'test-score-act'}
                          label={'ACT:'}
                          required={false}
                          value={values.actScore || undefined}
                          errorMessage={errors.actScore}
                          onBlur={() => setFieldTouched('actScore')}
                          onChange={value => setFieldValue('actScore', value || null)}
                          errorInTooltip
                        />
                      </span>
                      <span className="mh3" style={{ maxWidth: '100px' }}>
                        <FormFieldNumber
                          name={'test-score-sat'}
                          label={'SAT:'}
                          required={false}
                          value={values.satScore || undefined}
                          errorMessage={errors.satScore}
                          onBlur={() => setFieldTouched('satScore')}
                          onChange={value => setFieldValue('satScore', value || null)}
                          errorInTooltip
                        />
                      </span>
                      <span className="mh2 mh4-ns" style={{ maxWidth: '100px' }}>
                        <FormSubmit
                          defaultText={'Save'}
                          submittedText={'Saving'}
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

export default EdstimateFormWrapper;
