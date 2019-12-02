import * as React from 'react'

import numeral from "numeral";

const currencyFormat = '$0,0[.]00'
const percentageFormat = '0.00%'

const currency = (value: number) => numeral(value).format(currencyFormat)

const Currency = ({ value, label }) => {
  return (
    <>
      <p className="f1 lato mb0 flex items-center content-center justify-center lh-solid">
        <span className="text dib">{currency(value)}</span>
      </p>
      {label && <p className="merriweather f6">{label}</p>}
    </>
  )
}

export default Currency
