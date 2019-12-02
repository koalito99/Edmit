import * as React from 'react'
import { Subtract } from '../../../../lib/typescript'
import FormFieldNumber from '../../../atoms/form/form-field-number'

interface IACTFieldViewModel {
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

interface IACTFieldActions {
  onChange?: (value: number | null) => void;
  onKeyDown?: (key: string, keyCode: number) => void;
  onBlur?: () => void;
}

type ACTFieldProps = IACTFieldViewModel & IACTFieldActions;

const ACTField: React.FC<ACTFieldProps> = props => {
  return (
    <FormFieldNumber label={props.label || "ACT"} name={props.name || "act"} required={props.required || false} {...props} style={{ opacity: props.loading ? 0.4 : 1, transition: "opacity 200ms", pointerEvents: props.loading ? 'none' : undefined, ...props.style }} />
  )
}

export type SmartACTFieldProps = Subtract<ACTFieldProps,
  {
    value: any;
    placeholder: any;

    required: any;
    loading: any;
  }
  > & {
  required?: boolean;
};

export default ACTField