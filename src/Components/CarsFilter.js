import React, { useState } from "react";
//react hook for functional component
import { useContext } from "react";
import { useEffect } from "react";
import { CarContext } from "../context";
import Title from "./Title";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import {
  getDocs,
  collection,
  getDoc,
  where,
  addDoc,
  getDocFromCache,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
const db = getFirestore(app);
const carBrandRef = collection(db, "brandnames");

  

const CarsFilter = ({ cars , setBrand ,setModel}) => {


  const [carBrands, setCarBrands] = useState([]);       
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const [models, setModels] = useState([]);

  useEffect(() => {
    // Fetch car brands from Firebase when the component mounts
    const fetchCarBrands = async () => {
      try {
        const snapshot = await getDocs(carBrandRef);
        const brandss = snapshot.docs.map((doc) => ({ ...doc.data().model }));
        console.log(brandss);
        const brands = snapshot.docs.map((doc) => doc.id);
        setCarBrands(brands);
      } catch (error) {
        console.error("Error fetching car brands:", error);
      }
    };

    fetchCarBrands();
  }, []);

  useEffect(() => {
    // Fetch models for the selected brand when selectedBrand changes
    const fetchModels = async () => {
      if (selectedBrand) {
        try {
          const docRef = doc(db, "brandnames", selectedBrand);
          const docSnap = await getDoc(docRef);
          const arrayField = docSnap.data().model;
          console.log("Array from the selected doc:", arrayField);

          setModels(arrayField || []);
        } catch (error) {
          console.error("Error fetching models:", error);
        }
      } else {
        setModels([]); // Reset models if no brand is selected
      }
    };

    fetchModels();
  }, [selectedBrand]);

  const handleBrandChange = (event) => {

setSelectedModel([]);

    setModels([]);
    setSelectedBrand(event.target.value);
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };
  console.log("seeeeeeeeeeeeeeeeeeeeeeeeeeeee",selectedBrand);
  setBrand(selectedBrand)

  console.log("seeeeeeeeeeeeeeeeeeeeeeeeeeeee",selectedModel);

  setModel(selectedModel )

  const context = useContext(CarContext);
 

  const {
    handleChange,
    type,
    carMake,
    price,
    minPrice,
    maxPrice,
    // minSize,
    // maxSize,
    // sportsPackage,
    // gps
  } = context;

 
 

  return (
    <section className="filter-container">
      <Title title="Search Cars" />
      <form className="filter-form">



        {/* select brand input*/}
        <div className="form-group">
          <label htmlFor="brandSelect">Select Car Brand:</label>
          <select
          name="brand"
            id="brandSelect"
            onChange={(e) => {handleBrandChange(e);handleChange(e)}}
            value={selectedBrand}
          >
            <option value="">Select a brand</option>
            {carBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* end of brand type */}


        {/* select model input*/}

        <div className="form-group">
          <label htmlFor="modelSelect">Select Car Model:</label>
          <select
                      name = "model"
                      onChange={(e) => {handleModelChange(e);handleChange(e)}}
                      value={selectedModel}

          id="modelSelect" disabled={!selectedBrand}>
            <option value="">Select a model</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
{/*  
        <div className="form-group">
          <label htmlFor="price">
            price ${price}
            <input
              onChange={handleChange}
              type="range"
              name="price"
              id="price"
              min={minPrice}
              max={maxPrice}
              className="form-control"
            />
          </label>
        </div> */}

       
          
      </form>
    </section>
  );
};

export default CarsFilter;
