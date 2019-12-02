import * as React from 'react';
import Navdrawer from '../../molecules/navdrawer';
import NavdrawerLink from '../../atoms/link-navdrawer';
import Button, { EButtonIconPosition, EButtonSize, EButtonType } from '../../atoms/button';
import { EIconName } from '../../atoms/icon';

export interface ICompareMenuNavViewModel {
  active: boolean;
  edmitPlusUser: boolean;
  reportCount: number;
}

export interface ICompareMenuNavActions {
  onCloseMobileMenu: () => any | void;
  onGetReport: () => void;
}

type CompareMenuNavProps = ICompareMenuNavViewModel & ICompareMenuNavActions;

const CompareMenuNav: React.SFC<CompareMenuNavProps> = props => (
  <Navdrawer
    top={96}
    right={true}
    active={props.active}
    zIndex={996}
    minWidth={200}
    classNameContainer="nav-menu-compare"
  >
    <NavdrawerLink
      to="/compare/summary"
      label="Summary"
      onClick={() => props.onCloseMobileMenu()}
    />
    <NavdrawerLink to="/compare/cost" label="Cost" onClick={() => props.onCloseMobileMenu()} />
    <NavdrawerLink to="/compare/value" label="Value" onClick={() => props.onCloseMobileMenu()} />

    {props.edmitPlusUser &&
      props.reportCount === 0 && (
        <span className="ph3 pv2">
          <Button
            size={EButtonSize.Medium}
            type={EButtonType.Primary}
            text={'Get Report'}
            onClick={props.onGetReport}
            icon={{
              name: EIconName.Article,
              position: EButtonIconPosition.Left
            }}
          />
        </span>
      )}
    <span className="flex-auto" />
  </Navdrawer>
);

export default CompareMenuNav;
