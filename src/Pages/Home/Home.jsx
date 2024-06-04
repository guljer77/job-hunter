import React from 'react'
import { Helmet } from 'react-helmet-async'
import Banner from './Banner/Banner'
import Category from './Category/Category'
import AboutInfo from './About/AboutInfo'
import JobList from './Job List/JobList'
import Client from './Client/Client'
import NewsLetter from './Newsletter/NewsLetter'

function Home() {
  return (
    <div>
      <Helmet>
        <title>Job Hunter | Home</title>
      </Helmet>
      <Banner />
      <Category />
      <AboutInfo />
      <JobList />
      <Client />
      <NewsLetter />
    </div>
  )
}

export default Home