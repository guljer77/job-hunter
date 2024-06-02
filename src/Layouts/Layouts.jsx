import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'

function Layouts() {
  return (
    <div>
      <h2>Header</h2>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layouts