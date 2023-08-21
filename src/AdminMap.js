import React ,{ useEffect, useState } from "react";

// import { Auth } from "./components/auth";
import { getFirestore } from "firebase/firestore";
import Popup from "./Popup.css";
import AdminMapInfos from "./AdminMapInfos.js";
import { v4 as uuidv4 } from "uuid";

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
 
import { ref, getStorage, uploadBytes , getDownloadURL  ,uploadBytesResumable  } from "firebase/storage";

const db = getFirestore(app);
const carBrandRef = collection(db, "brandnames");
const carAddRef = collection(db, "carsdetails");
const storage = getStorage();

const AdminMap = ({ cars }) => {
   
  
// render cars in the database


  const getCarList = async () => {
    try {
      const data = await getDocs(carAddRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCarList();
  }, []);

  //  A - newcar

  const [carBrands, setCarBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [models, setModels] = useState([]);

  //use effect for select brand and model

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


  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setNewBrand(event.target.value);
  };

 

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


  const handleModelChange = (event) => {
    setnewModel(event.target.value);
  };


// declaring consts for new cars

  const [movieList, setMovieList] = useState([]);
  const [newBrand, setNewBrand] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newName, setNewName] = useState("");
  const [newYear, setNewYear] = useState("");

  const [newPrice, setNewPrice] = useState("");
  const [newModel, setnewModel] = useState(0);
  const [isFeatured, setisFeatured] = useState(false);

// File Upload State

const [fileUpload, setFileUpload] = useState(null);

const [filesUpload, setFilesUpload] = useState(null);

const carssss = ["Saab", "Volvo", "BMW"];


  // submit the new car


  
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle");

  const [downloadURLs, setDownloadURLs] = useState([]);



 
  
 //  B - delete Car
 const deleteCar = async (id) => {
    const movieDoc = doc(db, "carsdetails", id);
    await deleteDoc(movieDoc);
    getCarList();
    alert("car deleted");
  };

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const updateProgressBar = (progress) => {
    const progressBar = document.getElementById("progressBar");
    progressBar.value = progress;
  
    // Optional: Display progress percentage
    progressBar.setAttribute("data-label", `${progress}%`);
  };
  
  // // Add an event listener to the submit button
  // const submitButton = document.getElementById("submitButton");
  // submitButton.addEventListener("click", onSubmitcar);

  const trackOverallProgress = (promises) => {
    let totalProgress = 0;
    const numPromises = promises.length;
  
    promises.forEach((promise) => {
      promise.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        totalProgress += progress / numPromises;
        
        // Update the progress bar with the value of `totalProgress`
        updateProgressBar(totalProgress);
      });
    });
  };

  const onSubmitcar = async () => {
    try {

      if (!fileUpload) return;
      const aaaa = Math.random();
      const filesFolderRef = await ref(storage, `gs://maarad-ebc13.appspot.com/mainpic/${fileUpload.name}-${Math.random()}`);

   let iii  ;

      try {
        await uploadBytes(filesFolderRef, fileUpload);

           iii = await  getDownloadURL(filesFolderRef).then(
          (url) => {  
            return url;
           })  
  
      } catch (err) {
        console.error(err);
      }   
      
      console.log("seeeeeeeemeeeeeeeeee",iii);
 

    


 
let  downloadURLs ;
      
    
     try {
  const promises = [];
  const randomStrings = {};

  for (const image of images) {

    const randomString = Math.random().toString(36).substring(2, 8);
    randomStrings[image.name] = randomString; // Store random string for each image name

    const uniqueImageName = `${image.name}_${randomString}`;
    const storageRef = ref(storage, `detailspics/${uniqueImageName}`);

    // const storageRef = ref(storage, `detailspics/${image.name}`);
    const uploadTask = uploadBytesResumable (storageRef, image, {
      // Optional: set the maximum chunk size for more granular progress updates
      chunkSize: 1 * 1024 * 1024, // 1MB chunks (adjust as needed)
    });
  // Push the promise returned by uploadBytes to the promises array
    promises.push(uploadTask);
  }

  trackOverallProgress(promises);

  await Promise.all(promises);  console.log("All images uploaded");
  const downloadURLPromises = images.map((image) => {
    const randomString = randomStrings[image.name];
    const storageRef = ref(storage, `detailspics/${image.name}_${randomString}`);
    return getDownloadURL(storageRef);
  });

   downloadURLs = await Promise.all(downloadURLPromises);


  console.log('yow', downloadURLs);
} catch (err) {
  console.log(err);
}   



  console.log("ggbrgrghruighrug", downloadURLs);

      await addDoc(carAddRef, {
        brand: newBrand,
        model: newModel,
        featured: isFeatured,
        desc: newDesc,
        name: newName,
        price: newPrice,
        year: newYear,

        pic: iii,

        pics: downloadURLs,

        // userId: auth?.currentUser?.uid,

      });
    } catch (error) {
      console.error(error);
    }
    alert("car added");
    getCarList();
  };

  // console.log("seeeeeeeeeeeeeeeeee" , downloadURLs);
  return (
    <div> 

      <div className="AddCarContainer">
        <label htmlFor="brandSelect">Select Car Brand:</label>
        <select
          id="brandSelect"
          onChange={handleBrandChange}
          value={selectedBrand}
        >
          <option value="">Select a brand</option>
          {carBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>{" "}
        <br />
        <label htmlFor="modelSelect">Select Car Model:</label>
        <select
          id="modelSelect"
          disabled={!selectedBrand}
          onChange={handleModelChange}
        >
          <option value="">Select a model</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>{" "}
        <br />
        <input
          placeholder="price"
          type="number"
          onChange={(e) => setNewPrice(Number(e.target.value))}
        />
        <br />
          <input
          placeholder="year"
          type="number"
          onChange={(e) => setNewYear(Number(e.target.value))}
        />
        <br />
        <input
          placeholder="name"
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setisFeatured(e.target.checked)}
        />
        <label>Featured</label>
        <br />
        <textarea
          placeholder="desc"
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <br />

        <div>
        <input type="file" accept="image/*" onChange={(e) => setFileUpload(e.target.files[0])} />
       
      </div>

        <div>
        <input type="file"      multiple     onChange={handleChange} accept="image/*" />


      </div>  
      <progress id="progressBar" max="100" value="0"></progress>

        <button onClick={onSubmitcar}> Submit car</button>
      </div>
<div className="father">
      <div className="admincarlist">
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.featured ? "green" : "red" }}>
              {movie.name}
            </h1>
            <p>
              {" "}
              <img
                src={movie.pic}
                style={{ width: "25%", height: "50" }}
              />{" "}
            </p>
            <button onClick={() => deleteCar(movie.id)}> Delete car</button>
            <div>
              <AdminMapInfos movie={movie} getCarList={getCarList} />
            </div>
            <br />
            -----------------------------------------------------
          </div>
        ))}
      </div>
    </div></div>
  );
};

export default AdminMap;
