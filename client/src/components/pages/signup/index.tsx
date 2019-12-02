import * as React from 'react';
import PageContainer from '@edmit/component-library/src/components/atoms/page-container';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import Text, { ETextType } from '@edmit/component-library/src/components/atoms/typography/text';
import DetailedIcon, { EDetailedIconName } from '@edmit/component-library/src/components/atoms/icon-detailed';
import Button, { EButtonSize, EButtonType } from '@edmit/component-library/src/components/atoms/button';
import Card from '@edmit/component-library/src/components/atoms/card';
import { history } from '../../../store';

const StandardCopy: React.FC = () => {
  return (
    <>
      <Heading
        size={EHeadingSize.H2}
        text={"Let's get smart about college."}
        className="mt0 mb2"
      />
      <Text className="mt0 mb4 t-large">Transparent college pricing and value, finally.</Text>
      <Text className="mv3">
        Families using Edmit make smarter college choices leading to less debt and better
        earnings, saving an average of over $5,000. Edmit gives you clear and personal
        information about college pricing and value.
            </Text>
      <Text className="mv3">
        With an account, you'll be able to save your list of colleges and cost estimates and
              compare schools easily side-by-side. <span className="fw7">It's free!</span>
      </Text>
      <Button
        type={EButtonType.Primary}
        size={EButtonSize.Large}
        text={'Sign up free'}
        onClick={() => {
          history.push('/get-started');
        }}
      />
    </>
  )
}

const SignupPage: React.SFC = () => {
  return (
    <PageContainer className="pv5-l">
      <div className="flex flex-column flex-row-l justify-between-l items-center-l">
        <div className="w-60-l mb5 mb0-l mr4-l">
          <Card className="pa4">
            <StandardCopy />
          </Card>
        </div>
        <div className="w-40-l ml4-l">
          <Text type={ETextType.Label} className="mt0 mb3 tc tl-l">
            How edmit works
          </Text>
          <div className="flex flex-column measure-wide-m center-m">
            <div className="flex flex-row mb4">
              <div className="mr3 pt1 flex-shrink-0">
                <DetailedIcon name={EDetailedIconName.UserProfile} width={48} />
              </div>
              <div>
                <Text className="mv0 fw7 t-medium">Build your profile.</Text>
                <Text className="mv0 t-medium">
                  Provide basic information about your personal and academic background.
                </Text>
              </div>
            </div>
            <div className="flex flex-row mb4">
              <div className="mr3 pt1 flex-shrink-0">
                <DetailedIcon name={EDetailedIconName.TuitionPrice} width={48} />
              </div>
              <div>
                <Text className="mv0 fw7 t-medium">Get your personal tuition estimate.</Text>
                <Text className="mv0 t-medium">
                  Our algorithm uses information you provide as well as what others like you have
                  paid.
                </Text>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="mr3 flex-shrink-0">
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
        </div>
      </div>
    </PageContainer>
  );
};

export default SignupPage;
