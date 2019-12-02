import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ProgressCircle from '.';

storiesOf('atoms/Progress Circle', module).add('Default', () => (
    <ProgressCircle progressPercentage={50} height={1} />
));