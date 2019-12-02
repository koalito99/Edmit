import * as React from 'react';
import DropdownWrapper from '../../atoms/dropdown/dropdown-wrapper';
import DropdownLinkWrapper from '../../atoms/dropdown/dropdown-wrapper-link';
import DropdownMenuWrapper, {
  EDropdownMenuTheme
} from '../../atoms/dropdown/dropdown-wrapper-menu';
import DropdownFooterWrapper from '../../atoms/dropdown/dropdown-wrapper-footer';
import { EIconName } from '../../atoms/icon';
import Button, { EButtonIconPosition, EButtonSize, EButtonType } from '../../atoms/button';
import Text from '../../atoms/typography/text';
import { ECaretPosition } from '../../../shared';

export interface IDropdownReportActions {
  onConsult: () => any | void;
}

type DropdownReportProps = IDropdownReportActions;

const DropdownReport: React.SFC<DropdownReportProps> = props => (
  <DropdownWrapper
    className="inline-flex self-stretch items-center"
    trigger={
      <DropdownLinkWrapper className="inline-flex self-stretch items-center ph2">
        <Button
          size={EButtonSize.Medium}
          type={EButtonType.Primary}
          text={'Get Report'}
          spacing={true}
          icon={{
            name: EIconName.Article,
            position: EButtonIconPosition.Left
          }}
        />
      </DropdownLinkWrapper>
    }
  >
    <DropdownMenuWrapper
      top={'36px'}
      right={'0px'}
      theme={EDropdownMenuTheme.White}
      caretPosition={ECaretPosition.Right}
    >
      <div className="pa2" style={{ minWidth: '240px' }}>
        <Text className="mv0 fw7 t-medium">Schedule a consult</Text>
        <Text className="mv0 t-medium">
          Edmit consultations provide help at any step of the college process and include an
          additional report with personalized recommendations.
        </Text>
      </div>
      <DropdownFooterWrapper>
        <Button
          size={EButtonSize.Medium}
          type={EButtonType.Primary}
          text={'Schedule Consult'}
          onClick={props.onConsult}
        />
      </DropdownFooterWrapper>
    </DropdownMenuWrapper>
  </DropdownWrapper>
);

export default DropdownReport;
