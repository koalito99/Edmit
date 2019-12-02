import * as React from 'react';
import { FieldProps } from 'react-jsonschema-form';
import Text, { ETextType } from '../../../atoms/typography/text';

export interface IDescriptionFieldProps extends FieldProps {
  id?: string;
  description: string | JSX.Element;
}

const DescriptionField: React.SFC<IDescriptionFieldProps> = props => {
  const { id, description } = props;
  if (!description) {
    // See #312: Ensure compatibility with old versions of React.
    return <div />;
  }
  if (typeof description === 'string') {
    return <Text type={ETextType.Label}>{description}</Text>;
  } else {
    return (
      <div id={id} className="field-description">
        {description}
      </div>
    );
  }
};

export default DescriptionField;
