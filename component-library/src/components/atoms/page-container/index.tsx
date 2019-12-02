import * as React from 'react';

export interface IPageContainerViewModel {
  children: any;
  className?: string;
}

type PageContainerProps = IPageContainerViewModel;

const PageContainer: React.SFC<PageContainerProps> = props => (
  <div
    className={
      'pa4 center overflow-x-hidden overflow-y-hidden ' +
      (props.className ? props.className : '')
    }
  >
    {props.children}
  </div>
);

export default PageContainer;
