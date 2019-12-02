import * as React from 'react';
import { storiesOf } from '@storybook/react';
import EarningsNetGraph from '.'


storiesOf('molecules/graph/Earnings Net', module).add('Default', () => (
    <div>
        <EarningsNetGraph
            data={[]}
            loading={false}
        />
    </div>
));