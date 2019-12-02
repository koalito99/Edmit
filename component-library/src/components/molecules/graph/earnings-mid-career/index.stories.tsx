import * as React from 'react';
import { storiesOf } from '@storybook/react';
import EarningsMidCareerGraph from '.'
import { EPersonType } from '../../../../shared/index'


storiesOf('molecules/graph/Earnings Mid-Career', module).add('Default', () => (
    <div>
        <EarningsMidCareerGraph
            colleges={[]}
            personType={EPersonType.STUDENT}
            highSchoolEarnings={10000}
            loading={false}
        />
    </div>
));