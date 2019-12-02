import * as React from 'react';
import Widget, { IWidgetActions, IWidgetViewModel } from '@edmit/component-library/src/components/organisms/widget';
import { Subtract } from '@edmit/component-library/src/lib/typescript';

type WidgetPageProps = Subtract<
  IWidgetViewModel,
  {
    width: any;
    height: any;
  }
> &
  IWidgetActions;

const WidgetPage: React.SFC<WidgetPageProps> = props => {
  return (
    <div>
      <Widget {...props} width={'100%'} height={'800px'} />
    </div>
  );
};

export default WidgetPage;
