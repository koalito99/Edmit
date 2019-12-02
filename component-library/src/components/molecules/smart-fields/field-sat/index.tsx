import * as React from 'react'
import { Subtract } from '../../../../lib/typescript'
import FormFieldNumber from '../../../atoms/form/form-field-number'

interface ISATFieldViewModel {
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

interface ISATFieldActions {
  onChange?: (value: number | null) => void;
  onKeyDown?: (key: string, keyCode: number) => void;
  onBlur?: () => void;
}

type SATFieldProps = ISATFieldViewModel & ISATFieldActions;

const SATField: React.FC<SATFieldProps> = props => {
  return (
    <FormFieldNumber label={props.label || "SAT"} name={props.name || "sat"} required={props.required || false} {...props} style={{ opacity: props.loading ? 0.4 : 1, transition: "opacity 200ms", pointerEvents: props.loading ? 'none' : undefined, ...props.style }} />
  )
}

export type SmartSATFieldProps = Subtract<SATFieldProps,
  {
    value: any;
    placeholder: any;

    required: any;
    loading: any;
  }
  > & {
  required?: boolean;
};

export default SATField