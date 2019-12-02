import * as React from 'react';
import Heading, { EHeadingSize } from '../../atoms/typography/heading';
import LoadingText, { ELoadingTextSize } from '../../atoms/loading/text';
import EdmitTooltip, { ETooltipType } from '../tooltip';

export interface IHeaderViewModel {
  text: string;
  size: EHeadingSize;
  subheaderText?: string;
  subHeaderSize?: EHeadingSize;
  children?: any;
  loading?: boolean;
  tooltipText?: string;
  tooltipContent?: JSX.Element;
  className?: string;
  position?: 'start' | 'center' | 'end';
}

type HeaderProps = IHeaderViewModel;

const Header: React.SFC<HeaderProps> = props => (
  <div
    className={`flex justify-between items-${props.position ||
      'center'}-ns flex-wrap mb2 ${props.className || ''}`}
  >
    {props.loading ? (
      <div className="nt3 nb3 w-100">
        <LoadingText size={ELoadingTextSize.H3} width={30} />
        {props.subheaderText && <LoadingText size={ELoadingTextSize.H3} width={12} />}
      </div>
    ) : (
      <div>
        <div className={`flex flex-row items-${props.position || 'center'}`}>
          <Heading size={props.size} text={props.text} className="mt0 mb2 mb0-ns" />
          {(props.tooltipText || props.tooltipContent) && (
            <EdmitTooltip
              text={props.tooltipText}
              content={props.tooltipContent}
              type={ETooltipType.Help}
              position={'bottom'}
              className="ml1"
            />
          )}
        </div>
        {props.subheaderText && (
          <Heading
            size={props.subHeaderSize || EHeadingSize.H4}
            text={props.subheaderText}
            className="mt0 mb2 mb0-ns"
          />
        )}
      </div>
    )}
    <div>{props.children}</div>
  </div>
);

export default Header;
