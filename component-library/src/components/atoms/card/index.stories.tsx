import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Card from '.';
import Text from '../typography/text';

storiesOf('atoms/Cards', module).add('Text', () => (
    <Card className="pa3">
        <Text className="mv0">This is a card with some text.</Text>
    </Card>
));