import * as React from 'react';
import withSizes from 'react-sizes';
import { scrollSpy } from 'react-scroll';
import PageContainer from '@edmit/component-library/src/components/atoms/page-container';
import Card from '@edmit/component-library/src/components/atoms/card';
import MetricCard from '@edmit/component-library/src/components/organisms/card-metric';

class MetricInfoPage extends React.Component<any> {
  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    return (
      <PageContainer className="pv5-l mh0">
        <Card className={'pv3-ns w-40'}>
          <MetricCard
            title={`Edstimate®`}
            tooltipText={`Tooltip`}
            value={'$88K'}
            yearValue={'4 yrs'}
            textColor={'#19a974'}
            className={'w-50 fl-ns'}
            isTooltipShow={true}
          />
          <MetricCard
            title={`Loan Amount`}
            value={'$25K'}
            yearValue={'4 yrs'}
            textColor={'#ff4136'}
            className={'w-50 fr-ns'}
          />
          <div className={'cb-ns'} />
        </Card>

        <Card className={'pv3-ns w-80'}>
          <MetricCard
            title={`Edstimate®`}
            tooltipText={`Tooltip`}
            value={'$88K'}
            yearValue={'per year'}
            textColor={'#19a974'}
            className={'w-25 fl-ns br b--moon-gray'}
            isTooltipShow={true}
          />
          <MetricCard
            title={`Affordability`}
            value={'$25K'}
            yearValue={'4 years'}
            textColor={'#ff4136'}
            className={'w-25 fl-ns br b--moon-gray'}
            isIconDisplay={true}
          />
          <MetricCard
            title={`Value`}
            textColor={'#ff4136'}
            className={'w-25 fl-ns br b--moon-gray'}
            isIconDisplay={true}
          />
          <MetricCard
            title={`Financial Grade`}
            textColor={'#ff4136'}
            className={'w-25 fr-ns'}
            isTooltipShow={true}
            isGradeScore={true}
          />
          <div className={'cb-ns'} />
        </Card>
      </PageContainer>
    );
  }
}

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width <= 640
});

export default withSizes(mapSizesToProps)(MetricInfoPage) as typeof MetricInfoPage;
