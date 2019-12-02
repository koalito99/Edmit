import * as React from 'react'

const ButtonCta = ({ label, link }) => {
  return (
    <button
      className="pa3 bn mr2 tight br1 ttu f6 b"
      style={{
        background: 'linear-gradient(-90deg, #000000 0%, #333333 100%)',
      }}
    >
      <a className="no-underline white lato" href={link}>
        {label}
      </a>
    </button>
  )
}

export default ButtonCta
