
export interface IGraphQLCollege {
  name: string
  slug: string
}

export interface IGraphQLCollegeSetQuery {
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
