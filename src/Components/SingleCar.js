import React, { Component } from 'react'
import defaultBcg from '../images/car-2.jpg';
// import Hero from './HeroBackground'
import Banner from './Banner'
import { Link } from 'react-router-dom';
import { CarContext } from '../context';
import StyledHeroBackground from './StyledHeroBackground';
import Navbar from './Navbar'
import SingleCarCss from './SingleCar.css'
import FeaturedCars from './FeaturedCars'
import ModalImage from 'react-modal-image';

export default class SingleCar extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg
    }
  }

  static contextType = CarContext;

  render() {
    const { getCar } = this.context;
    const car = getCar(this.state.slug);
    // console.log("hi", this.state.slug , car)
    if (!car) {
      return (

        <div className="error">
          <h3>Car not available...</h3>
          <Link to='/cars' className="btn-primary">
            Back to cars
          </Link>

        </div>
      )
    }
    const { name, desc, brand, price, model, year, pic, pics } = car;
    // const [mainImg, ...defaultImg] = images;

    // console.log(car)
    return (
      <>  <Navbar />
        <StyledHeroBackground img={ pic}>
          <Banner title={`${name}`}>
            <Link to='/cars' className="btn-primary">
              Back to cars
          </Link>
          </Banner>
        </StyledHeroBackground>

        <section className="single-room">
          <div className="single-room-images">
            {/* {defaultImg.map((item, index) => {
              return <img key={index} src={item} alt={name} />;
            })} */}
          </div>
          <div className="single-room-info">

          <table> <td>
            <article className="desc">
         <h3>details</h3>
              <p> <div className="limit"    > <p dangerouslySetInnerHTML= {
            {__html:desc}}></p> </div> </p>
            </article>
         </td> 
         
          
           <td>
            <article className="info">
              <h3>info</h3>
              <h6><b>model:</b> {model}</h6>
              <h6><b>price:</b> ${price}</h6>
              <h6><b>Year:</b> {year} </h6>
              <h6>
                <b>Manufacturer:</b> {brand}
              </h6>
            </article></td>
           
            </table>
            
            <article className="Pictures">
              <h3>
                Pictures
              </h3>
             <div className="movie-gallery">
         
       {pics.map((pic, index) => (
        <div key={index} className="pic">
          <ModalImage
            small={pic}
            large={pic}
            
            hideDownload={true} // Optional: Hide the download button
            hideZoom={true} // Optional: Hide the zoom button
          />
        </div>
      ))}
 
        
     </div>
            </article>
          </div>

        </section>

        <section className="car-extras">
          {/* <h6>premium features</h6> */}
          <ul className="extras">
            {/* {extras.map((item, index) => {
              return <li key={index}>- {item}</li>
            })} */}
          </ul>
        </section>

        <FeaturedCars />
      </> 
    )
  }
}


