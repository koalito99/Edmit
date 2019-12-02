import * as React from 'react';
import PageContainer from '@edmit/component-library/src/components/atoms/page-container';
import Header from '@edmit/component-library/src/components/molecules/header';
import { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import Button, { EButtonSize, EButtonType } from '@edmit/component-library/src/components/atoms/button';

interface IState {
  id: string;
  abbreviation: string;
  name: string;
  slug?: string;
}

interface IStatesIndexPageViewModel {
  states: IState[];
}

interface IStatesIndexPageActions {
  onSelect: (state: IState) => void;
}

type StateIndexPageProps = IStatesIndexPageViewModel & IStatesIndexPageActions;

const StatesIndexPage: React.SFC<StateIndexPageProps> = props => {
  return (
    <PageContainer>
      <Header size={EHeadingSize.H3} text={'Browse Colleges by State'} />
      <ul className="list ma0 pa0 flex flex-wrap nl2 nr2">
        {props.states.map(state => (
          <li className="pa2">
            <Button
              size={EButtonSize.Medium}
              type={EButtonType.Secondary}
              text={state.name}
              onClick={() => props.onSelect(state)}
            />
          </li>
        ))}
      </ul>
    </PageContainer>
  );
};

export default StatesIndexPage;
