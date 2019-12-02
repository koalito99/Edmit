import * as React from 'react'

const RowLink = ({ label, link }) => {
  return (
    <div className="flex justify-end mv3">
      <a
        className="no-underline black-80 flex align-center items-center justify-end"
        href={link}
      >
        <span className="text merriweather mr2">{label}</span>
        <span className="icon lh-solid">
          <svg
            className="w1 o-60"
            viewBox="0 0 32 32"
            style={{
              fill: 'currentcolor',
            }}
          >
            <path d="M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z" />
          </svg>
        </span>
      </a>
    </div>
  )
}

export default RowLink
