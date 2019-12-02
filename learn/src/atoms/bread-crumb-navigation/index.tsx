import React, { Component } from 'react'

export default class BreadCrumbNavigation extends Component {
  render() {
    const { categories = [], conceptSlug, title } = this.props
    const currentCategory = categories.filter(
      category => category.slug === conceptSlug
    )

    return (
      <nav className="flex items-center content-center justify-start mb5">
        {currentCategory[0] && (
          <>
            <a className="lato dib no-underline black lh-solid f5" href="#">
              {currentCategory[0].name}
            </a>
            <span
              style={{
                width: '14px',
              }}
              className="lato black ph1 dib f5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="db w-100 relative"
                style={{
                  top: '1px',
                  fill: 'black',
                }}
              >
                <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" />
                <path fill="none" d="M0 0h24v24H0z" />
              </svg>
            </span>
          </>
        )}
        <span className="lato black dib f5 lh-solid">{title}</span>
      </nav>
    )
  }
}
