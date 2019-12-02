import * as React from 'react'

const CardFact = ({ label, text }) => {
  return (
    <>
      {label && <h5 className="merriweather normal black-80">{label}</h5>}
      <p className="lato f3 black lh-copy mb4 measure">{text}</p>
    </>
  )
}

export default CardFact
