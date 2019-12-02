import * as React from 'react';
import { storiesOf } from '@storybook/react';

import SearchColleges from '../src/components/molecules/search-colleges';
import SearchHighSchools from '../src/components/molecules/search-high-schools';
import SearchStudents from '../src/components/molecules/search-students';

//MADE SEPARATE FOLDER CALLED 'search' in molecules:
storiesOf('Search', module).add('Default', () => (
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

storiesOf('Modals', module);
/*
  <Modal maxWidth={400}>
    Modal
  </Modal>
*/

storiesOf('Dialogs', module);
/*
  <Dialog
    dialogHeader={"Dialog Header"}
    dialogText={"This is some dialog text for the dialog modal."}
    confirmButtonText={"Confirm"}
    cancelButtonText={"Cancel"}
  />
*/

// storiesOf("Charts", module)
// .add("", () => <div>
//    <ValueChart colleges={currentCollegesForCharts} />
//     <EdstimateChart colleges={currentCollegesForCharts} />
//     <CostOfAttendanceChart colleges={currentCollegesForCharts} />
//     <AffordabilityChart colleges={currentCollegesForCharts} />
//     <EarningsMidCareerChart
//       colleges={currentCollegesForCharts}
//       highSchoolEarnings={50000}
//     />
//     <EarningsAnnualChart colleges={currentCollegesForCharts} />
// </div>)


/* <RecommendedCollegeDetailsCard
  name="Northeastern University"
  location="Boston, MA"
  logoSrc={NortheasternLogo}
  admissibilityPercentage={65}
  totalFitScore={65}
  fitData={[
    {
      dimension: 'Value',
      value: 33
    },
    {
      dimension: 'Earnings Potential',
      value: 43
    },
    {
      dimension: 'Affordability',
      value: 24
    }
  ]}
  collegeCost={45530}
  collegeEdstimate={19539}
  collegeEarnings={2009324}
  caretPosition={ECaretPosition.Center}
/> */
