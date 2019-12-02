import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Banner from '.';

storiesOf('atoms/Banner', module).add('Default', () => (
    <div>
        <Banner messageText={"Banner Text"} />
    </div>
));