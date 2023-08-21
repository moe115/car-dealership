import React, { useState } from "react";
import CarsFilter from './CarsFilter'
import CarsList from './CarsList'
import { withCarConsumer } from '../context'
import Loading from './Loading'

function CarsContainer({ context }) {
 
  const { loading, sortedCars, cars } = context;
   
  const [Brand, setBrand] = useState("");
  const [Model, setModel] = useState("");


 
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <CarsFilter cars={cars}  setBrand={setBrand} setModel={setModel}  />
      <CarsList cars={cars}      />
    </>
  );

}


export default withCarConsumer(CarsContainer)

 