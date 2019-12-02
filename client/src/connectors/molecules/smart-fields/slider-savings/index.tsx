import * as React from 'react';
import { useSmartField } from '../shared'
import SavingsSlider, { SmartSavingsSliderProps } from '@edmit/component-library/src/components/molecules/smart-fields/slider-savings'

const SmartSavingsSlider: React.FC<SmartSavingsSliderProps> = props => {
  const savingsField = useSmartField("savings")

  return (
    <SavingsSlider
      {...props}
      value={savingsField.value || 0}
      maxValue={100000}
      onChange={newValue => {
        savingsField.onChange(newValue)
        props.onChange && props.onChange(newValue);
      }}
      onBlur={() => {
        savingsField.onBlur()
        props.onBlur && props.onBlur()
      }}
      loading={savingsField.loading}
    />
  );
};

export default SmartSavingsSlider;
