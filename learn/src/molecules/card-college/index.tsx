import * as React from 'react'
import Text from '@edmit/component-library/src/components/atoms/typography/text'
import CollegeFeatures, { Pair } from '@edmit/component-library/src/components/molecules/college-features'
import Button, {
  EButtonSize,
  EButtonType,
} from '@edmit/component-library/src/components/atoms/button'
import Card from '@edmit/component-library/src/components/atoms/card'
import classNames from 'classnames'

interface ICollegeCardViewModel {
  name: string
  slug?: string

  features: string[]
  selectedFeatures: string[]

  majors: Array<{ id: string; name: string }>
  major: { id: string; name: string } | null

  gpa: string | null
  sat: number | null
  act: number | null

  gpaRange: Pair<string>
  satRange: Pair<number>
  actRange: Pair<number>

  style?: React.CSSProperties
  className?: string
  firstYearEarnings?: number | null;
}

interface ICollegeCardActions { }

type CollegeCardProps = ICollegeCardViewModel & ICollegeCardActions

const CollegeCard: React.FC<CollegeCardProps> = props => {
  const LinkWrap = props.slug ? ({ children }: any) => <a href={`https://edmit.me/college/${props.slug}`} target="_blank" className="no-underline">{children}</a> : ({ children }: any) => <>{children}</>

  return (
    <Card
      style={props.style}
      className={classNames('flex mb3', props.className)}
    >
      <div className={'w-100-ns w-100 flex flex-column'}>
        <div className={'pa4'}>
          <Text className={'mv0 t-large tl b'}>
            <LinkWrap><span className={'black'}>{props.name}</span></LinkWrap>
          </Text>
          <div className={"pa2 mt4"}>
            <CollegeFeatures
              features={props.features}
              selectedFeatures={props.selectedFeatures}
              majors={props.majors}
              major={props.major}
              gpa={props.gpa}
              sat={props.sat}
              act={props.act}
              gpaRange={props.gpaRange}
              satRange={props.satRange}
              actRange={props.actRange}
              firstYearEarnings={props.firstYearEarnings || undefined}
            />
          </div>
        </div>
        <div className={"w-100 flex-grow-1"} />
        <div className="tr mt3 pa3 bt b--moon-gray">
          <div className={'flex justify-end'}>
            <Button
              text={'View College'}
              onClick={() => window.location.href = `https://edmit.me/college/${props.slug}`}
              size={EButtonSize.Medium}
              type={EButtonType.Primary}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CollegeCard
