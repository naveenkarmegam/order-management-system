import React from 'react'
import Topbar from './Topbar'
import Header from './Header'
import Feature from './Feature'
import Pricing from './Pricing'
import Testimonials from './Testimonials'
import ContactUs from './ContactUs'
import Footer from './Footer'
import '../../assets/css/Frontpage.css'
import About from './About'
const Frontpage = () => {
  return (
    <div className='container-fulid'>
      <Topbar />
      <Header />
      <Feature />
      <Pricing />
      <Testimonials />
      <ContactUs />
      <Footer />
    </div>
  )
}

export default Frontpage