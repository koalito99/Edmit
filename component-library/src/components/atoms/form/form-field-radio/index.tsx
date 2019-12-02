import * as React from 'react';
import Text from '../../typography/text';

export interface IFormFieldRadioViewModel {
  name: string;
  label: string | JSX.Element;
  options: Array<{
    checked?: boolean;
    disabled?: boolean;
    id: string;
    label: string;
  }>;
  tabIndex?: number;
}

type FormFieldRadioProps = IFormFieldRadioViewModel;

const FormFieldRadio: React.SFC<FormFieldRadioProps> = props => (
  <span>
    <Text className="mt0 mb2 fw7 t-medium black">{props.label}</Text>
    <div>
      {props.options.map((option: any) => (
        <div className="flex flex-row items-baseline mv2 pt1">
          <input
            id={option.id}
            value={option.id}
            name={props.name}
            checked={option.checked}
            type="radio"
            className=""
            disabled={option.disabled}
            tabIndex={props.tabIndex}
          />
          <label htmlFor={option.id} className="ml2">
            <Text className="mv0 f5 lh-solid">{option.label}</Text>
          </label>
        </div>
      ))}
    </div>
  </span>
);

export default FormFieldRadio;
