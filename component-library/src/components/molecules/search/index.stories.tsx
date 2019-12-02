import * as React from 'react';
import { storiesOf } from '@storybook/react';

import SearchColleges from '../search-colleges';
import SearchHighSchools from '../search-high-schools';
import SearchStudents from '../search-students';

storiesOf('molecules/Search', module).add('Default', () => (
    <div className="flex flex-row items-start nl2 nr2">
        <div className="w-third ph2">
            <SearchColleges options={[]} onSearch={() => null} />
        </div>
        <div className="w-third ph2">
            <SearchHighSchools options={[]} onSearch={() => null} />
        </div>
        <div className="w-third ph2">
            <SearchStudents options={[]} onSearch={() => null} />
        </div>
    </div>
));