import * as React from 'react'
import Slider from 'rc-slider';

interface IFormFieldSliderViewModel {
  value: number | null;
  min?: number;
  max?: number;
  marks?: {
    [number: number]:
      | JSX.Element
      | string
      | { style: any; label: string | JSX.Element };
  };

  color: string;
  disabled?: boolean;

  style?: React.CSSProperties;
  className?: string;
}

interface IFormFieldSliderActions {
  onChange?: (value: number) => void;
  onBlur?: () => void;
}

type FormFieldSliderProps = IFormFieldSliderViewModel & IFormFieldSliderActions;

const FormFieldSlider: React.FC<FormFieldSliderProps> = props => {
  return (
    <Slider
      value={props.value === null ? undefined : props.value}
      min={props.min}
      max={props.max}
      marks={props.marks}

      trackStyle={{ backgroundColor: props.color, cursor: 'pointer' }}
      railStyle={{ cursor: 'pointer' }}
      handleStyle={!props.disabled ? { backgroundColor: props.color } : { display: 'none' }}
      dotStyle={{ transform: 'translateY(2px)' }}
      activeDotStyle={{ display: props.disabled ? 'none' : undefined, borderColor: props.color }}

      onChange={props.onChange}
      onAfterChange={value => {
        if (props.onChange != null) {
          props.onChange(value);
        }
        if (props.onBlur != null) {
          props.onBlur();
        }
      }}
      className={props.className}
      style={props.style}
    />
  )
}

export default FormFieldSlider