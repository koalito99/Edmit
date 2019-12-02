import * as React from 'react'

import numeral from "numeral";

const currencyFormat = '$0,0[.]00'
const percentageFormat = '0.0%'

const currency = (value: number) => numeral(value).format(currencyFormat)
const percentage = (value: number) => numeral(value / 100).format(percentageFormat)

const PercentageChange = ({ value, label, direction }) => {
  return (
    <>
      <p className="f1 lato mb0 flex items-center content-center justify-center lh-solid">
        <span
          style={{
            fill: direction === 'up' ? 'green' : 'red',
            transform: direction === 'up' ? '' : 'rotate(180deg)',
            height: '24px',
            width: '24px',
          }}
          className="icon dib"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="db"
          >
            <path d="M7 14l5-5 5 5z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </span>
        <span className="text dib">{percentage(value)}</span>
      </p>
      {label && <p className="merriweather f6">{label}</p>}
    </>
  )
}

export default PercentageChange
