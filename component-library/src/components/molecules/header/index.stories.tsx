import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Header from '.';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';
import { EHeadingSize } from '../../atoms/typography/heading';

storiesOf('molecules/Headers', module).add('Default', () => (
    <Header text={'My Colleges'} size={EHeadingSize.H3}>
        <Button
            size={EButtonSize.Medium}
            type={EButtonType.Secondary}
            text={'Button 2'}
            spacing={true}
        />
        <Button size={EButtonSize.Medium} type={EButtonType.Primary} text={'Button 1'} />
    </Header>
));