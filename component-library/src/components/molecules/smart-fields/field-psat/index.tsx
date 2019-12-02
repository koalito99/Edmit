import * as React from 'react'
import { Subtract } from '../../../../lib/typescript'
import FormFieldNumber from '../../../atoms/form/form-field-number'

interface IPSATFieldViewModel {
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

interface IPSATFieldActions {
  onChange?: (value: number | null) => void;
  onKeyDown?: (key: string, keyCode: number) => void;
  onBlur?: () => void;
}

type PSATFieldProps = IPSATFieldViewModel & IPSATFieldActions;

const PSATField: React.FC<PSATFieldProps> = props => {
  return (
    <FormFieldNumber label={props.label || "PSAT"} name={props.name || "psat"} required={props.required || false} {...props} style={{ opacity: props.loading ? 0.4 : 1, transition: "opacity 200ms", pointerEvents: props.loading ? 'none' : undefined, ...props.style }} />
  )
}

export type SmartPSATFieldProps = Subtract<PSATFieldProps,
  {
    value: any;
    placeholder: any;

    required: any;
    loading: any;
  }
  > & {
  required?: boolean;
};

export default PSATField