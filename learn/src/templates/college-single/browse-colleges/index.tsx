import * as React from 'react';
import { OffWhiteSection, Single, OneHalf, OneThird } from '../shared';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import Button, { EButtonSize, EButtonType } from '@edmit/component-library/src/components/atoms/button';
import * as numeral from "numeral";

interface ICollegeBrowseLearnMoreBodyProps {
  colleges: Array<{
    name: string;
    costOfAttendance: number;
    edstimate?: number;
  }>
}

const SimilarSchool: React.FC<{
  name: string;
  costOfAttendance: number;
  edstimate?: number;
}> = props => {
  return <OneThird className="br b--light-gray">
    <Heading size={EHeadingSize.H3} className={'tc'} text={props.name} />
    <Text className="t-medium black tc pv1">Cost of Attendance</Text>
    <Heading size={EHeadingSize.H2} className={'green-success tc'} text={<span className={"lato b f1"}>{numeral(props.costOfAttendance).format("$0,0")}</span>} />
    <Text className="t-medium black tc pv1">Edstimate®</Text>
    <Heading size={EHeadingSize.H2} className={'green-success tc'} text={<span className={"lato b f1"}>{props.edstimate ? numeral(props.edstimate).format("$0,0") : "?"}</span>} />
    <Button size={EButtonSize.Large} type={EButtonType.Primary} text="GET YOUR PRICE" />
  </OneThird>;
}

export const CollegeSimilarSchoolsBody: React.SFC<ICollegeBrowseLearnMoreBodyProps> = props => {
  return (
    <>
      <OffWhiteSection className="bg-white tc">
        <SimilarSchool {...props.colleges[0]} />
        <SimilarSchool {...props.colleges[1]} />
        <SimilarSchool {...props.colleges[2]} />
      </OffWhiteSection>
    </>
  );
};

// export const CollegeBrowseReadMoreBody: React.SFC = props => {
//   return (
//     <>
//       <Heading size={EHeadingSize.H2} text="Read more about Auburn University" />
//       <OffWhiteSection className="bg-white shadow-1">
//         <OneHalf />
//         <OneHalf>
//           <Text className="green-success t-medium">SCHOLARSHIPS</Text>
//           <Text className="black t-large">Is the ACT or SAt better for Scholarships?</Text>
//           <Text className="black t-medium">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</Text>
//           <Button size={EButtonSize.Large} type={EButtonType.Secondary} text={'READ'} className="mt4"/>
//         </OneHalf>
//       </OffWhiteSection>
//
//       <span className="crimson t-medium db tr mv3">SEE ALL ABOUT SCHOLARSHIPS &gt;</span>
//     </>
//   );
// };

interface ICollegeBrowseLearnMoreBody {
  name: string;
}

export const CollegeBrowseLearnMoreBody: React.SFC<ICollegeBrowseLearnMoreBody> = props => {
  return (
    <>
      <Heading size={EHeadingSize.H2} text={`Read more about ${props.name}`} />
      <OffWhiteSection className="bg-white shadow-1">
        <OneHalf />
        <OneHalf>
          <Text className="green-success t-medium">SCHOLARSHIPS</Text>
          <Text className="black t-large">Title</Text>
          <Text className="black t-medium">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</Text>
          <Button size={EButtonSize.Large} type={EButtonType.Secondary} text={'READ'} className="mt4" />
        </OneHalf>
      </OffWhiteSection>

      <OffWhiteSection className="bg-white mt3">
        <OneHalf className="shadow-1">
          <Text className="green-success t-medium">FINANCIAL AID</Text>
          <Text className="black t-large">Title</Text>
          <Text className="black t-medium">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</Text>
          <Button size={EButtonSize.Large} type={EButtonType.Secondary} text={'READ'} className="mt4" />
        </OneHalf>
        <OneHalf className="shadow-1">
          <Text className="green-success t-medium">FINANCIAL AID</Text>
          <Text className="black t-large">What is FAFSA and how does it work?</Text>
          <Text className="black t-medium">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</Text>
          <Button size={EButtonSize.Large} type={EButtonType.Secondary} text={'READ'} className="mt4" />
        </OneHalf>
      </OffWhiteSection>

      <span className="crimson t-medium db tr mv3">SEE ALL LEARN MORE &gt;</span>
    </>
  );
};