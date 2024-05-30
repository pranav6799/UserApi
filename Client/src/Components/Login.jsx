import { useState } from "react"
import axios from 'axios'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../Context/Auth'
import { Toaster } from 'react-hot-toast';


const Login = ()=>{

  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const [auth,setAuth]=useAuth()
  const navigate = useNavigate()

const handleOnSubmit = async(e)=>{

  if(!email){
    toast.error('Email is Required')
  }

if(!password){
  toast.error('Password is required')
}
  try{
    e.preventDefault()
    const response = await axios.post(`https://mern-2024-project.onrender.com/api/v1/user/login`,{email,password}
    ) 

    
    if(response.data.status){
      toast.success('User Logged In')
      setAuth({
        ...auth,
        user:response.data.user,
        token:response.data.token
      })
      localStorage.setItem('auth',JSON.stringify(response.data))

      if(response.data.user.role == 1){
        navigate('/admin')
      }
      else{
          navigate('/user')
    }
  } 


  }catch(err){
console.log(err)
  }
}

  return(
    <>
    <Toaster position="top-center" reverseOrder={false} />
     <div className="form-container">
        <h1 className="registerHeader"> Login Page</h1>
        <form onSubmit={handleOnSubmit}>
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
              id="formGroupExampleInput2"
              placeholder="Enter Password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div className="mt-3">
          <button type="button" className="btn btn-primary" onClick={()=> navigate('/register')} >
            Create Account
          </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login