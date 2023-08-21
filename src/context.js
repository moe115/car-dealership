import React, { Component } from 'react'
// import items from './data';
// import Client from './Contentful';
 

 import { getFirestore, where } from "firebase/firestore";
 import { app } from './firebase';
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query
} from "firebase/firestore";

const CarContext = React.createContext();

const db = getFirestore(app);
const carCollectionRef = collection(db, "carsdetails" );

class CarProvider extends Component {

  state = {
    cars: [],
    sortedCars: [],
    featuredCars: [],
    loading: true,
    //controlled input - cars filter component
    type: 'all',
    carMake: 'all',
    model : 'all' ,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    gps: false,
    sportPackage: false
  };
  getCustom = async (selected,brand) => {
    try {

      const q = query(carCollectionRef, where(selected, "==", brand));

      const data = await getDocs(q);

      const items = data.docs.map((doc) => ({
      
        ...doc.data() ,
        id: doc.id
      }));
 
      
      let cars = items ;
      // return featured cars from array
      let featuredCars = cars.filter(car => car.featured === true);
      //calculate default maximum price for each item in Array
      let maxPrice = Math.max(...cars.map(car => car.price));
      //calculate default maximum size for each item in Array
      let maxSize = Math.max(...cars.map(car => car.size));

      this.setState({
        cars,
        featuredCars,
        sortedCars: cars,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize,

      });
    
    } catch (error) {
      this.state.loading= false;

      console.log(error)
    }
  }
  // Get API data
  getAPIData = async () => {
    try {
    
      this.setState({loading : true});
      const data = await getDocs(carCollectionRef  );
      const items = data.docs.map((doc) => ({
        ...doc.data() ,
        id: doc.id
      }));
 
      
      let cars = items ;
      // return featured cars from array
      let featuredCars = cars.filter(car => car.featured === true);
      //calculate default maximum price for each item in Array
      let maxPrice = Math.max(...cars.map(car => car.price));
      //calculate default maximum size for each item in Array
      let maxSize = Math.max(...cars.map(car => car.size));

      this.setState({
        cars,
        featuredCars,
        sortedCars: cars,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize,

      });

    } catch (error) {
      console.log(error)

    }
  }

  // Get local data
  componentDidMount() {

  this.getAPIData()
      
    // let cars = this.state.cars;


    // return featured cars from array
    // let featuredCars = cars.filter(car => car.featured === true);

    // //calculate default maximum price for each item in Array
    // let maxPrice = Math.max(...cars.map(car => car.price));
    // //calculate default maximum size for each item in Array
    // let maxSize = Math.max(...cars.map(car => car.size));

    // this.setState({
    //   cars,
    //   featuredCars,
    //   sortedCars: cars,
    //   loading: false,
    //   price: maxPrice,
    //   maxPrice,
    //   maxSize
    // });
  }

  // Flattening data.js Array
  formatData = (items) => {
    let tempItems = items.map(item => {

      let id = item.id;
      // let images = item.fields.images.map(image => image.fields.file.url);

      // Copy of fields object from data.js and return
      let car = { ...item.fields, id }
console.log(car)

      return car;

    });
    return tempItems
  }

  // getCar function to set up slug parameter via--react router
  getCar = (slug) => {
    console.log("hwllo", slug , this.state.brand )
    let tempCars = [...this.state.cars];
    console.log("seme2" , tempCars)
    const car = tempCars.find(tempCar => tempCar.id === slug)
    return car;
  }

  //form inputs - controlled input
  handleChange = e => {

    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = e.target.name;
    if(value == "" ) {
this.getAPIData()
    }else{

      this.getCustom(name,value)
    }
    
    
    this.setState({
      [name]: value
    }, this.filterCars)

    // console.log(`type: ${type}, name: ${name}, value: ${value}`)
  }

  filterCars = () => {
    let {
      cars, price, type, carMake ,brand  ,model,
    } = this.state
    //All cars
    let tempCars = [...cars];


    // -----------------------------------------------

    // filter by type
    if (type !== 'all') {
      tempCars = tempCars.filter(car => car.brand === brand)
    }

    // ---------------------------------------------------------

    //Filter by manufacturers
    if (carMake !== 'all') {
      tempCars = tempCars.filter(car => car.carMake === carMake)
    }
    if (model !== 'all') {
      tempCars = tempCars.filter(car => car.model === model)
    }

    // ---------------------------------------------------------
    //Filter by price
    tempCars = tempCars.filter(car => car.price <= price);

    // ---------------------------------------------------------

    // Filter by size
    // tempCars = tempCars.filter(car => car.size >= minSize && car.size <= maxSize)

    // ---------------------------------------------------------

    // if (gps) {
    //   tempCars = tempCars.filter(car => car.gps === true)
    // }

    // if (sportPackage) {
    //   tempCars = tempCars.filter(car => car.sportPackage === true)
    // }

    //alternate state
    this.setState({
      sortedCars: tempCars
    })
  };


  render() {
    return (
      <CarContext.Provider value={{ ...this.state, getCar: this.getCar, handleChange: this.handleChange }}>
        {this.props.children}
      </CarContext.Provider>
    )
  }
}

const CarConsumer = CarContext.Consumer;


//Higher order function that wraps component passed into in(carsContainer)
export function withCarConsumer(Component) {
  return function ConsumerWrapper(props) {
    return <CarConsumer>
      {value => <Component {...props} context={value} />}
    </CarConsumer>
  }
}

export { CarProvider, CarConsumer, CarContext }
