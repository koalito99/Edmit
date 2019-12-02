import * as React from 'react';
import Button, { EButtonSize, EButtonType } from '../../button';
import Text, { ETextType } from '../../typography/text';

export interface IFormFieldFileViewModel {
  name: string;
  label: string | JSX.Element;
  value: File | null;
  buttonSize?: EButtonSize;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  tabIndex?: number;
}

export interface IFormFieldFileActions {
  onChange?: (value: File | null) => void;
}

type FormFieldFileProps = IFormFieldFileViewModel & IFormFieldFileActions;

const FormFieldFile: React.SFC<FormFieldFileProps> = props => (
  <span className="input-file-upload-wrapper">
    <Text className="mv0 fw7 t-medium black">{props.label}</Text>
    <input
      // onChange={ (e: any) => componentProps.input.onChange(e.target.files[0]) }
      // value={ componentProps.input.value }
      name={props.name}
      type="file"
      accept="image/*,application/pdf"
      className={'input-file-upload ' + props.className}
      onChange={event => {
        if (props.onChange) {
          props.onChange(
            event.target.files && event.target.files[0] ? event.target.files[0] : null
          );
        }
      }}
      tabIndex={props.tabIndex}
    />
    <Button
      size={props.buttonSize || EButtonSize.Medium}
      type={EButtonType.Primary}
      disabled={props.disabled}
      text={'Select an image file or PDF'}
    />
    <Text className="mv0 t-medium i">{props.value ? props.value.name : ''}</Text>
    <Text type={ETextType.Error} className={'mt2 mb0 ' + (props.errorMessage ? 'db' : 'dn')}>
      {props.errorMessage}
    </Text>
  </span>
);

export default FormFieldFile;
