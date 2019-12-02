import * as React from 'react'
import Layout from '../../components/layout'
import { graphql } from 'gatsby'
import * as numeral from 'numeral'
import FullWidthHeader from '../../atoms/full-width-header'
import { groupBy, values } from "lodash";

export const query = graphql`
    query StatesPageQuery {
        site {
            siteMetadata {
                title
            }
        }
        graphcms {
            states(orderBy: name_ASC) {
                id
                name
                slug
            }
        }
    }
`

interface IGraphQLState {
  id: string;
  name: string;
  slug: string;
}

interface IGraphQLStateQuery {
  graphcms: {
    states: IGraphQLState[]
  }
}

const ConnectedStates = (props: { data: IGraphQLStateQuery }) => {
  const states = props.data.graphcms.states

  return (
    <States
      states={states}
    />
  )
}

interface StateProps {
  states: IGraphQLState[]
}

const States = ({
                 states
               }: StateProps) => (
  <>
    <FullWidthHeader
      backgroundImage={null}
      description={null}
      headline={`Browse by State`}
      cta={() => null}
    />
    <Layout
      description={`Browse colleges by state on Edmit.`}
      keywords={'Colleges'}
      canonical={`https://edmit.me/browse/`}
      title={`Browse`}
    >
      <div>
        <ul>

        { states
          .filter(state => !!state.slug)
          .sort().map(
          (state) => (
            <li key={state.id}><a href={`https://edmit.me/browse/state/${state.slug}`}>{state.name}</a></li>
          )
        )}
        </ul>
      </div>
    </Layout>
  </>
)

export default ConnectedStates
