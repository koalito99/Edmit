import * as React from 'react';
import numeral from 'numeral';
import Text, { ETextType } from '../../atoms/typography/text';
import LoadingText, { ELoadingTextSize } from '../../atoms/loading/text';
import { hexGrayLight } from '../../atoms/colors';
import FormFieldCurrency from '../../atoms/form/form-field-currency';
import Heading, { EHeadingSize } from '../../atoms/typography/heading';
import FormFieldSlider from '../../atoms/form/form-field-slider'

export interface IFinancialGoalDimensionViewModel {
  color: string;
  title: string;
  description?: string;
  value: number;
  sliderValue: number;
  disabled?: boolean;
  loading: boolean;

  style?: React.CSSProperties;
  className?: string;

  testId?: string;
}

export interface IFinancialGoalDimensionActions {
  onChange?: (value: number) => void;
  onChangeSlider?: (value: number) => void;
  onBlur?: () => void;
  onBlurSlider?: () => void;
}

type FinancialGoalDimensionProps = IFinancialGoalDimensionViewModel &
  IFinancialGoalDimensionActions;

const FinancialGoalDimension: React.SFC<FinancialGoalDimensionProps> = props => (
  <div className={"no-select flex flex-column justify-between " + props.className} style={props.style}>
    {props.loading ? (
      <>
        <div className="w-100 flex items-center nb3">
          <LoadingText size={ELoadingTextSize.H3} width={40} />
        </div>
        <div className="mt2">
          <div className="w-100 flex flex-row items-center justify-between">
            <LoadingText size={ELoadingTextSize.P} width={10} />
            <LoadingText size={ELoadingTextSize.P} width={30} />
          </div>
          <FormFieldSlider
            value={0}
            min={0}
            max={100}
            color={hexGrayLight}
          />
        </div>
        {props.description && (
          <div>
            <LoadingText size={ELoadingTextSize.P} width={90} />
            <LoadingText size={ELoadingTextSize.P} width={40} />
          </div>
        )}
      </>
    ) : (
        <>
          <div className="w-100 flex flex-row items-center">
            <Heading size={EHeadingSize.H4} text={props.title} className="mv0" />
            <span className="ml1 br1" style={{ width: 8, height: 8, backgroundColor: props.color }} />
          </div>
          <div className="mt2mt2">
            <div className="w-100 flex flex-row items-center justify-between">
              <Text type={ETextType.Label} className="mv0">
                Amount
            </Text>
              <div style={{ width: 80 }}>
                {!props.disabled ? (
                  <FormFieldCurrency
                    name={props.title}
                    label={''}
                    required={false}
                    className="mv0 fw7"
                    value={props.value}
                    onChange={val => val && props.onChange && props.onChange(val)} // TODO: handle null properly
                    onBlur={props.onBlur}
                    clearDisabled
                    testId={props.testId}
                  />
                ) : (
                    <Text className={'mv0 fw7 t-medium gray-dim'}>
                      {numeral(props.value).format('$0,0')}
                    </Text>
                  )}
              </div>
            </div>
            <FormFieldSlider
              className={"w-100"}
              value={props.sliderValue}
              color={props.color}
              onChange={props.onChangeSlider}
              onBlur={props.onBlurSlider}
            />
          </div>
          {props.description && <Text className="mt3 mb0 t-medium i o-80">{props.description}</Text>}
        </>
      )}
  </div>
);

export default FinancialGoalDimension;
