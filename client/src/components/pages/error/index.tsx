import * as React from 'react';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import TextLink from '@edmit/component-library/src/components/atoms/link-text';

const ErrorPage: React.SFC = () => {
  return (
    <div className="center mw8 ph3 pv5 tc">
      <Heading size={EHeadingSize.H3} text={'Oops, something went wrong.'} className="mt0 mb2" />
      <Text className="mv0 measure center">
        Sorry about that, try heading back to the <TextLink to="my-colleges">My Colleges</TextLink>{' '}
        page or check out our <TextLink to="https://status.edmit.me">Status</TextLink> page to see
        if there is any planned downtime.
      </Text>
    </div>
  );
};

export default ErrorPage;
