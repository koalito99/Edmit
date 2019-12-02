import * as React from 'react';
import PageContainer from '@edmit/component-library/src/components/atoms/page-container';
import Header from '@edmit/component-library/src/components/molecules/header';
import { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import Button, { EButtonSize, EButtonType } from '@edmit/component-library/src/components/atoms/button';

interface IMetro {
  abbreviation: string;
  name: string;
  id: string;
  slug?: string;
}

export interface IMetrosIndexPageViewModel {
  metros: IMetro[];
}

export interface IMetrosIndexPageActions {
  onSelect: (metro: IMetro) => void;
}

type MetrosIndexProps = IMetrosIndexPageViewModel & IMetrosIndexPageActions;

const MetrosIndexPage: React.SFC<MetrosIndexProps> = props => {
  return (
    <PageContainer>
      <Header size={EHeadingSize.H3} text={'Browse Colleges by Metro'} />
      <ul className="list ma0 pa0 flex flex-wrap nl2 nr2">
        {props.metros.map(metro => (
          <li className="pa2">
            <Button
              size={EButtonSize.Medium}
              type={EButtonType.Secondary}
              text={metro.name}
              onClick={() => props.onSelect(metro)}
            />
          </li>
        ))}
      </ul>
    </PageContainer>
  );
};

export default MetrosIndexPage;
