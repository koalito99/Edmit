import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Logo, { ELogoColor } from '.';

storiesOf('atoms/Logo', module)
    .add('Crimson', () => <Logo color={ELogoColor.Crimson} width={240} />)
    .add('White', () => (
        <div style={{ backgroundColor: ELogoColor.Crimson, display: 'inline-block' }}>
            <Logo color={ELogoColor.White} width={240} />
        </div>
    ));