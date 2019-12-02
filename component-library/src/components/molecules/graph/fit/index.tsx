import * as React from 'react'
import { hexGrayDim, hexGrayLight, hexGrayLoading1, hexGreen, hexRed, hexYellow } from '../../../atoms/colors'
import { ColorChip } from '../../../atoms/color-chip'
import LoadingText from '../../../atoms/loading/text'
import Icon, { EIconName } from '../../../atoms/icon'
import EdmitTooltip, { ETooltipType } from '../../tooltip'
import { EFinancialGrade } from '../../../../shared'

export interface IFitComponentViewModel {
  color: string;
  className?: string;
  style?: React.CSSProperties;
  loading: boolean;
}

type FitComponentProps = IFitComponentViewModel;

export const FitComponent: React.SFC<FitComponentProps> = props => {
  return (
    <span
      className={props.className}
      style={{ cursor: 'default', color: hexGrayDim, fontSize: '0.875rem', ...props.style }}
    >
      <span className="mr1">
        <div
          style={{
            backgroundColor: props.loading ? hexGrayLoading1 : props.color,
            display: 'inline-block',
            height: 8,
            width: 8
          }}
        />
      </span>
      <span>{props.loading ? <LoadingText width={40} /> : props.children}</span>
    </span>
  );
};

export interface IFitLegendElementViewModel {
  color: string;
  className?: string;
  style?: React.CSSProperties;
  loading: boolean;
}

type FitLegendElementProps = IFitLegendElementViewModel;

export const FitLegendElement: React.SFC<FitLegendElementProps> = props => {
  return (
    <span
      className={props.className}
      style={{ color: hexGrayDim, fontSize: '0.875rem', ...props.style }}
    >
      <div
        className="mr1"
        style={{
          backgroundColor: props.loading ? hexGrayLoading1 : props.color,
          borderRadius: 8,
          display: 'inline-block',
          height: 8,
          width: 8
        }}
      />
      <span>{props.loading ? '' : props.children}</span>
    </span>
  );
};

export interface IFitChipViewModel {
  admissionUnlikely: boolean;
  financialGrade: EFinancialGrade;
  alternateContent?: JSX.Element;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  loading: boolean;
}

type FitChipProps = IFitChipViewModel;

export function colorForFinancialGrade(financialGrade: EFinancialGrade): string {
  switch(financialGrade) {
    case EFinancialGrade.A:
    case EFinancialGrade.AMINUS:
      return hexGreen;
    case EFinancialGrade.BPLUS:
    case EFinancialGrade.B:
    case EFinancialGrade.BMINUS:
      return hexYellow;
    default:
      return hexRed;
  }
}

// export const determinationsToFitScore = (
//   affordabilityDetermination: AffordabilityDetermination,
//   valueDetermination: ValueDetermination
// ) => {
//   let score;
//   if (valueDetermination === ValueDetermination.GoodValue && affordabilityDetermination === AffordabilityDetermination.Affordable) {
//     score = 95
//   } else if (valueDetermination === ValueDetermination.NotGoodValue && affordabilityDetermination === AffordabilityDetermination.NotAffordable) {
//     score = 75
//   } else {
//     score = 85
//   }
//   return score
// }

export const FitChip: React.SFC<FitChipProps> = props => {
  const letterGrade = props.financialGrade.charAt(0);
  const gradeModifier = props.financialGrade.length === 2 ? props.financialGrade.charAt(1) : null;

  return (
    <ColorChip
      color={
        !props.admissionUnlikely
          ? colorForFinancialGrade(props.financialGrade)
          : hexGrayLight
      }
      swapIconColor={hexGrayDim}
      loading={props.loading}
      circular
      {...props}
    >
      {!props.admissionUnlikely ? (
        <span className="relative">
          {letterGrade}
          {gradeModifier && (
            <span className="absolute" style={{ left: '1.2ch', fontSize: '0.8em' }}>
              {gradeModifier}
            </span>
          )}
        </span>
      ) : (
          <Icon name={EIconName.Warn} style={{ color: hexGrayDim }} />
        )}
    </ColorChip>
  );
};

export interface IFitGraphViewModel {
  data: Array<{
    dimension: string;
    value: number;
    weight: number;
  }>;
  admissionUnlikely: boolean;
  financialGrade: EFinancialGrade;
  className?: string;
  style?: React.CSSProperties;
  loading: boolean;
}

type FitGraphProps = IFitGraphViewModel;

/*
{props.admissionUnlikely &&
          <div className="relative z-2 flex justify-center">
            <div className="absolute flex w-40 justify-end" style={{ marginTop: 100 }}>
              <EdmitTooltip
                text={`Your GPA and test scores are lower than average for this college.`}
                type={ETooltipType.AdmissibilityWarn}
                position={'top'}
              />
            </div>
          </div>}
*/

const FitGraph: React.SFC<FitGraphProps> = props => {
  // const dataList = <ul className="pl3 list">
  //   {props.data.sort((a, b) => a.dimension > b.dimension ? 1 : a.dimension < b.dimension ? -1 : 0).map(dataPoint => {
  //     const value = dataPoint.value * 100;
  //     const percentileLow = 33;
  //     const percentileHigh = 66;
  //     let color = hexGrayLoading2;

  //     if (value === -2) {
  //       // This is for onboarding purposes
  //       color = hexGrayLoading4;
  //     }
  //     if (value === -3) {
  //       // This is for onboarding purposes
  //       color = hexGrayLoading6;
  //     }
  //     if (value >= 0) {
  //       color = hexRed;

  //       if (value > percentileHigh) {
  //         color = hexGreen;
  //       } else if (value < percentileHigh && value > percentileLow) {
  //         color = hexYellow;
  //       }
  //     }

  //     return <li key={dataPoint.dimension}><FitComponent color={color} loading={props.loading}>{dataPoint.dimension}</FitComponent></li>
  //   })}
  // </ul>;

  let alternateContent;

  if (props.admissionUnlikely) {
    alternateContent = (
      <div className="flex justify-center items-center w-100 h-100">
        <FitChip
          size={130}
          admissionUnlikely={false}
          financialGrade={props.financialGrade}
          loading={false}
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-column items-center mt4 ${props.className}`} style={props.style}>
      <div className="flex flex-column items-center w-100">
        <EdmitTooltip
          type={ETooltipType.Custom}
          text={`Your GPA and test scores are lower than average for this college.`}
          position={'bottom'}
          disabled={!props.admissionUnlikely}
        >
          <FitChip
            financialGrade={props.financialGrade}
            admissionUnlikely={props.admissionUnlikely}
            loading={props.loading}
            alternateContent={alternateContent}
          />
        </EdmitTooltip>
        {/*<div className="mt4 mb2 flex justify-center w-100">
          <FitLegendElement className="mr2" color={hexRed} loading={props.loading}>
            Poor
          </FitLegendElement>
          <FitLegendElement className="mr2" color={hexYellow} loading={props.loading}>
            Average
          </FitLegendElement>
          <FitLegendElement className="mr2" color={hexGreen} loading={props.loading}>
            Good
          </FitLegendElement>
        </div>*/}
      </div>
    </div>
  );
};

export default FitGraph;
