import * as React from 'react';
import { ESteppedWizardStepVisibleState } from '../wrapper-stepped-wizard';
import { FormikErrors } from '../../../lib/forms';
import { Subtract } from '../../../lib/typescript';
import { FormikProps, FormikActions, Formik } from 'formik';

export interface IProfileCompletionCardViewModel<FormFields> {
  visibleState: ESteppedWizardStepVisibleState;
  children: (props: FormikProps<FormFields>) => JSX.Element;
  initialValues: FormFields;

  className?: string;
  style?: React.CSSProperties;
}

export interface IProfileCompletionCardActions<FormFields> {
  validateForm?: (values: FormFields) => FormikErrors<FormFields>;
  onSave?: (
    values: FormFields,
    initialValues: FormFields,
    bag: Subtract<FormikActions<FormFields>, { setSubmitting: any }>
  ) => Promise<void>;
}

type ProfileCompletionCardProps<FormFields> = IProfileCompletionCardViewModel<FormFields> &
  IProfileCompletionCardActions<FormFields>;

export class ProfileCompletionCard<FormFields> extends React.Component<
  ProfileCompletionCardProps<FormFields>,
  {}
> {
  private form: Formik<FormFields> | null = null;

  public submit() {
    if (this.form) {
      this.form.submitForm();
    }
  }

  render() {
    return (
      <Formik<FormFields>
        ref={el => (this.form = el)}
        initialValues={this.props.initialValues}
        onSubmit={async (values, { setSubmitting, ...actions }) => {
          if (this.props.onSave) {
            this.props.onSave(values, this.props.initialValues, actions);
          }
        }}
        validate={values => (this.props.validateForm ? this.props.validateForm(values) : {})}
        render={formikProps => {
          return (
            <div
              style={{
                left: `${
                  this.props.visibleState === ESteppedWizardStepVisibleState.NOT_YET_OPENED
                    ? '150%'
                    : this.props.visibleState === ESteppedWizardStepVisibleState.OPENED
                      ? '-150%'
                      : '0'
                }`,
                maxHeight:
                  this.props.visibleState === ESteppedWizardStepVisibleState.OPEN ? 800 : 0,
                overflow: 'hidden',
                position: 'relative',
                transition: 'max-height 500ms ease-out, left 500ms cubic-bezier(.59, .01, .16, 1)',
                zIndex:
                  this.props.visibleState === ESteppedWizardStepVisibleState.NOT_YET_OPENED ||
                  this.props.visibleState === ESteppedWizardStepVisibleState.OPENED
                    ? 0
                    : 1,
                ...this.props.style
              }}
              className={'tl mh4 ' + this.props.className}
            >
              {this.props.children(formikProps)}
            </div>
          );
        }}
      />
    );
  }
}
