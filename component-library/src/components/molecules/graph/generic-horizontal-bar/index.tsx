import * as React from 'react';
import numeral from 'numeral';
import { useTransition, animated } from 'react-spring';

import Text, { ETextType } from '../../../atoms/typography/text';

interface IGenericHorizontalBarGraphViewModel {
  data: Array<{ label: string; value: number; color: string; hidden?: boolean }>;

  maxValue?: number;

  style?: React.CSSProperties;
  className?: string;
}

type GenericHorizontalBarGraphProps = IGenericHorizontalBarGraphViewModel;

const GenericHorizontalBarGraph: React.FC<GenericHorizontalBarGraphProps> = props => {
  const max =
    props.maxValue || props.data.reduce((acc, { value }) => (value > acc ? value : acc), 0);

  const transitions = useTransition(props.data, item => item.label, {
    enter: { opacity: 1 },
    from: { opacity: 0 },
    leave: { opacity: 0 }
  });

  return (
    <div style={props.style} className={props.className}>
      {transitions.map(({ item, props: transitionProps, key }) => (
        <animated.div key={key} style={transitionProps}>
          <div className={'mb2 w-100'} style={{ opacity: item.hidden ? 0.25 : 1 }}>
            <Text type={ETextType.Label} className={'mr2'}>
              {item.label}
            </Text>
            <div className="w-100" style={{ /*backgroundColor: hexGrayLight,*/ height: 40 }}>
              {item.value / max < 0.05 ? (
                <Text type={ETextType.Label} className={'mr2'}>
                  {numeral(item.value).format('$0a')}
                </Text>
              ) : (
                <div
                  className={'flex justify-end items-center'}
                  style={{
                    backgroundColor: item.color,
                    height: '100%',
                    width: `${Math.min((item.value / max) * 100, 100)}%`
                  }}
                >
                  <Text type={ETextType.Label} className={'mr2 white'}>
                    {numeral(item.value).format('$0a')}
                  </Text>
                </div>
              )}
            </div>
          </div>
        </animated.div>
      ))}
    </div>
  );
};

export default GenericHorizontalBarGraph;
