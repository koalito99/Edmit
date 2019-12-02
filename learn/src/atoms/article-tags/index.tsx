import * as React from 'react'

const ArticleTags = ({ tags = [] }) => {
  return (
    tags.length > 0 && (
      <div className="mt5">
        <h5 className="f6 mb1">Tags:</h5>
        <div className="flex items-center content-center justify-start">
          {tags.map((item, index) => (
            <a
              key={`tag__${index}`}
              className="black-60 no-underline mr2"
              href={item.link}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    )
  )
}

export default ArticleTags
