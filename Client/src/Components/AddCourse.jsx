import { useAuth } from '../Context/Auth'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AddCourse = ({ onCourseAdded }) => {
  const [auth] = useAuth()
  const navigate= useNavigate()

  const[course,setCourse]=useState()
  const[name,setName]=useState('')
  const[description,setDescription]=useState('')
  const[level,setLevel]=useState('')
  const[photo,setPhoto]=useState(null)
  console.log(photo)

const handleOnSubmit=async (e)=>{
e.preventDefault()
  try{
    const  courseData = new FormData()
    courseData.append("name",name)
    courseData.append("description",description)
    courseData.append("level",level)
    courseData.append("photo",photo)
    const response = await axios.post(`https://mern-2024-project.onrender.com/api/v1/course/add`,courseData,{
      headers:{
        'Authorization':auth?.token
      }
    })
    if(response.data.status){
      setCourse(response.data.newCourse)
      onCourseAdded(response.data.newCourse)
      toast.success('Course Added Successfully')
      setName("");
      setDescription("");
      setPhoto(null);
      setLevel("");
      
    }
  }catch(err){
    console.log(err)
  }
   
}


  return (
    <div className='add-course-container'>
      <h2 className='text-center mb-2'>Add Course</h2>
    <form onSubmit={handleOnSubmit}>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder='Enter Course Name' value={name} onChange={(e)=> setName(e.target.value)} />
      </div>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder='Enter Description'value={description} onChange={(e)=> setDescription(e.target.value)} />
      </div>
      <div className="mb-3">
        <input type="number" className="form-control" placeholder='Enter Level'value={level} onChange={(e)=> setLevel(e.target.value)}/>
      </div>
      <div className='mb-3'>
        <label className='btn btn-outline-secondary col-md-12'>
        {photo? photo.name : 'Upload Photo'}
          <input type='file' name='photo' accept='image/*' hidden  onChange={(e)=> setPhoto(e.target.files[0])} />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
  )
}

export default AddCourse
