import React ,{ useEffect, useState } from "react";
// import "./App.css"; import "./Popup.css";
// import { Auth } from "./components/auth";
import { getFirestore } from "firebase/firestore";
import Popup from "./Popup.css"
import AdminMap from "./AdminMap"
import Auth from "./Auth"

import { app } from "./firebase";
import {
  getDocs,
  getDoc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const db = getFirestore(app);
const carBrandRef = collection(db, "brandnames");
const carAddRef = collection(db, "carsdetails");

const Admin = ({ cars }) => { 
  

  

  // New Movie States
 
 
  // File Upload State
  const [fileUpload, setFileUpload] = useState(null);
 

 

  // useEffect(() => {
  //   getCarList();
  // }, []);


  return ( <>

  <div><br />
  <br />

    <Auth />
  </div>
    <div className="App">


<AdminMap /> 

 


</div>
  </>

  );
};

export default Admin;
