import * as React from 'react'
import { Subtract } from '../../../../lib/typescript'
import FormFieldSelect from '../../../atoms/form/form-field-select'

interface IMajorFieldViewModel {
  name?: string;
  label?: string | JSX.Element;
  required: boolean;
  errorMessage?: string;
  errorInTooltip?: boolean;
  disabled?: boolean;
  children: any;
  value?: string;
  tabIndex?: number;
  barStyle?: boolean;

  loading: boolean;

  style?: React.CSSProperties;
  className?: string;
}

interface IMajorFieldActions {
  onSelect?(value: string): void;
}

type MajorFieldProps = IMajorFieldViewModel & IMajorFieldActions;

const MajorField: React.FC<MajorFieldProps> = props => {
  const { children, style, ...otherProps } = props;

  return (
    <FormFieldSelect label={props.label || "Major"} name={props.name || "major"} required={props.required || false} {...otherProps} style={{ minWidth: 150, opacity: props.loading ? 0.4 : 1, transition: "opacity 200ms", pointerEvents: props.loading ? 'none' : undefined, ...props.style }} >
      <option selected={true} key={-1} value={''}>
        Select a major
      </option>
      {children}
    </FormFieldSelect>
  )
}

export type SmartMajorFieldProps = Subtract<MajorFieldProps,
  {
    value: any;
    placeholder: any;

    required: any;
    children: any;
    loading: any;
  }
  > & {
  required?: boolean;
};

export default MajorField