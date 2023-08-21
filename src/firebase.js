import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyAGxdNxW1e7ZLWcG_CqbbKl3dCa0KbI4Pg",
  authDomain: "maarad-ebc13.firebaseapp.com",
  projectId: "maarad-ebc13",
  storageBucket: "maarad-ebc13.appspot.com",
  messagingSenderId: "1057106491224",
  appId: "1:1057106491224:web:a1b3df6798c06248f3d72d",
  measurementId: "G-R4LE9QY0FK"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
