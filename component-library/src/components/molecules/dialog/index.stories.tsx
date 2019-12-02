import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Dialog from '.'

//Target container is not a DOM element

storiesOf('molecules/Dialog', module).add('Default', () => (
    <div>
        <Dialog
            header={"Header"}
            text={"Body Text"}
            isOpen={true}
        />
    </div>
));