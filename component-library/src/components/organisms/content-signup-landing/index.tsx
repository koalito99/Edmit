import * as React from 'react';
import Heading, { EHeadingSize } from '../../atoms/typography/heading';
import Text from '../../atoms/typography/text';
import DetailedIcon, { EDetailedIconName } from '../../atoms/icon-detailed';

const SignupLandingContent: React.SFC = () => (
  <div>
    <Heading size={EHeadingSize.H2} text={"Let's get smart about college."} className="mt0 mb2" />
    <Text className="mt0">
      Edmit gives you clear and personal information about college pricing and value. We help you
      consider your options and request more aid, starting with just four questions.
    </Text>
    <Text className="mb0">
      With an account, you'll be able to save your list of colleges and cost estimates and compare
      schools easily side-by-side. <span className="fw7">It's free!</span>
    </Text>
    <div className="mv4 flex flex-row">
      <div className="mr3 pt1">
        <DetailedIcon name={EDetailedIconName.UserProfile} width={48} />
      </div>
      <div>
        <Text className="mv0 fw7 t-medium">Build your profile.</Text>
        <Text className="mv0 t-medium">
          Provide basic information about your personal and academic background.
        </Text>
      </div>
    </div>
    <div className="mv4 flex flex-row">
      <div className="mr3 pt1">
        <DetailedIcon name={EDetailedIconName.TuitionPrice} width={48} />
      </div>
      <div>
        <Text className="mv0 fw7 t-medium">Get your personal tuition estimate.</Text>
        <Text className="mv0 t-medium">
          Our algorithm uses information you provide as well as what others like you have paid.
        </Text>
      </div>
    </div>
    <div className="mv4 flex flex-row">
      <div className="mr3">
        <DetailedIcon name={EDetailedIconName.ConnectWithCollege} width={48} />
      </div>
      <div>
        <Text className="mv0 fw7 t-medium">Pay less and get more.</Text>
        <Text className="mv0 t-medium">
          Edmit helps you run the numbers, appeal your award, and choose the right school.
        </Text>
      </div>
    </div>
  </div>
);

export default SignupLandingContent;
