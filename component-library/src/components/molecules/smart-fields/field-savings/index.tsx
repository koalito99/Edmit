import * as React from 'react'
import { Subtract } from '../../../../lib/typescript'
import FormFieldCurrency from '../../../atoms/form/form-field-currency'

interface ISavingsFieldViewModel {
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

interface ISavingsFieldActions {
  onChange?: (value: number | null) => void;
  onKeyDown?: (key: string, keyCode: number) => void;
  onBlur?: () => void;
}

type SavingsFieldProps = ISavingsFieldViewModel & ISavingsFieldActions;

const SavingsField: React.FC<SavingsFieldProps> = props => {
  return (
    <FormFieldCurrency label={props.label || "Savings"} name={props.name || "savings"} required={props.required || false} {...props} style={{ opacity: props.loading ? 0.4 : 1, transition: "opacity 200ms", pointerEvents: props.loading ? 'none' : undefined, ...props.style }} />
  )
}

export type SmartSavingsFieldProps = Subtract<SavingsFieldProps,
  {
    value: any;
    placeholder: any;

    required: any;
    loading: boolean;
  }
  > & {
  required?: boolean;
};

export default SavingsField