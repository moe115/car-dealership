import { auth } from "./firebase";
import React from 'react';

import {
  createUserWithEmailAndPassword,signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(auth?.currentUser?.uid);


  const checkSignIn = () => {
    const currentUser = auth?.currentUser?.email;
  
    if (currentUser) {
      return currentUser ;
    }
  
    return null;
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  const userId = checkSignIn();

  return (
    <div >
      <input
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />&nbsp; &nbsp; 
      <input
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
    &nbsp;   <button onClick={signIn}> Sign In</button>
    &nbsp; &nbsp; 
      <button onClick={logout}> Logout </button>
<br /> <br />  <div>
      {userId ? (
        <p>User is signed in. ID: {userId}</p>
      ) : (
        <p>User is not signed in.</p>
      )}
    </div> <br /> 
      </div>
  );
};
export default Auth