import * as React from 'react'

const TextBlock = ({ title, body }) => {
  return (
    <div className="flex justify-start">
      <div className="w-100 mb3">
        <div className="pv4 tc min-h-100">
          <h3 className="black merriweather f3 lh-copy measure-narrow center">
            {title}
          </h3>
          <p className="black tl lato f5 lh-copy">{body}</p>
        </div>
      </div>
    </div>
  )
}

export default TextBlock
