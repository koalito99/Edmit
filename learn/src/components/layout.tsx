import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import MarketingTemplate from './lib/templates/marketing';

import '@edmit/component-library/src/css/tachyons.css';
import '@edmit/component-library/src/css/react-select.css';
import '@edmit/component-library/src/css/react-table.css';
import '@edmit/component-library/src/css/edmit-theme.css';
import '@edmit/component-library/src/css/edmit-components.css';


const Layout = ({ children, canonical, title, description, keywords }) => {
  return (
    <>
      <Helmet
        title={`${title} | Edmit`}
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
        ]}
      >
        <html lang="en" />
        <link rel="canonical" href={canonical}></link>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <link href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Merriweather:400,700" rel="stylesheet"></link>
      </Helmet>
      <MarketingTemplate
        user={null}
        mobileMenuShown={false}
        onClickLogo={() => window.location.href = "https://edmit.me"}
        switchStudent={() => { }}
        setMobileMenuShown={() => { }}
        onLogin={() => window.location.href = "https://app.edmit.me/login"}
        onSignup={() => window.location.href = "https://app.edmit.me/signup"}
      >
        {children}
      </MarketingTemplate>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
