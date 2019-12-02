import * as React from 'react';
import Text, { ETextType } from '../../atoms/typography/text';
import Logo, { ELogoColor } from '../../atoms/logo';
import Navbar from '../navbar';

export interface IWidgetContainerViewModel {
  children?: any;
  height: string;
  width: string;
}

export interface IWidgetContainerActions {
  onScroll?: (amount: number) => void;
}

type WidgetContainerProps = IWidgetContainerViewModel & IWidgetContainerActions;

class WidgetContainer extends React.Component<WidgetContainerProps> {
  render() {
    return (
      <div
        className="relative bg-offwhite ba bw1 b--gray-light overflow-x-hidden overflow-y-scroll"
        style={{ height: this.props.height, width: this.props.width }}
        onScroll={e => {
          if (this.props.onScroll) {
            this.props.onScroll(e.currentTarget.scrollTop);
          }
        }}
      >
        <Navbar fixed={false} height={32} className="flex flex-row justify-between items-center">
          <span />
          <span className="flex flex-row items-center">
            <a href="" className="dib no-underline flex-shrink-0">
              <Logo color={ELogoColor.Crimson} width={52} />
            </a>
          </span>
          <span />
        </Navbar>
        <div className="pa3 ph4-l" style={{ minHeight: `calc(${this.props.height} - 56px - 32px` }}>
          {this.props.children}
        </div>
        <Navbar
          fixed={false}
          height={56}
          className="flex flex-column flex-row-ns justify-center justify-between-ns items-center"
        >
          <span className="flex flex-row items-center">
            <Text type={ETextType.Label} className="mr1 mv0">
              Powered By
            </Text>
            <a href="" className="dib no-underline flex-shrink-0">
              <Logo color={ELogoColor.Crimson} width={52} />
            </a>
          </span>
          <Text className="t-medium fw4 i mv0 mr2">
            Find the right college for you and your wallet.
          </Text>
        </Navbar>
      </div>
    );
  }
}

export default WidgetContainer;
