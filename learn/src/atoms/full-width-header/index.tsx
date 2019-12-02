import * as React from 'react'

const FullWidthHeader = ({
  backgroundImage,
  headline,
  description,
  cta = () => <span />,
}) => {
  return (
    <div
      className="flex items-center justify-start content-center pa5 relative"
      style={{
        minHeight: '450px',
        marginTop: '48px',
      }}
    >
      <div
        className="aspect-ratio--object cover z-1 o-80"
        style={{
          background: 'linear-gradient(110deg, #921313 0%, #e36e6e 100%)',
        }}
      />
      <div
        className="aspect-ratio--object cover z-0"
        style={{
          background: `url(${backgroundImage}) no-repeat center center`,
        }}
      />
      <div className="relative z-3 ph3 ph4-l ph5-xl mw9 center ">
        <div className="">
          {description && (
            <h2 className="merriweather white ma0 normal f5 f4-l">
              {description}
            </h2>
          )}
          <h1 className="lato white mv0 normal f1 f-headline-l lh-solid">
            {headline}
          </h1>
          <hr className="bg-white bn mt4" />
          <p className="white merriweather mb0 f4 f5-l">{cta()}</p>
        </div>
      </div>
    </div>
  )
}

export default FullWidthHeader
