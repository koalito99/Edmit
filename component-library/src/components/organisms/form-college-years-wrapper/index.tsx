import * as React from 'react';
// import * as numeral from 'numeral';
import Card from '../../atoms/card';
// import DataTable from '../../molecules/table-data';
import LoadingText, { ELoadingTextSize } from '../../atoms/loading/text';
import { Formik } from 'formik';
import FormFieldToggle from '../../../components/atoms/form/form-field-toggle';

export interface ICollegeYearsFormWrapperViewModel {
  values: {
    yearsForCost: 1 | 4;
  };

  children: (form: JSX.Element, values: { yearsForCost: 1 | 4 }) => JSX.Element;

  loading: boolean;
}

type CollegeYearsFormWrapperProps = ICollegeYearsFormWrapperViewModel;

const CollegeYearsFormWrapper: React.SFC<CollegeYearsFormWrapperProps> = props => (
  <div>
    {props.loading ? (
      <>
        {props.children(
          <div className="dn db-l nt3 nb3" style={{ width: 300 }}>
            <LoadingText size={ELoadingTextSize.H1} width={100} />
          </div>,
          { yearsForCost: 4 }
        )}
      </>
    ) : (
      <Formik<{
        yearsForCost: 1 | 4;
      }>
        initialValues={{
          yearsForCost: props.values.yearsForCost
        }}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => null}
        render={({ values, setFieldValue }) => {
          return (
            <>
              {props.children(
                <Card className="pa3 dib mb4 mb2-ns w-100 flex justify-center">
                  <FormFieldToggle
                    name={'cost-years'}
                    label={'Years for Cost:'}
                    checked={values.yearsForCost === 4}
                    optionLeftLabel={'1 Year'}
                    optionRightLabel={'4 Years'}
                    onClick={() => setFieldValue('yearsForCost', values.yearsForCost === 4 ? 1 : 4)}
                  />
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

export default CollegeYearsFormWrapper;
