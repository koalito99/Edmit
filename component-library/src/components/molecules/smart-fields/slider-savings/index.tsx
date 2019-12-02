import * as React from 'react'
import { Subtract } from '../../../../lib/typescript'
import { hexOrange } from '../../../atoms/colors'
import FinancialGoalDimension from '../../../organisms/dimension-financial-goal'

interface ISavingsSliderViewModel {
  value: number;
  maxValue: number;
  label?: string;
  description?: string;
  disabled?: boolean;
  color?: string;

  loading: boolean;

  style?: React.CSSProperties;
  className?: string;
}

interface ISavingsSliderActions {
  onChange?: (value: number | null) => void;
  onKeyDown?: (key: string, keyCode: number) => void;
  onBlur?: () => void;
}

type SavingsSliderProps = ISavingsSliderViewModel & ISavingsSliderActions;

const SavingsSlider: React.FC<SavingsSliderProps> = props => {
  return (
    <FinancialGoalDimension
      color={props.color || hexOrange}
      description={props.description || 'Money set aside for college, including 529 plan.'}
      title={props.label || `Savings`}
      loading={false}
      onBlur={() => props.onBlur && props.onBlur()}
      onBlurSlider={() => props.onBlur && props.onBlur()}
      onChange={props.onChange}
      onChangeSlider={(v: number) => props.onChange && props.onChange((v / 100) * props.maxValue)}
      sliderValue={(props.value / props.maxValue) * 100}
      value={props.value}

      className={props.className}
      style={{ opacity: props.loading ? 0.4 : 1, transition: "opacity 200ms", pointerEvents: props.loading ? 'none' : undefined, ...props.style }}
    />
  )
}

export type SmartSavingsSliderProps = Subtract<SavingsSliderProps,
  {
    value: any;
    maxValue: any;

    loading: boolean;
  }
  > & {
  required?: boolean;
};

export default SavingsSlider