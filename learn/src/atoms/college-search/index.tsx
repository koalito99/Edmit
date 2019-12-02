import React, { Component } from 'react'

export default class CollegeSearch extends Component {
  render() {
    return (
      <div className="pa2">
        <div className="w-100  mw6 center">
          <span className="dib mr3 lato f4 black-60 mb3">
            Explore Colleges to Get Started
          </span>
          <div className="input-wrapper bg-black-05 br2 w-100 relative">
            <input
              className="bn pl2 pv3 lato bg-transparent w-100 pr4"
              type="text"
            />
            <span className="absolute right-0 top-0 bottom-0 pa2 flex items-center content-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    )
  }
}
