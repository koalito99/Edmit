import * as React from 'react';
import DropdownWrapper from '@edmit/component-library/src/components/atoms/dropdown/dropdown-wrapper';
import DropdownLinkWrapper from '@edmit/component-library/src/components/atoms/dropdown/dropdown-wrapper-link';
import DropdownMenuWrapper, {
  EDropdownMenuTheme
} from '@edmit/component-library/src/components/atoms/dropdown/dropdown-wrapper-menu';
import DropdownFooterWrapper from '@edmit/component-library/src/components/atoms/dropdown/dropdown-wrapper-footer';
// import Icon, { EIconName } from '../../atoms/icon';
import Button, { EButtonSize, EButtonType } from '@edmit/component-library/src/components/atoms/button';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import { ECaretPosition } from '@edmit/component-library/src/shared';

export interface IDropdownConsultViewModel {
  edmitPlusUser: boolean;
}

export interface IDropdownConsultActions {
  onUpgrade: () => void;
  onConsult: () => void;
  onAskQuestion: () => void;
}

type DropdownConsultProps = IDropdownConsultViewModel & IDropdownConsultActions;

const DropdownConsult: React.SFC<DropdownConsultProps> = props => (
  <DropdownWrapper
    className="inline-flex self-stretch items-center"
    trigger={
      <DropdownLinkWrapper className="inline-flex self-stretch items-center ph2 gray-dim hover-crimson pointer">
        {/*<Icon name={EIconName.Hotline} className="mr1" />*/}
        <span className="fw7 t-medium">{'Schedule a Consult'}</span>
      </DropdownLinkWrapper>
    }
  >
    <DropdownMenuWrapper
      top={'24px'}
      left={'-110px'}
      theme={EDropdownMenuTheme.White}
      caretPosition={ECaretPosition.Center}
    >
      <div className="pa2" style={{ minWidth: '240px' }}>
        <Text className="mv0 fw7 t-medium">
          {!props.edmitPlusUser
            ? 'Expert advice about the dollars & cents of college.'
            : 'What questions do you have? We’re standing by!'}
        </Text>
        <Text className="mv0 t-medium">
          {!props.edmitPlusUser
            ? 'Upgrade for unlimited Q&A via email or chat, or access to affordable phone consultations (starting at $30).'
            : 'Get unlimited answers via chat and email (free); you can also schedule a  phone consultation ($30 for 30 min).'}
        </Text>
      </div>
      <DropdownFooterWrapper>
        {!props.edmitPlusUser ? (
          <Button
            size={EButtonSize.Medium}
            type={EButtonType.Primary}
            text={'Upgrade'}
            className={'w-100'}
            onClick={props.onUpgrade}
          />
        ) : (
            <>
              <Button
                size={EButtonSize.Medium}
                type={EButtonType.Primary}
                text={'Ask a Question'}
                className={'mr1'}
                onClick={props.onAskQuestion}
              />
              <Button
                size={EButtonSize.Medium}
                type={EButtonType.Primary}
                text={'Schedule a Consult'}
                onClick={props.onConsult}
              />
            </>
          )}
      </DropdownFooterWrapper>
    </DropdownMenuWrapper>
  </DropdownWrapper>
);

export default DropdownConsult;
