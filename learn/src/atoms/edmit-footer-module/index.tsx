import * as React from 'react'
import GradImage from '../../images/grads.jpg'

const EdmitFooterModule = () => {
  return (
    <section>
      <div className="flex-l items-start content-start justify-between">
        <div className="w-100 w-50-l">
          <div
            className="mr2 shadow-card pa4 min-h-100 relative"
          >
            <div
              className="aspect-ratio--object cover z-1 o-80"
              style={{
                background:
                  'linear-gradient(45deg, rgba(0,0,0,1.0) 0%, rgba(0,0,0,0.95) 100%)',
              }}
            />
            <div
              className="aspect-ratio--object cover z-0"
              style={{
                background: `url(${GradImage}) no-repeat center center`,
              }}
            />
            <div className="relative z-3">
              <p className="f4 lh-body merriweather mb4 white">
                The smartest advice on paying for college
              </p>
              <button
                className="pa3 bn mr2 tight br1 ttu f6 b"
                style={{
                  background:
                    'linear-gradient(45deg, #921313 0%, #e36e6e 100%)',
                }}
              >
                <a className="no-underline white lato" href="https://www.edmit.me/blog">
                  Check out our blog
                </a>
              </button>
            </div>
          </div>
        </div>

        <div className="w-100 w-50-l">
          <div className="w-100 mb3">
            <div
              className="shadow-card pa4 min-h-100"
              style={{
                background: 'linear-gradient(45deg, #921313 0%, #e36e6e 100%)',
              }}
            >
              <p className="f4 lh-body merriweather mb4 white">
                Learn more about Edmit
              </p>
              <button
                className="pa3 bn mr2 tight br1 ttu f6 b"
                style={{
                  background:
                    'linear-gradient(-90deg, #000000 0%, #333333 100%)',
                }}
              >
                <a className="no-underline white lato" href="https://www.edmit.me">
                  Home
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EdmitFooterModule
