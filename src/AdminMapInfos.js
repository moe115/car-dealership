import React , { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import Popup from "./Popup.css"
import { app } from "./firebase";
import { getDocs, getDoc, collection, addDoc, deleteDoc    ,  updateDoc, doc} from "firebase/firestore";
import { ref, getStorage, uploadBytes , getDownloadURL  } from "firebase/storage";
import ModalImage from 'react-modal-image';




type Movie = {
  id: string;

  brand: string;
  name: string;
  desc: string;
  model: string;
  desc: string;
  featured: Boolean;
  price:Number;
  year: Number;
  // Add other properties if there are more in the actual object
};


interface ChildProps {
  movie: Movie;
  getCarList: Function;
}

const db = getFirestore(app);


const carAddRef = collection(db, "carsdetails");

const AdminMapInfos = (  props: ChildProps  ) => { 

  const [fileUpload, setFileUpload] = useState(null);

  const storage = getStorage();


   const uploadFile = async (id) => {

try{
      if (!fileUpload) return;
      const fileFolderRef = ref(storage, `gs://maarad-ebc13.appspot.com/mainpic/${fileUpload.name}`);

     let iiie ; 
 
      try {
        await uploadBytes(fileFolderRef, fileUpload);

 
            
           iiie = await  getDownloadURL(fileFolderRef).then(
            (url) => {  
              return url;
             })  

 


      } catch (err) {
        console.error(err);
      }






      const movieDoc = doc(db, "carsdetails", id);
      await updateDoc(movieDoc, { pic: iiie });




    }catch(ee){console.error(ee);}
    props.getCarList()
    };





  const handleDeletePic = async (index) => {
    try {
      const id = props.movie.id; // Replace with the appropriate way to get the carId for this specific car
      const picUrl = props.movie.pics[index]; // Get the URL of the picture to be deleted

      // Remove the picture URL from the array in your component's state
      const updatedPics = [...props.movie.pics];
      updatedPics.splice(index, 1);


      const movieDoc = doc(db, "carsdetails", id);
      await updateDoc(movieDoc, { pics: updatedPics });

      // Update the document in Firebase to reflect the changes
             props.getCarList()

    } catch (error) {
      console.error('Error deleting picture:', error);
    }
  };





//                                                   popups




    const [isPopupVisible1, setIsPopupVisible1] = useState(false);
    const [isPopupVisible2, setIsPopupVisible2] = useState(false);
    const [isPopupVisible3, setIsPopupVisible3] = useState(false);

    const togglePopup1 = () => {
        setIsPopupVisible1((prevState) => !prevState);
      };
    const togglePopup2 = () => {
        setIsPopupVisible2((prevState) => !prevState);
      };
      const togglePopup3 = () => {
        setIsPopupVisible3((prevState) => !prevState);
      };
 


      const [updatedTitle, setUpdatedbrand] = useState("");
      const [updatedfeatured, setUpdatedfeatured] = useState(false);

      const [updatedpic, setUpdatedpic] = useState("");

      const [updatedmodel, setUpdatedmodel] = useState("");
      const [updatedyear, setUpdatedyear] = useState("");
      const [updatedprice, setUpdatedprice] = useState("");
      const [updateddesc, setUpdateddesc] = useState("");
      const [updatedname, setUpdatedname] = useState("");

      
      const updateCarbrand = async (id) => {
        const movieDoc = doc(db, "carsdetails", id);
        await updateDoc(movieDoc, { brand: updatedTitle });
      };
    
      const updateCarfeatured = async (id) => {
        const movieDoc = doc(db, "carsdetails", id);
        await updateDoc(movieDoc, { featured: updatedfeatured });
      };
      console.log(updatedfeatured);
      const updateCarname = async (id) => {
        const movieDoc = doc(db, "carsdetails", id);
        await updateDoc(movieDoc, { name: updatedname });
      };
      const updateCaryear = async (id) => {
        const movieDoc = doc(db, "carsdetails", id);
    
        await updateDoc(movieDoc, { year: updatedyear });
      };
      const updateCarmodel = async (id) => {
        const movieDoc = doc(db, "carsdetails", id);
        await updateDoc(movieDoc, { model: updatedmodel });
      };
      const updateCarprice = async (id) => {
        const movieDoc = doc(db, "carsdetails", id);
        await updateDoc(movieDoc, { price: updatedprice });
      };
      const updateCardesc = async (id) => {
        const movieDoc = doc(db, "carsdetails", id);
    
        await updateDoc(movieDoc, { desc: updateddesc });
      };


return (

<div>
<div>            
      <button onClick={togglePopup3}>pics</button>
      {isPopupVisible3  && (
        <div className="popup-container1">
          <div className="popup-content">

          <div className="movie-gallery">

{props.movie.pics.map((pic, index) => (
       
       <div key={index} className="movie-pic">
         
         <ModalImage
            small={pic}
            large={pic}
            
            hideDownload={true} // Optional: Hide the download button
            hideZoom={true} // Optional: Hide the zoom button
          />
         
         
         
           <button  onClick={() => handleDeletePic(index)} >Delete</button>                </div>
      ))}  

        </div>
        <br/>    <button onClick={togglePopup3}>Close</button>
        
          </div>   </div>
      )}
    </div> 
  

<div>            
      <button onClick={togglePopup1}>info</button>
      {isPopupVisible1  && (
        <div className="popup-container">
          <div className="popup-content">
            <p> brand: {props.movie.brand} </p>
            <p> model: {props.movie.model} </p>
            <p> name: {props.movie.name} </p>
            <p> price: {props.movie.price}$ </p>
            <p> year: {props.movie.year} </p>
          <div className="limits" >  <p > description: <p dangerouslySetInnerHTML= {
            {__html:props.movie.desc}}></p> </p> </div>
          <button onClick={togglePopup1 }>Close</button>   
         </div> </div>
      )}
    </div> 
    

    <div>
      <button onClick={togglePopup2}>configuration</button>
      {isPopupVisible2 && (
        <div className="popup-container">
          <div className="popup-content">
            <input
              type="checkbox"
              checked={updatedfeatured}
              onChange={(e) => setUpdatedfeatured(e.target.checked)}
            />
            <button onClick={() => updateCarfeatured(props.movie.id)}>
              {" "}
              featured
            </button>
            <br />
            <input
              id={props.movie.id}
              placeholder="new brand..."
              onChange={(e) => setUpdatedbrand(e.target.value)}
            />{" "}
            <button onClick={() => updateCarbrand(props.movie.id)}>
              {" "}
              Update the brand
            </button>
            <br />
            <input
              placeholder="new model..."
              onChange={(e) => setUpdatedmodel(e.target.value)}
            />{" "}
            <button onClick={() => updateCarmodel(props.movie.id)}>
              {" "}
              Update the model
            </button>
            <br />
            <input
              placeholder="new name..."
              onChange={(e) => setUpdatedname(e.target.value)}
            />{" "}
            <button onClick={() => updateCarname(props.movie.id)}>
              {" "}
              Update the name
            </button>
            <br />
             
            <input
              placeholder="new year..."
              onChange={(e) => setUpdatedyear(e.target.value)}
            />{" "}
            <button onClick={() => updateCaryear(props.movie.id)}>
              {" "}
              Update the year
            </button>
            <br />
            <input
              placeholder="new price..."
              onChange={(e) => setUpdatedprice(e.target.value)}
            />
            <button onClick={() => updateCarprice(props.movie.id)}>
              {" "}
              Update the price
            </button>
            <br />
            <textarea
              placeholder="new DESCRIPTION..."
              onChange={(e) => setUpdateddesc(e.target.value)}
            />
            <button onClick={() => updateCardesc(props.movie.id)}>
              {" "}
              Update the description
            </button>            <br />

            <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
            <button onClick={() => uploadFile(props.movie.id)  }>
              {" "}
              Update the main pic
            </button>
            <br />
            <button onClick={() => props.getCarList() }>refresh</button>  
              <button onClick={togglePopup2}>Close</button>  
             </div>

             </div>
      )}
    </div>

</div>



);
};
export default AdminMapInfos ;