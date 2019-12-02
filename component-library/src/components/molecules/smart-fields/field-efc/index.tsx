import * as React from 'react'
import { Subtract } from '../../../../lib/typescript'
import FormFieldCurrency from '../../../atoms/form/form-field-currency'
import { LoanEFCField } from '../../../../../../client/src/testIds/ids';

interface IEFCFieldViewModel {
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

interface IEFCFieldActions {
  onChange?: (value: number | null) => void;
  onKeyDown?: (key: string, keyCode: number) => void;
  onBlur?: () => void;
}

type EFCFieldProps = IEFCFieldViewModel & IEFCFieldActions;

const EFCField: React.FC<EFCFieldProps> = props => {
  return (
    <FormFieldCurrency testId={LoanEFCField} label={props.label || "EFC"} name={props.name || "efc"} required={props.required || false} {...props} style={{ opacity: props.loading ? 0.4 : 1, transition: "opacity 200ms", pointerEvents: props.loading ? 'none' : undefined, ...props.style }} />
  )
}

export type SmartEFCFieldProps = Subtract<EFCFieldProps,
  {
    value: any;
    placeholder: any;

    required: any;
    loading: any;
  }
> & {
  required?: boolean;
};

export default EFCField