/* eslint-disable react-refresh/only-export-components */
// src/Context/AuthProvider.jsx
import axios from 'axios'
import { createContext, useContext, useEffect, useState } from "react";
import { useJwt } from 'react-jwt';


const AuthContext = createContext()


// eslint-disable-next-line react/prop-types
const AuthProvider = ({children})=>{
  const [auth,setAuth] = useState({
    user:null,
    token:""
  })



useEffect(()=>{
  const data = localStorage.getItem('auth')

  if(data){
    try{
    const parseData = JSON.parse(data)
  setAuth({
    ...auth,
    user:parseData.user,
    token:parseData.token
  })
}catch(err){
  console.log("Error parsing auth data from localStorage", err)
}
  }
  //eslint-disable-next-line
},[])

  return(
    <AuthContext.Provider value={[auth,setAuth]}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth =()=> useContext(AuthContext)

export {AuthProvider,useAuth}
