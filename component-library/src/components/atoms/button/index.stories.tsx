import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Button, { EButtonIconPosition, EButtonSize, EButtonType } from '.';
import { EIconName } from "../icon"

storiesOf('atoms/Buttons', module).add('Primary', () => (
    <div>
        <Button size={EButtonSize.Large} type={EButtonType.Primary} text={'Button: Large - Primary'} />
        <Button
            size={EButtonSize.Medium}
            type={EButtonType.Primary}
            text={'Button: Medium - Primary'}
        />
        <Button size={EButtonSize.Small} type={EButtonType.Primary} text={'Button: Small - Primary'} />
    </div>
));

storiesOf('atoms/Buttons', module)
    .add('Secondary', () => (
        <div>
            <Button
                size={EButtonSize.Large}
                type={EButtonType.Secondary}
                text={'Button: Large - Secondary'}
            />
            <Button
                size={EButtonSize.Medium}
                type={EButtonType.Secondary}
                text={'Button: Medium - Secondary'}
            />
            <Button
                size={EButtonSize.Small}
                type={EButtonType.Secondary}
                text={'Button: Small - Secondary'}
            />
        </div>
    ))
    .add('Disabled', () => (
        <Button
            size={EButtonSize.Medium}
            type={EButtonType.Primary}
            text={'Button: Disabled'}
            disabled={true}
        />
    ))
    .add('Loading', () => (
        <Button
            size={EButtonSize.Medium}
            type={EButtonType.Primary}
            text={'Button: Loading'}
            loading={{
                text: 'Loading text'
            }}
        />
    ))
    .add('Icon Left', () => (
        <Button
            size={EButtonSize.Medium}
            type={EButtonType.Primary}
            text={'Icon Left'}
            icon={{
                name: EIconName.MyColleges,
                position: EButtonIconPosition.Left
            }}
        />
    ))
    .add('Icon Right', () => (
        <Button
            size={EButtonSize.Medium}
            type={EButtonType.Primary}
            text={'Icon Right'}
            icon={{
                name: EIconName.MyColleges,
                position: EButtonIconPosition.Right
            }}
        />
    ));