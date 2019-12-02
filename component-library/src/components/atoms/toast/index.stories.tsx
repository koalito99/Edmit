import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Toast from '.'
import { EIconName } from '../icon';

storiesOf('atoms/Toast', module).add('Default', () => (
    <Toast iconName={EIconName.Success} messageText={"messageText!"} foregroundColor={"black"} backgroundColor={"white"} />
));