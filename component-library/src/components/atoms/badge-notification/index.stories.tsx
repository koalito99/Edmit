import * as React from 'react';
import { storiesOf } from '@storybook/react';
import NotificationBadge from '.';

storiesOf('atoms/Badge Notification', module).add('Default', () => (
    <div>
        <NotificationBadge />
    </div>
));