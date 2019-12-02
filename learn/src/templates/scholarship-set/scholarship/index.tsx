import * as React from 'react'
import Text from '@edmit/component-library/src/components/atoms/typography/text'
import Button, {
  EButtonSize,
  EButtonType,
} from '@edmit/component-library/src/components/atoms/button'
import Card from '@edmit/component-library/src/components/atoms/card'
import Icon, { EIconName } from '@edmit/component-library/src/components/atoms/icon'
import classNames from 'classnames'
import CollegeFeatures from '../../../molecules/features'
import { OffWhiteSection } from '../../../atoms/sections'
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading'
import * as numeral from "numeral"

interface IScholarshipValueViewModel {
  label: string;

  style?: React.CSSProperties;
  className?: string;
}

interface IScholarshipValueActions {

}

type ScholarshipValueProps = IScholarshipValueViewModel & IScholarshipValueActions;

const ScholarshipValue: React.FC<ScholarshipValueProps> = props => {
  return (
    <div style={props.style} className={'mh4-ns mh1 flex flex-column ' + props.className}>
      <Text className="t-medium black tc pv1 mv1">
        {props.label}
      </Text>
      <div className={"flex-grow-1"} />
      <Heading
        size={EHeadingSize.H2}
        className={'tc mt0 mb2'}
        text={
          <span className={'lato b f2'}>
            {props.children}
          </span>
        }
      />
    </div>
  )
}


interface IScholarshipViewModel {
  name: string
  url: string

  awardAmount: number;
  applicationDeadline: Date;
  awardsAvailable: number;

  college?: {
    name: string;
  }

  selectedFeatures: string[]

  gpa: string | null
  sat: number | null
  act: number | null

  style?: React.CSSProperties
  className?: string

  stateRequired: string | null;
}

interface IScholarshipActions { }

type ScholarshipProps = IScholarshipViewModel & IScholarshipActions

const Scholarship: React.FC<ScholarshipProps> = props => {
  const name = props.name ? `${props.name} - ${props.college.name}` : props.college.name

  return (
    <Card
      style={props.style}
      className={classNames('flex mb3', props.className)}
    >
      <div className={'w-100-ns w-100 flex flex-column'}>
        <div className={'pa4'}>
          <Text className={'mv0 t-large tl b'}>
            <span className={'black'}>{name}</span>
          </Text>
          <OffWhiteSection className={"pa3"}>
            <div
              className={
                'w-100 mt3 flex justify-center flex-wrap flex-nowrap-ns pb2'
              }
            >
              <ScholarshipValue label={"Award Amount"} className={'w-third-ns w-100 mv0-ns mv2'}>
                {numeral(props.awardAmount).format('$0,0')}
              </ScholarshipValue>
            </div>
          </OffWhiteSection>
          <div className={'pa2 mt4 flex flex-column flex-wrap'}>
            {(props.sat) && (
              <div className={'pa1 f4'}>
                <span className={'mr1'}>
                  <Icon
                    name={EIconName.HighSchool}
                    className={'t-large lightest-green'}
                  />
                </span>
                <span className={'t-medium'}>
                  <span>  <strong>{props.sat}</strong>   SAT required</span>
                </span>
              </div>
            )}
            {(props.act) && (
              <div className={'pa1 f4'}>
                <span className={'mr1'}>
                  <Icon
                    name={EIconName.HighSchool}
                    className={'t-large lightest-green'}
                  />
                </span>
                <span className={'t-medium'}>
                  <span>  <strong>{props.act}</strong>   ACT required</span>
                </span>
              </div>
            )}
            {(props.gpa) && (
              <div className={'pa1 f4'}>
                <span className={'mr1'}>
                  <Icon
                    name={EIconName.HighSchool}
                    className={'t-large lightest-green'}
                  />
                </span>
                <span className={'t-medium'}>
                  <span>  <strong>{props.gpa}</strong>   GPA required</span>
                </span>
              </div>
            )}
            {(props.stateRequired) && (
              <div className={'pa1 f4'}>
                <span className={'mr1'}>
                  <Icon
                    name={EIconName.Household}
                    className={'t-large lightest-green'}
                  />
                </span>
                <span className={'t-medium'}>
                  <span>residency required</span>
                </span>
              </div>
            )}
            {(props.url) && (
              <div className="pa1 f4">
                <p className="small"><a href={props.url} target="_blank" className={"no-underline fw7 crimson hover-crimson-dark pointer"}>Learn more about this scholarship</a></p>
              </div>
            )}
          </div>
        </div>
        <div className={"w-100 flex-grow-1"} />
        <div className="tr mt3 pa3 bt b--moon-gray">
          <div className={'flex justify-end'}>
            <Button
              text={'Compare'}
              size={EButtonSize.Medium}
              type={EButtonType.Primary}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Scholarship
