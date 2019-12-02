import * as React from 'react';
import { storiesOf } from '@storybook/react';
import EarningsAnnualGraph from '.'


storiesOf('molecules/graph/Earnings Annual', module).add('Default', () => (
    <div>
        <EarningsAnnualGraph
            colleges={[]}
            loading={false}
        />
    </div>
));