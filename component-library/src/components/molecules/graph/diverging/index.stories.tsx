import * as React from 'react';
import { storiesOf } from '@storybook/react';
import DivergingGraph from '.'


storiesOf('molecules/graph/diverging', module).add('Default', () => (
    <div>
        <DivergingGraph
            measures={[]}
            loading={false}
        />
    </div>
));