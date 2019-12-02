import * as React from 'react';
// import numeral from 'numeral';
import Header from '../../molecules/header';
import { EHeadingSize } from '../../atoms/typography/heading';
import Card from '../../atoms/card';
import EdstimateGraph from '../../molecules/graph/edstimate';
// import DataTable from '../../molecules/table-data';
import LoadingText, { ELoadingTextSize } from '../../atoms/loading/text';
import FormFieldNumber from '../../atoms/form/form-field-number';
import FormFieldText from '../../atoms/form/form-field-text';
import DivergingChart from '../chart-diverging';
import { IComputedRequirement } from '../../../shared';
import FormSubmit, { ESubmitState } from '../../atoms/form/form-submit';
import { EButtonSize } from '../../atoms/button';
import { Formik } from 'formik';

export interface IEdstimateChartViewModel {
  values: {
    actScore: number | null;
    gpaScore: string | null;
    satScore: number | null;
    psatScore: number | null;
  };

  colleges: Array<{
    abbreviation: string;
    name: string;
    measures: Array<{
      measure: string;
      value: IComputedRequirement<number>;
    }>;
  }>;
  loading: boolean;
}

export interface IEdstimateChartActions {
  updateProfile: (
    values: {
      actScore: number | null;
      gpaScore: string | null;
      satScore: number | null;
      psatScore: number | null;
    }
  ) => Promise<void>;
}

type EdstimateChartProps = IEdstimateChartViewModel & IEdstimateChartActions;

const EdstimateChart: React.SFC<EdstimateChartProps> = props => (
  <div>
    {props.loading ? (
      <div>
        <Header size={EHeadingSize.H4} text={''} loading={props.loading}>
          <div className="dn db-l nt3 nb3" style={{ width: 300 }}>
            <LoadingText size={ELoadingTextSize.H1} width={100} />
          </div>
        </Header>
        <div className="nl3 nr3 nl4-l nr4-l flex flex-wrap justify-center items-start">
          <div className={'w-100 w-50-ns w-third-l pa2'}>
            <EdstimateGraph
              college={{
                edstimate: {
                  breakdown: [],
                  total: 40000
                },
                name: ''
              }}
              loading={props.loading}
            />
          </div>
          <div className={'w-100 w-50-ns w-third-l pa2'}>
            <EdstimateGraph
              college={{
                edstimate: {
                  breakdown: [],
                  total: 40000
                },
                name: ''
              }}
              loading={props.loading}
            />
          </div>
          ))}
        </div>
        <div className="nt3 nb3 w-100">
          <LoadingText size={ELoadingTextSize.H1} width={100} />
        </div>
        <div className="nt3 nb3 w-100">
          <LoadingText size={ELoadingTextSize.H1} width={100} />
        </div>
      </div>
    ) : (
        <Formik<{
          actScore: number | null;
          gpaScore: string | null;
          satScore: number | null;
          psatScore: number | null;
        }>
          initialValues={props.values}
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
                errors.psatScore = 'PSAT score must be a multiple of 10';
              }
              if (values.psatScore < 320) {
                errors.psatScore = 'PSAT score cannot be below 320.';
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
              <div>
                <Header size={EHeadingSize.H4} text={''}>
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
                          onChange={value => setFieldValue('gpaScore', value)}
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
                          onChange={value => setFieldValue('actScore', value)}
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
                          onChange={value => setFieldValue('satScore', value)}
                        />
                      </span>
                      <span className="mh4" style={{ maxWidth: '100px' }}>
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
                  </Card>
                </Header>
                {props.colleges.map(college => (
                  <div
                    key={college.name}
                    style={{
                      display: 'inline-block',
                      width: `${100 / props.colleges.length}%`
                    }}
                  >
                    <DivergingChart
                      measures={college.measures.map(measure => ({
                        measure: measure.measure,
                        value: measure.value.value
                      }))}
                      title={college.name}
                      loading={props.loading}
                    />
                  </div>
                ))}
              </div>
            );
          }}
        />
      )}
  </div>
);

export default EdstimateChart;
