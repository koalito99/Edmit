import * as React from 'react'
import * as numeral from 'numeral'
import { graphql } from 'gatsby'

import { ScholarshipSetDetail } from './shared'
import Layout from '../../components/layout'
import Text from '@edmit/component-library/src/components/atoms/typography/text'
import { chunk } from 'lodash-es'
import Heading, {
  EHeadingSize,
} from '@edmit/component-library/src/components/atoms/typography/heading'
import Scholarship from './scholarship'
import FormFieldSelect from '@edmit/component-library/src/components/atoms/form/form-field-select'
import { featureIds } from '@edmit/component-library/src/shared/features'
import { Pair } from './features'
import { OffWhiteSection, Single } from '../../atoms/sections'

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
        <a href={props.ctaTo} target="_blank" className={'no-underline'}>
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

interface IScholarshipSetScholarship {
  name: string
  url: string;
  awardAmount: number;
  applicationDeadline: Date;
  awardsAvailable: number;

  college: {
    name: string;
    slug: string;
    features: string[]
    majors: Array<{ id: string; name: string }>
    gpaRange: Pair<string>;
    satRange: Pair<number>;
    actRange: Pair<number>;
  } | null;
}

interface ScholarshipSetProps {
  index: number
  name: string
  description: string
  slug: string
  scholarships: Array<IScholarshipSetScholarship>
  majors: Array<{ id: string; name: string }>
}

const ScholarshipSet: React.SFC<ScholarshipSetProps> = ({
  name,
  description,
  slug,
  scholarships,
  majors,
}) => {
  const [selectedFeatures, setSelectedFeatures] = React.useState([])
  const [selectedMajor, setSelectedMajor] = React.useState<{
    id: string
    name: string
  }>(null)
  const [gpa, setGPA] = React.useState<string | null>(null)
  const [act, setACT] = React.useState<number | null>(null)
  const [sat, setSAT] = React.useState<number | null>(null)
  const [psat, setPSAT] = React.useState<number | null>(null)

  const existingScholarships = []
  const uniqueScholarships = []

  scholarships.forEach((s) => {
    const key = `${s.name}_${s.awardAmount}`
    if (existingScholarships.indexOf(key) === -1) {
      uniqueScholarships.push(s)
      existingScholarships.push(key)
    }
  })

  return (
    <div style={{ paddingTop: '48px' }}>
      <ScholarshipSetDetail
        title={name}
        description={description}
        features={selectedFeatures}
        majors={majors}
        selectedMajor={selectedMajor}
        testScores={{
          gpa,
          act,
          sat,
          psat,
        }}
        onChangeFeatures={setSelectedFeatures}
        onSelectMajor={setSelectedMajor}
        onChangeGPA={setGPA}
        onChangeACT={setACT}
        onChangeSAT={setSAT}
        onChangePSAT={setPSAT}
      />
      <Layout
        description={``}
        keywords={'Colleges'}
        canonical={`https://edmit.me/college-set/${slug}/`}
        title={name}
      >
        <div style={{ marginTop: 280 }}>
          <div
            className={
              'flex justify-center flex-wrap flex-nowrap-ns pb4 bb b--moon-gray'
            }
          >
            <div className={'w-third-ns w-100 mh4-ns mh1'}>
              <Text className="t-medium black tc pv1">
                Number of 4 year colleges in Massachusetts
              </Text>
              <Heading
                size={EHeadingSize.H2}
                className={'green-success tc mb2'}
                text={<span className={'lato b f1'}>{scholarships.length}</span>}
              />
            </div>
            <div className={'w-third-ns w-100 mh4-ns mh1'}>
              <Text className="t-medium black tc pv1">
                Average in-state tuition
              </Text>
              <Heading
                size={EHeadingSize.H2}
                className={'green-success tc mb2'}
                text={
                  <span className={'lato b f1'}>
                    {numeral(33005).format('$0,0')}
                  </span>
                }
              />
            </div>
            <div className={'w-third-ns w-100 mh4-ns mh1'}>
              <Text className="t-medium black tc pv1">
                Average out-of-state tuition
              </Text>
              <Heading
                size={EHeadingSize.H2}
                className={'green-success tc mb2'}
                text={
                  <span className={'lato b f1'}>
                    {numeral(34952).format('$0,0')}
                  </span>
                }
              />
            </div>
          </div>
          <div className={'flex justify-between items-center mt2'}>
            <div>
              <Text className={'dib'}>Sort by</Text>
              <FormFieldSelect
                value={'Rank'}
                required={false}
                onSearch={() => null}
                className={'ml1 w5 pr4'}
              >
                <option value={'Rank'}>Rank</option>
              </FormFieldSelect>
            </div>
            <div>
              <a href={''} target="_blank" className={"no-underline fw7 crimson hover-crimson-dark pointer"}>Email List</a>
            </div>
          </div>
          <div className={'mt4'}>
            {chunk(uniqueScholarships.sort((a, b) => a.rank - b.rank), 6).map(
              scholarshipsSection => (
                <div className={'mt3'}>
                  <div>
                    {scholarshipsSection.map(scholarship => {
                      return (
                        <Scholarship
                          name={scholarship.name}
                          slug={scholarship.slug}
                          description={scholarship.description}
                          image={scholarship.image}
                          rank={scholarship.rank}

                          awardAmount={scholarship.awardAmount}
                          applicationDeadline={scholarship.applicationDeadline}
                          awardsAvailable={scholarship.awardsAvailable}

                          college={scholarship.college}

                          selectedFeatures={selectedFeatures}
                          major={selectedMajor}

                          gpa={gpa}
                          sat={sat}
                          act={act}
                        />
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

export const query = graphql`
  query ScholarshipSetPageQuery($slug: String) {
    site {
      siteMetadata {
        title
      }
    }
    graphcms {
      set: state(where: { slug: $slug }) {
        name
        slug
        cities(orderBy: name_ASC) {
          name
          colleges(orderBy: name_ASC) {
            name
            slug
          }
        }
      }
    }
  }
`

interface IGraphQLCollege {
  name: string
  slug: string
}

interface IGraphQLScholarshipSetQuery {
  graphcms: {
    set: {
      name: string
      slug: string
      cities: Array<{
        name: string
        colleges: Array<IGraphQLCollege>
      }>
    }
  }
}

const ConnectedScholarshipSet = (props: {
  pageContext: { index: number }
  data: IGraphQLScholarshipSetQuery
}) => {
  const set = props.data.graphcms.set
  const scholarships: IScholarshipSetScholarship[] = set.cities
    .reduce((acc, curr) => [...acc, ...curr.colleges], [])
    .map((college, i) => ({
      ...college, // replace this with scholarship name
      rank: i + 1,
      image:
        'https://images.unsplash.com/photo-1557883822-7e3562bd7141?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n' +
        ' aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n' +
        'Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
      awardAmount: 35000,
      applicationDeadline: new Date(),
      awardsAvailable: 4,
      college: {
        name: college.name,
        slug: college.slug,
        features: [featureIds.TYPE_PUBLIC, featureIds.SIZE_5000_TO_10000],
        majors: [{ id: 'm0', name: 'Computer Science' }],
        gpaRange: ["3.75", "4.04"],
        satRange: [1460, 1590],
        actRange: [32, 35]
      }
    }))

  return (
    <ScholarshipSet
      index={props.pageContext.index}
      name={'Best Scholarships in Oregon'}
      description={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n' +
        ' aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n' +
        'Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '
      }
      slug={set.slug}
      scholarships={scholarships}
      majors={[{ id: 'm0', name: 'Computer Science' }, { id: 'm1', name: 'Agriculture' }]}
    />
  )
}

export default ConnectedScholarshipSet
