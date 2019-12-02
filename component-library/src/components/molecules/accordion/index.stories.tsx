import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Accordian from '.';

//Having type issues with title, expecting React.ReactChild; ?


storiesOf('molecules/Accordian', module).add('Default', () => (
    <div>
        <Accordian />
    </div>
));