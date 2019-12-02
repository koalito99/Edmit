import { ApolloLink } from "apollo-link"
import { createHttpLink } from "apollo-link-http"
import { RetryLink } from "apollo-link-retry"
import { BatchHttpLink } from "apollo-link-batch-http"

export interface IGatsbyConfigurationProps {
  googleAnalyticsKey: string;
  siteTitle: string;
  segmentKey: string;
  rootDir: string;
  siteUrl: string;
  graphCMSBaseUrl: string;
  graphCMSToken: string;
  cookieDomain: string;
  generateSitemaps: boolean;
  hubSpotTrackingCode: string;
  takeShapeApiKey: string;
  takeShapeApiUrl: string;
}

const fetch = (global as any).fetch

export const generateGatsbyConfiguration = (config: IGatsbyConfigurationProps) => {

  const gatsbyConfiguration: any = {
    siteMetadata: {
      title: config.siteTitle,
      siteUrl: config.siteUrl
    },
    plugins: [
      'gatsby-plugin-react-helmet',
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: `${config.rootDir}/src/images`,
        },
      },
      'gatsby-transformer-sharp',
      'gatsby-plugin-sharp',
      'gatsby-plugin-typescript',
      'gatsby-transformer-yaml',
      'gatsby-plugin-robots-txt',
      {
        resolve: `gatsby-plugin-hubspot`,
        options: {
          trackingCode: config.hubSpotTrackingCode
        },
      },
      {
        resolve: "gatsby-source-graphql",
        options: {
          typeName: "TAKESHAPE",
          fieldName: "takeshape",
          createLink: (pluginOptions) => {
            return ApolloLink.from(
              [
                new RetryLink(),
                createHttpLink({
                  fetch,
                  uri: config.takeShapeApiUrl,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.takeShapeApiKey}`
                  }
                })
              ]
            )
          }
        }
      },
      {
        resolve: "gatsby-source-graphql",
        options: {
          typeName: "GRAPHCMS",
          fieldName: "graphcms",
          createLink: (pluginOptions) => {
            return ApolloLink.from([
              new RetryLink(),
              createHttpLink({
                fetch,
                uri: config.graphCMSBaseUrl,
                headers: {
                  Authorization: `Bearer ${config.graphCMSToken}`,
                }
              })
            ])
          }
        },
      }
    ],
  }

  if (config.googleAnalyticsKey) {
    gatsbyConfiguration.plugins.push(
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: config.googleAnalyticsKey,
          head: false,
          cookieDomain: config.cookieDomain
        }
      }
    )
  }

  if (config.generateSitemaps) {
    gatsbyConfiguration.plugins.push(
      {
        resolve: `gatsby-plugin-sitemap`,
        options: {
          output: `/sitemap-colleges-editorialized.xml`,
          exclude: ["/"],
          query: `
            {
              site {
                siteMetadata {
                  siteUrl
                }
              }
      
              allSitePage(filter: {
                context:{
                  sitemap:{
                    eq:"college"
                  }
                  editorialized: {
                    eq: true
                  }
                }
              }) {
                edges {
                  node {
                      path
                  }
                }
              }
            }`
        }
      }
    )

    gatsbyConfiguration.plugins.push(
      {
        resolve: `gatsby-plugin-sitemap`,
        options: {
          output: `/sitemap-scholarships.xml`,
          exclude: ["/"],
          query: `
            {
              site {
                siteMetadata {
                  siteUrl
                }
              }
      
              allSitePage(filter: {
                context:{
                  sitemap:{
                    eq:"scholarships"
                  }
                }
              }) {
                edges {
                  node {
                      path
                  }
                }
              }
            }`
        }
      }
    )

    gatsbyConfiguration.plugins.push(
      {
        resolve: `gatsby-plugin-sitemap`,
        options: {
          output: `/sitemap-college-lists.xml`,
          exclude: ["/"],
          query: `
            {
              site {
                siteMetadata {
                  siteUrl
                }
              }
      
              allSitePage(filter: {
                context:{
                  sitemap:{
                    eq:"college-lists"
                  }
                }
              }) {
                edges {
                  node {
                      path
                  }
                }
              }
            }`
        }
      }
    )

    gatsbyConfiguration.plugins.push(
      {
        resolve: `gatsby-plugin-sitemap`,
        options: {
          output: `/sitemap-colleges.xml`,
          exclude: ["/"],
          query: `
            {
              site {
                siteMetadata {
                  siteUrl
                }
              }
      
              allSitePage(filter: {
                context:{
                  sitemap:{
                    eq:"college"
                  }
                  editorialized: {
                    eq: false
                  }
                }
              }) {
                edges {
                  node {
                      path
                  }
                }
              }
            }`
        }
      }
    )

    gatsbyConfiguration.plugins.push(
      {
        resolve: `gatsby-plugin-sitemap`,
        options: {
          output: `/sitemap-states.xml`,
          exclude: ["/"],
          query: `
            {
              site {
                siteMetadata {
                  siteUrl
                }
              }
      
              allSitePage(filter: {
                context:{
                  sitemap:{
                    eq:"state"
                  }
                }
              }) {
                edges {
                  node {
                      path
                  }
                }
              }
            }`
        }
      }
    )
  }

  return gatsbyConfiguration
}
