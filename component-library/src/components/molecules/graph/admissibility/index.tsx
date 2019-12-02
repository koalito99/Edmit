import * as React from 'react';
import ProgressBar from '../../../atoms/progress-bar';
import Text, { ETextType } from '../../../atoms/typography/text';
import { hexGrayLoading2, hexGreen, hexRed, hexYellow } from '../../../atoms/colors';
import LoadingText from '../../../atoms/loading/text';

export interface IAdmissibilityGraphViewModel {
  admissibilityPercentage: number;
  height: number;
  loading: boolean;
}

type AdmissibilityGraphProps = IAdmissibilityGraphViewModel;

export const AdmissibilityGraph: React.SFC<AdmissibilityGraphProps> = props => (
  <div>
    <ProgressBar
      height={props.height}
      progressAmount={props.admissibilityPercentage}
      barColor={
        props.loading
          ? hexGrayLoading2
          : props.admissibilityPercentage < 34
            ? hexRed
            : props.admissibilityPercentage > 66
              ? hexGreen
              : hexYellow
      }
    />
    {props.loading ? (
      <div className="flex flex-row items-center justify-between pt1">
        <LoadingText width={20} />
        <LoadingText width={20} />
      </div>
    ) : (
      <div className="flex flex-row items-center justify-between">
        <Text type={ETextType.Label} className="mt1 mb0">
          Less likely
        </Text>
        <Text type={ETextType.Label} className="mt1 mb0">
          More likely
        </Text>
      </div>
    )}
  </div>
);

export default AdmissibilityGraph;
