import * as React from 'react'
import { Subtract } from '../../../../lib/typescript'
import FormFieldText from '../../../atoms/form/form-field-text'

interface IGPAFieldViewModel {
  value: string;
  label?: string;
  placeholder?: string;
  required: boolean;
  errorMessage?: string;
  errorInTooltip?: boolean;
  disabled?: boolean;
  name?: string;

  loading: boolean;

  style?: React.CSSProperties;
  className?: string;
}

interface IGPAFieldActions {
  onChange?: (value: string | null) => void;
  onKeyDown?: (key: string, keyCode: number) => void;
  onBlur?: () => void;
}

type GPAFieldProps = IGPAFieldViewModel & IGPAFieldActions;

const GPAField: React.FC<GPAFieldProps> = props => {
  return (
    <FormFieldText label={props.label || "GPA"} name={props.name || "gpa"} required={props.required || false} {...props} style={{ opacity: props.loading ? 0.4 : 1, transition: "opacity 200ms", pointerEvents: props.loading ? 'none' : undefined, ...props.style }} />
  )
}

export type SmartGPAFieldProps = Subtract<GPAFieldProps,
  {
    value: any;
    placeholder: any;

    required: any;
    loading: any;
  }
  > & {
  required?: boolean;
};

export default GPAField