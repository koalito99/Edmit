import * as React from 'react';
import { storiesOf } from '@storybook/react';
import AdmissibilityGraph from '.';

storiesOf('molecules/graph/admissibility', module).add('Default', () => (
    <div>
        <AdmissibilityGraph
            admissibilityPercentage={48}
            height={10}
            loading={false}
        />
    </div>
));