import { useState } from "react"
import axios from 'axios'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { Toaster } from "react-hot-toast"

const Register = ()=>{

  const [name,setName]= useState("")
  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("")
  const [confirmPassword,setConfirmPassword]= useState("")
  const navigate = useNavigate()

  const handleOnSubmit =async(e)=>{
    if(!email){
      toast.error('Email is Required')
    }
  
  if(!password){
    toast.error('Password is required')
  }

  if(!name){
    toast.error('Name is required')
  }

  if(!confirmPassword){
    toast.error('Please Confirm Your Password')
  }
    try{
      e.preventDefault()
      const response = await axios.post(`https://mern-2024-project.onrender.com/api/v1/user/register`,{name,email,password,confirmPassword})
      if(response.data.status){
        toast.success("Registered Successfully")
      navigate('/login')
      }
    }catch(err){
      console.log(err)
    }
  }

  return(
    <>
    <Toaster position="top-center" reverseOrder={false} />
     <div className="form-container">
        <h1 className="registerHeader"> Register Page</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput1"
              placeholder="Enter Name"
              value={name}
              onChange={(e)=> setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Enter Email" 
              value={email}
              onChange={(e)=> setEmail(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="formGroupExampleInput3"
              placeholder="Enter Password"  
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="formGroupExampleInput4"
              placeholder="Confirm Password"  
              value={confirmPassword}
              onChange={(e)=> setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div className="mt-3">
          <button type="submit" className="btn btn-primary" onClick={()=> navigate('/login')}>
           Login
          </button>
          </div>
          
        </form>
      </div>
    </>
  )
}

export default Register