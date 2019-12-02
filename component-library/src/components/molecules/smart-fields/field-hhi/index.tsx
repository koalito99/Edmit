import * as React from 'react'
import { Subtract } from '../../../../lib/typescript'
import FormFieldCurrency from '../../../atoms/form/form-field-currency'
import { LoanHHIField } from '../../../../../../client/src/testIds/ids';

interface IHHIFieldViewModel {
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

interface IHHIFieldActions {
  onChange?: (value: number | null) => void;
  onKeyDown?: (key: string, keyCode: number) => void;
  onBlur?: () => void;
}

type HHIFieldProps = IHHIFieldViewModel & IHHIFieldActions;

const HHIField: React.FC<HHIFieldProps> = props => {
  return (
    <FormFieldCurrency testId={LoanHHIField} label={props.label || "Household Income"} name={props.name || "hhi"} required={props.required || false} {...props} style={{ opacity: props.loading ? 0.4 : 1, transition: "opacity 200ms", pointerEvents: props.loading ? 'none' : undefined, ...props.style }} />
  )
}

export type SmartHHIFieldProps = Subtract<HHIFieldProps,
  {
    value: any;
    placeholder: any;

    required: any;
    loading: boolean;
  }
> & {
  required?: boolean;
};

export default HHIField