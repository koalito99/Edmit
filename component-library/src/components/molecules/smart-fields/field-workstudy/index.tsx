import * as React from 'react'
import { Subtract } from '../../../../lib/typescript'
import FormFieldCurrency from '../../../atoms/form/form-field-currency'

interface IWorkStudyFieldViewModel {
  value?: number;
  label?: string;
  placeholder?: number;
  required: boolean;
  errorMessage?: string;
  errorInTooltip?: boolean;
  disabled?: boolean;
  name?: string;

  loading: boolean;

  style?: React.CSSProperties;
  className?: string;
}

interface IWorkStudyFieldActions {
  onChange?: (value: number | null) => void;
  onKeyDown?: (key: string, keyCode: number) => void;
  onBlur?: () => void;
}

type WorkStudyFieldProps = IWorkStudyFieldViewModel & IWorkStudyFieldActions;

const WorkStudyField: React.FC<WorkStudyFieldProps> = props => {
  return (
    <FormFieldCurrency label={props.label || "Annual Student Wages"} name={props.name || "workstudy"} required={props.required || false} {...props} style={{ opacity: props.loading ? 0.4 : 1, transition: "opacity 200ms", pointerEvents: props.loading ? 'none' : undefined, ...props.style }} />
  )
}

export type SmartWorkStudyFieldProps = Subtract<WorkStudyFieldProps,
  {
    value: any;
    placeholder: any;

    required: any;
    loading: boolean;
  }
  > & {
  required?: boolean;
};

export default WorkStudyField