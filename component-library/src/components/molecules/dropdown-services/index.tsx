import * as React from 'react';
import DropdownWrapper from '../../atoms/dropdown/dropdown-wrapper';
import DropdownLinkWrapper from '../../atoms/dropdown/dropdown-wrapper-link';
import DropdownMenuWrapper, {
  EDropdownMenuTheme
} from '../../atoms/dropdown/dropdown-wrapper-menu';
import NavbarLink from '../../atoms/link-navbar';
import DropdownConsult from '../../molecules/dropdown-consult';
import { ECaretPosition } from '../../../shared';
import { ExtractPropsFromComponent } from '../../../lib/typescript';
import DropdownNotifications from '../../molecules/dropdown-notifications';

export interface IDropdownProfileViewModel {
  edmitPlusUser: boolean;

  user: {
    superUser: boolean;
    outboundInvitationCount: number;
    notifications: ExtractPropsFromComponent<typeof DropdownNotifications>['notifications'];
  } | null;

  loading: boolean;
}

export interface IDropdownProfileActions {
  onUpgrade: (reason: string | null) => void;
  onConsult: () => void;
  onAskQuestion: () => void;
  navLinkOnClickOverride?: (to: string) => void;
}

type DropdownProfileProps = IDropdownProfileViewModel & IDropdownProfileActions;

const DropdownServices: React.SFC<DropdownProfileProps> = props => {

  return (
    <DropdownWrapper
      className="inline-flex self-stretch items-center"
      trigger={
        <DropdownLinkWrapper className="inline-flex self-stretch items-center">
          <span className="lato inline-flex self-stretch items-center fw7 t-medium gray-dim ">
            Plus
          </span>
        </DropdownLinkWrapper>
      }
    >
      <DropdownMenuWrapper
        top={'36px'}
        right={'6px'}
        theme={EDropdownMenuTheme.White}
        caretPosition={ECaretPosition.Right}
      >
        <div className="pa2" style={{ minWidth: '150px' }}>
          <NavbarLink
            to={'/appeals'}
            label="Appeals"
            isSubmenu={true}
            onClickOverride={props.navLinkOnClickOverride}
          />
          <span className="fw7 t-large gray-dim">
            <span className="dn inline-flex-l self-stretch-l items-center-l relative">
              <DropdownConsult
                edmitPlusUser={props.edmitPlusUser}
                onConsult={props.onConsult}
                onUpgrade={() =>
                  props.onUpgrade(
                    'get access to one-on-one support with an expert at any step of the college application and selection process'
                  )
                }
                onAskQuestion={props.onAskQuestion}
              />
            </span>
          </span>
        </div>
      </DropdownMenuWrapper>
    </DropdownWrapper>
  );
};

export default DropdownServices;
