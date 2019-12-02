import * as React from 'react';
import Text from '../../atoms/typography/text';
import EdmitTooltip, { ETooltipType } from '../../molecules/tooltip';
import Icon, { EIconName } from '../../atoms/icon';
import { FitChip } from '../../molecules/graph/fit';
import { EFinancialGrade } from '../../../shared'

export interface IMetricCardViewModel {
  title?: string;
  tooltipText?: string;
  value?: string | null;
  textColor?: string | null;
  className?: string;
  maxHeight?: number;
  yearValue?: string | null;
  isTooltipShow?: boolean;
  isIconDisplay?: boolean;
  isGradeScore?: boolean;
  footer?: string;
  iconType?: string;
  score?: number | EFinancialGrade;
  valueClassName?: string;
  valueStyle?: React.CSSProperties;
}

type MetricCardProps = IMetricCardViewModel;

const MetricCard: React.SFC<MetricCardProps> = props => {
  return (
    <div className={'tc ' + props.className}>
      {(props.title || props.isTooltipShow) && <Text className={'mv0 t-medium gray-dim'}>
        {props.title} &nbsp;
        {props.isTooltipShow && (
          <EdmitTooltip type={ETooltipType.Help} text={props.tooltipText} position={'top'} />
        )}
      </Text> }
      <Text className={`f2 lh-title mv2 ${!props.isIconDisplay ? 'o-80' : ''} ${props.isGradeScore ? 'mt3-l mv0' : ''} ` + props.valueClassName} style={{ color: props.textColor || "black", ...props.valueStyle }}>
        {props.isIconDisplay ? (

          props.iconType === "Check" ? (
            <Icon name={EIconName.Check} className="icon-xxlarge green fw9-ns-imp" />
          ) : (
              <Icon name={EIconName.Close} className="icon-xxlarge crimson fw9-ns-imp" />
            )

        ) : props.isGradeScore ? (
          <FitChip
            size={40}
            admissionUnlikely={false}
            financialGrade={props.score as EFinancialGrade}
            loading={false}
            className={'ma-auto'}
          />
        ) : (
              <span>{props.value} <span className="f9 i-ns">{props.yearValue}</span></span>
            )}
      </Text>
      {props.footer && <Text className={'mv0 t-medium gray-dim'}>{props.footer}</Text>}
    </div>
  );
};

export default MetricCard;