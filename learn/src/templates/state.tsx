import * as React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import * as numeral from 'numeral'
import FullWidthHeader from '../atoms/full-width-header'
import StickyNavigation from '../atoms/sticky-navigation'
import SectionHeading from '../atoms/section-heading'
import SectionSubHeading from '../atoms/section-sub-heading'
import TextBlock from '../atoms/text-block'
import Section from '../atoms/section'
import Block from '../atoms/block'
import CardRow from '../atoms/card-row'
import Card from '../atoms/card'
import CardHeading from '../atoms/card-heading'
import CardFact from '../atoms/card-fact'
import CardImage from '../atoms/card-image'
import ButtonCta from '../atoms/button-cta'
import PercentageChange from '../atoms/percentage-change'
import Table from '../atoms/table'
import RowLink from '../atoms/row-link'
import HLine from '../atoms/h-line'
import EdmitFooterModule from '../atoms/edmit-footer-module'
import { oc } from "ts-optchain"
import Currency from '../atoms/currency';
import Percentage from '../atoms/percentage';
import { groupBy, values } from "lodash";

const baseUrl = process.env.URL

const CURRENT_ACADEMIC_YEAR = "2017-2018"
const RATE_OF_DEFAULT_BASE_YEAR = 3

const currencyFormat = '$0,0'
//const currencyFormat = '$0,0[.]00'
const percentageFormat = '0.0%'

const currency = (value: number) => numeral(value).format(currencyFormat)
const percentage = (value: number) => numeral(value / 100).format(percentageFormat)

export const query = graphql`
    query StatePageQuery($slug: String) {
        site {
            siteMetadata {
                title
            }
        }
        graphcms {
            state(where: {slug: $slug}) {
                name
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


interface IGraphQLCityCollege {
  id: string;
  name: string;
  slug: string;
}

interface IGraphQLCity {
  name: string;
  colleges: IGraphQLCityCollege[]
}

interface IGraphQLState {
  name: string;
  slug: string;
  cities: IGraphQLCity[];
}

interface IGraphQLStateQuery {
  graphcms: {
    state: IGraphQLState
  }
}

const ConnectedState = (props: { data: IGraphQLStateQuery }) => {
  const state = props.data.graphcms.state

  return (
    <State
      name={state.name}
      slug={state.slug}
      cities={state.cities}
    />
  )
}

interface StateProps {
  name: string
  slug: string
  cities: IGraphQLCity[]
}

const State = ({
  name,
  slug,
  cities
}: IGraphQLState) => (
  <>
    <FullWidthHeader
      backgroundImage={null}
      description={null}
      headline={`Colleges in ${name}`}
      cta={() => null}
    />
    <Layout
      description={`Browse colleges in ${name} on Edmit.`}
      keywords={'Colleges'}
      canonical={`https://edmit.me/browse/state/${slug}/`}
      title={`Colleges in ${name}`}
    >
      <div>
        { cities.sort().map(
          (city) => (
            <div key={city.name}>
            <h3>{ city.name }</h3>
            <ul>
              { city.colleges.sort().map(
                (college) => (
                  <li key={college.id}><a href={`https://edmit.me/college/${college.slug}`}>{college.name}</a></li>
                )
              )}
              </ul>
            </div>
          )
        )}
      </div>
    </Layout>
  </>
)

export default ConnectedState
