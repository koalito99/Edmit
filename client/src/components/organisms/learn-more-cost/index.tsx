import * as React from 'react';
import {
  OffWhiteSection,
  OneHalf
} from '../../pages/report/shared';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import { hexGreen } from '@edmit/component-library/src/components/atoms/colors';
import Card from '@edmit/component-library/src/components/atoms/card';

const LearnMoreCost: React.SFC<any> = props => {
  return (
    <Card>
      <Heading size={EHeadingSize.H3} text={"Learn more about Cost"} />
      <OffWhiteSection className="bg-white shadow-1">
        <OneHalf />
        <OneHalf>
          <Text className="t-medium pa2" style={{color: hexGreen}}>Cost</Text>
          <Text className="black t-large pa1">True Cost of College</Text>
          <Text className="t-medium pa1">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</Text>
        </OneHalf>        
      </OffWhiteSection>
      <Text className="tr ma2 crimson pr2">SEE ALL ABOUT COST &nbsp; &gt;</Text>
    </Card>
  );
}

export default LearnMoreCost;