import React , {useEffect} from 'react';
import Styles from './Styles.css';
import Navbar from './Components/Navbar'
import Home from './Components/Home';
import Admin from './Admin.js';
import Cars from './Components/Cars';
import SingleCar from './Components/SingleCar';
import ErrorPage from './Components/ErrorPage';
import ScrollToBottomLink from './Components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

 


function App() {
  return (

    <>
 

      <Switch>

        <Route exact path='/' component={Home}  />
        <Route exact path='/cars' component={Cars} />
        <Route exact path='/Admin' component={Admin} />
        <Route exact path='/car/:slug' component={SingleCar} />
        <Route component={ErrorPage} />  </Switch>    

        <ul>
         <ScrollToBottomLink />
      </ul>
    
    </>


  );
}

export default App;