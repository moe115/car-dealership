import React from 'react';
import HeroBackground from './HeroBackground';
import Banner from './Banner'
import Navbar from './Navbar'

import { animateScroll as scroll } from 'react-scroll';

import Footer from './Footer.js'
import { Link } from 'react-router-dom';
import Services from './Services'
import FeaturedCars from './FeaturedCars'
 

   const handleScrollTotop = () => {
    window.scrollTo(0, 0);
  };


const Home = () => {
  return (
    <div style={{width: "100%"}}>
    <><Navbar />
      <HeroBackground>
        <Banner title="Abdallah Automobile" subtitle="find your dream car here">

 
        <Link  onClick={handleScrollTotop} to="/cars" className="btn-primary">
            Our Cars
        </Link>
 

        </Banner>
      </HeroBackground>
      <Services />
      <FeaturedCars />
      <div className='footercss'>   <Footer />    </div>
    
    </></div>
  )
}



export default Home;