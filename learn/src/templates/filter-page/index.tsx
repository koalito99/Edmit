import * as React from 'react'

import { CollegeSetDetail } from '../college-set/shared'
import Layout from '../../components/layout'
import Text from '@edmit/component-library/src/components/atoms/typography/text'
import { chunk } from 'lodash-es'
import Heading, {
  EHeadingSize,
} from '@edmit/component-library/src/components/atoms/typography/heading'
import FormFieldSelect from '@edmit/component-library/src/components/atoms/form/form-field-select'
import { Pair } from '../../molecules/features'
import { OffWhiteSection, Single } from '../../atoms/sections'
import Scholarship from '../scholarship-set/scholarship';
import CollegeCard from '../../molecules/card-college'

interface ICTABannerViewModel {
  ctaTo: string

  style?: React.CSSProperties
  className?: string
}

type CTABannerProps = ICTABannerViewModel

export const CTABanner: React.FC<CTABannerProps> = props => {
  return (
    <OffWhiteSection
      className={'bg-green-success ' + props.className}
      style={props.style}
    >
      <Single>
        <a href={props.ctaTo} className={'no-underline'}>
          <Text className="white t-large tc">
            <span className={'lato b'} style={{ letterSpacing: '.05em' }}>
              {props.children} &gt;
            </span>
          </Text>
        </a>
      </Single>
    </OffWhiteSection>
  )
}

type MarkdownText = string

interface ICollegeSetCollege {
  name: string
  slug: string
  image: string
  rank: number
  features: string[]
  majors: Array<{ id: string; name: string }>
  gpaRange: Pair<string>;
  satRange: Pair<number>;
  actRange: Pair<number>;
  firstYearEarnings: number;
  metroArea: string;
  state: string;
  graphCmsSlug?: string | null;
}

interface ITakeShapeMajor {
  _id: string;
  name: string;
  earningsScaleFactor: number;
}

interface ITakeShapeMetroArea {
  _id: string;
  name: string;
}

interface ITakeShapeState {
  _id: string;
  name: string;
}

interface ITakeShapeCollege {
  actScorePoints: {
    percentile: number;
    score: number;
  }[];
  satScorePoints: {
    percentile: number;
    score: number;
  }[];
  collegeOwnership: {
    _id: string;
    ownershipType: string;
  };
  collegeRegion: {
    _id: string;
    name: string;
  };
  collegeSize: {
    _id: string;
    description: string;
  };
  majorsOffered: ITakeShapeMajor[];
  earningsPoints: {
    amount: number;
    yearAfterGraduation: number;
  }[];
  name: string;
  slug: string;
  postalCode: {
    city: {
      name: string;
      state: {
        _id: string;
        name: string;
      }
    };
    metroAreaSet: {
      items: {
        _id: string;
        name: string;
      }[]
    }
  }
}

interface ISelectedMajor {
  id: string
  name: string
}

interface ISelectedMetroArea {
  id: string
  name: string
}

interface ISelectedState {
  id: string
  name: string
}

interface ISelectedSatScore {
  id: string
  name: string
}

interface ISelectedCollegeSizeCategory {
  id: string
  name: string
}

interface FilterPageProps {
  index: number
  title: string
  metaDescription: string
  name: string
  description: string
  initialSortOrder: string
  initialMajor: ISelectedMajor
  initialState: ISelectedState
  initialMetroArea: ISelectedMetroArea
  initialSatScore: number
  scholarships: IScholarshipSetScholarship[]
  selectedCollegeSizeCategories: ISelectedCollegeSizeCategory[]
  slug: string
  colleges: Array<ICollegeSetCollege>
  majors: Array<{ id: string; name: string }>
  states: Array<{ id: string; name: string }>
  metroAreas: Array<{ id: string; name: string; }>
}

interface IMetricProps {
  text: string
  value: string
}

type MetricProps = IMetricProps

const Sorts = {
  NAME: "name",
  EARNINGS: "earnings",
  COST: "cost",
  AMOUNT: "amount"
}

const Metric: React.FC<MetricProps> = (props) => {
  return (
    <div className={'w-third-ns w-100 mh4-ns mh1'}>
      <Text className="t-medium black tc pv1">
        {props.text}
      </Text>
      <Heading
        size={EHeadingSize.H2}
        className={'green-success tc mb2'}
        text={<span className={'lato b f1'}>{props.value}</span>}
      />
    </div>
  )
}

const FilterPage: React.SFC<FilterPageProps> = ({
  title,
  metaDescription,
  name,
  description,
  slug,
  colleges,
  majors,
  states,
  scholarships,
  metroAreas,
  initialMajor,
  initialSatScore,
  initialState,
  initialSortOrder,
  initialMetroArea,
  canonical
}) => {
  const [sortOrder, setSortOrder] = React.useState(initialSortOrder)
  const [selectedFeatures, setSelectedFeatures] = React.useState([])
  const [selectedMajor, setSelectedMajor] = React.useState<{
    id: string
    name: string
  }>(initialMajor)
  const [gpa, setGPA] = React.useState<string | null>(null)
  const [act, setACT] = React.useState<number | null>(null)
  const [sat, setSAT] = React.useState<number | null>(initialSatScore)
  const [state, setState] = React.useState<{ id: string, name: string } | null>(initialState)
  const [major, setMajor] = React.useState<{ id: string; name: string } | null>(initialMajor)
  const [metroArea, setMetroArea] = React.useState<{ id: string; name: string } | null>(initialMetroArea)


  const existingScholarships = []
  const uniqueScholarships = []

  scholarships.forEach((s: any) => {
    const key = `${s.name}_${s.awardAmount}`
    if (existingScholarships.indexOf(key) === -1) {
      uniqueScholarships.push(s)
      existingScholarships.push(key)
    }
  })

  return (
    <div style={{}}>
      <CollegeSetDetail
        title={name}
        description={description}
        features={selectedFeatures}
        majors={majors}
        states={states}
        metroAreas={metroAreas}
        selectedMetroArea={metroArea}
        selectedState={state}
        selectedMajor={major}
        testScores={{
          gpa,
          act,
          sat
        }}
        onChangeFeatures={setSelectedFeatures}
        onSelectMajor={setSelectedMajor}
        onChangeGPA={setGPA}
        onChangeACT={setACT}
        onChangeSAT={setSAT}
      />
      <Layout
        description={metaDescription}
        keywords={'Colleges'}
        canonical={canonical}
        title={title}
      >
        <div /*style={{ marginTop: 200 }}*/>
          <div className={'flex justify-between items-center mt2'}>
            <div>
              <Text className={'dib'}>Sorted by</Text>
              <FormFieldSelect
                value={sortOrder}
                required={false}
                onSearch={() => null}
                className={'ml1 pr4'}
                disabled
              >
                <option value={Sorts.NAME}>Name</option>
                <option value={Sorts.EARNINGS}>Highest earnings</option>
                <option value={Sorts.COST}>Lowest cost</option>
                <option value={Sorts.AMOUNT}>Award amount</option>
              </FormFieldSelect>
            </div>
          </div>
          <div className={'mt4'}>
            {
              chunk(colleges, 6).map(
                collegesSection => (
                  <div className={'mt3'}>
                    <div className="flex flex-wrap">
                      {collegesSection.map(college => {
                        return (
                          <div className={collegesSection.length === 1 ? "w-100" : "w-100 w-50-l ph0 ph2-l"}>
                            <CollegeCard
                              name={college.name}
                              slug={college.graphCmsSlug}
                              image={college.image}
                              rank={college.rank}
                              features={college.features}
                              selectedFeatures={selectedFeatures}
                              majors={college.majors}
                              major={selectedMajor}
                              gpa={gpa}
                              sat={sat}
                              act={act}
                              gpaRange={college.gpaRange}
                              satRange={college.satRange}
                              actRange={college.actRange}
                              firstYearEarnings={college.firstYearEarnings}
                            />
                          </div>
                        )
                      })}
                    </div>
                    <CTABanner ctaTo={'/'}>
                      SIGN UP WITH EDMIT TO PERSONALIZE YOUR COLLEGE SEARCH - IT’S
                      FREE!
                  </CTABanner>
                  </div>
                )
              )}
            {
              chunk(uniqueScholarships, 6).map(
                scholarshipSection => (
                  <div className={'mt3'}>
                    <div className="flex flex-wrap">
                      {scholarshipSection.map(scholarship => {
                        return (
                          <div className={scholarshipSection.length === 1 ? "w-100" : "w-100 w-50-l ph0 ph2-l"}>
                            <Scholarship
                              {...scholarship}
                            />
                          </div>
                        )
                      })}
                    </div>
                    <CTABanner ctaTo={'/'}>
                      SIGN UP WITH EDMIT TO PERSONALIZE YOUR COLLEGE SEARCH - IT’S
                      FREE!
                  </CTABanner>
                  </div>
                )
              )}
          </div>
        </div>
      </Layout>
    </div>
  )
}

interface IWiredFilterPageData {
  getMajorList: {
    items: {
      _id: string;
      name: string;
    }[]
  }
}

interface IWiredFilterPageContext {
  globalData: IWiredFilterPageData;
  node: any;
  index: number
  name: string
  slug: string
  description: string
  metaDescription: string
  title: string
  selectedSortOrder: string
  selectedMajors: ISelectedMajor[]
  selectedMetroAreas: ISelectedMetroArea[]
  selectedSatScores: ISelectedSatScore[]
  selectedCollegeSizeCategories: ISelectedCollegeSizeCategory[]
}

type WiredFilterPageContext = IWiredFilterPageContext

interface ITakeShapeFilterPage {
  title: string;
  name: string;
  slug: string;
  metaDescription: string;
  description: string;
}

interface ITakeShapeMajor {
  _id: string;
  name: string;
}

interface IScholarshipSetScholarship {

}

interface ITakeShapeFilterPageResponse {
  takeshape: {
    getFilterPage: ITakeShapeFilterPage
    getMajorList: {
      items: ITakeShapeMajor[]
    };
    getCollegeList: {
      items: ITakeShapeCollege[]
    }
    getMetroAreaList: {
      items: ITakeShapeMetroArea[]
    }
    getStateList: {
      items: ITakeShapeState[]
    }
  }
}

const takeShapeMajorToReactMajor = (item: ITakeShapeMajor) => ({
  id: item._id,
  name: item.name
})

const takeShapeMetroAreaToReactMetroArea = (item: ITakeShapeMetroArea) => ({
  id: item._id,
  name: item.name
})

const takeShapeStateToReactState = (item: ITakeShapeState) => ({
  id: item._id,
  name: item.name
})

const WiredFilterPageWithoutGlobalData = (props: {
  pageContext: WiredFilterPageContext;
  globalData: ITakeShapeFilterPageResponse;
  data: any;
}) => {
  const node = props.pageContext.node as any;
  const data = props.pageContext.globalData as any;

  console.log(props.pageContext);

  const scholarships: IScholarshipSetScholarship[] = (node.scholarships || [])
    .map((s) => s.scholarship)
    .map((scholarship, i) => ({
      ...scholarship,
      name: scholarship.name,
      awardAmount: (scholarship.discounts && scholarship.discounts.find(s => s.year === 0).amount),
      selectedFeatures: [],
      rank: i + 1,
      sat: scholarship.criteria.satMinimum,
      act: scholarship.criteria.actMinimum,
      gpa: scholarship.criteria.gpaMinimum,
      stateRequired: (scholarship.criteria.residentOfState && scholarship.criteria.residentOfState.name)
    }))
    .sort((a, b) => (a.awardAmount - b.awardAmount))
    .reverse()

  const major = (node.collegeSetFilters && node.collegeSetFilters.selectedMajors && node.collegeSetFilters.selectedMajors[0] && node.collegeSetFilters.selectedMajors[0])

  const colleges: ICollegeSetCollege[] = (node.colleges || [])
    .map((c) => c.college)
    .map((college, i) => ({
      ...college,
      rank: i + 1,
      firstYearEarnings: ((
        college.earningsPoints &&
        college.earningsPoints.find((c) => c.yearAfterGraduation === 0)
      ).amount || 0) * (major.earningsScaleFactor || 1),
      metroArea: college.postalCode.metroAreaSet.items[0] && college.postalCode.metroAreaSet.items[0]._id,
      state: college.postalCode.city.state._id,
      image:
        'https://images.unsplash.com/photo-1557883822-7e3562bd7141?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
      features: [
        college.collegeOwnership._id,
        college.collegeRegion._id,
        college.collegeSize._id
      ],
      majors: college.majorsOffered.map(takeShapeMajorToReactMajor),
      gpaRange: ["", ""],
      satRange: college.satScorePoints ? [
        college.satScorePoints.find((point) => point.percentile === 25).score,
        college.satScorePoints.find((point) => point.percentile === 75).score
      ] : null,
      actRange: college.actScorePoints ? [
        college.actScorePoints.find((point) => point.percentile === 25).score,
        college.actScorePoints.find((point) => point.percentile === 75).score
      ] : null,
      slug: college.graphCmsSlug
    }))
    .sort((a, b) => a.firstYearEarnings - b.firstYearEarnings)
    .reverse()

  const sort = colleges.length > 0 ? Sorts.EARNINGS : Sorts.AMOUNT

  return (
    <FilterPage
      {...props.pageContext}
      canonical={`https://edmit.me/${props.pageContext.path}`}
      title={node.title}
      name={node.name}
      description={node.description}
      metaDescription={node.metaDescription}
      colleges={colleges}
      scholarships={scholarships}
      majors={data.getMajorList.items.map(takeShapeMajorToReactMajor)}
      states={data.getStateList.items.map(takeShapeStateToReactState)}
      metroAreas={data.getMetroAreaList.items.map(takeShapeMetroAreaToReactMetroArea)}
      initialMajor={null}
      initialSatScore={null}
      initialSortOrder={sort}
      initialMetroArea={null}
      initialState={null}
    />
  )
}

const WiredFilterPage = (props: {
  pageContext: WiredFilterPageContext;
  globalData: ITakeShapeFilterPageResponse;
}) => {
  return (
    <WiredFilterPageWithoutGlobalData
      {...props}
    />
  )
}

export default WiredFilterPage
