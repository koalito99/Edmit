import * as React from 'react';
import { useSmartField } from '../shared'
import WorkStudySlider, { SmartWorkStudySliderProps } from '@edmit/component-library/src/components/molecules/smart-fields/slider-workstudy'

const SmartWorkStudySlider: React.FC<SmartWorkStudySliderProps> = props => {
  const savingsField = useSmartField("workstudy")

  return (
    <WorkStudySlider
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

export default SmartWorkStudySlider;
