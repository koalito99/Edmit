import * as React from 'react'

const CardImage = ({ image }) => {
  return (
    <div
      className="w-25 cover"
      style={{
        minHeight: '100%',
        background: `url(${image}) no-repeat center center`,
      }}
    />
  )
}

export default CardImage
