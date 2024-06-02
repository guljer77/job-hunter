import React from 'react'
import { Helmet } from 'react-helmet-async'
import Banner from './Banner/Banner'
import Category from './Category/Category'
import AboutInfo from './About/AboutInfo'

function Home() {
  return (
    <div>
      <Helmet>
        <title>Job Hunter | Home</title>
      </Helmet>
      <Banner />
      <Category />
      <AboutInfo />
    </div>
  )
}

export default Home