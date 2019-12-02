import * as path from 'path';
import { GraphQLClient } from 'graphql-request'
import { IGatsbyConfigurationProps } from './config';
import { range } from 'lodash';


interface INode {

}

interface ICreateNode {
    node: INode;
    getNode: () => INode;
    actions: {
        createNodeField: () => INode;
    }
}

const onCreateNode = (nodeProps: ICreateNode) => {
    const { createNodeField } = nodeProps.actions;
}

let whereClause = "{}"

if (process.env.NODE_ENV === "development") {
    whereClause = "{}"
}

const meritScholarships = (name: string) => `${name} Merit Scholarships`
const commonDataSet = (name: string) => `${name} Common Data Set`
const tuitionBreakdown = (name: string) => `${name} Tuition Breakdown`
const costOptions = (name: string) => `${name} Cost Options`
const financialAidEstimates = (name: string) => `${name} Financial Aid Estimates`
const costsFAAndScholarships = (name: string) => `${name} Costs, Financial Aid and Scholarships`
const costsAndSalaries = (name: string) => `${name} Costs and Salaries`

const titles = [
    meritScholarships,
    commonDataSet,
    tuitionBreakdown,
    costOptions,
    financialAidEstimates,
    costsFAAndScholarships,
    costsAndSalaries
]

const titleForCollege = (index: number, name: string) => {
    return titles[(index % titles.length)](name)
}

const isFullCollege = (node) => {
    return [
        (node && node.name),
        (node && node.city && node.city.name),
        (node && node.city && node.city.state && node.city.state.name),
        (node && node.slug) &&
        (node && node.salaries && node.salaries.length > 0)
    ].every(v => !!v)
}


const isFullState = (node) => {
    return [
        (node && node.slug)
    ].every(v => !!v)
}


const createPages = (config: IGatsbyConfigurationProps) => ({ graphql, actions }) => {
    return new Promise(
        (resolve, reject) => {
            const { createPage } = actions;

            const graphQLClient = new GraphQLClient(config.graphCMSBaseUrl, {
                headers: {
                    Authorization: `Bearer ${config.graphCMSToken}`
                },
            })

            const takeShapeClient = new GraphQLClient(config.takeShapeApiUrl, {
                headers: {
                    Authorization: `Bearer ${config.takeShapeApiKey}`,
                    'Content-Type': 'application/json'
                }
            })

            const collegeQuery = `
                {
                    colleges(where: ${whereClause}, orderBy: createdAt_ASC) {
                        id
                        name
                        slug
                        salaries {
                            id
                        }
                        city {
                            name
                            state {
                                name
                            }
                        }
                        payingForSection {
                            body
                        }
                        meritScholarshipsSection {
                            body
                        }
                        badges {
                            id
                            name
                            description
                        }
                    }
                }
            `

            const articleQuery = `
                {
                    articles(where: ${whereClause}) {
                        id
                        title
                        description
                        concept {
                            name
                            slug
                        }
                        slug
                        body {
                            body
                        }
                    }
                }
            `

            const statesQuery = `
                {
                    states(where:{}) {
                        name
                        abbreviation
                        slug
                        id
                    }
                }
           `

            const filterPageQuery = (index: number) => `
           {

            getMajorList {
                items {
                  _id
                  name
                }
              }
            
              getMetroAreaList {
                items {
                  _id
                  name
                }
              }
              getCollegeSizeCategoryList {
                items {
                  _id
                  description
                }
              }
              getStateList {
                items {
                  _id
                  name
                  filterPageSet {
                    items {
                      _id
                      name
                    }
                  }
                }
              }
              getCollegeRegionCategoryList {
                items {
                  _id
                  name
                }
              }
                
              getCollegeOwnershipCategoryList {
                items {
                  _id
                  ownershipType
                }
              }
            
              getMetroAreaList {
                  items {
                      _id
                      name
                  }
              }  

            getFilterPageList(size: 50, from: ${index * 50}) {
                
                items {
                    collegeSetFilters {
                        selectedSortOrder
                    }
                    scholarships {
        scholarship {
          _id
          name
          url
          college {
            name
            _id
          }
          criteria {
            satMinimum
            actMinimum
            gpaMinimum
            residentOfState {
              _id
              name
            }
            notResidentOfState {
              _id
              name
            }
          }
          discounts {
            year
            amount
            discountType
          }
        }
      }
                    colleges {
                        college {
                            _id
                            name
                            slug
                            majorsOffered {
                                _id
                                name
                                earningsScaleFactor
                            }
                            earningsPoints {
                                amount
                                yearAfterGraduation
                            }
                            satScorePoints {
                                percentile
                                score
                            }
                            actScorePoints {
                                percentile
                                score
                            }
                            collegeOwnership {
                                _id
                            }
                            collegeRegion {
                                _id
                            }
                            collegeSize {
                                _id
                            }
                            postalCode {
                                _id
                                metroAreaSet {
                                    items {
                                        _id
                                    }
                                }
                                city {
                                    _id
                                    name
                                    state {
                                        _id
                                        name
                                    }
                                }
                            }
                        }
                    }
                    slug
                    name
                    description
                    title
                    metaDescription
                    collegeSetFilters {
                        selectedMajors {
                          _id
                          name
                          earningsScaleFactor
                        }
                      }
                    _id
                }
            }

           }
           `

            interface IFilterPageItem {
                _id: string;
                slug: string;
            }

            interface IFilterPageQueryResponse {
                getFilterPageList: {
                    items: IFilterPageItem[]
                }
            }

            Promise.all([
                new Promise((resolve, reject) => {
                    const collegesByState = {}

                    graphQLClient.request(collegeQuery).then((response: any) => {
                        response.colleges
                            .filter((node) => isFullCollege(node))
                            .forEach((node, index) => {
                                createPage({
                                    path: `college/${node.slug}/`,
                                    component: path.resolve(`./src/templates/college-single/index.tsx`),
                                    context: {
                                        canonicalPath: `college/${node.slug}/`,
                                        index: index,
                                        title: titleForCollege(index, node.name),
                                        city: node.city.name,
                                        state: node.city.state.name,
                                        slug: node.slug,
                                        sitemap: 'college',
                                        editorialized: (!!node.payingForSection || !!node.meritScholarshipsSection)
                                    },
                                })
                            })
                        resolve()
                    })
                }),
                new Promise((resolve, reject) => {
                    graphQLClient.request(statesQuery).then((response: any) => {
                        response.states.forEach((node) => {
                            if (isFullState(node)) {
                                createPage({
                                    path: `browse/state/${node.slug}/`,
                                    component: path.resolve(`./src/templates/state.tsx`),
                                    context: {
                                        canonicalPath: `browse/state/${node.slug}/`,
                                        slug: node.slug,
                                        sitemap: 'state'
                                    },
                                })
                            }
                        })

                        resolve()
                    })
                }),
                new Promise((resolve, reject) => {
                    graphQLClient.request(collegeQuery).then((response: any) => {
                        const collegeByKey = {}

                        const fullColleges = response.colleges
                            .filter((node) => isFullCollege(node))
                            .forEach(c => {
                                collegeByKey[`${c.name}_${c.city.state.name}`] = c
                            })

                        range(0, (1400 / 50)).map(index => {
                            console.log("Query", index, "of", (1400 / 50))

                            const query = filterPageQuery(index)
                            takeShapeClient.request(filterPageQuery(index)).then(
                                (data: any) => {
                                    data.getFilterPageList.items.forEach((node) => {
                                        if (node && node.colleges && node.colleges.length > 0) {
                                            createPage({
                                                path: `colleges/${node.slug}/`,
                                                component: path.resolve(`./src/templates/filter-page/index.tsx`),
                                                context: {
                                                    canonicalPath: `colleges/${node.slug}/`,
                                                    node: {
                                                        ...node,
                                                        colleges: node.colleges
                                                            .filter(
                                                                (c) => collegeByKey[`${c.college.name}_${c.college.postalCode.city.state.name}`] != null
                                                            )
                                                            .map(
                                                                (c) => ({
                                                                    college: {
                                                                        ...c.college,
                                                                        graphCmsSlug: collegeByKey[`${c.college.name}_${c.college.postalCode.city.state.name}`].slug
                                                                    }

                                                                })
                                                            )
                                                    },
                                                    globalData: data,
                                                    takeshapeId: node._id,
                                                    sitemap: 'college-lists'
                                                },
                                            })
                                        } else if (node && node.scholarships && node.scholarships.length > 0) {
                                            createPage({
                                                path: `scholarships/${node.slug}/`,
                                                component: path.resolve(`./src/templates/filter-page/index.tsx`),
                                                context: {
                                                    canonicalPath: `scholarships/${node.slug}/`,
                                                    node,
                                                    globalData: data,
                                                    takeshapeId: node._id,
                                                    sitemap: 'scholarships'
                                                },
                                            })
                                        }
                                    })

                                    resolve()
                                }
                            )
                        })
                    })
                })
            ]).then(
                () => resolve()
            )
        }
    )

}

const onCreateWebpackConfig = ({ stage, actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                "@edmit/component-library": path.join(__dirname, "../../component-library")
            },
        },
    })
}

export const generateGatsbyNodeModule = (config: IGatsbyConfigurationProps) => ({
    onCreateNode,
    createPages: createPages(config),
    onCreateWebpackConfig
})