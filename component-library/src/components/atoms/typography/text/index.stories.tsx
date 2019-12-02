import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Text, { ETextType } from '.';

storiesOf('atoms/Typography', module)
    .add('Text', () => (
        <div>
            <Text>This is paragraph text. It is the default for the Text component.</Text>
            <Text className="t-large">This is paragraph text that is large.</Text>
            <Text type={ETextType.Label}>This is label (TextType.Label)</Text>
            <Text type={ETextType.Caption}>This is caption (TextType.Caption)</Text>
            <Text className="t-medium green-success">Add classNames for success/failure.</Text>
            <Text className="t-medium red-error">Add classNames for success/failure.</Text>
        </div>
    ));