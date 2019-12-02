import * as React from 'react'

const CategoryNavigation = ({ categories = [], conceptSlug }) => {
  return (
    <nav
      className="fixed bg-black-80 left-0 right-0 z-5 pv2 overflow-x-auto"
      style={{
        top: '48px',
      }}
    >
      <div
        style={{
          minWidth: '100%',
        }}
        className="flex justify-start items-center content-center"
      >
        {categories.map((category, index) => (
          <a
            className="white no-underline lato dib ph3 nowrap"
            key={`category__link__${index}`}
            href={`/${category.slug}`}
          >
            {category.name}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default CategoryNavigation
