import * as React from 'react';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import Icon, { EIconName } from '@edmit/component-library/src/components/atoms/icon';
import { hexGrayLight } from '@edmit/component-library/src/components/atoms/colors';

export const PrimaryValue: React.FC<{ color: string }> = props => {
  return (
    <Heading
      size={EHeadingSize.H1}
      className={'tc mb2 mt0 f3 f1-ns'}
      style={{ color: props.color }}
      text={<span className={'lato b'}>{props.children}</span>}
    />
  );
};

export const SecondaryValue: React.FC<{ color: string }> = props => {
  return (
    <Heading
      size={EHeadingSize.H2}
      className={'tc mb2 mt0'}
      style={{ color: props.color }}
      text={<span className={'lato b'}>{props.children}</span>}
    />
  );
};

export const ValueLabel: React.FC<{ className?: string }> = props => {
  return <Text className={'t-medium tc mb1 ' + props.className}>{props.children}</Text>;
};

export const Section: React.SFC<{
  className?: string;
  style?: React.CSSProperties;
}> = props => {
  return (
    <div className={'mt3 w-100 ' + props.className} style={props.style}>
      {props.children}
    </div>
  );
};

export const OffWhiteSection: React.SFC<{
  className?: string;
  style?: React.CSSProperties;
}> = props => {
  return <Section {...props} className={props.className + ' bg-offwhite'} />;
};

export const SplitSection: React.FC<{ children: JSX.Element[] }> = props => {
  return (
    <div className={'flex justify-center'}>
      {React.Children.toArray(props.children)
        .filter(child => !!child)
        .map((section, i) => (
          <div key={`section ${i}`} className={'mh2 mh4-ns w-100'}>
            {section}
          </div>
        ))
        .reduce<JSX.Element[]>(
          (acc, x, i) =>
            acc.length === 0
              ? [x]
              : [
                ...acc,
                <div
                  key={`divider ${i}`}
                  className={'br b--gray-light mh1 mh4-ns'}
                  style={{ width: 1 }}
                />,
                x
              ],
          []
        )}
    </div>
  );
};

export const PageSection: React.SFC<{ top?: boolean }> = props => {
  return <div className={props.top ? 'mt5' : 'mt4'}>{props.children}</div>;
};

export const Single: React.SFC = props => {
  return <div className={'center pa3 w-100 w-50-m'}>{props.children}</div>;
};

export const CollegeSectionHeader: React.SFC<{
  name: string;
  className?: string;
  style?: React.CSSProperties;
}> = props => {
  return (
    <Heading
      size={EHeadingSize.H3}
      text={props.name}
      className={'tc ma0 pt4 ' + props.className}
      style={{ fontWeight: 700, ...props.style }}
    />
  );
};

interface ICTABannerViewModel {
  ctaTo: string;

  style?: React.CSSProperties;
  className?: string;
}

type CTABannerProps = ICTABannerViewModel;

export const CTABanner: React.FC<CTABannerProps> = props => {
  return (
    <OffWhiteSection className={'bg-green-success ' + props.className} style={props.style}>
      <Single>
        <a href={props.ctaTo} className={'no-underline'}>
          <Text className="white t-large tc">
            <span className={'lato b'} style={{ letterSpacing: '.05em' }}>
              {props.children} &gt;
            </span>
          </Text>
        </a>
      </Single>
    </OffWhiteSection>
  );
};

export const UnlockWithEdmitButton: React.FC<{ color: string }> = props => {
  return (
    <div className="flex items-center justify-center mv2 mh2-ns">
      <div
        className={'bg-gray-light t-large inline-flex items-center justify-center pa2 pointer'}
        onClick={() => {
          window.location.href = '/signup';
        }}
      >
        <div className="dn db-ns">
          <Icon name={EIconName.Lock} />
        </div>
        <Heading
          size={EHeadingSize.H4}
          text={`Unlock with Edmit`}
          className="tc ma2"
          style={{ color: props.color }}
        />
      </div>
    </div>
  );
};

export type MetricRange = [number, number];

interface IMetricRangeProps {
  average: number | null;
  currentRange: MetricRange | null;
  withinRange: MetricRange;

  valueColor: string;

  className?: string;
  style?: React.CSSProperties;
}

export const MetricRange: React.FC<IMetricRangeProps> = props => {
  return (
    <div className={'center ' + props.className} style={{ ...props.style, maxWidth: 400 }}>
      <div className={'flex flex-wrap'}>
        <div className={'w-100 ' + (props.currentRange && 'w-50-l')}>
          {props.average && (
            <>
              <ValueLabel className="gray-muted mt0">Average</ValueLabel>
              <SecondaryValue color={props.valueColor}>{props.average}</SecondaryValue>
            </>
          )}
        </div>
        <div className={'w-100 ' + (props.average && 'w-50-l')}>
          {props.currentRange && (
            <>
              <ValueLabel className="gray-muted mt0">Range</ValueLabel>
              <SecondaryValue color={props.valueColor}>
                {props.currentRange[0]} - {props.currentRange[1]}
              </SecondaryValue>
            </>
          )}
        </div>
      </div>
      <div className={'flex justify-center w-100'}>
        {props.currentRange && (
          <MetricRangeGraph
            average={props.average}
            currentRange={props.currentRange}
            withinRange={props.withinRange}
            color={props.valueColor}
            className={'w-100 w-80-ns'}
          />
        )}
      </div>
    </div>
  );
};

interface IMetricRangeGraphProps {
  average: number | null;
  currentRange: MetricRange;
  withinRange: MetricRange;

  color: string;

  className?: string;
  style?: React.CSSProperties;
}

const MetricRangeGraph: React.FC<IMetricRangeGraphProps> = props => {
  const rangeMultiplier = (1 / (props.withinRange[1] - props.withinRange[0])) * 100;
  const currentRangeOffsetPercentage =
    (props.currentRange[0] - props.withinRange[0]) * rangeMultiplier;
  const currentRangeWidthPercentage =
    (props.currentRange[1] - props.currentRange[0]) * rangeMultiplier;
  const averageOffsetPercentage =
    props.average && (props.average - props.withinRange[0]) * rangeMultiplier;

  return (
    <div className={props.className} style={props.style}>
      <div
        className={'relative'}
        style={{ height: 20, backgroundColor: hexGrayLight, overflow: 'hidden' }}
      >
        <div
          className={'absolute'}
          style={{
            left: `${currentRangeOffsetPercentage}%`,
            width: `${currentRangeWidthPercentage}%`,
            height: '100%',
            backgroundColor: props.color
          }}
        />
        {props.average && (
          <div
            className={'absolute'}
            style={{
              left: `${averageOffsetPercentage}%`,
              width: 5,
              height: '100%',
              backgroundColor: props.color
            }}
          >
            <div
              className={'absolute top-0 left-0 right-0 bottom-0'}
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
            />
          </div>
        )}
      </div>
      <div className={'flex justify-between'}>
        <Text className={'gray-muted mt0 tl f6'}>{props.withinRange[0]}</Text>
        <Text className={'gray-muted mt0 tr f6'}>{props.withinRange[1]}</Text>
      </div>
    </div>
  );
};
