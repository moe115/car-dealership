import React, { useEffect, useState } from "react";
 import { BrowserRouter as Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Fallback in case img missing
import defaultImg from '../images/car-1.jpeg';


const Car = ({ car }) => {
  const { name, brand, price, pic , id } = car; // Assuming these are the fields in the database
  const [products, setProducts] = useState([]);
  

  return (
    <article className="car">
      <div className="img-container">
        <img src={ pic  || defaultImg } alt="single car" />
        <div className="price-top">
          <h6>${price}</h6>
  
        </div>
        <Router forceRefresh={true}> 
        <Link to={`/car/${id}`} className="btn-primary room-link">
          Features
        </Link>                       </Router>
      </div>
      {/* <p className="car-info">{brand}</p> */}
      <p className="car-info">{name}</p>
    </article>
  );
};

Car.propTypes = {
  car: PropTypes.shape({
    name: PropTypes.string.isRequired,
    // slug: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    pic: PropTypes.string, // Adjust the type as per your data structure in Firebase
  }),
};

export default Car;
