import * as React from 'react';
import {
  IReportCollege,
  OneFourth,
} from '../shared'
// import { effectivePriceCopy } from '../../../lib/price';
import { formatDollarsShort, edstimateCopy } from '@edmit/component-library/src/shared';
import { conceptColor } from '@edmit/component-library/src/components/atoms/colors';
import MetricCard from '@edmit/component-library/src/components/organisms/card-metric';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import Icon, { EIconName } from '@edmit/component-library/src/components/atoms/icon';

export interface IKeyTakeawaysProps {
  colleges: IReportCollege[];
  numColleges?: number;
  opened: boolean;
}

export interface IKeyTakeawaysActions {
  onOpen?: (opened: boolean) => void;
}

type KeyTakeawaysComponentProps = IKeyTakeawaysProps & IKeyTakeawaysActions;

const KeyTakeaways: React.SFC<KeyTakeawaysComponentProps> = props => {
  return (
    <>
      <div className="flex-wrap mt4 w-100 w-70-l dn flex-l fr">
        <OneFourth>
          <Text className={'black tc mv0'}>{edstimateCopy}</Text>
        </OneFourth>
        <OneFourth>
          <Text className={'black tc mv0'}>Affordability</Text>
        </OneFourth>
        <OneFourth>
          <Text className={'black tc mv0'}>Value</Text>
        </OneFourth>
        <OneFourth>
          <Text className={'black tc mv0'}>Financial Grade</Text>
        </OneFourth>
      </div>
      <div className="cb" />
      {props.colleges.slice(0, !props.opened ? 2 : undefined).map(college => (
        <>
          <div className={"flex justify-between"}>
            <div className={"dn w-30 flex-l items-center"}>
              <Text className={'black t-large'}>{college.name}</Text>
            </div>
            <div className="bg-offwhite w-100 w-70-l mv4">
              <Text className={'black t-large db dn-l mh3'}>{college.name}</Text>
              <div className={'flex flex-wrap w-100 pb2 pb0-l'}>
                <OneFourth>
                  <Text className={'db dn-l gray-muted tc mv0'}>{edstimateCopy}</Text>
                  <MetricCard
                    value={formatDollarsShort(college.effectiveCost)}
                    yearValue={'per yr'}
                    textColor={conceptColor.edstimate}
                  />
                </OneFourth>
                <OneFourth>
                  <Text className={'db dn-l gray-muted tc mv0'}>Affordability</Text>
                  <MetricCard
                    isIconDisplay={true}
                    iconType={
                      college.affordabilityDetermination === 'Affordable' ? 'Check' : 'Close'
                    }
                  />
                </OneFourth>
                <OneFourth>
                  <Text className={'db dn-l gray-muted tc mv0'}>Value</Text>
                  <MetricCard
                    isIconDisplay={true}
                    iconType={college.valueDetermination === 'GoodValue' ? 'Check' : 'Close'}
                  />
                </OneFourth>
                <OneFourth>
                  <Text className={'db dn-l gray-muted tc mv0'}>Financial Grade</Text>
                  <MetricCard
                    isGradeScore={true}
                    score={college.financialGrade}
                  />
                </OneFourth>
              </div>
            </div>
          </div>
        </>
      ))}
      {(props.colleges.length > 2) && (!props.opened ?
        <span onClick={() => props.onOpen && props.onOpen(true)} className={'pointer'}><Text className={'black t-medium tr'}>Show More <Icon name={EIconName.ChevronDown} /></Text></span>
        :
        <span onClick={() => props.onOpen && props.onOpen(false)} className={'pointer'}><Text className={'black t-medium tr'}>Show Less <Icon name={EIconName.ChevronUp} /></Text></span>)
      }
    </>
  );
}

export default KeyTakeaways;