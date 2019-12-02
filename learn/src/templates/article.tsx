import * as React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import FullWidthHeader from '../atoms/full-width-header'
import BreadCrumbNavigation from '../atoms/bread-crumb-navigation'
import SectionSubHeading from '../atoms/section-sub-heading'
import Block from '../atoms/block'
import SocialSharing from '../atoms/social-sharing'
import EdmitFooterModule from '../atoms/edmit-footer-module'

const siteUrl = "https://edmit.me"

export const query = graphql`
  query ArticlePageSlug($slug: String) {
    site {
      siteMetadata {
        title
      }
    }
    graphcms {
      article(where: { slug: $slug }) {
        id
        concept {
          name
          slug
        }
        title
        slug
        description
        body {
          body
        }
      }
      concepts {
        name
        slug
      }
    }
  }
`

const ConnectedArticle = (props: { data: any }) => {
  return (
    <Article
      concepts={props.data.graphcms.concepts}
      conceptSlug={props.data.graphcms.article.concept.slug}
      title={props.data.graphcms.article.title}
      body={props.data.graphcms.article.body.body}
      description={props.data.graphcms.article.description}
      slug={props.data.graphcms.article.slug}
      sectionBody={props.data.graphcms.article.body.body}
    />
  )
}

const Article = ({
  title = '',
  body = '',
  concepts = [],
  description = '',
  conceptSlug = '',
  slug = '',
  sectionBody = '',
}) => (
    <>
      <FullWidthHeader backgroundImage={null} description={''} headline={title} />
      <Layout
        description={description}
        keywords={''}
        canonical={`${siteUrl}/${conceptSlug}/questions/${slug}/`}
        title={`${title}`}
      >
        <section>
          <div className="w-100 mw7 center relative cf">
            <BreadCrumbNavigation
              categories={concepts}
              conceptSlug={conceptSlug}
              title={title}
            />
            <SocialSharing
              title={title}
              link={`${siteUrl}/${conceptSlug}/${slug}`}
            />
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: sectionBody }}
            />
            {/* <ArticleTags
            tags={[
              {
                name: 'Tag 1',
                link: '/slug/tag/link',
              },
              {
                name: 'Tag 2',
                link: '/slug/tag/link',
              },
              {
                name: 'Tag 3',
                link: '/slug/tag/link',
              },
            ]}
          />
          <AuthorModule
            avatarUrl={HeaderImage}
            authorName={'John Smith'}
            authorBio={'Author Bio'}
          /> */}
          </div>
        </section>
        <section className="mw8 center">
          <Block>
            <SectionSubHeading>Get More out of Edmit</SectionSubHeading>
            <EdmitFooterModule />
          </Block>
        </section>
      </Layout>
    </>
  )

export default ConnectedArticle
