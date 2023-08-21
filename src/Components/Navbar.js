import React, { Component } from 'react';

import carLogo from '..//images/transport.png'
import { FaAlignCenter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';


const handleScrollTotop = () => {
  window.scrollTo(0, 0);
};

const handleScrollToBottom = () => {
    scroll.scrollToBottom();
  };


  
export default class Navbar extends Component {
  
  






  state = {
    isOpen: false
  }

  navToggler = () => {
    let { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  render() {
    let { isOpen } = this.state
    return (
      <nav className="navbar">
        <div className="nav-center"  >
          <div className="nav-header"   >
            <Link  to="/">
              <img className="logo" src={carLogo}   alt="logo official" />
            </Link>
            <button onClick={this.navToggler} type="button" className="nav-btn">
              <FaAlignCenter className="nav-icon" />
            </button>
          </div>
          <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/"   onClick={handleScrollToBottom}>contact us</Link>
            </li>

            <li>
              <Link to="/Cars"      onClick={handleScrollTotop} >cars</Link>
            </li>

          </ul>
        </div>
      </nav>
    )
  }
}
