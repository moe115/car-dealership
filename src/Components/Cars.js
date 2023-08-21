import React , {useEffect} from 'react'
import HeroBackground from './HeroBackground'
import Banner from './Banner'
import { Link } from 'react-router-dom'
import CarsContainer from './CarsContainer'
import Navbar from './Navbar'
import Footer from './Footer.js'

import { useHistory } from 'react-router-dom';


const Cars = () => {


  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });


    return () => unlisten();
  }, [history]);

  return ( <div style={{width: "100%"}} >
    <> <Navbar />
      <HeroBackground hero="carsHero">
        <Banner title='Our Cars'>
          <Link to='/' className="btn-primary">
            Return home
        </Link>
        </Banner>
      </HeroBackground>
      <CarsContainer />
      <Footer />    

    </> 
    </div>
  )
}

export default Cars;