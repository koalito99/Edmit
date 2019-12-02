import * as React from 'react'
import Card from '../../atoms/card'
import classNames from 'classnames'
import { hexGrayLight } from '../../atoms/colors'

interface ITestimonialViewModel {
  stars?: number;
  author: {
    name: string;
    image?: string;
  }

  testimonialTextClassName?: string;
  testimonialTextStyle?: React.CSSProperties;
  Wrapper?: React.ComponentType | string;

  style?: React.CSSProperties;
  className?: string;
}

interface ITestimonialActions {

}

type TestimonialProps = ITestimonialViewModel & ITestimonialActions;

const Testimonial: React.FC<TestimonialProps> = props => {
  const Wrapper = props.Wrapper || Card;

  return (
    <Wrapper style={props.style} className={classNames("pv3 pv4-l ph3 ph5-l", props.className)}>
      { props.stars &&  <div className="f3 mt0 mb4">
        <span className="fa fa-star" style={{ color: props.stars >= 1 ? 'orange' : hexGrayLight }}></span>
        <span className="fa fa-star" style={{ color: props.stars >= 2 ? 'orange' : hexGrayLight }}></span>
        <span className="fa fa-star" style={{ color: props.stars >= 3 ? 'orange' : hexGrayLight }}></span>
        <span className="fa fa-star" style={{ color: props.stars >= 4 ? 'orange' : hexGrayLight }}></span>
        <span className="fa fa-star" style={{ color: props.stars >= 5 ? 'orange' : hexGrayLight }}></span>
      </div>
      }
      <div className="quote-container mt1 mb2 mb4-l">
        <blockquote className="ma0 mb3 testimonial-quote">
          <h4 className="merriweather black ma0 lh-copy">
            <span className={props.testimonialTextClassName} style={props.testimonialTextStyle}>{props.children}</span>
          </h4>
        </blockquote>
      </div>
      <div className="flex items-center mb3">
        { props.author.image && <div className="mr2 db dn-l">
          <div style={{ backgroundImage: `url('${props.author.image}')`}}/>
        </div>}
        <span className="db gray-dim f6 fw4 ttu tracked nb3-l">
            {props.author.name}
                </span>
      </div>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: `
          
         /* Testimonial Quotes */
            @media screen and (min-width:75em) {
            .testimonial-container{
            padding: 3rem;
          }

            .testimonial-quote{
            position:relative;
          }

            .testimonial-quote:before,
            .testimonial-quote:after{
            position:absolute;
            font-size: 4.5rem;
            opacity: 0.1;
            line-height: 1rem;
          }

            .testimonial-quote:before{
            content: "\\201C";
            top: 0;
            left: -2rem;
          }

            .testimonial-quote:after{
            content: "\\201D";
            right: -2rem;
            bottom: -2rem;
          }
          }
          ` }}/>
    </Wrapper>
  )
}

export default Testimonial;