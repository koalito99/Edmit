import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Heading, { EHeadingSize } from '.';

storiesOf('atoms/Typography', module)
    .add('Heading', () => (
        <div>
            <Heading size={EHeadingSize.H1} text={'Heading 1'} />
            <Heading size={EHeadingSize.H2} text={'Heading 2'} />
            <Heading size={EHeadingSize.H3} text={'Heading 3'} />
            <Heading size={EHeadingSize.H4} text={'Heading 4'} />
        </div>
    ));