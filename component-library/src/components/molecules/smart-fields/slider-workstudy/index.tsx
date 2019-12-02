import * as React from 'react'
import { Subtract } from '../../../../lib/typescript'
import { hexYellow } from '../../../atoms/colors'
import FinancialGoalDimension from '../../../organisms/dimension-financial-goal'

interface IWorkStudySliderViewModel {
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

interface IWorkStudySliderActions {
  onChange?: (value: number | null) => void;
  onKeyDown?: (key: string, keyCode: number) => void;
  onBlur?: () => void;
}

type WorkStudySliderProps = IWorkStudySliderViewModel & IWorkStudySliderActions;

const WorkStudySlider: React.FC<WorkStudySliderProps> = props => {
  return (
    <FinancialGoalDimension
      color={props.color || hexYellow}
      description={props.description || 'Income earned by the student including work study.  Our default assumes 10 hours per week.'}
      title={props.label || `Annual Student Wages`}
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

export type SmartWorkStudySliderProps = Subtract<WorkStudySliderProps,
  {
    value: any;
    maxValue: any;

    loading: boolean;
  }
> & {
  required?: boolean;
};

export default WorkStudySlider