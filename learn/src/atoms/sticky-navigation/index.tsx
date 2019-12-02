import * as React from 'react'
import { Link } from 'react-scroll'

const StickyNavigation = ({ top, links = [] }) => {
  return (
    <nav
      className="w-100 w-20-l bg-black pa3 pa4-l shadow-card br2 sticky-l"
      style={{
        top,
      }}
    >
      <h4 className="white mt0 lato tc tl-l">Sections</h4>
      <div className="sticky-nav flex db-l justify-center flex-wrap tc tl-l">
        {links.map((link, index) => (
          <Link
            spy={true}
            smooth={true}
            offset={-80}
            activeClass="is-active"
            duration={500}
            key={`sticky__nav__link-${index}`}
            className="pb3 f5 white lato no-underline db mh2 mh0-l o-60 pointer"
            to={link.id}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default StickyNavigation
