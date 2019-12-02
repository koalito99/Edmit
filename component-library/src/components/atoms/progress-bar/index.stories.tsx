import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ProgressBar } from '.';
import { hexCrimson } from '../colors';

storiesOf('atoms/Progress Bars', module).add('Default', () => (
    <ProgressBar height={16} progressAmount={50} barColor={hexCrimson} />
));