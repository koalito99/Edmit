import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Tag from '.'

storiesOf('atoms/Tag', module).add('Default', () => (
    <Tag label={"Tag string"} />
));